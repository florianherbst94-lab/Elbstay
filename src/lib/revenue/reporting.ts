import prisma from "@/lib/prisma";
import { getMonthYear, splitReservationNightsByMonth } from "./calculations";
import { endOfMonth, startOfMonth, eachMonthOfInterval, format, parseISO } from "date-fns";

export interface ReportFilter {
  startDate: Date;
  endDate: Date;
  propertyIds?: string[]; // Empty means all
}

export interface MonthlyPropertyStats {
  month: string;
  propertyId: string;
  propertyName: string;
  grossRevenueCent: number;
  netRevenueCent: number;
  fixedCostsCent: number;
  netFixedCostsCent: number;
  variableCostsCent: number;
  netVariableCostsCent: number;
  costsByCategory: Record<string, { name: string; amountCent: number; netAmountCent: number }>;
  revenueBySubCategory: {
    accommodationCent: number;
    cleaningFeeCent: number;
    otherCent: number;
  };
  occupiedNights: number;
  availableNights: number;
  checkouts: number;
}

export interface AggregatedStats {
  grossRevenueCent: number;
  netRevenueCent: number;
  netFixedCostsCent: number;
  netVariableCostsCent: number;
  netTotalCostsCent: number;
  profitCent: number;
  margin: number;
  occupiedNights: number;
  availableNights: number;
  occupancy: number;
  adrCent: number;
  revParCent: number;
  checkouts: number;
}

function calculateAggregated(statsArray: MonthlyPropertyStats[]): AggregatedStats {
  const aggr = {
    grossRevenueCent: 0,
    netRevenueCent: 0,
    netFixedCostsCent: 0,
    netVariableCostsCent: 0,
    netTotalCostsCent: 0,
    profitCent: 0,
    margin: 0,
    occupiedNights: 0,
    availableNights: 0,
    occupancy: 0,
    adrCent: 0,
    revParCent: 0,
    checkouts: 0
  };

  for (const s of statsArray) {
    aggr.grossRevenueCent += s.grossRevenueCent;
    aggr.netRevenueCent += s.netRevenueCent;
    aggr.netFixedCostsCent += s.netFixedCostsCent;
    aggr.netVariableCostsCent += s.netVariableCostsCent;
    aggr.occupiedNights += s.occupiedNights;
    aggr.availableNights += s.availableNights;
    aggr.checkouts += s.checkouts;
  }

  aggr.netTotalCostsCent = aggr.netFixedCostsCent + aggr.netVariableCostsCent;
  aggr.profitCent = aggr.netRevenueCent - aggr.netTotalCostsCent;
  aggr.margin = aggr.netRevenueCent > 0 ? (aggr.profitCent / aggr.netRevenueCent) * 100 : 0;
  aggr.occupancy = aggr.availableNights > 0 ? (aggr.occupiedNights / aggr.availableNights) * 100 : 0;
  aggr.adrCent = aggr.occupiedNights > 0 ? aggr.netRevenueCent / aggr.occupiedNights : 0;
  aggr.revParCent = aggr.availableNights > 0 ? aggr.netRevenueCent / aggr.availableNights : 0;

  return aggr;
}

export async function generateFinancialReportData(filter: ReportFilter) {
  const { startDate, endDate, propertyIds } = filter;
  
  // Ensure we compare entire months
  const reportStart = startOfMonth(startDate);
  const reportEnd = endOfMonth(endDate);
  const monthsInReport = eachMonthOfInterval({ start: reportStart, end: reportEnd }).map(d => getMonthYear(d));

  // 1. Fetch properties
  const propertyWhere = propertyIds && propertyIds.length > 0 ? { id: { in: propertyIds } } : {};
  const properties = await prisma.property.findMany({ where: propertyWhere });
  const activePropertyIds = properties.map(p => p.id);

  // 2. Fetch reservations overlapping with the period
  const reservations = await prisma.reservation.findMany({
    where: {
      propertyId: { in: activePropertyIds },
      isCancelled: false,
      checkOut: { gte: reportStart },
      checkIn: { lte: reportEnd }
    },
    include: { financials: true, extras: true }
  });

  // 3. Fetch costs
  const costs = await prisma.propertyCost.findMany({
    where: {
      propertyId: { in: activePropertyIds },
      isActive: true,
      validFrom: { lte: reportEnd },
      OR: [
        { validTo: null },
        { validTo: { gte: reportStart } }
      ]
    },
    include: { category: true }
  });

  // Initialize data structure
  // month -> propertyId -> Stats
  const data: Record<string, Record<string, MonthlyPropertyStats>> = {};

  for (const month of monthsInReport) {
    data[month] = {};
    for (const prop of properties) {
      // Approximate available nights: if property was active in that month
      const daysInMonth = new Date(parseInt(month.split('-')[0]), parseInt(month.split('-')[1]), 0).getDate();
      
      data[month][prop.id] = {
        month,
        propertyId: prop.id,
        propertyName: prop.name,
        grossRevenueCent: 0,
        netRevenueCent: 0,
        fixedCostsCent: 0,
        netFixedCostsCent: 0,
        variableCostsCent: 0,
        netVariableCostsCent: 0,
        costsByCategory: {},
        revenueBySubCategory: { accommodationCent: 0, cleaningFeeCent: 0, otherCent: 0 },
        occupiedNights: 0,
        availableNights: daysInMonth,
        checkouts: 0
      };
    }
  }

  // Helper to get net cost
  const getNetCost = (cost: { isGross: boolean; taxRate: number }, amountCent: number) => {
    if (!cost.isGross) return amountCent;
    return Math.round(amountCent / (1 + (cost.taxRate || 0) / 100));
  };

  // Process Reservations
  for (const res of reservations) {
    const checkOutMonth = getMonthYear(res.checkOut);
    const nightsByMonth = splitReservationNightsByMonth(res.checkIn, res.checkOut);
    const totalNights = Object.values(nightsByMonth).reduce((a, b) => a + b, 0);

    // Track checkouts and occupied nights
    if (monthsInReport.includes(checkOutMonth) && data[checkOutMonth] && data[checkOutMonth][res.propertyId]) {
      data[checkOutMonth][res.propertyId].checkouts++;
    }

    let extrasRevenueCent = 0;
    if (res.extras) {
        extrasRevenueCent = res.extras.filter(e => e.status === 'CONFIRMED').reduce((sum, e) => sum + e.priceCent, 0);
    }

    for (const [month, nights] of Object.entries(nightsByMonth)) {
      if (monthsInReport.includes(month) && data[month] && data[month][res.propertyId]) {
        const stats = data[month][res.propertyId];
        stats.occupiedNights += nights;

        if (res.financials && totalNights > 0) {
          const fraction = nights / totalNights;
          const grossPayout = Math.round(res.financials.payoutCent * fraction);
          
          // Accommodation revenue fraction
          const grossAccom = Math.round(res.financials.accommodationCent * fraction);
          
          // Cleaning fee usually attached to checkout month or distributed. Let's distribute for now.
          const grossCleaning = Math.round(res.financials.cleaningFeeCent * fraction);
          
          // Allocate extras to checkout month
          let grossExtras = 0;
          if (month === checkOutMonth) {
              grossExtras = extrasRevenueCent;
          }

          const totalGrossForMonth = grossPayout + grossExtras;
          const totalNetForMonth = Math.round(totalGrossForMonth / 1.07); // Assuming 7% VAT on revenue for simplicity

          stats.grossRevenueCent += totalGrossForMonth;
          stats.netRevenueCent += totalNetForMonth;
          
          stats.revenueBySubCategory.accommodationCent += grossAccom;
          stats.revenueBySubCategory.cleaningFeeCent += grossCleaning;
          stats.revenueBySubCategory.otherCent += grossExtras + (grossPayout - grossAccom - grossCleaning);
        }
      }
    }
  }

  // Process Costs
  for (const month of monthsInReport) {
    for (const cost of costs) {
      const costStartMonth = getMonthYear(cost.validFrom);
      const costEndMonth = cost.validTo ? getMonthYear(cost.validTo) : "9999-12";

      if (month >= costStartMonth && month <= costEndMonth && data[month] && data[month][cost.propertyId]) {
        const stats = data[month][cost.propertyId];
        
        let amount = 0;
        let isVariable = false;

        if (cost.calculationType === 'PER_MONTH') {
          amount = cost.amountCent;
        } else if (cost.calculationType === 'PER_STAY') {
          amount = cost.amountCent * stats.checkouts;
          isVariable = true;
        } else if (cost.calculationType === 'PERCENTAGE_REVENUE') {
           amount = Math.round(stats.grossRevenueCent * (cost.amountCent / 10000));
           isVariable = true;
        }

        if (amount > 0) {
          const netAmount = getNetCost(cost, amount);

          if (isVariable) {
            stats.variableCostsCent += amount;
            stats.netVariableCostsCent += netAmount;
          } else {
            stats.fixedCostsCent += amount;
            stats.netFixedCostsCent += netAmount;
          }

          const catName = cost.category.name;
          if (!stats.costsByCategory[catName]) {
            stats.costsByCategory[catName] = { name: catName, amountCent: 0, netAmountCent: 0 };
          }
          stats.costsByCategory[catName].amountCent += amount;
          stats.costsByCategory[catName].netAmountCent += netAmount;
        }
      }
    }
  }

  // Flatten and Aggregate
  const flatMonthlyPropertyStats: MonthlyPropertyStats[] = [];
  for (const month of monthsInReport) {
    for (const propId of activePropertyIds) {
      if (data[month][propId]) {
        flatMonthlyPropertyStats.push(data[month][propId]);
      }
    }
  }

  const overall = calculateAggregated(flatMonthlyPropertyStats);

  // Group by month
  const monthlyPortfolio = monthsInReport.map(month => {
    const monthStats = flatMonthlyPropertyStats.filter(s => s.month === month);
    return {
      month,
      stats: calculateAggregated(monthStats)
    };
  });

  // Group by property
  const propertiesPerformance = properties.map(prop => {
    const propStats = flatMonthlyPropertyStats.filter(s => s.propertyId === prop.id);
    return {
      propertyId: prop.id,
      propertyName: prop.name,
      stats: calculateAggregated(propStats),
      monthlyDetails: propStats
    };
  });

  return {
    period: { start: reportStart, end: reportEnd, months: monthsInReport },
    overall,
    monthlyPortfolio,
    propertiesPerformance,
    rawFlatStats: flatMonthlyPropertyStats
  };
}

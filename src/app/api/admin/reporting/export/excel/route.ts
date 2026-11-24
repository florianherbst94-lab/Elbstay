import { NextResponse } from "next/server"
import { generateFinancialReportData } from "@/lib/revenue/reporting"
import { endOfMonth, format } from "date-fns"
import ExcelJS from "exceljs"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const startParam = searchParams.get("start")
    const endParam = searchParams.get("end")
    const propsParam = searchParams.get("props")

    const startDate = startParam ? new Date(startParam) : new Date(new Date().getFullYear(), 0, 1)
    const endDate = endParam ? new Date(endParam) : endOfMonth(new Date())
    const propertyIds = propsParam ? propsParam.split(",") : []

    const reportData = await generateFinancialReportData({
      startDate,
      endDate,
      propertyIds
    })

    const workbook = new ExcelJS.Workbook()
    workbook.creator = "Elbstay"
    workbook.created = new Date()

    // --- Sheet 1: Management Summary ---
    const summarySheet = workbook.addWorksheet("Gesamtübersicht")
    summarySheet.columns = [
      { header: "Kennzahl", key: "metric", width: 30 },
      { header: "Wert", key: "value", width: 20 },
      { header: "Einheit", key: "unit", width: 15 }
    ]

    summarySheet.getRow(1).font = { bold: true }
    summarySheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE0E0E0" } }

    const overall = reportData.overall
    summarySheet.addRows([
      { metric: "Gesamtumsatz (Netto)", value: overall.netRevenueCent / 100, unit: "€" },
      { metric: "Gesamtausgaben (Netto)", value: overall.netTotalCostsCent / 100, unit: "€" },
      { metric: "Fixkosten (Netto)", value: overall.netFixedCostsCent / 100, unit: "€" },
      { metric: "Variable Kosten (Netto)", value: overall.netVariableCostsCent / 100, unit: "€" },
      { metric: "Operativer Gewinn", value: overall.profitCent / 100, unit: "€" },
      { metric: "Gewinnmarge", value: overall.margin, unit: "%" },
      { metric: "Auslastung", value: overall.occupancy, unit: "%" },
      { metric: "RevPAR", value: overall.revParCent / 100, unit: "€" },
      { metric: "ADR", value: overall.adrCent / 100, unit: "€" }
    ])

    summarySheet.getColumn('value').numFmt = '#,##0.00'


    // --- Sheet 2: Monatliche Portfoliozahlen ---
    const monthlySheet = workbook.addWorksheet("Monatliche Portfoliozahlen")
    monthlySheet.columns = [
      { header: "Monat", key: "month", width: 15 },
      { header: "Einnahmen (Netto)", key: "revenue", width: 20 },
      { header: "Fixkosten (Netto)", key: "fixedCosts", width: 20 },
      { header: "Var. Kosten (Netto)", key: "varCosts", width: 20 },
      { header: "Gesamtausgaben", key: "totalCosts", width: 20 },
      { header: "Op. Gewinn", key: "profit", width: 20 },
      { header: "Marge", key: "margin", width: 15 },
      { header: "Auslastung", key: "occupancy", width: 15 }
    ]

    monthlySheet.getRow(1).font = { bold: true }
    monthlySheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE0E0E0" } }

    reportData.monthlyPortfolio.forEach(row => {
      monthlySheet.addRow({
        month: row.month,
        revenue: row.stats.netRevenueCent / 100,
        fixedCosts: row.stats.netFixedCostsCent / 100,
        varCosts: row.stats.netVariableCostsCent / 100,
        totalCosts: row.stats.netTotalCostsCent / 100,
        profit: row.stats.profitCent / 100,
        margin: row.stats.margin,
        occupancy: row.stats.occupancy
      })
    })

    const moneyCols = ['revenue', 'fixedCosts', 'varCosts', 'totalCosts', 'profit']
    moneyCols.forEach(col => monthlySheet.getColumn(col).numFmt = '#,##0.00 €')
    monthlySheet.getColumn('margin').numFmt = '0.0 %'
    monthlySheet.getColumn('occupancy').numFmt = '0.0 %'


    // --- Sheet 3: Einzelobjekte ---
    const propSheet = workbook.addWorksheet("Einzelobjekte")
    propSheet.columns = [
      { header: "Objekt", key: "name", width: 30 },
      { header: "Einnahmen (Netto)", key: "revenue", width: 20 },
      { header: "Gesamtausgaben", key: "totalCosts", width: 20 },
      { header: "Op. Gewinn", key: "profit", width: 20 },
      { header: "Marge", key: "margin", width: 15 },
      { header: "Auslastung", key: "occupancy", width: 15 },
      { header: "RevPAR", key: "revpar", width: 15 }
    ]

    propSheet.getRow(1).font = { bold: true }
    propSheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE0E0E0" } }

    reportData.propertiesPerformance.forEach(prop => {
      propSheet.addRow({
        name: prop.propertyName,
        revenue: prop.stats.netRevenueCent / 100,
        totalCosts: prop.stats.netTotalCostsCent / 100,
        profit: prop.stats.profitCent / 100,
        margin: prop.stats.margin,
        occupancy: prop.stats.occupancy,
        revpar: prop.stats.revParCent / 100
      })
    })

    moneyCols.filter(c => ['revenue', 'totalCosts', 'profit'].includes(c)).forEach(col => propSheet.getColumn(col).numFmt = '#,##0.00 €')
    propSheet.getColumn('revpar').numFmt = '#,##0.00 €'
    propSheet.getColumn('margin').numFmt = '0.0 %'
    propSheet.getColumn('occupancy').numFmt = '0.0 %'

    // --- Sheet 4: Detaillierte Kostendaten ---
    // Flatten raw stats to show property, month, and all costs
    const costSheet = workbook.addWorksheet("Detaillierte Rohdaten")
    costSheet.columns = [
      { header: "Monat", key: "month", width: 15 },
      { header: "Objekt", key: "name", width: 30 },
      { header: "Einnahmen (Netto)", key: "revenue", width: 15 },
      { header: "Fixkosten (Netto)", key: "fixed", width: 15 },
      { header: "Var. Kosten (Netto)", key: "variable", width: 15 },
      { header: "Gewinn", key: "profit", width: 15 }
    ]
    costSheet.getRow(1).font = { bold: true }

    reportData.rawFlatStats.forEach(stat => {
      costSheet.addRow({
        month: stat.month,
        name: stat.propertyName,
        revenue: stat.netRevenueCent / 100,
        fixed: stat.netFixedCostsCent / 100,
        variable: stat.netVariableCostsCent / 100,
        profit: (stat.netRevenueCent - stat.netFixedCostsCent - stat.netVariableCostsCent) / 100
      })
    });
    
    ['revenue', 'fixed', 'variable', 'profit'].forEach(col => costSheet.getColumn(col).numFmt = '#,##0.00 €')


    const buffer = await workbook.xlsx.writeBuffer()
    
    const filename = `Finanzreport_Elbstay_${format(new Date(), 'yyyyMMdd')}.xlsx`

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })

  } catch (error) {
    console.error("Excel generation error", error)
    return new NextResponse("Error generating Excel file", { status: 500 })
  }
}

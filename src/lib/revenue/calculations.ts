import { eachDayOfInterval, format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns"

export function getMonthYear(date: Date): string {
  return format(date, "yyyy-MM")
}

export function splitReservationNightsByMonth(checkIn: Date, checkOut: Date): Record<string, number> {
  const nightsByMonth: Record<string, number> = {}
  
  // A reservation with 0 nights or invalid dates
  if (checkOut <= checkIn) {
    return nightsByMonth
  }

  // Calculate each night (excluding checkout day)
  let currentDate = new Date(checkIn)
  while (currentDate < checkOut) {
    const monthKey = getMonthYear(currentDate)
    nightsByMonth[monthKey] = (nightsByMonth[monthKey] || 0) + 1
    // Add one day
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return nightsByMonth
}

export function splitFinancialsByMonth(
  financials: {
    payoutCent: number,
    accommodationCent: number,
    cleaningFeeCent: number,
    taxCent: number
  },
  checkIn: Date,
  checkOut: Date,
  targetMonthYear: string // e.g. "2024-01"
): { 
  payoutCent: number, 
  accommodationCent: number, 
  allocatedNights: number, 
  totalNights: number,
  fraction: number,
  isCheckoutMonth: boolean
} {
  const nightsByMonth = splitReservationNightsByMonth(checkIn, checkOut)
  const totalNights = Object.values(nightsByMonth).reduce((a, b) => a + b, 0)
  
  if (totalNights === 0) {
    return { payoutCent: 0, accommodationCent: 0, allocatedNights: 0, totalNights: 0, fraction: 0, isCheckoutMonth: false }
  }

  const allocatedNights = nightsByMonth[targetMonthYear] || 0
  const fraction = allocatedNights / totalNights
  const isCheckoutMonth = getMonthYear(checkOut) === targetMonthYear || (allocatedNights > 0 && Object.keys(nightsByMonth).pop() === targetMonthYear)

  return {
    payoutCent: Math.round(financials.payoutCent * fraction),
    accommodationCent: Math.round(financials.accommodationCent * fraction),
    allocatedNights,
    totalNights,
    fraction,
    isCheckoutMonth // Used to allocate one-time fees like cleaning to checkout month
  }
}

import { describe, it, expect } from "vitest"
import { splitReservationNightsByMonth, splitFinancialsByMonth, getMonthYear } from "./calculations"

describe("Revenue Calculations", () => {
  it("should split reservation nights correctly across months", () => {
    // 10 nights crossing Jan and Feb: Jan 28 to Feb 7
    const checkIn = new Date("2024-01-28T15:00:00Z")
    const checkOut = new Date("2024-02-07T10:00:00Z")
    
    const nights = splitReservationNightsByMonth(checkIn, checkOut)
    
    // Jan 28, 29, 30, 31 = 4 nights in Jan
    expect(nights["2024-01"]).toBe(4)
    // Feb 1, 2, 3, 4, 5, 6 = 6 nights in Feb
    expect(nights["2024-02"]).toBe(6)
    
    const totalNights = Object.values(nights).reduce((a, b) => a + b, 0)
    expect(totalNights).toBe(10)
  })

  it("should calculate financial fraction correctly for crossing month", () => {
    const checkIn = new Date("2024-01-28T15:00:00Z")
    const checkOut = new Date("2024-02-07T10:00:00Z")
    
    const financials = {
      payoutCent: 100000, // 1000.00
      accommodationCent: 80000,
      cleaningFeeCent: 10000,
      taxCent: 10000
    }
    
    // Jan
    const janCalc = splitFinancialsByMonth(financials, checkIn, checkOut, "2024-01")
    expect(janCalc.fraction).toBe(0.4) // 4 out of 10 nights
    expect(janCalc.payoutCent).toBe(40000)
    expect(janCalc.isCheckoutMonth).toBe(false)
    
    // Feb
    const febCalc = splitFinancialsByMonth(financials, checkIn, checkOut, "2024-02")
    expect(febCalc.fraction).toBe(0.6) // 6 out of 10 nights
    expect(febCalc.payoutCent).toBe(60000)
    expect(febCalc.isCheckoutMonth).toBe(true)
  })
})

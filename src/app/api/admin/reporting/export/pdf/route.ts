import { NextResponse } from "next/server"
import { generateFinancialReportData } from "@/lib/revenue/reporting"
import { generateBankReportPdf } from "@/lib/revenue/pdf-report-generator"
import { endOfMonth, format } from "date-fns"

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

    const pdfBuffer = await generateBankReportPdf(reportData)
    
    const filename = `Bankenreport_Elbstay_${format(new Date(), 'yyyyMMdd')}.pdf`

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`
      }
    })

  } catch (error) {
    console.error("PDF generation error", error)
    return new NextResponse("Error generating PDF file", { status: 500 })
  }
}

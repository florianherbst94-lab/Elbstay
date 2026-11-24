import { Metadata } from "next"
import { generateFinancialReportData } from "@/lib/revenue/reporting"
import { FilterBar } from "@/components/admin/reporting/FilterBar"
import { ManagementSummary } from "@/components/admin/reporting/ManagementSummary"
import { PortfolioTable } from "@/components/admin/reporting/PortfolioTable"
import { PropertyAnalysis } from "@/components/admin/reporting/PropertyAnalysis"
import { ReportingCharts } from "@/components/admin/reporting/ReportingCharts"
import { FinancingSimulation } from "@/components/admin/reporting/FinancingSimulation"
import prisma from "@/lib/prisma"
import { endOfMonth, subMonths, format } from "date-fns"
import { FileDown, FileText, Table } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Finanzreporting | Elbstay Admin",
}

export default async function FinancialReportingPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  
  // Default: last 12 months including current month
  const defaultEnd = endOfMonth(new Date())
  const defaultStart = subMonths(new Date(), 11)
  defaultStart.setDate(1)

  const startDateStr = typeof searchParams.start === 'string' ? searchParams.start : format(defaultStart, "yyyy-MM-dd")
  const endDateStr = typeof searchParams.end === 'string' ? searchParams.end : format(defaultEnd, "yyyy-MM-dd")
  const propsStr = typeof searchParams.props === 'string' ? searchParams.props : ""
  
  const propertyIds = propsStr ? propsStr.split(",") : []

  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  // Validate dates
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return <div>Ungültiges Datum gewählt.</div>
  }

  const reportData = await generateFinancialReportData({
    startDate,
    endDate,
    propertyIds
  })

  const allProperties = await prisma.property.findMany({
    where: { status: 'active' },
    select: { id: true, name: true }
  })

  // URL query for exports
  const exportQuery = new URLSearchParams()
  exportQuery.set("start", startDateStr)
  exportQuery.set("end", endDateStr)
  if (propsStr) exportQuery.set("props", propsStr)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif">Finanzreporting</h1>
          <p className="text-muted-foreground mt-1">
            Wirtschaftlichkeitsanalyse für Banken, Investoren & Controlling.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
           <Link 
            href={`/api/admin/reporting/export/excel?${exportQuery.toString()}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            <Table className="w-4 h-4" /> Excel Export
          </Link>
          <Link 
            href={`/api/admin/reporting/export/pdf?${exportQuery.toString()}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors"
          >
            <FileText className="w-4 h-4" /> Bankenreport (PDF)
          </Link>
        </div>
      </div>

      <FilterBar properties={allProperties} />

      <ManagementSummary stats={reportData.overall} monthsCount={reportData.period.months.length} />

      <ReportingCharts data={reportData.monthlyPortfolio} />

      <PortfolioTable data={reportData.monthlyPortfolio} overall={reportData.overall} />

      <PropertyAnalysis data={reportData.propertiesPerformance} overall={reportData.overall} />

      <FinancingSimulation />
      
    </div>
  )
}

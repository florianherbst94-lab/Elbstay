import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function RechnungenPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const resolvedSearchParams = await searchParams;
  const statusFilter = resolvedSearchParams.status;
  
  const whereClause: any = {};
  if (statusFilter) {
    whereClause.status = statusFilter;
  }

  const invoices = await prisma.invoice.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  // KPIs
  const allInvoices = await prisma.invoice.findMany();
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const openCount = allInvoices.filter(i => i.status === 'OPEN').length;
  
  const thisMonthInvoices = allInvoices.filter(i => {
    if (i.status !== 'CREATED' && i.status !== 'SENT') return false;
    const d = i.invoiceDate || i.createdAt;
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  
  const thisMonthCount = thisMonthInvoices.length;
  const thisMonthVolume = thisMonthInvoices.reduce((sum, inv) => sum + inv.grossAmountCent, 0);
  
  const notSentCount = allInvoices.filter(i => i.status === 'CREATED').length;
  const cancelledCount = allInvoices.filter(i => i.status === 'CANCELLED').length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif">Rechnungen</h1>
          <p className="text-muted-foreground mt-1">Rechnungsanfragen bearbeiten und PDFs generieren</p>
        </div>
        <Link href="/admin/reinstellungen">
          <Button variant="outline">Einstellungen</Button>
        </Link>
      </div>

      {/* KPIs Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-background border border-border p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Offene Anfragen</p>
          <p className="text-2xl font-bold">{openCount}</p>
        </div>
        <div className="bg-background border border-border p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Diesen Monat</p>
          <p className="text-2xl font-bold">{thisMonthCount}</p>
        </div>
        <div className="bg-background border border-border p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Volumen Monat</p>
          <p className="text-2xl font-bold">{(thisMonthVolume / 100).toFixed(2)} €</p>
        </div>
        <div className="bg-background border border-border p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Noch nicht versendet</p>
          <p className="text-2xl font-bold text-amber-600">{notSentCount}</p>
        </div>
        <div className="bg-background border border-border p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Storniert</p>
          <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
        </div>
      </div>

      {/* Tabs / Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Link href="/admin/rechnungen" className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${!statusFilter ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
          Alle
        </Link>
        <Link href="/admin/rechnungen?status=OPEN" className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${statusFilter === 'OPEN' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
          Offene Anfragen
        </Link>
        <Link href="/admin/rechnungen?status=CREATED" className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${statusFilter === 'CREATED' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
          Erstellt
        </Link>
        <Link href="/admin/rechnungen?status=SENT" className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${statusFilter === 'SENT' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
          Versendet
        </Link>
      </div>

      {/* Table */}
      <div className="bg-background border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="p-4 font-medium text-sm text-muted-foreground">Datum</th>
                <th className="p-4 font-medium text-sm text-muted-foreground">Nr.</th>
                <th className="p-4 font-medium text-sm text-muted-foreground">Gast/Firma</th>
                <th className="p-4 font-medium text-sm text-muted-foreground">Betrag</th>
                <th className="p-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="p-4 font-medium text-sm text-muted-foreground">Aktion</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">Keine Einträge gefunden.</td>
                </tr>
              ) : (
                invoices.map(invoice => (
                  <tr key={invoice.id} className="border-b border-border hover:bg-muted/30">
                    <td className="p-4 text-sm">{format(invoice.invoiceDate || invoice.createdAt, 'dd.MM.yyyy')}</td>
                    <td className="p-4 font-mono text-sm">{invoice.invoiceNumber || '-'}</td>
                    <td className="p-4 text-sm">
                      <div className="font-medium">{invoice.companyName || `${invoice.firstName} ${invoice.lastName}`}</div>
                      <div className="text-xs text-muted-foreground">{invoice.bookingPlatform}</div>
                    </td>
                    <td className="p-4 text-sm font-medium">
                      {(invoice.grossAmountCent / 100).toFixed(2)} €
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-md ${
                        invoice.status === 'OPEN' ? 'bg-blue-100 text-blue-800' :
                        invoice.status === 'CREATED' ? 'bg-amber-100 text-amber-800' :
                        invoice.status === 'SENT' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link href={`/admin/rechnungen/${invoice.id}`}>
                        <Button size="sm" variant="secondary">Ansehen / Bearbeiten</Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

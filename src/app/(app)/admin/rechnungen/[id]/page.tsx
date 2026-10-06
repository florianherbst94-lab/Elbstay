import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import InvoiceEditor from "./InvoiceEditor";
import { auth } from "@/auth";


export default async function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: {
      items: true,
      auditLogs: {
        orderBy: { timestamp: 'desc' }
      }
    }
  });

  if (!invoice) {
    notFound();
  }

  // Ensure there's at least one setting row
  let settings = await prisma.invoiceSetting.findFirst();
  if (!settings) {
    settings = await prisma.invoiceSetting.create({
      data: {} // Use defaults
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 min-h-screen">
      <InvoiceEditor invoice={invoice} />
    </div>
  );
}

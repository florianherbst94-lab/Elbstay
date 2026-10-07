import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await props.params;

    const invoice = await prisma.invoice.findUnique({
      where: { id }
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Delete associated audit logs and items first due to foreign key constraints
    await prisma.invoiceAuditLog.deleteMany({
      where: { invoiceId: id }
    });

    await prisma.invoiceItem.deleteMany({
      where: { invoiceId: id }
    });

    // Finally delete the invoice
    await prisma.invoice.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete invoice error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete invoice" }, { status: 500 });
  }
}

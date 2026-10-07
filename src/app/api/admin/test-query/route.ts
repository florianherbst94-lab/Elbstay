import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { items: true }
  });
  const reservations = await prisma.reservation.findMany({
    where: { code: { in: invoices.map(i => i.reservationCode).filter(Boolean) as string[] } },
    include: { financials: true }
  });
  return NextResponse.json({ invoices, reservations });
}

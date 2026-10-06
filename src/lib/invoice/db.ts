import prisma from "@/lib/prisma";

export async function processInvoiceSubmission(data: any) {
  return await prisma.invoice.create({
    data: {
      status: "OPEN",
      reservationCode: data.reservation_code,
      bookingPlatform: data.booking_platform,
      bookingGuestName: data.booking_guest_name,
      invoiceEmail: data.invoice_email,
      invoiceType: data.invoice_type,
      companyName: data.company_name,
      firstName: data.first_name,
      lastName: data.last_name,
      contactPerson: data.contact_person,
      street: data.street,
      postalCode: data.postal_code,
      city: data.city,
      country: data.country,
      vatId: data.vat_id,
      invoiceReference: data.invoice_reference,
      invoiceNote: data.invoice_note,
      // Try to map default values for dates if possible, but keep null if not
    }
  });
}

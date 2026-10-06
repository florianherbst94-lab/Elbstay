"use server";

import { headers } from "next/headers";

const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000 * 5; // 5 minutes
const MAX_REQUESTS = 3;

export async function submitInvoiceRequest(formData: FormData) {
  // Rate Limiting (Basic in-memory)
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "unknown-ip";
  const now = Date.now();
  
  const rateLimitInfo = rateLimitMap.get(ip) || { count: 0, lastReset: now };
  if (now - rateLimitInfo.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitInfo.count = 0;
    rateLimitInfo.lastReset = now;
  }
  
  if (rateLimitInfo.count >= MAX_REQUESTS) {
    return { success: false, error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." };
  }
  
  rateLimitInfo.count += 1;
  rateLimitMap.set(ip, rateLimitInfo);

  // Honeypot check
  const honeypot = formData.get("website_url"); // hidden field
  if (honeypot) {
    // silently reject bots
    return { success: true };
  }

  // Extract form data
  const payload = {
    reservation_code: formData.get("reservation_code")?.toString() || "",
    booking_platform: formData.get("booking_platform")?.toString() || "",
    booking_guest_name: formData.get("booking_guest_name")?.toString() || "",
    invoice_email: formData.get("invoice_email")?.toString() || "",
    invoice_type: formData.get("invoice_type")?.toString() || "",
    company_name: formData.get("company_name")?.toString() || "",
    first_name: formData.get("first_name")?.toString() || "",
    last_name: formData.get("last_name")?.toString() || "",
    contact_person: formData.get("contact_person")?.toString() || "",
    street: formData.get("street")?.toString() || "",
    postal_code: formData.get("postal_code")?.toString() || "",
    city: formData.get("city")?.toString() || "",
    country: formData.get("country")?.toString() || "",
    vat_id: formData.get("vat_id")?.toString() || "",
    invoice_reference: formData.get("invoice_reference")?.toString() || "",
    invoice_note: formData.get("invoice_note")?.toString() || "",
    privacy_confirmation: formData.get("privacy_confirmation") === "on" || formData.get("privacy_confirmation") === "true",
    submitted_at: new Date().toISOString()
  };

  // Basic Server-Side Validation
  if (!payload.reservation_code || !payload.booking_platform || !payload.booking_guest_name || !payload.invoice_email || !payload.privacy_confirmation) {
    return { success: false, error: "Bitte füllen Sie alle Pflichtfelder aus und akzeptieren Sie die Datenschutzbestimmungen." };
  }

  if (payload.invoice_type === "Privatperson") {
    if (!payload.first_name || !payload.last_name || !payload.street || !payload.postal_code || !payload.city || !payload.country) {
      return { success: false, error: "Bitte füllen Sie alle Pflichtfelder für Privatpersonen aus." };
    }
  } else if (payload.invoice_type === "Unternehmen") {
    if (!payload.company_name || !payload.street || !payload.postal_code || !payload.city || !payload.country) {
      return { success: false, error: "Bitte füllen Sie alle Pflichtfelder für Unternehmen aus." };
    }
  } else {
    return { success: false, error: "Ungültiger Rechnungstyp." };
  }

  const webhookUrl = process.env.MAKE_INVOICE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("MAKE_INVOICE_WEBHOOK_URL is not set");
    return { success: false, error: "Server-Konfigurationsfehler: Webhook URL fehlt." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with status ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting invoice to webhook:", error);
    return { success: false, error: "Ihre Rechnungsdaten konnten leider nicht übertragen werden. Bitte versuchen Sie es erneut." };
  }
}

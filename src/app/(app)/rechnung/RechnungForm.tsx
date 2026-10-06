"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { submitInvoiceRequest } from "./actions";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function RechnungForm() {
  const searchParams = useSearchParams();
  
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [invoiceType, setInvoiceType] = useState<"Privatperson" | "Unternehmen">("Privatperson");
  
  const [formData, setFormData] = useState({
    reservation_code: searchParams.get("reservation_code") || "",
    booking_guest_name: searchParams.get("name") || "",
    invoice_email: searchParams.get("email") || "",
    booking_platform: searchParams.get("platform") || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const data = new FormData(e.currentTarget);
    const result = await submitInvoiceRequest(data);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || "Ihre Rechnungsdaten konnten leider nicht übertragen werden. Bitte versuchen Sie es erneut.");
    }
    
    setIsPending(false);
  };

  if (success) {
    return (
      <div className="bg-muted border border-border/50 rounded-2xl p-8 lg:p-12 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-16 w-16 text-primary" />
        </div>
        <h2 className="text-2xl font-bold font-serif mb-4">Rechnungsdaten erfolgreich übermittelt</h2>
        <p className="text-muted-foreground text-lg mb-6 leading-relaxed max-w-lg mx-auto">
          Vielen Dank. Ihre Rechnungsdaten wurden erfolgreich gespeichert.<br/><br/>
          Nach Abschluss Ihres Aufenthalts wird Ihre Rechnung erstellt und an die angegebene E-Mail-Adresse gesendet.
        </p>
        <p className="text-foreground font-medium mb-8">
          Buchungsnummer: {formData.reservation_code}
        </p>
        <Link href="/">
          <Button size="lg" className="w-full sm:w-auto">Zurück zu Elbstay</Button>
        </Link>
      </div>
    );
  }

  const inputClass = "w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow";
  const labelClass = "block text-sm font-medium text-foreground mb-2";

  return (
    <div className="bg-muted border border-border/50 rounded-2xl p-8 lg:p-12">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg p-4 mb-8 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Honeypot */}
        <input type="text" name="website_url" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        {/* Abschnitt 1: Buchungsdaten */}
        <section>
          <h3 className="text-xl font-bold font-serif mb-6 text-foreground border-b border-border/50 pb-2">1. Buchungsdaten</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="reservation_code" className={labelClass}>Buchungsnummer *</label>
              <input 
                type="text" 
                id="reservation_code"
                name="reservation_code" 
                required 
                value={formData.reservation_code}
                onChange={handleInputChange}
                className={inputClass} 
                placeholder="z.B. HMQ..." 
              />
              <p className="text-xs text-muted-foreground mt-2">
                Die Buchungsnummer finden Sie in Ihrer Buchungsbestätigung von Airbnb, Booking.com oder Elbstay.
              </p>
            </div>
            
            <div>
              <label htmlFor="booking_platform" className={labelClass}>Buchungsplattform *</label>
              <select 
                id="booking_platform"
                name="booking_platform" 
                required 
                value={formData.booking_platform}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="" disabled>Bitte wählen</option>
                <option value="Airbnb">Airbnb</option>
                <option value="Booking.com">Booking.com</option>
                <option value="Elbstay Direktbuchung">Elbstay Direktbuchung</option>
                <option value="Sonstige">Sonstige</option>
              </select>
            </div>

            <div>
              <label htmlFor="booking_guest_name" className={labelClass}>Name des Buchenden *</label>
              <input 
                type="text" 
                id="booking_guest_name"
                name="booking_guest_name" 
                required 
                value={formData.booking_guest_name}
                onChange={handleInputChange}
                className={inputClass} 
              />
            </div>

            <div>
              <label htmlFor="invoice_email" className={labelClass}>E-Mail-Adresse *</label>
              <input 
                type="email" 
                id="invoice_email"
                name="invoice_email" 
                required 
                value={formData.invoice_email}
                onChange={handleInputChange}
                className={inputClass} 
              />
            </div>
          </div>
        </section>

        {/* Abschnitt 2: Rechnungsempfänger */}
        <section>
          <h3 className="text-xl font-bold font-serif mb-6 text-foreground border-b border-border/50 pb-2">2. Rechnungsempfänger</h3>
          
          <div className="mb-6">
            <label htmlFor="invoice_type" className={labelClass}>Rechnung ausstellen auf *</label>
            <select 
              id="invoice_type"
              name="invoice_type" 
              required 
              value={invoiceType}
              onChange={(e) => setInvoiceType(e.target.value as "Privatperson" | "Unternehmen")}
              className={inputClass}
            >
              <option value="Privatperson">Privatperson</option>
              <option value="Unternehmen">Unternehmen</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {invoiceType === "Privatperson" ? (
              <>
                <div>
                  <label htmlFor="first_name" className={labelClass}>Vorname *</label>
                  <input type="text" id="first_name" name="first_name" required className={inputClass} autoComplete="given-name" />
                </div>
                <div>
                  <label htmlFor="last_name" className={labelClass}>Nachname *</label>
                  <input type="text" id="last_name" name="last_name" required className={inputClass} autoComplete="family-name" />
                </div>
              </>
            ) : (
              <>
                <div className="sm:col-span-2">
                  <label htmlFor="company_name" className={labelClass}>Firmenname *</label>
                  <input type="text" id="company_name" name="company_name" required className={inputClass} autoComplete="organization" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact_person" className={labelClass}>Ansprechpartner</label>
                  <input type="text" id="contact_person" name="contact_person" className={inputClass} />
                </div>
              </>
            )}

            <div className="sm:col-span-2">
              <label htmlFor="street" className={labelClass}>Straße und Hausnummer *</label>
              <input type="text" id="street" name="street" required className={inputClass} autoComplete="street-address" />
            </div>

            <div>
              <label htmlFor="postal_code" className={labelClass}>PLZ *</label>
              <input type="text" id="postal_code" name="postal_code" required className={inputClass} autoComplete="postal-code" />
            </div>

            <div>
              <label htmlFor="city" className={labelClass}>Ort *</label>
              <input type="text" id="city" name="city" required className={inputClass} autoComplete="address-level2" />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="country" className={labelClass}>Land *</label>
              <input type="text" id="country" name="country" required className={inputClass} autoComplete="country-name" defaultValue="Deutschland" />
            </div>

            {invoiceType === "Unternehmen" && (
              <div className="sm:col-span-2">
                <label htmlFor="vat_id" className={labelClass}>USt-IdNr.</label>
                <input type="text" id="vat_id" name="vat_id" className={inputClass} />
              </div>
            )}
          </div>
        </section>

        {/* Abschnitt 3: Zusätzliche Rechnungsangaben */}
        <section>
          <h3 className="text-xl font-bold font-serif mb-6 text-foreground border-b border-border/50 pb-2">3. Zusätzliche Angaben</h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="invoice_reference" className={labelClass}>Bestellnummer / Kostenstelle / Referenz</label>
              <input type="text" id="invoice_reference" name="invoice_reference" className={inputClass} />
            </div>
            
            <div>
              <label htmlFor="invoice_note" className={labelClass}>Anmerkungen zur Rechnung</label>
              <textarea id="invoice_note" name="invoice_note" rows={3} className={`${inputClass} resize-none`}></textarea>
            </div>
          </div>
        </section>

        {/* Datenschutz */}
        <div className="bg-background/50 p-4 rounded-lg border border-border">
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              name="privacy_confirmation" 
              required 
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
            />
            <span className="text-sm text-foreground leading-relaxed">
              Ich bestätige, dass die angegebenen Rechnungsdaten korrekt sind und zur Erstellung sowie Zusendung meiner Rechnung verarbeitet werden dürfen. Details finden Sie in unserer <Link href="/imprint" className="text-primary hover:underline">Datenschutzerklärung</Link>.
            </span>
          </label>
        </div>

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto h-14 text-lg">
          {isPending ? "Wird gesendet..." : "Rechnungsdaten übermitteln"}
        </Button>
      </form>
    </div>
  );
}

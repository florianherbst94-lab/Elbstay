import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { saveInvoiceSettings } from "./actions";
import { SubmitButton } from "./SubmitButton";


export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const settings = await prisma.invoiceSetting.findFirst();
  const currentYear = new Date().getFullYear();
  const sequence = await prisma.invoiceSequence.findUnique({
    where: { year: currentYear }
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-serif">Rechnungseinstellungen</h1>
        <p className="text-muted-foreground mt-1">Firmenadresse, Texte und Nummernkreise verwalten</p>
      </div>

      <form action={saveInvoiceSettings}>
        <div className="bg-background border border-border p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-bold mb-4 border-b border-border/50 pb-2">Nummernkreis {currentYear}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nächste freie Nummer</label>
              <input 
                name="currentNumber"
                type="number" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2" 
                defaultValue={sequence ? sequence.currentNumber : 1}
              />
              <p className="text-xs text-muted-foreground mt-1">Gefahr: Ein manueller Eingriff kann Lücken im Nummernkreis verursachen.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Format</label>
              <input 
                name="format"
                type="text" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2" 
                defaultValue={sequence ? sequence.format : "{YEAR}-{NUMBER:4}"}
              />
            </div>
          </div>
        </div>

        <div className="bg-background border border-border p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-bold mb-4 border-b border-border/50 pb-2">Firmendaten (Absender)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Firmenname</label>
              <input name="companyName" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.companyName || "Elbstay"} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Straße</label>
              <input name="street" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.street || ""} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">PLZ</label>
                <input name="postalCode" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.postalCode || ""} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Ort</label>
                <input name="city" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.city || ""} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">E-Mail</label>
              <input name="email" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.email || ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Telefon</label>
              <input name="phone" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.phone || ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Website</label>
              <input name="website" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.website || "www.elbstay.de"} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Inhaber</label>
              <input name="owner" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.owner || ""} />
            </div>
          </div>
        </div>

        <div className="bg-background border border-border p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-bold mb-4 border-b border-border/50 pb-2">Steuer & Bank</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Steuernummer</label>
              <input name="taxNumber" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.taxNumber || ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">USt-IdNr.</label>
              <input name="vatId" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.vatId || ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bankname</label>
              <input name="bankName" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.bankName || ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">IBAN</label>
              <input name="iban" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2" defaultValue={settings?.iban || ""} />
            </div>
          </div>
        </div>

        <div className="bg-background border border-border p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-bold mb-4 border-b border-border/50 pb-2">Texte</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Zahlungshinweis (auf Rechnung)</label>
              <textarea name="defaultPaymentNote" className="w-full bg-background border border-border rounded-lg px-4 py-2 resize-none" rows={3} defaultValue={settings?.defaultPaymentNote || "Der Rechnungsbetrag wurde bereits im Rahmen Ihrer Buchung entrichtet. Diese Rechnung stellt keine erneute Zahlungsaufforderung dar."} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>

    </div>
  );
}

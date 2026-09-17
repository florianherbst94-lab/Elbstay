import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt & Anfrage | ElbStay",
  description: "Treten Sie mit uns in Kontakt. Wir beantworten gerne Ihre Fragen zu unseren Apartments in Dresden oder nehmen Ihre Buchungsanfrage entgegen.",
};

export default function ContactPage() {
  return (
    <div className="bg-background pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          
          <div>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Service</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Wie können wir Ihnen helfen?
            </h1>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-md">
              Haben Sie Fragen zu unseren Apartments, zu einer bestehenden Buchung oder benötigen Sie Tipps für Dresden? Zögern Sie nicht, uns zu kontaktieren.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-6 shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">E-Mail</h3>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">{siteConfig.contact.email}</a>
                  <p className="text-xs text-muted-foreground mt-1">Wir antworten in der Regel schnellstmöglich.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-6 shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Telefon</h3>
                  <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">{siteConfig.contact.phone}</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-6 shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Anschrift</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {siteConfig.name}<br/>
                    Inhaber: {siteConfig.owner}<br/>
                    {siteConfig.contact.address.street}<br/>
                    {siteConfig.contact.address.zip} {siteConfig.contact.address.city}<br/>
                    {siteConfig.contact.address.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted border border-border/50 rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl font-bold font-serif mb-6">Nachricht schreiben</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Vorname</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Ihr Vorname" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nachname</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Ihr Nachname" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">E-Mail Adresse</label>
                <input type="email" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="mail@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nachricht</label>
                <textarea rows={5} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none" placeholder="Ihre Anfrage..."></textarea>
              </div>
              
              <Button type="button" className="w-full h-14 text-lg">Nachricht senden</Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

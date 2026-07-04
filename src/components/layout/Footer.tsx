import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 lg:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2">
              <img 
                src="/images/elbstay-logo-official.png" 
                alt="ElbStay Logo" 
                className="h-10 w-auto invert brightness-200" 
              />
            </div>
            <p className="mt-4 text-sm text-background/70 leading-relaxed max-w-xs">
              Stilvoll wohnen in Dresden. Boutique-Apartments für anspruchsvolle Reisende, Business-Gäste und Gruppen.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Apartments</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <Link href="/apartments/urban" className="hover:text-white transition-colors">
                  ElbStay Urban
                </Link>
              </li>
              <li>
                <Link href="/apartments/premium" className="hover:text-white transition-colors">
                  ElbStay Premium
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="hover:text-white transition-colors">
                  Alle ansehen
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Informationen</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/dresden-guide" className="hover:text-white transition-colors">
                  Dresden Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Rechtliches</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <Link href="/imprint" className="hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} ElbStay Dresden. Alle Rechte vorbehalten.</p>
          <p className="mt-4 md:mt-0">Design & Development by ElbStay</p>
        </div>
      </div>
    </footer>
  );
}

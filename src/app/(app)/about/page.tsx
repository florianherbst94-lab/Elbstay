import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background pt-16 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 text-center">
          Die Philosophie <br/> hinter ElbStay
        </h1>
        
        <div className="relative h-[60vh] min-h-[400px] w-full mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <Image 
            src="https://images.unsplash.com/photo-1574643031023-e4070a2fe895?q=80&w=2600&auto=format&fit=crop" 
            alt="Dresden Architecture / ElbStay Detail" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg prose-p:leading-loose text-muted-foreground max-w-2xl mx-auto">
          <p className="text-xl text-foreground font-medium mb-8">
            ElbStay wurde mit einer klaren Vision gegründet: Das klassische Hotel-Erlebnis mit der Privatsphäre und dem Raum eines eigenen Apartments zu vereinen.
          </p>
          <p>
            Dresden ist eine Stadt der Kunst, der Geschichte und der Moderne. Genauso vielfältig und anspruchsvoll wie unsere Stadt sollten auch die Übernachtungsmöglichkeiten sein. Deshalb haben wir ElbStay in zwei Welten unterteilt: <strong>ElbStay Urban</strong> für moderne, zentrale City-Trips und <strong>ElbStay Premium</strong> für den ultimativen Luxus hoch über den Dächern von Dresden.
          </p>
          <p>
            Wir glauben, dass ein Aufenthalt mehr sein sollte als nur eine Übernachtung. Es geht um das Gefühl, an einem neuen Ort sofort zuhause zu sein. Vom handverlesenen Design der Möbel über hochwertige Matratzen bis hin zur eigens zusammengestellten Kaffee-Auswahl – wir überlassen nichts dem Zufall.
          </p>
          
          <h2 className="text-3xl font-semibold text-foreground mt-16 mb-8 font-serif text-center">Lernen Sie uns kennen</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start mt-8">
            {/* Magdalena */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 shadow-xl border-4 border-background">
                <Image 
                  src="/images/team/magdalena.jpg" 
                  alt="Magdalena - Gäste-Host & Feelgood Managerin" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-1">Magdalena</h3>
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-4">Gäste-Host & Feelgood Managerin</p>
              <p className="text-muted-foreground leading-relaxed">
                Magdalena ist die gute Seele von ElbStay. Sie sorgt dafür, dass jedes Apartment bis ins kleinste Detail perfekt vorbereitet ist und steht Ihnen bei allen Fragen rund um Ihren Aufenthalt mit einem Lächeln zur Seite.
              </p>
            </div>

            {/* Florian */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 shadow-xl border-4 border-background">
                <Image 
                  src="/images/team/florian.jpg" 
                  alt="Florian - Eigentümer" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-1">Florian</h3>
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-4">Eigentümer & Gründer</p>
              <p className="text-muted-foreground leading-relaxed">
                Als echter Dresdner Local kennt Florian die versteckten Ecken der Stadt. Er hat ElbStay mit dem Anspruch gegründet, Gästen mehr als nur ein Bett zu bieten – nämlich ein echtes, stilvolles Zuhause auf Zeit.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center bg-primary/5 p-8 rounded-2xl border border-primary/10">
            <p className="text-foreground font-medium mb-0">
              Wenn Sie direkt über unsere Website buchen, haben Sie uns immer als direkte Ansprechpartner. Keine anonyme Hotline, sondern persönliche Betreuung von echten Gastgebern.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

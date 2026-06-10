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
          
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6 font-serif">Ihr Host Team</h2>
          <p>
            Hinter ElbStay steht ein kleines, passioniertes Team aus Dresdner Locals. Wir kennen die versteckten Cafés der Neustadt genauso wie die besten Plätze an den Elbwiesen. Und wir teilen dieses Wissen gerne mit Ihnen. Wenn Sie direkt über unsere Website buchen, haben Sie uns immer als direkte Ansprechpartner. Keine Hotline, sondern persönliche Betreuung.
          </p>
        </div>
      </div>
    </div>
  );
}

interface MapWidgetProps {
  query: string;
  mapQuery?: string;
  description: string;
}

export function MapWidget({ query, mapQuery, description }: MapWidgetProps) {
  const q = mapQuery || query;
  return (
    <section className="my-12">
      <h2 className="text-3xl font-semibold text-foreground mb-4 font-serif">Der Standort</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl leading-relaxed">
        {description} Die genaue Adresse mit Hausnummer erhalten Sie aus Sicherheitsgründen mit Ihrer Buchungsbestätigung.
      </p>
      <div className="w-full h-[400px] rounded-xl overflow-hidden border border-border/80 shadow-inner bg-muted relative">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          src={`https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          title={`Karte von ${query}`}
          loading="lazy"
          className="absolute inset-0 grayscale-[20%] contrast-75 opacity-90 hover:grayscale-0 hover:contrast-100 hover:opacity-100 transition-all duration-500"
        />
      </div>
    </section>
  );
}

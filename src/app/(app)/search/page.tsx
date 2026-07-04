"use client";

export default function SearchPage() {
  return (
    <div className="bg-background pt-32 pb-24 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex-grow flex flex-col">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-8 text-center shrink-0">
          Unsere Verfügbarkeiten
        </h1>
        <div className="bg-muted/30 rounded-3xl p-4 md:p-8 shadow-sm border border-border/50 flex-grow w-full min-h-[1800px] md:min-h-[1000px] lg:min-h-[800px]">
          {/* @ts-ignore - Custom Element */}
          <hospitable-direct-mps 
            identifier="5eab93c7-948b-4261-a43a-721213c3c647" 
            type="custom" 
          >
          {/* @ts-ignore - Custom Element */}
          </hospitable-direct-mps>
        </div>
      </div>
    </div>
  );
}

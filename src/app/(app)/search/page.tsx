"use client";

export default function SearchPage() {
  return (
    <div className="bg-background pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-8 text-center">
          Unsere Verfügbarkeiten
        </h1>
        <div className="bg-muted/30 rounded-3xl p-4 md:p-8 shadow-sm border border-border/50 min-h-[600px]">
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

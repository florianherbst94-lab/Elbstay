"use client";
import { Star, X } from "lucide-react";
import { Review } from "@/lib/reviews";
import { useState, useEffect } from "react";

export function ReviewsList({ reviews, totalCount }: { reviews: Review[], totalCount: number }) {
  const [showAll, setShowAll] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (showAll) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showAll]);

  if (!reviews) return null;

  return (
    <section className="mb-4">
      <div className="flex items-center gap-2 text-2xl font-semibold mb-10">
        <Star fill="currentColor" className="w-5 h-5 text-foreground" />
        <span className="font-serif">4,95 · {totalCount} Bewertungen</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {reviews.slice(0, 4).map((r, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-muted rounded-full overflow-hidden shrink-0">
                <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-base tracking-tight">{r.name}</h4>
                <p className="text-sm text-muted-foreground">{r.date}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-[15px] leading-relaxed line-clamp-3 italic">
              &quot;{r.text}&quot;
            </p>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setShowAll(true)}
        className="mt-10 border border-foreground/30 text-foreground font-semibold px-6 py-3 rounded-lg hover:bg-muted transition font-sans"
      >
        Alle {totalCount} Bewertungen anzeigen
      </button>

      {/* Reviews Modal */}
      {showAll && (
        <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-8" onClick={() => setShowAll(false)}>
          <div className="bg-background w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
                <Star fill="currentColor" className="w-5 h-5" />
                4,95 · {totalCount} Bewertungen
              </h2>
              <button 
                onClick={() => setShowAll(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-y-auto p-8 md:p-12 space-y-12">
              {reviews.map((r, i) => (
                <div key={i} className="flex flex-col border-b border-border/50 pb-8 last:border-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-muted rounded-full overflow-hidden shrink-0">
                      <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{r.name}</h3>
                      <p className="text-sm text-muted-foreground">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} fill="currentColor" className="w-3 h-3 text-foreground" />)}
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed italic">
                    &quot;{r.text}&quot;
                  </p>
                </div>
              ))}
              
              <div className="bg-muted/30 p-8 rounded-2xl text-center">
                <p className="text-muted-foreground">Informationen zu weiteren {totalCount - reviews.length} Bewertungen erhalten Sie auf Anfrage oder direkt über unseren Channel Manager bei Hostaway.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

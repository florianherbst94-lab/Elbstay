import Image from "next/image";
import Link from "next/link";
import { Users, BedDouble, Square, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ApartmentCardProps {
  id: string;
  name: string;
  type: "Urban" | "Premium" | "Boutique";
  description: string;
  guests: number;
  beds: string;
  size: number;
  imageUrl: string;
  priceFrom: number;
}

export function ApartmentCard({
  id,
  name,
  type,
  description,
  guests,
  beds,
  size,
  imageUrl,
  priceFrom,
}: ApartmentCardProps) {
  return (
    <div className="group flex flex-col rounded-xl overflow-hidden border border-border/80 bg-background hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm">
            ElbStay {type}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-serif text-2xl font-bold text-foreground">{name}</h3>
          <div className="text-right">
            <span className="text-sm text-muted-foreground block leading-tight">ab</span>
            <span className="font-semibold text-lg">{priceFrom}€ <span className="text-sm font-normal text-muted-foreground">/ Nacht</span></span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
          {description}
        </p>
        
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-border/60 mb-6 mt-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <Users className="h-5 w-5 text-primary mb-1.5" />
            <span className="text-xs text-foreground font-medium">Bis {guests} Gäste</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-x border-border/60">
            <BedDouble className="h-5 w-5 text-primary mb-1.5" />
            <span className="text-xs text-foreground font-medium">{beds}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Square className="h-5 w-5 text-primary mb-1.5" />
            <span className="text-xs text-foreground font-medium">{size} m²</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href={`/apartments/${type.toLowerCase()}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              Details
            </Button>
          </Link>
          <Link href={`/apartments/${type.toLowerCase()}#book`} className="flex-1">
            <Button className="w-full group/btn">
              Buchen
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

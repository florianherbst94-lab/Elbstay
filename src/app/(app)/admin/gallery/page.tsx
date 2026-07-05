"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Save, Loader2, GripVertical, UploadCloud, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImageCategory {
  title: string;
  images: string[];
}

export default function GalleryEditor() {
  const [urbanGallery, setUrbanGallery] = useState<ImageCategory[]>([]);
  const [premiumGallery, setPremiumGallery] = useState<ImageCategory[]>([]);
  const [boutiqueGallery, setBoutiqueGallery] = useState<ImageCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => {
        setUrbanGallery(data.urbanGallery || []);
        setPremiumGallery(data.premiumGallery || []);
        setBoutiqueGallery(data.boutiqueGallery || []);
        setLoading(false);
      });
  }, []);

  const handleDragStart = (e: React.DragEvent, item: string, catIndex: number, type: "urban" | "premium" | "boutique") => {
    e.dataTransfer.setData("item", item);
    e.dataTransfer.setData("catIndex", String(catIndex));
    e.dataTransfer.setData("type", type);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, targetCatIndex: number, targetType: "urban" | "premium" | "boutique") => {
    e.preventDefault();
    const item = e.dataTransfer.getData("item");
    const sourceCatIndex = parseInt(e.dataTransfer.getData("catIndex"), 10);
    const sourceType = e.dataTransfer.getData("type");

    if (!item || sourceType !== targetType) return;

    let state: ImageCategory[];
    let setter: React.Dispatch<React.SetStateAction<ImageCategory[]>>;
    
    if (targetType === "urban") {
      state = [...urbanGallery];
      setter = setUrbanGallery;
    } else if (targetType === "premium") {
      state = [...premiumGallery];
      setter = setPremiumGallery;
    } else {
      state = [...boutiqueGallery];
      setter = setBoutiqueGallery;
    }

    // Remove from old category
    state[sourceCatIndex].images = state[sourceCatIndex].images.filter((img) => img !== item);
    // Add to new category (if not already there)
    if (!state[targetCatIndex].images.includes(item)) {
      state[targetCatIndex].images.push(item);
    }

    setter(state);
  };

  const handleUploadComplete = (targetType: "urban" | "premium" | "boutique", url: string) => {
    let state: ImageCategory[];
    let setter: React.Dispatch<React.SetStateAction<ImageCategory[]>>;
    
    if (targetType === "urban") {
      state = [...urbanGallery];
      setter = setUrbanGallery;
    } else if (targetType === "premium") {
      state = [...premiumGallery];
      setter = setPremiumGallery;
    } else {
      state = [...boutiqueGallery];
      setter = setBoutiqueGallery;
    }

    // Add to the first category (which should be "Highlights")
    if (state.length > 0) {
      state[0].images.unshift(url);
    }
    
    setter(state);
  };

  const handleDelete = (targetType: "urban" | "premium" | "boutique", catIndex: number, imgUrl: string) => {
    if (!confirm("Soll dieses Bild wirklich aus der Galerie entfernt werden?")) return;

    let state: ImageCategory[];
    let setter: React.Dispatch<React.SetStateAction<ImageCategory[]>>;
    
    if (targetType === "urban") {
      state = [...urbanGallery];
      setter = setUrbanGallery;
    } else if (targetType === "premium") {
      state = [...premiumGallery];
      setter = setPremiumGallery;
    } else {
      state = [...boutiqueGallery];
      setter = setBoutiqueGallery;
    }

    state[catIndex].images = state[catIndex].images.filter((img) => img !== imgUrl);
    setter(state);
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: JSON.stringify({ urbanGallery, premiumGallery, boutiqueGallery }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.warning) {
          alert(`Galerie gespeichert, aber: ${data.warning}`);
        } else {
          alert("Galerie erfolgreich gespeichert und live geschaltet!");
        }
      } else {
        alert(`Fehler beim Speichern: ${data.error || "Unbekannter Fehler"}`);
      }
    } catch (e) {
      alert("Fehler bei der Anfrage!");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-12 text-center">Lade Daten...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Galerie Drag & Drop</h1>
          <p className="text-muted-foreground">Laden Sie Bilder hoch und verschieben Sie diese, um die Galerien anzupassen.</p>
        </div>
        <Button onClick={saveChanges} disabled={saving} size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? "Speichert & Pusht..." : "Speichern & Live schalten"}
        </Button>
      </div>

      <div className="space-y-16">
        <EditorSection 
          title="ElbStay Urban" 
          categories={urbanGallery} 
          type="urban" 
          onDragStart={handleDragStart} 
          onDrop={handleDrop} 
          onUploadComplete={(url) => handleUploadComplete("urban", url)}
          onDelete={(catIndex, url) => handleDelete("urban", catIndex, url)}
        />
        <hr className="border-border" />
        <EditorSection 
          title="ElbStay Premium" 
          categories={premiumGallery} 
          type="premium" 
          onDragStart={handleDragStart} 
          onDrop={handleDrop} 
          onUploadComplete={(url) => handleUploadComplete("premium", url)}
          onDelete={(catIndex, url) => handleDelete("premium", catIndex, url)}
        />
        <hr className="border-border" />
        <EditorSection 
          title="ElbStay Boutique" 
          categories={boutiqueGallery} 
          type="boutique" 
          onDragStart={handleDragStart} 
          onDrop={handleDrop} 
          onUploadComplete={(url) => handleUploadComplete("boutique", url)}
          onDelete={(catIndex, url) => handleDelete("boutique", catIndex, url)}
        />
      </div>
    </div>
  );
}

interface EditorSectionProps {
  title: string;
  categories: ImageCategory[];
  type: "urban" | "premium" | "boutique";
  onDragStart: (e: React.DragEvent, item: string, catIndex: number, type: "urban" | "premium" | "boutique") => void;
  onDrop: (e: React.DragEvent, targetCatIndex: number, targetType: "urban" | "premium" | "boutique") => void;
  onUploadComplete: (url: string) => void;
  onDelete: (catIndex: number, url: string) => void;
}

function EditorSection({ title, categories, type, onDragStart, onDrop, onUploadComplete, onDelete }: EditorSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok && data.url) {
        onUploadComplete(data.url);
      } else {
        alert(`Fehler beim Upload: ${data.error || 'Unbekannt'}`);
      }
    } catch (err) {
      alert("Fehler beim Hochladen.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/jpeg, image/png, image/webp" 
          />
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()} 
            disabled={uploading}
            className="gap-2"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            {uploading ? "Lädt..." : "Bild hochladen"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="border-2 border-dashed border-border/60 bg-muted/20 rounded-xl p-6 min-h-[200px]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, i, type)}
          >
            <h3 className="text-lg font-bold mb-4">{cat.title} <span className="text-sm font-normal text-muted-foreground ml-2">({cat.images.length} Bilder)</span></h3>
            <div className="flex gap-4 flex-wrap">
              {cat.images.map((src, imgIdx) => (
                <div
                  key={src}
                  draggable
                  onDragStart={(e) => onDragStart(e, src, i, type)}
                  className="relative group w-32 h-24 rounded-lg overflow-hidden border border-border cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-primary shadow-sm"
                >
                  <Image src={src} alt="" fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/50 p-1 hidden group-hover:flex justify-center">
                    <GripVertical className="w-4 h-4 text-white" />
                  </div>
                  <button 
                    onClick={() => onDelete(i, src)}
                    className="absolute top-1 right-1 bg-destructive/90 text-destructive-foreground p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                    title="Bild entfernen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {cat.images.length === 0 && (
                <div className="w-full text-center py-6 text-muted-foreground text-sm">
                  Ziehe Bilder hierher
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

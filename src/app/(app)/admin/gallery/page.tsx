"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Save, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImageCategory {
  title: string;
  images: string[];
}

export default function GalleryEditor() {
  const [urbanGallery, setUrbanGallery] = useState<ImageCategory[]>([]);
  const [premiumGallery, setPremiumGallery] = useState<ImageCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => {
        setUrbanGallery(data.urbanGallery || []);
        setPremiumGallery(data.premiumGallery || []);
        setLoading(false);
      });
  }, []);

  const handleDragStart = (e: React.DragEvent, item: string, catIndex: number, type: "urban" | "premium") => {
    e.dataTransfer.setData("item", item);
    e.dataTransfer.setData("catIndex", String(catIndex));
    e.dataTransfer.setData("type", type);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, targetCatIndex: number, targetType: "urban" | "premium") => {
    e.preventDefault();
    const item = e.dataTransfer.getData("item");
    const sourceCatIndex = parseInt(e.dataTransfer.getData("catIndex"), 10);
    const sourceType = e.dataTransfer.getData("type");

    if (!item || sourceType !== targetType) return;

    const state = targetType === "urban" ? [...urbanGallery] : [...premiumGallery];
    const setter = targetType === "urban" ? setUrbanGallery : setPremiumGallery;

    // Remove from old category
    state[sourceCatIndex].images = state[sourceCatIndex].images.filter((img) => img !== item);
    // Add to new category (if not already there)
    if (!state[targetCatIndex].images.includes(item)) {
      state[targetCatIndex].images.push(item);
    }

    setter(state);
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: JSON.stringify({ urbanGallery, premiumGallery }),
      });
      if (res.ok) alert("Galerie erfolgreich direkt in die Code-Datei gespeichert!");
      else alert("Fehler beim Speichern!");
    } catch (e) {
      alert("Fehler!");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-12 text-center">Lade Daten...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Galerie Drag & Drop</h1>
          <p className="text-muted-foreground">Verschieben Sie Bilder, um die Galerien auf der Website anzupassen.</p>
        </div>
        <Button onClick={saveChanges} disabled={saving} size="lg" className="gap-2">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? "Speichert..." : "Änderungen speichern"}
        </Button>
      </div>

      <div className="space-y-16">
        <EditorSection 
          title="ElbStay Urban" 
          categories={urbanGallery} 
          type="urban" 
          onDragStart={handleDragStart} 
          onDrop={handleDrop} 
        />
        <hr className="border-border" />
        <EditorSection 
          title="ElbStay Premium" 
          categories={premiumGallery} 
          type="premium" 
          onDragStart={handleDragStart} 
          onDrop={handleDrop} 
        />
      </div>
    </div>
  );
}

interface EditorSectionProps {
  title: string;
  categories: ImageCategory[];
  type: "urban" | "premium";
  onDragStart: (e: React.DragEvent, item: string, catIndex: number, type: "urban" | "premium") => void;
  onDrop: (e: React.DragEvent, targetCatIndex: number, targetType: "urban" | "premium") => void;
}

function EditorSection({ title, categories, type, onDragStart, onDrop }: EditorSectionProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
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

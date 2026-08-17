"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Save, Loader2, GripVertical, UploadCloud, Trash2, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LogoutButton } from "@/components/admin/LogoutButton";

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

  const handleDrop = (e: React.DragEvent, targetCatIndex: number, targetType: "urban" | "premium" | "boutique", targetImgIdx?: number) => {
    e.preventDefault();
    e.stopPropagation();
    
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

    // If moving within the same category
    if (sourceCatIndex === targetCatIndex) {
      const images = [...state[sourceCatIndex].images];
      const sourceImgIdx = images.indexOf(item);
      
      // Remove from old position
      images.splice(sourceImgIdx, 1);
      
      // Insert at new position
      if (targetImgIdx !== undefined) {
        const insertIdx = targetImgIdx;
        images.splice(insertIdx, 0, item);
      } else {
        images.push(item);
      }
      
      state[sourceCatIndex].images = images;
    } else {
      // Moving between different categories
      state[sourceCatIndex].images = state[sourceCatIndex].images.filter((img) => img !== item);
      
      const targetImages = [...state[targetCatIndex].images];
      if (!targetImages.includes(item)) {
        if (targetImgIdx !== undefined) {
          targetImages.splice(targetImgIdx, 0, item);
        } else {
          targetImages.push(item);
        }
        state[targetCatIndex].images = targetImages;
      }
    }

    setter(state);
  };

  const handleSetCover = (targetType: "urban" | "premium" | "boutique", sourceCatIndex: number, imgUrl: string) => {
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

    if (state.length === 0) return;

    if (sourceCatIndex === 0) {
      // Move this image to index 0 of Highlights
      const highlightImages = state[0].images.filter((img) => img !== imgUrl);
      state[0].images = [imgUrl, ...highlightImages];
    } else {
      // Move from another category to index 0 of Highlights
      state[sourceCatIndex].images = state[sourceCatIndex].images.filter((img) => img !== imgUrl);
      const highlightImages = state[0].images.filter((img) => img !== imgUrl);
      state[0].images = [imgUrl, ...highlightImages];
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

  if (loading) return <div className="p-12 text-center text-muted-foreground">Lade Daten...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 pb-32">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück zur Admin-Übersicht
        </Link>
        <LogoutButton variant="minimal" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Galerie & Titelbild Editor</h1>
          <p className="text-muted-foreground max-w-2xl">
            Laden Sie Bilder hoch, sortieren Sie Kategorien per Drag & Drop und wählen Sie das offizielle <strong>Titelbild</strong> für die Vorschau auf der Website & bei Buchungen aus.
          </p>
        </div>
        <Button onClick={saveChanges} disabled={saving} size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white shrink-0 shadow-md">
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
          onSetCover={(catIndex, url) => handleSetCover("urban", catIndex, url)}
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
          onSetCover={(catIndex, url) => handleSetCover("premium", catIndex, url)}
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
          onSetCover={(catIndex, url) => handleSetCover("boutique", catIndex, url)}
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
  onDrop: (e: React.DragEvent, targetCatIndex: number, targetType: "urban" | "premium" | "boutique", targetImgIdx?: number) => void;
  onSetCover: (catIndex: number, url: string) => void;
  onUploadComplete: (url: string) => void;
  onDelete: (catIndex: number, url: string) => void;
}

function EditorSection({ title, categories, type, onDragStart, onDrop, onSetCover, onUploadComplete, onDelete }: EditorSectionProps) {
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
        <div>
          <h2 className="text-3xl font-bold font-serif text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Das erste Bild unter &quot;Highlights&quot; wird automatisch als Haupt-/Titelbild für alle Vorschauen verwendet.
          </p>
        </div>
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
            className="gap-2 shadow-xs"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            {uploading ? "Lädt..." : "Neues Bild hochladen"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {categories.map((cat, i) => {
          const isHighlightCategory = i === 0 || cat.title.toLowerCase().includes("highlight");

          return (
            <div
              key={i}
              className={`border-2 border-dashed rounded-2xl p-6 min-h-[220px] transition-colors ${
                isHighlightCategory
                  ? "border-amber-400/50 bg-amber-50/20 dark:bg-amber-950/10"
                  : "border-border/60 bg-muted/20"
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, i, type)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                    {isHighlightCategory && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                    {cat.title}
                  </h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {cat.images.length} {cat.images.length === 1 ? "Bild" : "Bilder"}
                  </span>
                </div>
                {isHighlightCategory && (
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    Bild #1 = Titelbild
                  </span>
                )}
              </div>

              <div className="flex gap-4 flex-wrap">
                {cat.images.map((src, imgIdx) => {
                  const isCover = isHighlightCategory && imgIdx === 0;

                  return (
                    <div
                      key={src}
                      draggable
                      onDragStart={(e) => onDragStart(e, src, i, type)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={(e) => onDrop(e, i, type, imgIdx)}
                      className={`relative group w-36 h-28 rounded-xl overflow-hidden border cursor-grab active:cursor-grabbing shadow-xs transition-all ${
                        isCover
                          ? "ring-2 ring-amber-500 border-amber-400 shadow-md"
                          : "border-border hover:ring-2 hover:ring-primary"
                      }`}
                    >
                      <Image src={src} alt="" fill className="object-cover" />

                      {/* Cover Badge on Highlights #1 */}
                      {isCover ? (
                        <div className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md z-10 ring-1 ring-amber-300/40 pointer-events-none">
                          <Star className="w-3 h-3 fill-white text-white" />
                          <span>Titelbild</span>
                        </div>
                      ) : (
                        /* Set as Cover button on other images */
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSetCover(i, src);
                          }}
                          className="absolute top-1.5 left-1.5 bg-black/80 hover:bg-amber-600 text-white text-[10px] font-medium px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-sm z-10"
                          title={isHighlightCategory ? "Als Titelbild festlegen" : "In Highlights verschieben und als Titelbild festlegen"}
                        >
                          <Star className="w-3 h-3 text-amber-300" />
                          <span>Als Titelbild</span>
                        </button>
                      )}

                      {/* Drag handle overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 hidden group-hover:flex justify-center items-center">
                        <GripVertical className="w-4 h-4 text-white/90" />
                      </div>

                      {/* Delete button */}
                      <button 
                        onClick={() => onDelete(i, src)}
                        className="absolute top-1.5 right-1.5 bg-destructive/90 text-destructive-foreground p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive shadow-sm z-10"
                        title="Bild entfernen"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}

                {cat.images.length === 0 && (
                  <div className="w-full text-center py-8 text-muted-foreground text-sm border-2 border-dotted border-border/40 rounded-xl">
                    Ziehe Bilder hierher
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

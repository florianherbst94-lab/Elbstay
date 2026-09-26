"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Save, Loader2, GripVertical, UploadCloud, Trash2, Star, ArrowLeft, Plus, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LogoutButton } from "@/components/admin/LogoutButton";

interface ImageCategory {
  title: string;
  images: string[];
}

type ApartmentKey = "urban" | "premium" | "boutique" | "boutique-2";

export default function GalleryEditor() {
  const [urbanGallery, setUrbanGallery] = useState<ImageCategory[]>([]);
  const [premiumGallery, setPremiumGallery] = useState<ImageCategory[]>([]);
  const [boutiqueGallery, setBoutiqueGallery] = useState<ImageCategory[]>([]);
  const [boutique2Gallery, setBoutique2Gallery] = useState<ImageCategory[]>([]);
  
  const [selectedApartment, setSelectedApartment] = useState<ApartmentKey>("urban");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => {
        setUrbanGallery(data.urbanGallery || []);
        setPremiumGallery(data.premiumGallery || []);
        setBoutiqueGallery(data.boutiqueGallery || []);
        setBoutique2Gallery(data.boutique2Gallery || []);
        setLoading(false);
      });
  }, []);

  const handleDragStart = (e: React.DragEvent, item: string, catIndex: number, type: ApartmentKey) => {
    e.dataTransfer.setData("item", item);
    e.dataTransfer.setData("catIndex", String(catIndex));
    e.dataTransfer.setData("type", type);
    e.dataTransfer.effectAllowed = "move";
  };

  const getSetters = (type: ApartmentKey) => {
    if (type === "urban") return { state: [...urbanGallery], setter: setUrbanGallery };
    if (type === "premium") return { state: [...premiumGallery], setter: setPremiumGallery };
    if (type === "boutique") return { state: [...boutiqueGallery], setter: setBoutiqueGallery };
    return { state: [...boutique2Gallery], setter: setBoutique2Gallery };
  };

  const handleDrop = (e: React.DragEvent, targetCatIndex: number, targetType: ApartmentKey, targetImgIdx?: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const item = e.dataTransfer.getData("item");
    const sourceCatIndex = parseInt(e.dataTransfer.getData("catIndex"), 10);
    const sourceType = e.dataTransfer.getData("type");

    if (!item || sourceType !== targetType) return;

    const { state, setter } = getSetters(targetType);
    
    if (sourceCatIndex === targetCatIndex) {
      const images = [...state[sourceCatIndex].images];
      const sourceImgIdx = images.indexOf(item);
      
      images.splice(sourceImgIdx, 1);
      
      if (targetImgIdx !== undefined) {
        images.splice(targetImgIdx, 0, item);
      } else {
        images.push(item);
      }
      
      state[sourceCatIndex].images = images;
    } else {
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

  const handleSetCover = (targetType: ApartmentKey, sourceCatIndex: number, imgUrl: string) => {
    const { state, setter } = getSetters(targetType);
    if (state.length === 0) return;

    if (sourceCatIndex === 0) {
      const highlightImages = state[0].images.filter((img) => img !== imgUrl);
      state[0].images = [imgUrl, ...highlightImages];
    } else {
      state[sourceCatIndex].images = state[sourceCatIndex].images.filter((img) => img !== imgUrl);
      const highlightImages = state[0].images.filter((img) => img !== imgUrl);
      state[0].images = [imgUrl, ...highlightImages];
    }
    setter(state);
  };

  const handleUploadToCategory = (targetType: ApartmentKey, catIndex: number, urls: string[]) => {
    const { state, setter } = getSetters(targetType);
    if (state[catIndex]) {
      // Add new images to the beginning or end, let's append to end
      state[catIndex].images.push(...urls);
    }
    setter(state);
  };

  const handleDelete = (targetType: ApartmentKey, catIndex: number, imgUrl: string) => {
    if (!confirm("Soll dieses Bild wirklich aus der Galerie entfernt werden?")) return;
    const { state, setter } = getSetters(targetType);
    state[catIndex].images = state[catIndex].images.filter((img) => img !== imgUrl);
    setter(state);
  };

  const handleAddCategory = (targetType: ApartmentKey, title: string) => {
    const { state, setter } = getSetters(targetType);
    state.push({ title, images: [] });
    setter(state);
  };

  const handleRenameCategory = (targetType: ApartmentKey, catIndex: number, newTitle: string) => {
    const { state, setter } = getSetters(targetType);
    state[catIndex].title = newTitle;
    setter(state);
  };

  const handleDeleteCategory = (targetType: ApartmentKey, catIndex: number) => {
    if (!confirm("Soll dieser Raum mit allen Bildern wirklich gelöscht werden?")) return;
    const { state, setter } = getSetters(targetType);
    state.splice(catIndex, 1);
    setter(state);
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: JSON.stringify({ urbanGallery, premiumGallery, boutiqueGallery, boutique2Gallery }),
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
            Laden Sie Bilder in die passenden Räume hoch, benennen Sie Kategorien (z.B. &quot;Schlafzimmer 1&quot;) und wählen Sie das <strong>Titelbild</strong> in der ersten Kategorie aus.
          </p>
        </div>
        <Button onClick={saveChanges} disabled={saving} size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white shrink-0 shadow-md">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? "Speichert & Pusht..." : "Speichern & Live schalten"}
        </Button>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-foreground mb-2">Wohnung auswählen:</label>
        <select 
          value={selectedApartment} 
          onChange={(e) => setSelectedApartment(e.target.value as ApartmentKey)}
          className="w-full sm:w-80 px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        >
          <option value="urban">ElbStay Urban</option>
          <option value="premium">ElbStay Premium</option>
          <option value="boutique">ElbStay Boutique (Pieschen)</option>
          <option value="boutique-2">ElbStay Boutique-Apartment nahe der Elbe</option>
        </select>
      </div>

      <div className="space-y-16">
        {selectedApartment === "urban" && (
          <EditorSection 
            title="ElbStay Urban" 
            categories={urbanGallery} 
            type="urban" 
            onDragStart={handleDragStart} 
            onDrop={handleDrop} 
            onSetCover={(catIndex, url) => handleSetCover("urban", catIndex, url)}
            onUploadToCategory={(catIndex, urls) => handleUploadToCategory("urban", catIndex, urls)}
            onDelete={(catIndex, url) => handleDelete("urban", catIndex, url)}
            onAddCategory={(title) => handleAddCategory("urban", title)}
            onRenameCategory={(catIndex, title) => handleRenameCategory("urban", catIndex, title)}
            onDeleteCategory={(catIndex) => handleDeleteCategory("urban", catIndex)}
          />
        )}
        
        {selectedApartment === "premium" && (
          <EditorSection 
            title="ElbStay Premium" 
            categories={premiumGallery} 
            type="premium" 
            onDragStart={handleDragStart} 
            onDrop={handleDrop} 
            onSetCover={(catIndex, url) => handleSetCover("premium", catIndex, url)}
            onUploadToCategory={(catIndex, urls) => handleUploadToCategory("premium", catIndex, urls)}
            onDelete={(catIndex, url) => handleDelete("premium", catIndex, url)}
            onAddCategory={(title) => handleAddCategory("premium", title)}
            onRenameCategory={(catIndex, title) => handleRenameCategory("premium", catIndex, title)}
            onDeleteCategory={(catIndex) => handleDeleteCategory("premium", catIndex)}
          />
        )}
        
        {selectedApartment === "boutique" && (
          <EditorSection 
            title="ElbStay Boutique (Pieschen)" 
            categories={boutiqueGallery} 
            type="boutique" 
            onDragStart={handleDragStart} 
            onDrop={handleDrop} 
            onSetCover={(catIndex, url) => handleSetCover("boutique", catIndex, url)}
            onUploadToCategory={(catIndex, urls) => handleUploadToCategory("boutique", catIndex, urls)}
            onDelete={(catIndex, url) => handleDelete("boutique", catIndex, url)}
            onAddCategory={(title) => handleAddCategory("boutique", title)}
            onRenameCategory={(catIndex, title) => handleRenameCategory("boutique", catIndex, title)}
            onDeleteCategory={(catIndex) => handleDeleteCategory("boutique", catIndex)}
          />
        )}
        
        {selectedApartment === "boutique-2" && (
          <EditorSection 
            title="ElbStay Boutique-Apartment nahe der Elbe" 
            categories={boutique2Gallery} 
            type="boutique-2" 
            onDragStart={handleDragStart} 
            onDrop={handleDrop} 
            onSetCover={(catIndex, url) => handleSetCover("boutique-2", catIndex, url)}
            onUploadToCategory={(catIndex, urls) => handleUploadToCategory("boutique-2", catIndex, urls)}
            onDelete={(catIndex, url) => handleDelete("boutique-2", catIndex, url)}
            onAddCategory={(title) => handleAddCategory("boutique-2", title)}
            onRenameCategory={(catIndex, title) => handleRenameCategory("boutique-2", catIndex, title)}
            onDeleteCategory={(catIndex) => handleDeleteCategory("boutique-2", catIndex)}
          />
        )}
      </div>
    </div>
  );
}

interface EditorSectionProps {
  title: string;
  categories: ImageCategory[];
  type: ApartmentKey;
  onDragStart: (e: React.DragEvent, item: string, catIndex: number, type: ApartmentKey) => void;
  onDrop: (e: React.DragEvent, targetCatIndex: number, targetType: ApartmentKey, targetImgIdx?: number) => void;
  onSetCover: (catIndex: number, url: string) => void;
  onUploadToCategory: (catIndex: number, urls: string[]) => void;
  onDelete: (catIndex: number, url: string) => void;
  onAddCategory: (title: string) => void;
  onRenameCategory: (catIndex: number, title: string) => void;
  onDeleteCategory: (catIndex: number) => void;
}

function EditorSection({ title, categories, type, onDragStart, onDrop, onSetCover, onUploadToCategory, onDelete, onAddCategory, onRenameCategory, onDeleteCategory }: EditorSectionProps) {
  
  const handleAddCategoryClick = () => {
    const name = prompt("Name des neuen Raumes (z.B. Schlafzimmer 1):");
    if (name && name.trim()) {
      onAddCategory(name.trim());
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold font-serif text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Das erste Bild in der ersten Kategorie wird automatisch als Haupt-/Titelbild verwendet.
          </p>
        </div>
        <div>
          <Button onClick={handleAddCategoryClick} variant="outline" className="gap-2">
            <Plus className="w-4 h-4" /> Raum hinzufügen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {categories.map((cat, i) => {
          return (
            <CategoryEditor 
              key={i} 
              cat={cat} 
              catIndex={i} 
              type={type} 
              onDragStart={onDragStart} 
              onDrop={onDrop} 
              onSetCover={onSetCover} 
              onUploadToCategory={onUploadToCategory} 
              onDelete={onDelete} 
              onRenameCategory={onRenameCategory}
              onDeleteCategory={onDeleteCategory}
            />
          );
        })}
      </div>
    </div>
  );
}

function CategoryEditor({ 
  cat, 
  catIndex, 
  type, 
  onDragStart, 
  onDrop, 
  onSetCover, 
  onUploadToCategory, 
  onDelete, 
  onRenameCategory,
  onDeleteCategory
}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const isHighlightCategory = catIndex === 0;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("type", type);
        
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        
        if (res.ok && data.url) {
          urls.push(data.url);
        }
      }
      
      if (urls.length > 0) {
        onUploadToCategory(catIndex, urls);
      }
    } catch (err) {
      alert("Fehler beim Hochladen von Bildern.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRename = () => {
    const newName = prompt("Neuer Name für diesen Raum:", cat.title);
    if (newName && newName.trim() && newName !== cat.title) {
      onRenameCategory(catIndex, newName.trim());
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-6 min-h-[220px] transition-colors ${
        isHighlightCategory
          ? "border-amber-400/50 bg-amber-50/20 dark:bg-amber-950/10"
          : "border-border/60 bg-muted/20"
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, catIndex, type)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold flex items-center gap-2 text-foreground group">
            {isHighlightCategory && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
            {cat.title}
            <button onClick={handleRename} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/10 rounded">
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {cat.images.length} {cat.images.length === 1 ? "Bild" : "Bilder"}
          </span>
          {isHighlightCategory && (
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              Bild #1 = Titelbild
            </span>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/jpeg, image/png, image/webp" 
            multiple
          />
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => fileInputRef.current?.click()} 
            disabled={uploading}
            className="gap-2 shadow-xs bg-background"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            {uploading ? "Lädt hoch..." : "Bilder hochladen"}
          </Button>
          {!isHighlightCategory && (
            <Button variant="ghost" size="sm" onClick={() => onDeleteCategory(catIndex)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        {cat.images.map((src: string, imgIdx: number) => {
          const isCover = isHighlightCategory && imgIdx === 0;

          return (
            <div
              key={src}
              draggable
              onDragStart={(e) => onDragStart(e, src, catIndex, type)}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => onDrop(e, catIndex, type, imgIdx)}
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
                    onSetCover(catIndex, src);
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
                onClick={() => onDelete(catIndex, src)}
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
            Ziehe Bilder hierher oder lade neue hoch
          </div>
        )}
      </div>
    </div>
  );
}

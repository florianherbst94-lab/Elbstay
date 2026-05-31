"use client";

import { useState } from "react";
import { Copy, Check, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CopyButtonProps {
  value: string;
  label?: string;
}

export function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-semibold"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Kopiert!</span>
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{label || "Kopieren"}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

interface InfoCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  copyValue?: string;
  copyLabel?: string;
  className?: string;
}

export function InfoCard({
  title,
  icon: Icon,
  children,
  copyValue,
  copyLabel,
  className = "",
}: InfoCardProps) {
  return (
    <div className={`p-6 rounded-3xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Icon className="h-5 w-5" />
        </div>
        {copyValue && <CopyButton value={copyValue} label={copyLabel} />}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <div className="text-muted-foreground text-[15px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

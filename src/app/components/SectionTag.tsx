"use client";

import React from 'react';

interface SectionTagProps {
  text: string;
  variant?: 'light' | 'dark';
}

/**
 * Reusable tag/badge pill used at the top of each section header.
 * - `light` (default): blue pill on white background
 * - `dark`: slate pill for dark background sections
 */
export default function SectionTag({ text, variant = 'light' }: SectionTagProps) {
  const classes = variant === 'dark'
    ? 'bg-slate-800 border-slate-700 text-blue-300'
    : 'bg-blue-50 border-blue-200 text-blue-800';

  return (
    <div className={`inline-flex items-center gap-2 ${classes} border px-3 py-1 rounded-full`}>
      <span className="text-xs font-bold uppercase tracking-wider">{text}</span>
    </div>
  );
}

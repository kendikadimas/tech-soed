"use client";

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Wand2,
  Lightbulb,
  ExternalLink,
  X,
  Image as ImageIcon,
  Search,
  BookOpen,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react';

interface AiPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTitle?: (title: string, category: string) => void;
  onOpenPasteModal?: () => void;
  initialTitle?: string;
}

const PRESET_TOPICS = [
  "5 Alasan UMKM Purwokerto Wajib Memiliki Website Profesional di 2026",
  "Panduan Lengkap Memilih Jasa Pembuatan Aplikasi Mobile untuk Bisnis",
  "Perbedaan Custom Web Development vs CMS WordPress: Mana yang Cocok?",
  "Cara Mengoptimalkan UI/UX Design Aplikasi agar Angka Konversi Naik",
  "Pentingnya Sistem Informasi Manajemen bagi Efisiensi Operasional Perusahaan",
  "Strategi Digital Marketing & SEO Terbukti untuk Meningkatkan Omset UMKM",
];

const CATEGORY_IMAGE_KEYWORDS: Record<string, string> = {
  "Bisnis & Teknologi": "software development team business office technology modern laptop",
  "Tips Website": "web design developer responsive website coding workspace desk",
  "UI/UX & Mobile": "mobile app UI UX design prototype smartphone screen mockup",
  "Digital Marketing": "digital marketing SEO strategy dashboard growth analytics laptop",
  "Sistem Informasi": "enterprise software data dashboard cloud server system architecture",
};

export default function AiPromptModal({
  isOpen,
  onClose,
  onApplyTitle,
  onOpenPasteModal,
  initialTitle = '',
}: AiPromptModalProps) {
  const [topic, setTopic] = useState(initialTitle);
  const [category, setCategory] = useState('Bisnis & Teknologi');
  const [tone, setTone] = useState('Profesional & Edukatif');
  const [length, setLength] = useState('1000 - 1200 kata');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedImagePrompt, setCopiedImagePrompt] = useState(false);
  const [copiedKeywords, setCopiedKeywords] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'image'>('prompt');

  if (!isOpen) return null;

  const currentTitle = topic.trim() || 'Website & Software House Solution';

  // Article AI Prompt
  const generatedPrompt = `Bertindaklah sebagai Senior Content Strategist dan Technical SEO Content Writer profesional untuk TechSoe (Software House & Partner Digital Terpercaya di Purwokerto).

Tuliskan artikel blog berkualitas tinggi, mendalam, dan terstruktur rapi untuk dipublikasikan di website TechSoe dengan spesifikasi berikut:

JUDUL / TOPIK ARTIKEL:
"${currentTitle}"

KATEGORI: ${category}
NADA BAHASA: ${tone}
TARGET PANJANG DOKUMEN: ${length}

--------------------------------------------------
FORMAT & KETENTUAN PENULISAN:
1. JUDUL & EXCERPT:
   - Sertakan Ringkasan Singkat (Excerpt/Meta Description) 2 kalimat yang persuasif di awal sebelum isi artikel.

2. STRUKTUR NASKAH ARTIKEL (FORMAT MARKDOWN):
   - Pendahuluan yang kuat dan relevan dengan tantangan pemilik bisnis/UMKM saat ini.
   - Gunakan Sub-Heading H2 (##) dan H3 (###) yang kaya kata kunci SEO.
   - Gunakan poin-poin (bullet points/numbering) dan format cetak tebal (bold) untuk kata kunci utama agar artikel mudah dibaca (scannable).
   - Berikan tips praktis, langkah konkrit, atau contoh aplikasi di dunia nyata.

3. KESIMPULAN & CALL TO ACTION (CTA):
   - Di akhir naskah, berikan kesimpulan ringkas.
   - Tambahkan Call to Action (CTA) persuasif yang mengarahkan pembaca untuk berkonsultasi gratis atau memesan jasa pembuatan website/aplikasi dengan tim profesional TechSoe Purwokerto.

4. BAHASA:
   - Gunakan Bahasa Indonesia yang baik, modern, komunikatif, dan tidak kaku.

Mohon berikan hasil penulisan lengkap dalam format Markdown murni (tanpa pembuka basa-basi) agar bisa langsung saya salin ke editor website.`;

  // Cover Photo Image Generator Prompts & Keywords
  const imageSearchKeywords = CATEGORY_IMAGE_KEYWORDS[category] || "software engineering web development technology";
  
  const generatedAiImagePrompt = `A high-end 3D tech illustration for blog header cover representing "${currentTitle}", modern software engineering aesthetic, dark blue and vibrant gradient cyan color palette, clean isometric 3D render, sleek dashboard and digital interface elements, photorealistic lighting, 8k resolution, ultra detailed --ar 16:9`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleCopyImagePrompt = () => {
    navigator.clipboard.writeText(generatedAiImagePrompt);
    setCopiedImagePrompt(true);
    setTimeout(() => setCopiedImagePrompt(false), 2500);
  };

  const handleCopyKeywords = () => {
    navigator.clipboard.writeText(imageSearchKeywords);
    setCopiedKeywords(true);
    setTimeout(() => setCopiedKeywords(false), 2500);
  };

  const handleApplyToForm = () => {
    if (onApplyTitle && topic.trim()) {
      onApplyTitle(topic.trim(), category);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/30 border border-slate-200 dark:border-slate-800 overflow-hidden z-10 my-4 sm:my-8 flex flex-col" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#172657] via-[#1f3373] to-blue-900 px-4 sm:px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-black tracking-tight text-white">
                Generator Prompt AI
              </h3>
              <p className="text-[11px] sm:text-xs text-blue-200/80 font-medium hidden sm:block">
                Buat prompt naskah artikel SEO &amp; kata kunci gambar sampul otomatis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body — scrollable */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Input 1: Judul / Topik Artikel */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              1. Judul / Topik Artikel <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ketik judul artikel... Contoh: Cara Mengembangkan Website E-Commerce untuk UMKM"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white outline-none transition-colors"
            />
          </div>

          {/* Quick Preset Topics */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Atau Pilih Ide Topik Populer (Klik untuk Pakai):
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_TOPICS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopic(preset)}
                  className="text-left text-xs bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-700 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 dark:text-white outline-none"
              >
                <option value="Bisnis & Teknologi">Bisnis & Teknologi</option>
                <option value="Tips Website">Tips Website</option>
                <option value="UI/UX & Mobile">UI/UX & Mobile</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Gaya Penulisan
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 dark:text-white outline-none"
              >
                <option value="Profesional & Edukatif">Profesional & Edukatif</option>
                <option value="Persuasif & Soft-Selling">Persuasif & Soft-Selling</option>
                <option value="Panduan Praktis Step-by-Step">Panduan Step-by-Step</option>
                <option value="Ramah & Santai">Ramah & Santai</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Target Panjang
              </label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 dark:text-white outline-none"
              >
                <option value="800 - 1000 kata">800 - 1000 kata (Standar)</option>
                <option value="1000 - 1200 kata">1000 - 1200 kata (Ideal SEO)</option>
                <option value="1500+ kata">1500+ kata (Mendalam / Long-form)</option>
              </select>
            </div>
          </div>

          {/* TAB SELECTION: Prompt Naskah vs Prompt/Kata Kunci Gambar */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab('prompt')}
              className={`pb-2.5 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'prompt'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Prompt Naskah Artikel AI</span>
              <span className="sm:hidden">Prompt Naskah</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('image')}
              className={`pb-2.5 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'image'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Kata Kunci &amp; Prompt Foto Sampul (Cover)</span>
              <span className="sm:hidden">Prompt Foto Cover</span>
            </button>
          </div>

          {/* TAB 1: Prompt Naskah Artikel */}
          {activeTab === 'prompt' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Wand2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Prompt Naskah AI (ChatGPT / Gemini / Claude):
                </label>
                
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-bold border border-blue-200 dark:border-blue-800 transition-all cursor-pointer"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Prompt Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Prompt Naskah</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-2xl bg-slate-900 text-slate-100 p-4 border border-slate-800 font-mono text-xs leading-relaxed max-h-[200px] overflow-y-auto whitespace-pre-wrap select-all">
                {generatedPrompt}
              </div>
            </div>
          )}

          {/* TAB 2: Kata Kunci & Prompt Foto Cover */}
          {activeTab === 'image' && (
            <div className="space-y-4">
              
              {/* Option A: Modern AI Generator Prompt (DALL-E 3 / Midjourney / Bing Creator) */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Prompt Gambar AI (Midjourney / DALL-E 3 / Bing Creator):
                  </label>
                  <button
                    type="button"
                    onClick={handleCopyImagePrompt}
                    className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-bold border border-amber-200 dark:border-amber-800 transition-all cursor-pointer"
                  >
                    {copiedImagePrompt ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Prompt AI</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs leading-relaxed select-all">
                  {generatedAiImagePrompt}
                </div>
              </div>

              {/* Option B: Stock Photo Search Keywords (Unsplash / Freepik / Pexels) */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Kata Kunci Cari Foto Stok (Unsplash / Freepik / Canva):
                  </label>
                  <button
                    type="button"
                    onClick={handleCopyKeywords}
                    className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-bold border border-blue-200 dark:border-blue-800 transition-all cursor-pointer"
                  >
                    {copiedKeywords ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Kata Kunci</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-xl font-bold text-sm border border-slate-200 dark:border-slate-700 select-all">
                  {imageSearchKeywords}
                </div>

                {/* Direct Search Buttons */}
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="text-slate-500 self-center">Langsung Cari di:</span>
                  <a
                    href={`https://unsplash.com/s/photos/${encodeURIComponent(imageSearchKeywords)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-black text-white hover:bg-slate-800 transition-colors"
                  >
                    Unsplash <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={`https://www.freepik.com/search?format=search&query=${encodeURIComponent(imageSearchKeywords)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Freepik <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.bing.com/create"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    Bing Creator <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* External Links & Form Action */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* AI Tools Quick Links */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Buka AI:</span>
              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white transition-colors font-semibold"
              >
                ChatGPT <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://gemini.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white transition-colors font-semibold"
              >
                Gemini <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white transition-colors font-semibold"
              >
                Claude <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {onOpenPasteModal && (
                <button
                  type="button"
                  onClick={onOpenPasteModal}
                  className="flex-1 sm:flex-initial px-3 py-2.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-bold border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  title="Punya teks hasil dari ChatGPT / Gemini? Tempel langsung di sini"
                >
                  <ClipboardCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tempel Hasil AI</span>
                </button>
              )}
              {onApplyTitle && topic.trim() && (
                <button
                  type="button"
                  onClick={handleApplyToForm}
                  className="flex-1 sm:flex-initial px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Terapkan Judul</span>
                </button>
              )}
              <button
                type="button"
                onClick={activeTab === 'prompt' ? handleCopyPrompt : handleCopyImagePrompt}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#172657] hover:bg-[#1f3373] text-white rounded-xl text-xs font-bold shadow-md shadow-[#172657]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {copiedPrompt || copiedImagePrompt ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
                <span>
                  {copiedPrompt || copiedImagePrompt ? 'Tersalin!' : 'Salin Prompt'}
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

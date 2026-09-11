"use client";

import React, { useState, useMemo } from 'react';
import {
  FileText,
  ClipboardCheck,
  Check,
  X,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Eye,
  Tag,
  Clock,
} from 'lucide-react';

interface ParsedArticle {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
}

interface AiPasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: ParsedArticle) => void;
}

export function parseAiArticleText(rawText: string): ParsedArticle {
  if (!rawText || !rawText.trim()) {
    return {
      title: '',
      excerpt: '',
      content: '',
      category: 'Bisnis & Teknologi',
      readTime: '4 Menit Baca',
    };
  }

  let text = rawText.trim();

  // 1. Clean code block wrappers if user copied the entire ```markdown ... ```
  if (text.startsWith('```markdown') || text.startsWith('```md') || text.startsWith('```')) {
    text = text.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
  }

  // 2. Remove common AI introductory conversational chatter
  const introChatterRegex = /^(tentu|baik|berikut|halo|sure|here is|here's|certainly|ini dia)[^\n]*\n+/i;
  while (introChatterRegex.test(text)) {
    text = text.replace(introChatterRegex, '').trim();
  }

  // 3. Remove common AI concluding chatter at the end
  const outroChatterRegex = /\n+(semoga (membantu|artikel ini|bermanfaat)|jika ada pertanyaan|silakan beri tahu|hope this helps|let me know if you need)[^\n]*$/i;
  text = text.replace(outroChatterRegex, '').trim();

  // Split into lines
  const lines = text.split('\n');

  let title = '';
  let excerpt = '';
  let category = 'Bisnis & Teknologi';
  const remainingLines: string[] = [];
  let foundTitle = false;
  let foundExcerpt = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Skip blank leading lines before title
    if (!foundTitle && !line) continue;

    // Detect Title
    if (!foundTitle) {
      if (/^#\s+/.test(line) || /^judul\s*[:\-]\s*/i.test(line) || /^title\s*[:\-]\s*/i.test(line)) {
        title = line
          .replace(/^#\s+/, '')
          .replace(/^judul\s*[:\-]\s*/i, '')
          .replace(/^title\s*[:\-]\s*/i, '')
          .replace(/^\*\*|\*\*$/g, '')
          .replace(/^["']|["']$/g, '')
          .trim();
        foundTitle = true;
        continue;
      }
      // If the first line is bolded or standalone title
      if (line.startsWith('**') && line.endsWith('**') && line.length < 120) {
        title = line.replace(/^\*\*|\*\*$/g, '').trim();
        foundTitle = true;
        continue;
      }
      // Fallback: first non-empty line as title if short enough
      if (line.length < 120 && !line.includes(': ')) {
        title = line.replace(/^[#*"\s]+|[#*"\s]+$/g, '').trim();
        foundTitle = true;
        continue;
      }
    }

    // Detect Excerpt
    if (!foundExcerpt) {
      if (
        /^(ringkasan|excerpt|meta description|deskripsi singkat|ringkasan singkat)\s*[:\-]\s*/i.test(line) ||
        /^\*\*(ringkasan|excerpt|meta description|ringkasan singkat)\*\*\s*[:\-]?\s*/i.test(line)
      ) {
        excerpt = line
          .replace(/^\*\*(ringkasan|excerpt|meta description|ringkasan singkat)\*\*\s*[:\-]?\s*/i, '')
          .replace(/^(ringkasan|excerpt|meta description|deskripsi singkat|ringkasan singkat)\s*[:\-]\s*/i, '')
          .replace(/^\*\*|\*\*$/g, '')
          .replace(/^["']|["']$/g, '')
          .trim();
        foundExcerpt = true;
        continue;
      }
    }

    // Accumulate body content
    remainingLines.push(rawLine);
  }

  let cleanContent = remainingLines.join('\n').trim();

  // If title was repeated in content as # Judul, clean it out so it doesn't appear twice
  if (title) {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    cleanContent = cleanContent.replace(new RegExp(`^#\\s+${escapedTitle}\\s*\\n*`, 'i'), '').trim();
  }

  // Fallback excerpt if not explicitly marked
  if (!excerpt) {
    const paragraphs = cleanContent.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    const firstP = paragraphs.find((p) => !p.startsWith('#') && !p.startsWith('-') && !p.startsWith('*') && !p.startsWith('>'));
    if (firstP) {
      const cleanP = firstP.replace(/\*\*/g, '').replace(/^[#>\s]+/, '').trim();
      const sentences = cleanP.split(/(?<=[.?!])\s+/);
      excerpt = sentences.slice(0, 2).join(' ').trim();
      if (excerpt.length > 220) {
        excerpt = excerpt.substring(0, 217) + '...';
      }
    }
  }

  // Auto-detect category
  const fullTextLower = (title + ' ' + cleanContent).toLowerCase();
  if (
    fullTextLower.includes('ui/ux') ||
    fullTextLower.includes('antarmuka') ||
    fullTextLower.includes('mobile app') ||
    fullTextLower.includes('aplikasi mobile') ||
    fullTextLower.includes('android') ||
    fullTextLower.includes('ios')
  ) {
    category = 'UI/UX & Mobile';
  } else if (
    fullTextLower.includes('seo') ||
    fullTextLower.includes('digital marketing') ||
    fullTextLower.includes('pemasaran digital') ||
    fullTextLower.includes('traffic')
  ) {
    category = 'Digital Marketing';
  } else if (
    fullTextLower.includes('website') ||
    fullTextLower.includes('web development') ||
    fullTextLower.includes('landing page') ||
    fullTextLower.includes('wordpress')
  ) {
    category = 'Tips Website';
  } else if (
    fullTextLower.includes('sistem informasi') ||
    fullTextLower.includes('database') ||
    fullTextLower.includes('erp') ||
    fullTextLower.includes('software house') ||
    fullTextLower.includes('software custom')
  ) {
    category = 'Sistem Informasi';
  } else {
    category = 'Bisnis & Teknologi';
  }

  // Calculate read time
  const totalWords = (title + ' ' + cleanContent).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(totalWords / 200));
  const readTime = `${minutes} Menit Baca`;

  return {
    title,
    excerpt,
    content: cleanContent,
    category,
    readTime,
  };
}

export default function AiPasteModal({ isOpen, onClose, onApply }: AiPasteModalProps) {
  const [rawPastedText, setRawPastedText] = useState('');
  const [manualTitle, setManualTitle] = useState('');
  const [manualExcerpt, setManualExcerpt] = useState('');
  const [manualCategory, setManualCategory] = useState('');

  // Auto-parse
  const parsed = useMemo(() => {
    return parseAiArticleText(rawPastedText);
  }, [rawPastedText]);

  // When parsed updates, sync local editable fields if user hasn't typed
  const activeTitle = manualTitle || parsed.title;
  const activeExcerpt = manualExcerpt || parsed.excerpt;
  const activeCategory = manualCategory || parsed.category;

  if (!isOpen) return null;

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setRawPastedText(text);
        setManualTitle('');
        setManualExcerpt('');
        setManualCategory('');
      }
    } catch {
      // If clipboard access is blocked, user can paste into textarea manually
    }
  };

  const handleApplyClick = () => {
    onApply({
      title: activeTitle.trim(),
      excerpt: activeExcerpt.trim(),
      content: parsed.content.trim(),
      category: activeCategory,
      readTime: parsed.readTime,
    });
    onClose();
  };

  const totalWords = parsed.content ? parsed.content.split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/30 border border-slate-200 dark:border-slate-800 overflow-hidden z-10 my-4 sm:my-8 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#172657] via-[#1f3373] to-blue-900 px-4 sm:px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
              <ClipboardCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                Tempel Teks Hasil AI (Auto-Rapikan)
              </h3>
              <p className="text-[11px] sm:text-xs text-blue-200/80 font-medium">
                Sistem otomatis memisahkan Judul, Ringkasan, Kategori, dan Naskah artikel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Main Textarea Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                1. Tempelkan Seluruh Teks dari ChatGPT / Gemini / Claude:
              </label>
              <button
                type="button"
                onClick={handlePasteFromClipboard}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>Tempel dari Clipboard</span>
              </button>
            </div>

            <textarea
              rows={6}
              value={rawPastedText}
              onChange={(e) => {
                setRawPastedText(e.target.value);
                setManualTitle('');
                setManualExcerpt('');
                setManualCategory('');
              }}
              placeholder="Salin dan tempel semua teks dari ChatGPT / Gemini ke sini... Sistem akan otomatis mendeteksi judul, ringkasan, dan isi naskahnya."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none transition-colors leading-relaxed font-mono"
            />
          </div>

          {/* Parsed Breakdown Box */}
          {rawPastedText.trim() && (
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Hasil Deteksi Otomatis Sistem (Bisa Diedit):
                </span>
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> {totalWords} kata
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {parsed.readTime}
                  </span>
                </span>
              </div>

              {/* Title Detected */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Judul Artikel Terdeteksi:
                </label>
                <input
                  type="text"
                  value={activeTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Judul artikel..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600"
                />
              </div>

              {/* Excerpt Detected */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Ringkasan Singkat (Excerpt):
                </label>
                <textarea
                  rows={2}
                  value={activeExcerpt}
                  onChange={(e) => setManualExcerpt(e.target.value)}
                  placeholder="Ringkasan singkat..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600 leading-relaxed"
                />
              </div>

              {/* Category Detected */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Kategori Artikel:
                </label>
                <select
                  value={activeCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                >
                  <option value="Bisnis & Teknologi">Bisnis & Teknologi</option>
                  <option value="Tips Website">Tips Website</option>
                  <option value="UI/UX & Mobile">UI/UX & Mobile</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                </select>
              </div>

              {/* Content Preview */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Pratinjau Naskah yang Telah Dirapikan:
                </label>
                <div className="rounded-xl bg-slate-100 dark:bg-slate-950 p-3 text-xs text-slate-700 dark:text-slate-300 max-h-[140px] overflow-y-auto font-mono whitespace-pre-wrap leading-relaxed border border-slate-200 dark:border-slate-800 select-all">
                  {parsed.content || '(Naskah artikel kosong)'}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Action Bar */}
        <div className="bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 rounded-xl transition"
          >
            Batal
          </button>

          <button
            type="button"
            disabled={!rawPastedText.trim()}
            onClick={handleApplyClick}
            className="px-5 py-2.5 bg-[#172657] hover:bg-[#1f3373] disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-[#172657]/20 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Terapkan ke Editor Artikel</span>
          </button>
        </div>

      </div>
    </div>
  );
}

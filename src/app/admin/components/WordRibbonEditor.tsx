"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  Minus,
  Undo,
  Redo,
  Upload,
  Eye,
  Columns,
  FileText,
  Check,
  Sparkles,
  Loader2,
  Trash2,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { createClient } from '@/lib/supabase/client';

interface WordRibbonEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

// Convert HTML from contentEditable to clean Markdown for database storage
export function htmlToMarkdown(html: string): string {
  if (!html || html === '<p><br></p>' || html === '<br>') return '';

  if (typeof window === 'undefined') return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  function nodeToMd(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return '';
    }

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const children = Array.from(el.childNodes).map(nodeToMd).join('');

    switch (tag) {
      case 'strong':
      case 'b':
        return children.trim() ? `**${children}**` : '';
      case 'em':
      case 'i':
        return children.trim() ? `*${children}*` : '';
      case 'u':
        return `<u>${children}</u>`;
      case 's':
      case 'strike':
      case 'del':
        return `~~${children}~~`;
      case 'h1':
        return `\n\n# ${children.trim()}\n\n`;
      case 'h2':
        return `\n\n## ${children.trim()}\n\n`;
      case 'h3':
        return `\n\n### ${children.trim()}\n\n`;
      case 'h4':
        return `\n\n#### ${children.trim()}\n\n`;
      case 'p':
        return `\n\n${children.trim()}\n\n`;
      case 'blockquote':
        return `\n\n> ${children.trim().replace(/\n/g, '\n> ')}\n\n`;
      case 'ul':
        return `\n\n${children.trim()}\n\n`;
      case 'ol':
        return `\n\n${children.trim()}\n\n`;
      case 'li': {
        const parentTag = el.parentElement?.tagName.toLowerCase();
        if (parentTag === 'ol') {
          const index = Array.from(el.parentElement?.children || []).indexOf(el) + 1;
          return `${index}. ${children.trim()}\n`;
        }
        return `- ${children.trim()}\n`;
      }
      case 'a': {
        const href = el.getAttribute('href') || '';
        return `[${children || href}](${href})`;
      }
      case 'img': {
        const src = el.getAttribute('src') || '';
        const alt = el.getAttribute('alt') || 'Gambar';
        return `\n\n![${alt}](${src})\n\n`;
      }
      case 'hr':
        return `\n\n---\n\n`;
      case 'code':
        if (el.parentElement?.tagName.toLowerCase() === 'pre') {
          return children;
        }
        return `\`${children}\``;
      case 'pre':
        return `\n\n\`\`\`\n${children.trim()}\n\`\`\`\n\n`;
      case 'br':
        return `\n`;
      case 'table':
        return `\n\n${el.outerHTML}\n\n`;
      case 'div':
        return `\n${children}\n`;
      default:
        return children;
    }
  }

  const rawMd = Array.from(doc.body.childNodes).map(nodeToMd).join('');
  return rawMd.replace(/\n{3,}/g, '\n\n').trim();
}

// Convert Markdown to HTML for initial contentEditable population
export function markdownToHtml(md: string): string {
  if (!md) return '<p><br></p>';

  // If already HTML (starts with a block-level tag), return as-is
  if (/^\s*<(p|h[1-6]|div|ul|ol|table|blockquote|pre)[^>]*>/i.test(md)) {
    return md;
  }

  // Process line by line using a block-level parser approach
  const lines = md.split('\n');
  const outputParts: string[] = [];
  let i = 0;

  // Helper: apply inline formatting to a string
  const inlineFmt = (text: string): string => {
    // Protect code blocks first with placeholders
    const codeMap: string[] = [];
    text = text.replace(/`([^`]+)`/g, (_, c) => {
      codeMap.push(`<code style="background:#f1f5f9;color:#e11d48;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.875em;">${c}</code>`);
      return `\x00CODE${codeMap.length - 1}\x00`;
    });
    // Images before links
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:12px;margin:8px 0;" />');
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#2563eb;text-decoration:underline;font-weight:600;">$1</a>');
    // Bold+Italic
    text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
    // Bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Italic
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // Strikethrough
    text = text.replace(/~~([^~]+)~~/g, '<del>$1</del>');
    // Restore code
    text = text.replace(/\x00CODE(\d+)\x00/g, (_, idx) => codeMap[parseInt(idx)]);
    return text;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Fenced code block ```
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      const escaped = codeLines.join('\n').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      outputParts.push(`<pre style="background:#0f172a;color:#f8fafc;padding:16px;border-radius:12px;overflow-x:auto;margin:16px 0;"><code class="language-${lang}">${escaped}</code></pre>`);
      continue;
    }

    // Headings
    const h3 = trimmed.match(/^### (.+)$/);
    const h2 = trimmed.match(/^## (.+)$/);
    const h1 = trimmed.match(/^# (.+)$/);
    if (h1) { outputParts.push(`<h1 style="font-size:2.15rem;font-weight:900;margin:1.5em 0 0.6em 0;">${inlineFmt(h1[1])}</h1>`); i++; continue; }
    if (h2) { outputParts.push(`<h2 style="font-size:1.65rem;font-weight:800;margin:1.4em 0 0.5em 0;">${inlineFmt(h2[1])}</h2>`); i++; continue; }
    if (h3) { outputParts.push(`<h3 style="font-size:1.35rem;font-weight:700;margin:1.2em 0 0.5em 0;">${inlineFmt(h3[1])}</h3>`); i++; continue; }

    // H4
    const h4 = trimmed.match(/^#### (.+)$/);
    if (h4) { outputParts.push(`<h4 style="font-size:1.1rem;font-weight:700;margin:1em 0 0.4em 0;">${inlineFmt(h4[1])}</h4>`); i++; continue; }

    // Horizontal Rule
    if (/^(---|\*\*\*|___)$/.test(trimmed)) {
      outputParts.push('<hr style="margin:24px 0;border:none;border-top:2px solid #e2e8f0;" />');
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      const inner = quoteLines.map(inlineFmt).join('<br>');
      outputParts.push(`<blockquote style="border-left:4px solid #2563eb;padding:8px 16px;margin:16px 0;font-style:italic;background:rgba(37,99,235,0.06);border-radius:0 8px 8px 0;">${inner}</blockquote>`);
      continue;
    }

    // Unordered List
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        const itemText = lines[i].trim().replace(/^[-*+]\s+/, '');
        items.push(`<li style="margin:4px 0 4px 20px;list-style-type:disc;">${inlineFmt(itemText)}</li>`);
        i++;
      }
      outputParts.push(`<ul style="margin:12px 0;padding-left:8px;">${items.join('')}</ul>`);
      continue;
    }

    // Ordered List
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const itemText = lines[i].trim().replace(/^\d+\.\s+/, '');
        items.push(`<li style="margin:4px 0 4px 20px;list-style-type:decimal;">${inlineFmt(itemText)}</li>`);
        i++;
      }
      outputParts.push(`<ol style="margin:12px 0;padding-left:8px;">${items.join('')}</ol>`);
      continue;
    }

    // Regular paragraph — accumulate consecutive non-blank, non-block lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,6} |> |\s*[-*+]\s|\s*\d+\.\s|---|```|\*\*\*|___)/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      const inner = paraLines.map(inlineFmt).join('<br>');
      outputParts.push(`<p style="margin-bottom:1em;line-height:1.75;">${inner}</p>`);
    }
  }

  return outputParts.join('') || '<p><br></p>';
}

export default function WordRibbonEditor({
  value,
  onChange,
  placeholder = "Ketik teks dokumen artikel di sini...",
}: WordRibbonEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  // Active Ribbon Tab: 'beranda' | 'sisipkan' | 'tampilan'
  const [activeRibbonTab, setActiveRibbonTab] = useState<'beranda' | 'sisipkan' | 'tampilan'>('beranda');

  // View Mode: 'word' (WYSIWYG Word document) | 'split' (Side by side) | 'preview' (Rendered output)
  const [viewMode, setViewMode] = useState<'word' | 'split' | 'preview'>('word');

  // Paper Theme: 'light' (Classic White Word Paper) | 'dark' (Modern Dark Paper)
  const [paperTheme, setPaperTheme] = useState<'light' | 'dark'>('light');

  // Image Upload State
  const [uploadingImage, setUploadingImage] = useState(false);

  // Link Modal State
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  // Synchronize initial value to contentEditable
  const isInternalChangeRef = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isInternalChangeRef.current) {
      const html = markdownToHtml(value);
      if (editorRef.current.innerHTML !== html) {
        editorRef.current.innerHTML = html;
      }
    }
    isInternalChangeRef.current = false;
  }, [value]);

  // Handle User Input inside contentEditable
  const handleEditorInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    const md = htmlToMarkdown(html);
    isInternalChangeRef.current = true;
    onChange(md);
  };

  // Execute formatting command on contentEditable selection
  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, arg);
    handleEditorInput();
  };

  // Keyboard Shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        executeCommand('bold');
      } else if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        executeCommand('italic');
      } else if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        executeCommand('underline');
      }
    }
  };

  // Insert Heading (H1, H2, H3, P)
  const setHeading = (tag: 'h1' | 'h2' | 'h3' | 'p') => {
    executeCommand('formatBlock', `<${tag}>`);
  };

  // Insert Table
  const insertTable = () => {
    const tableHtml = `
      <table style="width:100%;border-collapse:collapse;margin:16px 0;border:1px solid #cbd5e1;">
        <thead>
          <tr style="background:#f8fafc;">
            <th style="border:1px solid #cbd5e1;padding:8px 12px;font-weight:bold;text-align:left;">Kolom 1</th>
            <th style="border:1px solid #cbd5e1;padding:8px 12px;font-weight:bold;text-align:left;">Kolom 2</th>
            <th style="border:1px solid #cbd5e1;padding:8px 12px;font-weight:bold;text-align:left;">Kolom 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #cbd5e1;padding:8px 12px;">Data A1</td>
            <td style="border:1px solid #cbd5e1;padding:8px 12px;">Data B1</td>
            <td style="border:1px solid #cbd5e1;padding:8px 12px;">Keterangan</td>
          </tr>
          <tr>
            <td style="border:1px solid #cbd5e1;padding:8px 12px;">Data A2</td>
            <td style="border:1px solid #cbd5e1;padding:8px 12px;">Data B2</td>
            <td style="border:1px solid #cbd5e1;padding:8px 12px;">Keterangan</td>
          </tr>
        </tbody>
      </table>
      <p><br></p>
    `;
    executeCommand('insertHTML', tableHtml);
  };

  // Upload and insert image visually into contentEditable
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `articles/content/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('techsoe-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('techsoe-media')
        .getPublicUrl(filePath);

      const imgHtml = `<p><img src="${publicUrlData.publicUrl}" alt="${file.name.replace(/\.[^/.]+$/, '')}" style="max-width:100%;border-radius:12px;margin:16px 0;box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);" /></p><p><br></p>`;
      executeCommand('insertHTML', imgHtml);
    } catch (err: any) {
      alert('Gagal upload gambar: ' + (err.message || 'Error storage'));
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Insert Link Modal Submit
  const handleInsertLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl) return;
    const text = linkText.trim() || linkUrl.trim();
    const linkHtml = `<a href="${linkUrl.trim()}" target="_blank" style="color:#2563eb;text-decoration:underline;font-weight:600;">${text}</a> `;
    executeCommand('insertHTML', linkHtml);
    setShowLinkModal(false);
    setLinkText('');
    setLinkUrl('');
  };

  // Real-time Statistics
  const wordsCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charsCount = value.length;
  const readTimeEstimate = Math.max(1, Math.ceil(wordsCount / 200));

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white text-slate-800 flex flex-col font-sans transition-all">
      {/* ================= 1. MICROSOFT WORD TITLE BAR & RIBBON TABS ================= */}
      <div className="bg-[#f8fafc] border-b border-slate-200 px-3 sm:px-4 py-2.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 select-none overflow-x-auto">
        {/* Document Branding */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#2b579a] flex items-center justify-center font-bold text-white text-xs shadow-sm shrink-0">
            W
          </div>
          <span className="text-xs font-bold text-slate-800 shrink-0">
            Word Editor
          </span>
        </div>

        {/* Ribbon Tabs Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveRibbonTab('beranda')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeRibbonTab === 'beranda'
                ? 'bg-[#2b579a] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            Beranda
          </button>

          <button
            type="button"
            onClick={() => setActiveRibbonTab('sisipkan')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeRibbonTab === 'sisipkan'
                ? 'bg-[#2b579a] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            Sisipkan
          </button>

          <button
            type="button"
            onClick={() => setActiveRibbonTab('tampilan')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeRibbonTab === 'tampilan'
                ? 'bg-[#2b579a] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            Tampilan
          </button>
        </div>

        {/* View Switcher: Word Sheet / Split Screen / Preview */}
        <div className="flex items-center bg-slate-200/70 p-1 rounded-lg border border-slate-300/60 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setViewMode('word')}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'word' ? 'bg-white text-[#2b579a] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Ketik Visual di Lembar Word"
          >
            <FileText className="w-3 h-3" /> Lembar Word
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'split' ? 'bg-white text-[#2b579a] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Layar Belah: Ketik di Kiri, Live Render di Kanan"
          >
            <Columns className="w-3 h-3" /> Belah Layar
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'preview' ? 'bg-white text-[#2b579a] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Lihat Pratinjau Jadi"
          >
            <Eye className="w-3 h-3" /> Pratinjau
          </button>
        </div>
      </div>

      {/* ================= 2. AUTHENTIC MICROSOFT WORD TOOLBAR RIBBON ================= */}
      <div className="bg-[#f1f5f9] border-b border-slate-200 p-2.5 flex flex-wrap items-center gap-3 select-none text-xs">
        {/* --- TAB: BERANDA (HOME) --- */}
        {activeRibbonTab === 'beranda' && (
          <div className="flex flex-wrap items-center gap-3 w-full">
            {/* GROUP 1: Undo / Redo */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => executeCommand('undo')}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer transition"
                title="Batalkan (Undo Ctrl+Z)"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('redo')}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer transition"
                title="Ulangi (Redo Ctrl+Y)"
              >
                <Redo className="w-4 h-4" />
              </button>
            </div>

            {/* GROUP 2: Direct Visual Font Formatting (B, I, U, S) */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => executeCommand('bold')}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 font-bold text-slate-800 cursor-pointer transition text-sm active:bg-blue-50 active:text-blue-600"
                title="Tebal Langsung (Ctrl+B) - Tanpa Tanda Bintang"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('italic')}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 italic text-slate-800 cursor-pointer transition text-sm active:bg-blue-50 active:text-blue-600"
                title="Miring Langsung (Ctrl+I)"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('underline')}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 underline text-slate-800 cursor-pointer transition text-sm active:bg-blue-50 active:text-blue-600"
                title="Garis Bawah Langsung (Ctrl+U)"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('strikeThrough')}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-700 cursor-pointer transition active:bg-blue-50 active:text-blue-600"
                title="Coretan Langsung"
              >
                <Strikethrough className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('removeFormat')}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-rose-50 text-rose-600 cursor-pointer transition text-xs"
                title="Hapus Semua Format (Clear Formatting)"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* GROUP 3: Direct Visual Paragraph & Lists */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => executeCommand('insertUnorderedList')}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-700 cursor-pointer transition active:bg-blue-50 active:text-blue-600"
                title="Daftar Butir Langsung (Bullet List)"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('insertOrderedList')}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-700 cursor-pointer transition active:bg-blue-50 active:text-blue-600"
                title="Daftar Bernomor Langsung (Numbered List)"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('formatBlock', '<blockquote>')}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-amber-600 cursor-pointer transition"
                title="Kutipan (Blockquote)"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('insertHorizontalRule')}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer transition"
                title="Garis Pemisah Paragraf"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* GROUP 4: Visual Word "Styles Gallery" (Gaya Judul Langsung) */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs overflow-x-auto">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-1 select-none">
                Gaya:
              </span>
              <button
                type="button"
                onClick={() => setHeading('p')}
                className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 cursor-pointer transition flex flex-col items-center leading-tight active:bg-blue-50"
                title="Jadikan Paragraf Normal"
              >
                <span>Normal</span>
                <span className="text-[9px] text-slate-400 font-serif">AaBbCc</span>
              </button>

              <button
                type="button"
                onClick={() => setHeading('h1')}
                className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-bold border border-slate-200 cursor-pointer transition flex flex-col items-center leading-tight active:bg-blue-50"
                title="Jadikan Judul Utama H1 Langsung Besar"
              >
                <span className="text-blue-700 font-extrabold">Judul 1</span>
                <span className="text-[9px] text-slate-400 font-serif font-bold">AaBb</span>
              </button>

              <button
                type="button"
                onClick={() => setHeading('h2')}
                className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-bold border border-slate-200 cursor-pointer transition flex flex-col items-center leading-tight active:bg-blue-50"
                title="Jadikan Sub-Judul H2 Langsung"
              >
                <span className="text-emerald-700 font-bold">Judul 2</span>
                <span className="text-[9px] text-slate-400 font-serif font-semibold">AaBb</span>
              </button>

              <button
                type="button"
                onClick={() => setHeading('h3')}
                className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold border border-slate-200 cursor-pointer transition flex flex-col items-center leading-tight active:bg-blue-50"
                title="Jadikan Sub-Judul H3 Langsung"
              >
                <span className="text-purple-700">Judul 3</span>
                <span className="text-[9px] text-slate-400 font-serif">AaBb</span>
              </button>
            </div>
          </div>
        )}

        {/* --- TAB: SISIPKAN (INSERT) --- */}
        {activeRibbonTab === 'sisipkan' && (
          <div className="flex flex-wrap items-center gap-3 w-full">
            {/* Insert Link */}
            <button
              type="button"
              onClick={() => setShowLinkModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs cursor-pointer font-semibold transition"
            >
              <LinkIcon className="w-4 h-4 text-blue-600" />
              <span>Sisipkan Link / Tautan</span>
            </button>

            {/* Insert Image via File Upload to Supabase */}
            <label className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs cursor-pointer font-semibold transition">
              {uploadingImage ? (
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              ) : (
                <ImageIcon className="w-4 h-4 text-emerald-600" />
              )}
              <span>{uploadingImage ? 'Mengupload ke Supabase...' : 'Sisipkan Gambar dari PC'}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>

            {/* Insert Table */}
            <button
              type="button"
              onClick={insertTable}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs cursor-pointer font-semibold transition"
            >
              <TableIcon className="w-4 h-4 text-purple-600" />
              <span>Sisipkan Tabel Data</span>
            </button>

            {/* Insert Divider */}
            <button
              type="button"
              onClick={() => executeCommand('insertHorizontalRule')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs cursor-pointer font-semibold transition"
            >
              <Minus className="w-4 h-4 text-slate-500" />
              <span>Garis Horizontal</span>
            </button>
          </div>
        )}

        {/* --- TAB: TAMPILAN (VIEW) --- */}
        {activeRibbonTab === 'tampilan' && (
          <div className="flex flex-wrap items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-xs font-medium">Warna Lembar Kerja:</span>
              <button
                type="button"
                onClick={() => setPaperTheme('light')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                  paperTheme === 'light'
                    ? 'bg-white text-blue-700 border border-blue-200 shadow-xs font-extrabold'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Kertas Putih (Asli Word)
              </button>
              <button
                type="button"
                onClick={() => setPaperTheme('dark')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                  paperTheme === 'dark'
                    ? 'bg-slate-900 text-white font-extrabold shadow-sm'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Kertas Gelap (Dark Mode)
              </button>
            </div>

            <div className="text-xs text-emerald-700 flex items-center gap-2 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Mode WYSIWYG Aktif: Teks langsung tebal/miring tanpa tanda bintang
            </div>
          </div>
        )}
      </div>

      {/* ================= 3. POPUP MODAL SISIPKAN LINK ================= */}
      {showLinkModal && (
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-wrap items-center gap-3 text-xs animate-in fade-in duration-150">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" /> Sisipkan Tautan:
          </span>
          <input
            type="text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            placeholder="Teks tautan (contoh: Website TechSoe)"
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 w-52 shadow-xs"
          />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 flex-1 min-w-[200px] shadow-xs"
          />
          <button
            type="button"
            onClick={handleInsertLinkSubmit}
            className="px-3.5 py-1.5 bg-[#2b579a] hover:bg-[#204377] text-white rounded-lg font-bold cursor-pointer transition shadow-xs"
          >
            Sisipkan
          </button>
          <button
            type="button"
            onClick={() => setShowLinkModal(false)}
            className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg cursor-pointer transition"
          >
            Batal
          </button>
        </div>
      )}

      {/* ================= 4. DOCUMENT EDITING CANVAS (MICROSOFT WORD CANVAS) ================= */}
      <div className="relative min-h-[520px] max-h-[750px] overflow-y-auto bg-slate-100/90 p-4 sm:p-8 flex justify-center border-b border-slate-200">
        {/* VIEW 1: WORD PAPER VIEW (WYSIWYG CONTENTEDITABLE) */}
        {viewMode === 'word' && (
          <div
            className={`w-full max-w-3xl min-h-[620px] rounded-lg shadow-lg p-8 sm:p-14 transition-all relative ${
              paperTheme === 'light'
                ? 'bg-white text-slate-900 border border-slate-200'
                : 'bg-slate-900 text-slate-100 border border-slate-800 shadow-2xl'
            }`}
          >
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleEditorInput}
              onKeyDown={handleKeyDown}
              className={`w-full h-full min-h-[560px] outline-none font-sans text-base leading-relaxed tracking-normal focus:outline-none ${
                paperTheme === 'light'
                  ? 'text-slate-900 selection:bg-blue-100 selection:text-blue-900'
                  : 'text-slate-100 selection:bg-blue-800 selection:text-white'
              }`}
              style={{ minHeight: '520px' }}
            />
          </div>
        )}

        {/* VIEW 2: SPLIT SCREEN (WYSIWYG on Left, Live Rendered on Right) */}
        {viewMode === 'split' && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: WYSIWYG ContentEditable Paper */}
            <div
              className={`rounded-xl shadow-md p-6 h-[580px] overflow-y-auto ${
                paperTheme === 'light'
                  ? 'bg-white text-slate-900 border border-slate-200'
                  : 'bg-slate-900 text-slate-100 border border-slate-800'
              }`}
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 border-b border-slate-200 pb-1">
                Lembar Kerja Word (Ketik & Format Langsung)
              </div>
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleEditorInput}
                onKeyDown={handleKeyDown}
                className="w-full min-h-[500px] outline-none font-sans text-sm leading-relaxed"
              />
            </div>

            {/* Right: Live Rendered Output */}
            <div className="bg-white text-slate-900 border border-slate-200 rounded-xl shadow-md p-6 h-[580px] overflow-y-auto">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 mb-3 border-b border-slate-200 pb-1 flex items-center justify-between">
                <span>Pratinjau Hasil Akhir Artikel</span>
                <span className="text-[10px] text-slate-500">Live Render</span>
              </div>
              <div className="prose prose-slate prose-blue max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-relaxed prose-img:rounded-xl">
                {value.trim() ? (
                  <ReactMarkdown>{value}</ReactMarkdown>
                ) : (
                  <p className="text-slate-400 italic">Pratinjau artikel akan muncul di sini saat Anda mengetik...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: FULL PREVIEW */}
        {viewMode === 'preview' && (
          <div className="w-full max-w-3xl min-h-[600px] rounded-xl shadow-lg p-8 sm:p-12 bg-white border border-slate-200 text-slate-900">
            <div className="prose prose-slate prose-blue max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-img:rounded-2xl prose-p:leading-relaxed prose-li:leading-relaxed">
              {value.trim() ? (
                <ReactMarkdown>{value}</ReactMarkdown>
              ) : (
                <p className="text-slate-400 italic text-center py-20">
                  Belum ada konten artikel untuk ditampilkan. Silakan beralih ke tombol <strong>"Lembar Word"</strong> untuk mulai mengetik.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= 5. MICROSOFT WORD STATUS BAR (BOTTOM) ================= */}
      <div className="bg-white border-t border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500 select-none">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-700">
            Halaman 1 dari 1
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span>
            Jumlah Kata: <strong className="text-slate-900">{wordsCount}</strong> kata
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline">
            Karakter: <strong className="text-slate-900">{charsCount}</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> WYSIWYG Mode (Tanpa Tanda Bintang)
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="text-slate-600">
            Estimasi Baca: <strong className="text-slate-900">~{readTimeEstimate} Menit</strong>
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="font-mono text-slate-500">
            100% Zoom
          </span>
        </div>
      </div>
    </div>
  );
}

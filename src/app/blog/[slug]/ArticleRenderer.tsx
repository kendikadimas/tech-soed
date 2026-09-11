"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Check, ChevronRight, List } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// READING PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-1 bg-slate-200/60 dark:bg-slate-800/60">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TABLE OF CONTENTS
// ─────────────────────────────────────────────────────────────────────────────
interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function buildToc(markdown: string): TocItem[] {
  const headingRe = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;
  while ((match = headingRe.exec(markdown)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\*\*/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    items.push({ id, text, level });
  }
  return items;
}

export function TableOfContents({ markdown }: { markdown: string }) {
  const [activeId, setActiveId] = useState('');
  const [open, setOpen] = useState(false);
  const toc = useMemo(() => buildToc(markdown), [markdown]);

  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  if (toc.length < 2) return null;

  return (
    <div className="my-8 rounded-2xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/20 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <span className="flex items-center gap-2 text-sm font-black text-blue-700 dark:text-blue-400 uppercase tracking-wider">
          <List className="w-4 h-4" />
          Daftar Isi Artikel
        </span>
        <ChevronRight
          className={`w-4 h-4 text-blue-500 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {open && (
        <nav className="px-5 pb-5 space-y-1 border-t border-blue-100 dark:border-blue-900/40 pt-3">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={`
                flex items-center gap-2 py-1.5 rounded-lg px-2 text-sm transition-all
                ${item.level === 3 ? 'ml-4 text-xs' : ''}
                ${activeId === item.id
                  ? 'text-blue-700 dark:text-blue-400 font-bold bg-blue-100/60 dark:bg-blue-900/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium'
                }
              `}
            >
              {item.level === 2 ? (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 shrink-0" />
              ) : (
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
              )}
              {item.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MARKDOWN BLOCK PARSER + RENDERER
// ─────────────────────────────────────────────────────────────────────────────

type Block =
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'h4'; text: string }
  | { type: 'p'; inlines: Inline[]; isLead: boolean }
  | { type: 'ul'; items: Inline[][] }
  | { type: 'ol'; items: Inline[][] }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'code'; lang: string; code: string }
  | { type: 'hr' }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'image'; src: string; alt: string };

type Inline =
  | { kind: 'text'; value: string }
  | { kind: 'bold'; value: string }
  | { kind: 'italic'; value: string }
  | { kind: 'bolditalic'; value: string }
  | { kind: 'code'; value: string }
  | { kind: 'link'; href: string; label: string }
  | { kind: 'img'; src: string; alt: string };

function parseInlines(raw: string): Inline[] {
  const result: Inline[] = [];
  // Regex matches: inline-code, image, link, bold+italic, bold, italic
  const re = /`([^`]+)`|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*\*([^*]+)\*\*\*|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(raw)) !== null) {
    if (m.index > last) {
      result.push({ kind: 'text', value: raw.slice(last, m.index) });
    }
    if (m[1] !== undefined) {
      result.push({ kind: 'code', value: m[1] });
    } else if (m[2] !== undefined) {
      result.push({ kind: 'img', src: m[3], alt: m[2] });
    } else if (m[4] !== undefined) {
      result.push({ kind: 'link', href: m[5], label: m[4] });
    } else if (m[6] !== undefined) {
      result.push({ kind: 'bolditalic', value: m[6] });
    } else if (m[7] !== undefined) {
      result.push({ kind: 'bold', value: m[7] });
    } else if (m[8] !== undefined) {
      result.push({ kind: 'italic', value: m[8] });
    }
    last = re.lastIndex;
  }
  if (last < raw.length) {
    result.push({ kind: 'text', value: raw.slice(last) });
  }
  return result;
}

function headingId(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function parseMarkdown(md: string): Block[] {
  const lines = md.split('\n');
  const blocks: Block[] = [];
  let i = 0;
  let paraCount = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (!trimmed) { i++; continue; }

    // Fenced code block
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      i++;
      const code: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: 'code', lang, code: code.join('\n') });
      continue;
    }

    // Headings
    const h4m = trimmed.match(/^####\s+(.+)$/);
    const h3m = trimmed.match(/^###\s+(.+)$/);
    const h2m = trimmed.match(/^##\s+(.+)$/);
    const h1m = trimmed.match(/^#\s+(.+)$/);
    if (h1m) { blocks.push({ type: 'h2', text: h1m[1].replace(/\*\*/g,''), id: headingId(h1m[1]) }); i++; continue; }
    if (h2m) { blocks.push({ type: 'h2', text: h2m[1].replace(/\*\*/g,''), id: headingId(h2m[1]) }); i++; continue; }
    if (h3m) { blocks.push({ type: 'h3', text: h3m[1].replace(/\*\*/g,''), id: headingId(h3m[1]) }); i++; continue; }
    if (h4m) { blocks.push({ type: 'h4', text: h4m[1].replace(/\*\*/g,'') }); i++; continue; }

    // HR
    if (/^(---|___|\*\*\*)$/.test(trimmed)) { blocks.push({ type: 'hr' }); i++; continue; }

    // Standalone image
    const imgm = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgm) { blocks.push({ type: 'image', alt: imgm[1], src: imgm[2] }); i++; continue; }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const lines2: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        lines2.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: 'blockquote', lines: lines2 });
      continue;
    }

    // Markdown table (starts with |)
    if (trimmed.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (row: string) =>
          row.split('|').slice(1, -1).map((c) => c.trim());
        const headers = parseRow(tableLines[0]);
        // tableLines[1] is the separator line (---|---), skip it
        const rows = tableLines.slice(2).map(parseRow);
        blocks.push({ type: 'table', headers, rows });
      }
      continue;
    }

    // Unordered list
    if (/^\s*[-*+]\s+/.test(raw)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        const text = lines[i].trim().replace(/^[-*+]\s+/, '');
        items.push(parseInlines(text));
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(raw)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const text = lines[i].trim().replace(/^\d+\.\s+/, '');
        items.push(parseInlines(text));
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Paragraph — gather consecutive non-block lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,6}\s|>\s|\s*[-*+]\s|\s*\d+\.\s|---|```|\*\*\*|___)/.test(lines[i]) &&
      !/^!\[[^\]]*\]\([^)]+\)$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      const text = paraLines.join(' ');
      paraCount++;
      blocks.push({ type: 'p', inlines: parseInlines(text), isLead: paraCount === 1 });
    }
  }

  return blocks;
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE RENDERER
// ─────────────────────────────────────────────────────────────────────────────
function InlineContent({ inlines }: { inlines: Inline[] }) {
  return (
    <>
      {inlines.map((node, idx) => {
        switch (node.kind) {
          case 'text':
            return <span key={idx}>{node.value}</span>;
          case 'bold':
            return <strong key={idx} className="font-bold text-slate-900 dark:text-white">{node.value}</strong>;
          case 'italic':
            return <em key={idx} className="italic text-slate-600 dark:text-slate-400">{node.value}</em>;
          case 'bolditalic':
            return <strong key={idx} className="font-bold italic text-slate-900 dark:text-white">{node.value}</strong>;
          case 'code':
            return (
              <code key={idx} className="bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 rounded-md px-1.5 py-0.5 text-[0.85em] font-mono">
                {node.value}
              </code>
            );
          case 'link':
            return (
              <a key={idx} href={node.href} target="_blank" rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                {node.label}
              </a>
            );
          case 'img':
            // eslint-disable-next-line @next/next/no-img-element
            return <img key={idx} src={node.src} alt={node.alt} className="inline max-w-full rounded-xl" />;
        }
      })}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOCK RENDERER
// ─────────────────────────────────────────────────────────────────────────────
function BlockRenderer({ block, idx }: { block: Block; idx: number }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          id={block.id}
          className="flex items-start gap-3 text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4 scroll-mt-28 group"
        >
          <span className="mt-1 shrink-0 w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500" />
          <span className="group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{block.text}</span>
        </h2>
      );

    case 'h3':
      return (
        <h3
          id={block.id}
          className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-200 mt-8 mb-3 scroll-mt-28 pl-0 border-b border-dashed border-slate-200 dark:border-slate-700 pb-2"
        >
          {block.text}
        </h3>
      );

    case 'h4':
      return (
        <h4 className="text-base font-bold text-blue-700 dark:text-blue-400 mt-6 mb-2">
          {block.text}
        </h4>
      );

    case 'p':
      if (block.isLead) {
        return (
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-[1.9] mb-6 font-medium first-letter:text-4xl first-letter:font-black first-letter:text-blue-600 dark:first-letter:text-blue-400 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
            <InlineContent inlines={block.inlines} />
          </p>
        );
      }
      return (
        <p className="text-base sm:text-[1.05rem] text-slate-700 dark:text-slate-300 leading-[1.92] mb-5">
          <InlineContent inlines={block.inlines} />
        </p>
      );

    case 'ul':
      return (
        <ul className="my-5 space-y-2.5 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-300 leading-[1.8]">
              <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </span>
              <span><InlineContent inlines={item} /></span>
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol className="my-5 space-y-3 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3.5 text-base text-slate-700 dark:text-slate-300 leading-[1.8]">
              <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-sm">
                {i + 1}
              </span>
              <span><InlineContent inlines={item} /></span>
            </li>
          ))}
        </ol>
      );

    case 'blockquote':
      return (
        <div className="my-7 relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/50">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-l-xl" />
          <div className="pl-6 pr-5 py-4 space-y-1">
            {block.lines.map((line, i) => (
              <p key={i} className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      );

    case 'code':
      return (
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
          {block.lang && (
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{block.lang}</span>
            </div>
          )}
          <pre className="bg-slate-900 text-slate-100 p-5 overflow-x-auto text-sm font-mono leading-relaxed">
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case 'hr':
      return (
        <div className="my-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 dark:bg-blue-700" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-600" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 dark:bg-blue-700" />
          </div>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>
      );

    case 'image':
      return (
        <figure className="my-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt}
            className="mx-auto max-w-full rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800"
          />
          {block.alt && (
            <figcaption className="mt-2.5 text-xs text-slate-400 dark:text-slate-500 italic">
              {block.alt}
            </figcaption>
          )}
        </figure>
      );

    case 'table':
      return (
        <div className="my-7 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#172657] to-blue-900 text-white">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={ri % 2 === 0
                    ? 'bg-white dark:bg-slate-900'
                    : 'bg-slate-50 dark:bg-slate-800/60'}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3 text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/50 align-top"
                    >
                      <InlineContent inlines={parseInlines(cell)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT: ArticleRenderer
// ─────────────────────────────────────────────────────────────────────────────
export default function ArticleRenderer({ content }: { content: string }) {
  const blocks = useMemo(() => parseMarkdown(content), [content]);
  const articleRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={articleRef}>
      <TableOfContents markdown={content} />
      <div>
        {blocks.map((block, idx) => (
          <BlockRenderer key={idx} block={block} idx={idx} />
        ))}
      </div>
    </div>
  );
}

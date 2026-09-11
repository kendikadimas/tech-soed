"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Save,
  Upload,
  Eye,
  Edit3,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ClipboardCheck,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { createClient } from '@/lib/supabase/client';
import WordRibbonEditor from './WordRibbonEditor';
import AiPromptModal from './AiPromptModal';
import AiPasteModal from './AiPasteModal';

interface ArticleEditorProps {
  articleId?: string;
}

export default function ArticleEditor({ articleId }: ArticleEditorProps) {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(!!articleId);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Bisnis & Teknologi',
    excerpt: '',
    content: '',
    author: 'TechSoe Team',
    image_url: '',
    read_time: '4 Menit Baca',
    published: true,
  });

  const showToast = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // Check URL query parameter for ?paste=true
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('paste') === 'true') {
        setIsPasteModalOpen(true);
      }
    }
  }, []);

  // Load existing article if editing
  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', articleId)
          .single();

        if (error) throw error;
        if (data) {
          setForm({
            title: data.title || '',
            slug: data.slug || '',
            category: data.category || 'Bisnis & Teknologi',
            excerpt: data.excerpt || '',
            content: data.content || '',
            author: data.author || 'TechSoe Team',
            image_url: data.image_url || '',
            read_time: data.read_time || '4 Menit Baca',
            published: data.published ?? true,
          });
        }
      } catch (err: any) {
        showToast('error', 'Gagal memuat artikel: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setForm((prev) => ({
      ...prev,
      title: val,
      slug: articleId ? prev.slug : generatedSlug,
    }));
  };

  // File upload to Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('techsoe-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('techsoe-media')
        .getPublicUrl(filePath);

      setForm((prev) => ({ ...prev, image_url: publicUrlData.publicUrl }));
      showToast('success', 'Gambar sampul berhasil diupload!');
    } catch (err: any) {
      console.error(err);
      showToast('error', 'Gagal upload gambar: ' + (err.message || 'Error storage'));
    } finally {
      setUploading(false);
    }
  };

  // Save Article
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('error', 'Judul artikel tidak boleh kosong.');
      return;
    }
    if (!form.slug.trim()) {
      showToast('error', 'Slug URL tidak boleh kosong.');
      return;
    }

    setSaving(true);
    try {
      if (articleId) {
        const { error } = await supabase
          .from('articles')
          .update(form)
          .eq('id', articleId);
        if (error) throw error;
        showToast('success', 'Artikel berhasil diperbarui!');
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([form]);
        if (error) throw error;
        showToast('success', 'Artikel baru berhasil dibuat!');
      }

      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 1000);
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menyimpan artikel');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] gap-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-slate-400 text-sm">Memuat data artikel...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {statusMsg && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium border transition-all ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              {articleId ? 'Edit Artikel' : 'Tulis Artikel Baru'}
              {articleId && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                  ID: {articleId.slice(0, 8)}...
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola konten wawasan dan publikasikan langsung ke blog TechSoe
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsPasteModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 cursor-pointer transition-all active:scale-95 whitespace-nowrap"
            title="Tempel teks lengkap dari ChatGPT / Gemini dan sistem akan otomatis merapikannya"
          >
            <ClipboardCheck className="w-4 h-4 shrink-0" />
            <span>Tempel Hasil AI</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPromptModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 cursor-pointer transition-all active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-amber-100 animate-pulse shrink-0" />
            <span>Buat Prompt AI</span>
          </button>
          <Link
            href="/admin"
            className="px-3.5 sm:px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all text-center"
          >
            Batal
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 bg-[#172657] hover:bg-[#1f3373] disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-[#172657]/20 cursor-pointer transition-all active:scale-95 whitespace-nowrap"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 shrink-0" />
                <span>{articleId ? 'Perbarui' : 'Terbitkan'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Main Content Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title Input */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Judul Artikel <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPasteModalOpen(true)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-all"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>Tempel Teks AI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPromptModalOpen(true)}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1.5 cursor-pointer bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Prompt AI</span>
                  </button>
                </div>
              </div>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Contoh: 5 Tips Memilih Software House Terbaik untuk UMKM"
                className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3.5 text-base font-bold text-slate-900 placeholder-slate-400 outline-none transition-colors"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Ringkasan Singkat (Excerpt) <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={form.excerpt}
                onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Ringkasan singkat yang akan tampil pada kartu artikel di halaman blog dan preview Google..."
                className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl p-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors leading-relaxed"
              />
            </div>
          </div>

          {/* Microsoft Word-Style Document Editor */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Isi Dokumen Artikel <span className="text-rose-500">*</span>
            </label>
            <WordRibbonEditor
              value={form.content}
              onChange={(val) => {
                const words = val.trim() ? val.trim().split(/\s+/).length : 0;
                const estMin = Math.max(1, Math.ceil(words / 200));
                setForm((prev) => ({
                  ...prev,
                  content: val,
                  read_time: `${estMin} Menit Baca`,
                }));
              }}
              placeholder="Mulai mengetik naskah artikel Anda di sini... Gunakan pita toolbar di atas untuk format teks tebal, miring, judul, daftar, sisipkan gambar atau tabel persis seperti Microsoft Word."
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Settings & Metadata Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Pengaturan Publikasi
            </h3>

            {/* Status Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <p className="text-xs font-bold text-slate-900">Status Publikasi</p>
                <p className="text-[11px] text-slate-500">
                  {form.published ? 'Artikel tayang di website' : 'Disimpan sebagai draf'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Slug URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Slug URL <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs">
                <span className="text-slate-400 font-mono select-none">/blog/</span>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="judul-artikel"
                  className="w-full bg-transparent font-mono text-blue-700 outline-none ml-1 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Kategori
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-blue-600 transition-colors"
              >
                <option value="Bisnis & Teknologi">Bisnis & Teknologi</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Tutorial & Tips">Tutorial & Tips</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Penulis (Author)
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                placeholder="TechSoe Team"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Estimasi Waktu Baca
              </label>
              <input
                type="text"
                value={form.read_time}
                onChange={(e) => setForm((prev) => ({ ...prev, read_time: e.target.value }))}
                placeholder="4 Menit Baca"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          {/* Cover Image Upload Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Gambar Sampul (Cover Image)
            </h3>

            {/* Image Preview */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center group">
              {form.image_url ? (
                <>
                  <Image
                    src={form.image_url}
                    alt="Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white bg-slate-900/80 px-3 py-1 rounded-lg">
                      Ganti Gambar di Bawah
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Belum ada gambar sampul</p>
                </div>
              )}
            </div>

            {/* File Upload Button */}
            <div>
              <label className="block w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-sm">
                  {uploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                      <span>Mengupload ke Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5 text-blue-600" />
                      <span>Upload Gambar dari Perangkat</span>
                    </>
                  )}
                </div>
              </label>
            </div>

            {/* Or Paste URL */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Atau tempel URL gambar:
              </label>
              <input
                type="text"
                value={form.image_url}
                onChange={(e) => setForm((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://... atau /projects/..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>
        </div>
      </form>

      {/* AI Prompt Generator Modal */}
      <AiPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        initialTitle={form.title}
        onOpenPasteModal={() => {
          setIsPromptModalOpen(false);
          setIsPasteModalOpen(true);
        }}
        onApplyTitle={(newTitle, newCategory) => {
          handleTitleChange(newTitle);
          setForm((prev) => ({
            ...prev,
            category: newCategory || prev.category,
          }));
          showToast('success', 'Judul & kategori artikel diterapkan!');
        }}
      />

      {/* AI Smart Paste & Auto-Parser Modal */}
      <AiPasteModal
        isOpen={isPasteModalOpen}
        onClose={() => setIsPasteModalOpen(false)}
        onApply={(data) => {
          if (data.title) {
            handleTitleChange(data.title);
          }
          setForm((prev) => ({
            ...prev,
            title: data.title || prev.title,
            excerpt: data.excerpt || prev.excerpt,
            content: data.content || prev.content,
            category: data.category || prev.category,
            read_time: data.readTime || prev.read_time,
          }));
          showToast('success', 'Teks dari AI berhasil dirapikan dan dimasukkan ke form!');
        }}
      />
    </div>
  );
}

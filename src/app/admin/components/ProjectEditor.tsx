"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Save,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ProjectEditorProps {
  projectId?: string;
}

export default function ProjectEditor({ projectId }: ProjectEditorProps) {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(!!projectId);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Web Development',
    sub_category: 'Landing Page',
    image_url: '',
    description: '',
    live_url: '',
    featured_hero: true,
    order_index: 0,
  });

  const showToast = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // Load existing project if editing
  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (error) throw error;
        if (data) {
          setForm({
            title: data.title || '',
            category: data.category || 'Web Development',
            sub_category: data.sub_category || 'Landing Page',
            image_url: data.image_url || '',
            description: data.description || '',
            live_url: data.live_url || '',
            featured_hero: data.featured_hero ?? true,
            order_index: data.order_index ?? 0,
          });
        }
      } catch (err: any) {
        showToast('error', 'Gagal memuat proyek: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // File upload to Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('techsoe-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('techsoe-media')
        .getPublicUrl(filePath);

      setForm((prev) => ({ ...prev, image_url: publicUrlData.publicUrl }));
      showToast('success', 'Gambar proyek berhasil diupload!');
    } catch (err: any) {
      console.error(err);
      showToast('error', 'Gagal upload gambar: ' + (err.message || 'Error storage'));
    } finally {
      setUploading(false);
    }
  };

  // Save Project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('error', 'Nama proyek tidak boleh kosong.');
      return;
    }

    setSaving(true);
    try {
      if (projectId) {
        const { error } = await supabase
          .from('projects')
          .update(form)
          .eq('id', projectId);
        if (error) throw error;
        showToast('success', 'Data proyek berhasil diperbarui!');
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([form]);
        if (error) throw error;
        showToast('success', 'Proyek baru berhasil ditambahkan!');
      }

      setTimeout(() => {
        router.push('/admin?tab=projects');
        router.refresh();
      }, 1000);
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menyimpan proyek');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] gap-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-slate-500 text-sm">Memuat data proyek...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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
            href="/admin?tab=projects"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              {projectId ? 'Edit Proyek Portofolio' : 'Tambah Proyek Baru'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Proyek ini akan tampil di bagian Portofolio serta 3D Cylinder Hero Carousel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin?tab=projects"
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-transparent hover:border-slate-200 transition-all"
          >
            Batal
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#172657] hover:bg-[#1f3373] disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-[#172657]/20 cursor-pointer transition-all active:scale-95"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{projectId ? 'Perbarui Proyek' : 'Simpan Proyek'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Nama Proyek / Klien <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Contoh: Larasena AI Batik atau Jemari Point"
            className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3.5 text-base font-bold text-slate-900 placeholder-slate-400 outline-none transition-colors"
          />
        </div>

        {/* Categories (Grid 2 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Kategori Utama
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full bg-white border border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-colors"
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Sistem Informasi / Web Apps">Sistem Informasi / Web Apps</option>
              <option value="Social Media Management">Social Media Management</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Sub-Kategori / Tipe
            </label>
            <input
              type="text"
              value={form.sub_category}
              onChange={(e) => setForm((prev) => ({ ...prev, sub_category: e.target.value }))}
              placeholder="Contoh: Landing Page, LMS, Company Profile, Fintech"
              className="w-full bg-white border border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Deskripsi Singkat Proyek
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Jelaskan secara ringkas fitur dan keunggulan solusi digital yang dibangun..."
            className="w-full bg-white border border-slate-300 focus:border-blue-600 rounded-xl p-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors leading-relaxed"
          />
        </div>

        {/* Image Upload Box */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Gambar Mockup / Screenshot (16:9 Rasio)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5 relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              {form.image_url ? (
                <Image
                  src={form.image_url}
                  alt="Project Preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="text-center p-3">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-500">Belum ada mockup</p>
                </div>
              )}
            </div>

            <div className="md:col-span-7 space-y-3">
              <label className="block w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <div className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-sm">
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span>Mengupload ke Supabase Storage...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-blue-600" />
                      <span>Upload Gambar Mockup Proyek</span>
                    </>
                  )}
                </div>
              </label>

              <input
                type="text"
                value={form.image_url}
                onChange={(e) => setForm((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder="Atau tempel URL gambar (/projects/... atau https://...)"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Live URL & Order Index (Grid 2 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Link Demo / Website Live (Opsional)
            </label>
            <input
              type="url"
              value={form.live_url}
              onChange={(e) => setForm((prev) => ({ ...prev, live_url: e.target.value }))}
              placeholder="https://..."
              className="w-full bg-white border border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Nomor Urutan Tampilan (Order Index)
            </label>
            <input
              type="number"
              value={form.order_index}
              onChange={(e) => setForm((prev) => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
              placeholder="1, 2, 3..."
              className="w-full bg-white border border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Featured in Hero Carousel Switch */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Tampilkan di 3D Hero Carousel
            </p>
            <p className="text-[11px] text-slate-500">
              Jika aktif, proyek ini akan berputar dalam silinder 3D di Hero Section utama halaman depan
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
            <input
              type="checkbox"
              checked={form.featured_hero}
              onChange={(e) => setForm((prev) => ({ ...prev, featured_hero: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </form>
    </div>
  );
}

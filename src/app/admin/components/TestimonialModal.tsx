"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Star, Loader2, CheckCircle2, AlertCircle, Quote, Upload, User, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export interface TestimonialData {
  id?: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar_url?: string;
  published: boolean;
}

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  testimonialToEdit?: TestimonialData | null;
}

export default function TestimonialModal({
  isOpen,
  onClose,
  onSuccess,
  testimonialToEdit,
}: TestimonialModalProps) {
  const [formData, setFormData] = useState<TestimonialData>({
    name: '',
    role: '',
    text: '',
    rating: 5,
    avatar_url: '',
    published: true,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (testimonialToEdit) {
      setFormData({
        id: testimonialToEdit.id,
        name: testimonialToEdit.name || '',
        role: testimonialToEdit.role || '',
        text: testimonialToEdit.text || '',
        rating: testimonialToEdit.rating || 5,
        avatar_url: testimonialToEdit.avatar_url || '',
        published: testimonialToEdit.published !== undefined ? testimonialToEdit.published : true,
      });
    } else {
      setFormData({
        name: '',
        role: '',
        text: '',
        rating: 5,
        avatar_url: '',
        published: true,
      });
    }
    setErrorMsg(null);
  }, [testimonialToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle Image Upload to Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ukuran foto terlalu besar. Maksimal 5MB.');
      return;
    }

    setUploading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `testimonial_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `testimonials/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('techsoe-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) {
        // Fallback convert to Base64 data URL if storage bucket is not configured yet
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, avatar_url: reader.result as string }));
          setUploading(false);
        };
        reader.readAsDataURL(file);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('techsoe-media')
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, avatar_url: publicUrlData.publicUrl }));
    } catch (err: any) {
      console.error(err);
      // Fallback convert to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) {
      setErrorMsg('Nama klien dan isi testimoni wajib diisi.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      if (formData.id) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update({
            name: formData.name,
            role: formData.role,
            text: formData.text,
            rating: formData.rating,
            avatar_url: formData.avatar_url || null,
            published: formData.published,
          })
          .eq('id', formData.id);

        if (error) throw error;
        onSuccess('Testimoni berhasil diperbarui!');
      } else {
        // Insert new testimonial
        const { error } = await supabase.from('testimonials').insert([
          {
            name: formData.name,
            role: formData.role,
            text: formData.text,
            rating: formData.rating,
            avatar_url: formData.avatar_url || null,
            published: formData.published,
          },
        ]);

        if (error) throw error;
        onSuccess('Testimoni baru berhasil ditambahkan!');
      }

      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Gagal menyimpan testimoni ke database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                {formData.id ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Testimoni ini akan ditampilkan di Landing Page TechSoe
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Foto Klien (Avatar Image) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Foto Klien / Pemberi Testimoni
            </label>
            <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#172657] text-white flex items-center justify-center font-black text-xl shrink-0 border-2 border-white shadow-sm">
                {formData.avatar_url ? (
                  <Image
                    src={formData.avatar_url}
                    alt="Preview Avatar"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <span>{formData.name ? formData.name.charAt(0) : 'K'}</span>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm">
                    {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>{uploading ? 'Mengupload...' : 'Upload Foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  {formData.avatar_url && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar_url: '' })}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-200 hover:bg-rose-100 text-slate-600 hover:text-rose-700 text-xs font-bold transition"
                    >
                      Hapus Foto
                    </button>
                  )}
                </div>

                <input
                  type="url"
                  placeholder="Atau masukkan URL Gambar (https://...)"
                  value={formData.avatar_url || ''}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 text-[11px] font-medium focus:outline-none focus:border-blue-600 transition"
                />
              </div>
            </div>
          </div>

          {/* Nama Klien */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Nama Klien <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Budi Santoso"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Jabatan / Perusahaan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Jabatan / Perusahaan / Instansi
            </label>
            <input
              type="text"
              placeholder="Contoh: Founder Larasena / Manager Jemari Point"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Rating (1-5 Stars) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Rating Kepuasan ({formData.rating} Bintang)
            </label>
            <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-1.5 hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= formData.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Isi Testimoni */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Isi Ulasan / Testimoni <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tuliskan ulasan atau kutipan testimoni klien..."
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition leading-relaxed"
            />
          </div>

          {/* Published Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Terbitkan di Landing Page
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Aktifkan agar testimoni ini langsung muncul untuk pengunjung website.
                </span>
              </div>
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="px-5 py-2.5 rounded-xl bg-[#172657] hover:bg-[#1f3373] text-white text-xs font-bold shadow-md shadow-[#172657]/20 transition flex items-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{formData.id ? 'Simpan Perubahan' : 'Tambah Testimoni'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

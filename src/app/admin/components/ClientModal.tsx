"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Loader2, CheckCircle2, AlertCircle, Upload, Building2, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export interface ClientData {
  id?: string;
  name: string;
  full_name: string;
  logo_url: string;
  category: string;
  description: string;
  order_index?: number;
  published: boolean;
}

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  clientToEdit?: ClientData | null;
}

const DEFAULT_CATEGORIES = [
  'Pendidikan & Perguruan Tinggi',
  'Instansi Keuangan & Perbankan',
  'BUMN & Energi',
  'Program Pemerintah & Desa',
  'Pemberdayaan Ekonomi Desa',
  'Bisnis & Perdagangan',
  'Pariwisata & Konservasi',
  'Pendidikan & Sekolah Dasar',
  'Lainnya',
];

export default function ClientModal({
  isOpen,
  onClose,
  onSuccess,
  clientToEdit,
}: ClientModalProps) {
  const [formData, setFormData] = useState<ClientData>({
    name: '',
    full_name: '',
    logo_url: '',
    category: 'Pendidikan & Perguruan Tinggi',
    description: '',
    order_index: 0,
    published: true,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (clientToEdit) {
      setFormData({
        id: clientToEdit.id,
        name: clientToEdit.name || '',
        full_name: clientToEdit.full_name || '',
        logo_url: clientToEdit.logo_url || '',
        category: clientToEdit.category || 'Pendidikan & Perguruan Tinggi',
        description: clientToEdit.description || '',
        order_index: clientToEdit.order_index ?? 0,
        published: clientToEdit.published !== undefined ? clientToEdit.published : true,
      });
    } else {
      setFormData({
        name: '',
        full_name: '',
        logo_url: '',
        category: 'Pendidikan & Perguruan Tinggi',
        description: '',
        order_index: 0,
        published: true,
      });
    }
    setErrorMsg(null);
  }, [clientToEdit, isOpen]);

  if (!isOpen) return null;

  // ── Auto-compress Logo via Canvas (WebP/PNG transparent, Max 600px width/height) ──
  const compressLogo = (file: File): Promise<{ blob: Blob; ext: string }> =>
    new Promise((resolve, reject) => {
      // If SVG, keep as is
      if (file.type === 'image/svg+xml') {
        resolve({ blob: file, ext: 'svg' });
        return;
      }

      const MAX_W = 600;
      const MAX_H = 400;
      const img = new window.Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        let { width, height } = img;

        if (width > MAX_W || height > MAX_H) {
          const ratio = Math.min(MAX_W / width, MAX_H / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ blob: file, ext: file.name.split('.').pop() || 'png' });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP format with high quality (preserving transparency)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({ blob: file, ext: file.name.split('.').pop() || 'png' });
              return;
            }
            resolve({ blob, ext: 'webp' });
          },
          'image/webp',
          0.90
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Gagal membaca file gambar'));
      };
      img.src = url;
    });

  // Handle Logo Upload to Supabase Storage with Auto-Compression
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Ukuran file logo terlalu besar. Maksimal 10MB.');
      return;
    }

    setUploading(true);
    setErrorMsg(null);

    try {
      // 1. Auto Compress Logo
      const { blob: compressedBlob, ext: targetExt } = await compressLogo(file);

      const supabase = createClient();
      const fileName = `client_${Date.now()}_${Math.random().toString(36).substring(7)}.${targetExt}`;
      const filePath = `clients/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('techsoe-media')
        .upload(filePath, compressedBlob, {
          contentType: targetExt === 'webp' ? 'image/webp' : targetExt === 'svg' ? 'image/svg+xml' : file.type,
          cacheControl: '31536000',
          upsert: true,
        });

      if (uploadError) {
        // Fallback convert to Base64 data URL if storage bucket is not configured yet
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, logo_url: reader.result as string }));
          setUploading(false);
        };
        reader.readAsDataURL(compressedBlob);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('techsoe-media')
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, logo_url: publicUrlData.publicUrl }));
    } catch (err: any) {
      console.error('Upload logo failed:', err);
      setErrorMsg('Gagal mengupload logo, silakan coba lagi atau masukkan URL langsung.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Nama klien/singkatan wajib diisi.');
      return;
    }
    if (!formData.logo_url.trim()) {
      setErrorMsg('Logo klien wajib diisi atau diupload.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const payload = {
        name: formData.name.trim(),
        full_name: formData.full_name.trim() || formData.name.trim(),
        logo_url: formData.logo_url.trim(),
        category: formData.category,
        description: formData.description.trim(),
        order_index: Number(formData.order_index) || 0,
        published: formData.published,
      };

      if (formData.id) {
        // Update
        const { error } = await supabase
          .from('clients')
          .update(payload)
          .eq('id', formData.id);

        if (error) throw error;
        onSuccess('Klien berhasil diperbarui!');
      } else {
        // Insert
        const { error } = await supabase
          .from('clients')
          .insert([payload]);

        if (error) throw error;
        onSuccess('Klien baru berhasil ditambahkan!');
      }

      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Gagal menyimpan data klien ke Supabase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {formData.id ? 'Edit Klien / Mitra' : 'Tambah Klien Baru'}
              </h2>
              <p className="text-xs text-slate-500">Kelola logo klien & instansi mitra TechSoe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Logo Upload & Preview */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Logo Klien / Instansi <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="relative w-20 h-16 bg-white border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center shrink-0 p-1">
                {formData.logo_url ? (
                  <Image
                    src={formData.logo_url}
                    alt="Preview Logo"
                    fill
                    unoptimized
                    className="object-contain p-1"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-300" />
                )}
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer transition shadow-sm">
                  {uploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                  ) : (
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                  )}
                  <span>{uploading ? 'Mengunggah...' : 'Upload Gambar Logo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  placeholder="Atau tempel URL gambar / path (misal: /logo-client/unsoed.png)"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="w-full text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Nama Singkat & Nama Lengkap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Singkat <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: UNSOED"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap / Instansi
              </label>
              <input
                type="text"
                placeholder="Contoh: Universitas Jenderal Soedirman"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Kategori & Urutan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white font-medium"
              >
                {DEFAULT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Urutan Tampil (Order Index)
              </label>
              <input
                type="number"
                placeholder="0"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Singkat
            </label>
            <input
              type="text"
              placeholder="Contoh: Universitas Negeri Terkemuka di Jawa Tengah"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
            />
          </div>

          {/* Status Published */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div>
              <div className="text-xs font-bold text-slate-800">Tampilkan di Beranda</div>
              <div className="text-[11px] text-slate-500">Logo akan tampil di bagian Klien Kami</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#172657] hover:bg-[#1f3373] text-white text-xs font-bold shadow-md shadow-[#172657]/20 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              {formData.id ? 'Perbarui Klien' : 'Simpan Klien'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

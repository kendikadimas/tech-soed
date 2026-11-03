import React from 'react';
import { Megaphone, Handshake, Sparkles, X, ArrowRight } from 'lucide-react';

interface QuickNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateType: 'launching' | 'handover') => void;
}

export default function QuickNewsModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: QuickNewsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-blue-600 mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Akses Cepat Buat Berita</span>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-2">
          Pilih Format Berita Resmi
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Sistem akan langsung mengisi template profesional siap pakai ke editor. Anda cukup menyesuaikan nama klien & tautan websitenya!
        </p>

        <div className="space-y-3.5">
          {/* Card 1: Serah Terima Web Klien */}
          <button
            type="button"
            onClick={() => onSelectTemplate('handover')}
            className="w-full text-left p-4 rounded-2xl border-2 border-emerald-100 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 transition-all group flex items-start gap-4 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Handshake className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Dokumentasi Serah Terima Web
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Client Handover
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                Format lengkap: Profil klien, tantangan bisnis, solusi teknologi yang dibangun, kutipan testimoni, dan link live web.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Card 2: Peluncuran / Launching Resmi */}
          <button
            type="button"
            onClick={() => onSelectTemplate('launching')}
            className="w-full text-left p-4 rounded-2xl border-2 border-purple-100 hover:border-purple-500 bg-purple-50/50 hover:bg-purple-50 transition-all group flex items-start gap-4 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
              <Megaphone className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                  Berita Peluncuran / Launching
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  Press Release
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                Format rilis resmi: Pengumuman go-live platform, fitur unggulan baru, visi masa depan, dan ajakan mencoba sistem.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-600 shrink-0 self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">Format otomatis tersusun dalam Markdown standar</span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}


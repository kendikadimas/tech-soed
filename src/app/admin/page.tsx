"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  FileText,
  FolderGit2,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Layers,
  Calendar,
  Loader2,
  ExternalLink,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { blogPosts as defaultBlogPosts } from '@/lib/blogData';
import AiPromptModal from './components/AiPromptModal';

// 8 Default Hero Projects
const defaultProjects = [
  { title: "Larasena AI Batik", category: "LMS & AI", sub_category: "Web & AI", image_url: "/projects/larasena.png", description: "Platform edukasi batik berbasis kecerdasan buatan", featured_hero: true, order_index: 1 },
  { title: "Jemari Point", category: "Company Profile", sub_category: "Landing Page", image_url: "/projects/jemari.png", description: "Website profil perusahaan modern & interaktif", featured_hero: true, order_index: 2 },
  { title: "Differlok Platform", category: "E-Learning LMS", sub_category: "LMS", image_url: "/projects/differlok.png", description: "Sistem manajemen pembelajaran daring multi-tenant", featured_hero: true, order_index: 3 },
  { title: "Damar Wulan System", category: "Water Service", sub_category: "Sistem Informasi", image_url: "/projects/damarwulan.png", description: "Sistem billing & manajemen air bersih desa", featured_hero: true, order_index: 4 },
  { title: "Website Kalisabuk", category: "Desa Portal", sub_category: "Pemerintahan", image_url: "/projects/kalisabuk.png", description: "Portal transparansi dan pelayanan publik desa", featured_hero: true, order_index: 5 },
  { title: "Rico Capital", category: "Fintech & Crypto", sub_category: "Fintech", image_url: "/projects/ricocapital.png", description: "Platform analitik pasar kripto dan instrumen investasi", featured_hero: true, order_index: 6 },
  { title: "Custom UI/UX App", category: "Mobile & SaaS", sub_category: "Mobile Apps", image_url: "/projects/about_mockup.png", description: "Perancangan UI/UX prototipe aplikasi mobile & web", featured_hero: true, order_index: 7 },
  { title: "TechSoe Studio", category: "Dev Team", sub_category: "Studio", image_url: "/projects/about_office.png", description: "Ruang kolaborasi tim pengembang perangkat lunak", featured_hero: true, order_index: 8 },
];

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'articles';

  const [articles, setArticles] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const supabase = createClient();

  // Load Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [artRes, projRes] = await Promise.all([
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*').order('order_index', { ascending: true }),
      ]);

      if (artRes.data) setArticles(artRes.data);
      if (projRes.data) setProjects(projRes.data);
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Gagal mengambil data dari Supabase.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Show Toast
  const showToast = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // Pre-populate Defaults
  const handleSeedArticles = async () => {
    if (!confirm('Masukkan 4 artikel awal bawaan TechSoe ke Supabase?')) return;
    setLoading(true);
    try {
      const formatted = defaultBlogPosts.map((b) => ({
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        author: b.author,
        image_url: b.image,
        read_time: b.readTime,
        published: true,
      }));

      const { error } = await supabase.from('articles').upsert(formatted, { onConflict: 'slug' });
      if (error) throw error;
      showToast('success', 'Artikel bawaan berhasil dimasukkan ke Supabase!');
      fetchData();
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menyimpan artikel');
      setLoading(false);
    }
  };

  const handleSeedProjects = async () => {
    if (!confirm('Masukkan 8 proyek bawaan (termasuk 3D Carousel) ke Supabase?')) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('projects').insert(defaultProjects);
      if (error) throw error;
      showToast('success', '8 Proyek awal berhasil dimasukkan ke Supabase!');
      fetchData();
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menyimpan proyek');
      setLoading(false);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      setArticles((prev) => prev.filter((a) => a.id !== id));
      showToast('success', 'Artikel berhasil dihapus!');
    } catch (err: any) {
      showToast('error', err.message);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus proyek ini?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('success', 'Proyek berhasil dihapus!');
    } catch (err: any) {
      showToast('error', err.message);
    }
  };

  // Toggle Featured Hero Directly
  const handleToggleHero = async (id: string, currentVal: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ featured_hero: !currentVal })
        .eq('id', id);
      if (error) throw error;
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured_hero: !currentVal } : p))
      );
      showToast('success', 'Status tampilan 3D Hero diperbarui!');
    } catch (err: any) {
      showToast('error', err.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {statusMsg && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-semibold transition-all ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* DASHBOARD HEADER BANNER (LIGHT THEME) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full w-fit mb-2 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dashboard Konten TechSoe</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {currentTab === 'articles' ? 'Kelola Artikel Blog' : 'Kelola Proyek Portofolio'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {currentTab === 'articles'
              ? `Terdapat total ${articles.length} artikel yang terdaftar di database Supabase.`
              : `Terdapat total ${projects.length} proyek portofolio, termasuk proyek silinder 3D Hero.`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
          </button>

          {currentTab === 'articles' ? (
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/admin/articles/new?paste=true"
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Tempel Teks AI</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsPromptModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-100 animate-pulse" />
                <span>Prompt AI</span>
              </button>
              <Link
                href="/admin/articles/new"
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#172657] hover:bg-[#1f3373] text-white text-xs font-bold shadow-md shadow-[#172657]/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" /> Tulis Artikel Baru
              </Link>
            </div>
          ) : (
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#172657] hover:bg-[#1f3373] text-white text-xs font-bold shadow-md shadow-[#172657]/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tambah Proyek Baru
            </Link>
          )}
        </div>
      </div>

      {/* ================= TAB 1: ARTIKEL BLOG ================= */}
      {currentTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Daftar Artikel Blog ({articles.length})
            </h2>

            {articles.length === 0 && (
              <button
                onClick={handleSeedArticles}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> Muat 4 Artikel Bawaan
              </button>
            )}
          </div>

          {loading ? (
            <div className="p-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
              <p className="text-sm font-semibold">Memuat artikel dari Supabase...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 shadow-sm text-slate-500">
              <FileText className="w-14 h-14 mx-auto text-slate-300 mb-4" />
              <h3 className="text-slate-900 font-bold text-lg mb-1">Belum ada artikel di database</h3>
              <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
                Mulai buat artikel baru menggunakan editor Word atau muat 4 artikel awal bawaan TechSoe.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleSeedArticles}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm"
                >
                  Muat 4 Artikel Bawaan
                </button>
                <Link
                  href="/admin/articles/new"
                  className="px-5 py-2.5 bg-[#172657] hover:bg-[#1f3373] text-white rounded-xl text-xs font-bold shadow-md shadow-[#172657]/20 transition"
                >
                  Tulis Artikel Sekarang
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                >
                  <div>
                    {art.image_url ? (
                      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-100">
                        <Image
                          src={art.image_url}
                          alt={art.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-32 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs mb-4">
                        Tidak ada cover
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {art.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          art.published
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {art.published ? 'Diterbitkan' : 'Draf'}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(art.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>

                    <div className="flex items-center gap-1">
                      <Link
                        href={`/blog/${art.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                        title="Lihat Artikel di Website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/articles/${art.id}/edit`}
                        className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                        title="Edit Artikel"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                        title="Hapus Artikel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: PROYEK & HERO 3D ================= */}
      {currentTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Daftar Proyek Portofolio ({projects.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Aktifkan tombol <strong>"Tampil di 3D Hero"</strong> untuk memasukkan proyek ke rotasi silinder 3D halaman depan.
              </p>
            </div>

            {projects.length === 0 && (
              <button
                onClick={handleSeedProjects}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> Muat 8 Proyek Bawaan
              </button>
            )}
          </div>

          {loading ? (
            <div className="p-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
              <p className="text-sm font-semibold">Memuat data proyek dari Supabase...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 shadow-sm text-slate-500">
              <FolderGit2 className="w-14 h-14 mx-auto text-slate-300 mb-4" />
              <h3 className="text-slate-900 font-bold text-lg mb-1">Belum ada proyek di database</h3>
              <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
                Gunakan tombol di bawah untuk langsung memuat 8 proyek awal ke database Supabase.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleSeedProjects}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm"
                >
                  Muat 8 Proyek Bawaan
                </button>
                <Link
                  href="/admin/projects/new"
                  className="px-5 py-2.5 bg-[#172657] hover:bg-[#1f3373] text-white rounded-xl text-xs font-bold shadow-md shadow-[#172657]/20 transition"
                >
                  Tambah Proyek Baru
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                >
                  <div>
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-3.5 bg-slate-100 border border-slate-100">
                      <Image
                        src={proj.image_url}
                        alt={proj.title}
                        fill
                        unoptimized
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#172657] text-white">
                        {proj.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold font-mono">
                        #{proj.order_index}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {/* Toggle Featured Hero */}
                    <button
                      onClick={() => handleToggleHero(proj.id, proj.featured_hero)}
                      className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        proj.featured_hero
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 font-extrabold'
                          : 'bg-slate-100 text-slate-400 border border-slate-200 hover:text-slate-600'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      {proj.featured_hero ? 'Tampil di 3D Hero' : 'Sembunyi dari Hero'}
                    </button>

                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/projects/${proj.id}/edit`}
                        className="p-1.5 px-2.5 rounded-lg text-blue-600 hover:bg-blue-50 cursor-pointer text-xs font-semibold flex items-center gap-1 transition"
                        title="Edit Proyek"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 px-2.5 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer text-xs font-semibold flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI Article Prompt Generator Modal */}
      <AiPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-2" />
          <p className="text-sm font-semibold">Memuat Dashboard...</p>
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}

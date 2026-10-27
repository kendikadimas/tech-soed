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
  EyeOff,
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
  BarChart3,
  Quote,
  Star,
  Database,
  Copy,
  Check,
  Terminal,
  Building2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { blogPosts as defaultBlogPosts } from '@/lib/blogData';
import { CLIENTS_DATA as defaultClientsData } from '../components/ClientsSection';
import AiPromptModal from './components/AiPromptModal';
import TestimonialModal, { TestimonialData } from './components/TestimonialModal';
import ClientModal, { ClientData } from './components/ClientModal';

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

// 5 Default Testimonials
const defaultTestimonials = [
  { name: 'Budi Santoso', role: 'Founder Larasena', text: 'TechSoe sangat inovatif dalam merancang sistem AI Batik kami. Tidak hanya sekadar website, tapi solusi nyata untuk operasional konveksi kami.', rating: 5, published: true },
  { name: 'Ani Wijaya', role: 'Manager Jemari Point', text: 'Sistem manajemen stok emas yang dibangun membantu kami memantau transaksi secara real-time. Sangat membantu efisiensi toko.', rating: 5, published: true },
  { name: 'Haji Darmawan', role: 'Ketua KP-SPAMS', text: 'Layanan air warga kini jadi lebih transparan dan modern. Fitur laporan bulanan dan cek pelanggan sangat memudahkan administrasi kami.', rating: 5, published: true },
  { name: 'Siti Aminah', role: 'Owner Kedai Kopi', text: 'Website landing page yang dibuat sangat cepat dan responsif. Sejak launching, pesanan dari WhatsApp meningkat drastis.', rating: 5, published: true },
  { name: 'Rahmat Hidayat', role: 'CEO Tech Solution', text: 'Partner development yang bisa diandalkan. Komunikasi lancar dan hasil pengerjaan tepat waktu sesuai deadline yang sudah disepakati.', rating: 5, published: true },
];

const testimonialsSqlScript = `-- Jalankan skrip ini di Supabase Dashboard -> SQL Editor
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    avatar_url TEXT,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update testimonials" ON public.testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete testimonials" ON public.testimonials FOR DELETE USING (true);`;

const clientsSqlScript = `-- Jalankan skrip ini di Supabase Dashboard -> SQL Editor
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    full_name TEXT,
    logo_url TEXT NOT NULL,
    category TEXT,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access clients" ON public.clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon insert clients" ON public.clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update clients" ON public.clients FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete clients" ON public.clients FOR DELETE USING (true);`;

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'articles';

  const [articles, setArticles] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [missingTestimonialsTable, setMissingTestimonialsTable] = useState(false);
  const [missingClientsTable, setMissingClientsTable] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedClientsSql, setCopiedClientsSql] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialData | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const supabase = createClient();

  // Load Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [artRes, projRes, testiRes, clientRes] = await Promise.all([
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*').order('order_index', { ascending: true }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('clients').select('*').order('order_index', { ascending: true }),
      ]);

      if (artRes.data) setArticles(artRes.data);
      if (projRes.data) setProjects(projRes.data);

      if (testiRes.error) {
        if (
          testiRes.error.message.includes('testimonials') ||
          testiRes.error.message.includes('schema cache') ||
          testiRes.error.code === '42P01'
        ) {
          setMissingTestimonialsTable(true);
        }
      } else if (testiRes.data) {
        setTestimonials(testiRes.data);
        setMissingTestimonialsTable(false);
      }

      if (clientRes.error) {
        if (
          clientRes.error.message.includes('clients') ||
          clientRes.error.message.includes('schema cache') ||
          clientRes.error.code === '42P01'
        ) {
          setMissingClientsTable(true);
        }
      } else if (clientRes.data) {
        setClients(clientRes.data);
        setMissingClientsTable(false);
      }
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

  const handleCopySql = () => {
    navigator.clipboard.writeText(testimonialsSqlScript);
    setCopiedSql(true);
    showToast('success', 'Skrip SQL berhasil disalin ke clipboard!');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // Pre-populate Defaults
  const handleSeedArticles = async () => {
    if (!confirm('Sinkronkan artikel awal bawaan TechSoe ke Supabase?')) return;
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

  // Seed Default Testimonials
  const handleSeedTestimonials = async () => {
    if (!confirm('Masukkan 5 testimoni awal ke Supabase?')) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('testimonials').insert(defaultTestimonials);
      if (error) {
        if (
          error.message.includes('testimonials') ||
          error.message.includes('schema cache') ||
          error.code === '42P01'
        ) {
          setMissingTestimonialsTable(true);
          throw new Error('Tabel public.testimonials belum dibuat di Supabase. Silakan buat tabel menggunakan Skrip SQL di bawah terlebih dahulu.');
        }
        throw error;
      }
      showToast('success', '5 Testimoni awal berhasil dimasukkan ke Supabase!');
      setMissingTestimonialsTable(false);
      fetchData();
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menyimpan testimoni');
      setLoading(false);
    }
  };

  // Seed Default Clients
  const handleSeedClients = async () => {
    if (!confirm('Masukkan 8 klien & mitra bawaan ke Supabase?')) return;
    setLoading(true);
    try {
      const formatted = defaultClientsData.map((c, idx) => ({
        name: c.name,
        full_name: c.fullName,
        logo_url: c.logo,
        category: c.category,
        description: c.description,
        order_index: idx + 1,
        published: true,
      }));

      const { error } = await supabase.from('clients').insert(formatted);
      if (error) {
        if (
          error.message.includes('clients') ||
          error.message.includes('schema cache') ||
          error.code === '42P01'
        ) {
          setMissingClientsTable(true);
          throw new Error('Tabel public.clients belum dibuat di Supabase. Silakan buat tabel menggunakan Skrip SQL di bawah terlebih dahulu.');
        }
        throw error;
      }
      showToast('success', '8 Klien awal berhasil dimasukkan ke Supabase!');
      setMissingClientsTable(false);
      fetchData();
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menyimpan klien');
      setLoading(false);
    }
  };

  const handleCopyClientsSql = () => {
    navigator.clipboard.writeText(clientsSqlScript);
    setCopiedClientsSql(true);
    showToast('success', 'Skrip SQL tabel klien berhasil disalin ke clipboard!');
    setTimeout(() => setCopiedClientsSql(false), 3000);
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

  // Delete Testimonial
  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      showToast('success', 'Testimoni berhasil dihapus!');
    } catch (err: any) {
      showToast('error', err.message);
    }
  };

  // Toggle Publish Testimonial Directly
  const handleTogglePublishTestimonial = async (id: string, currentVal: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ published: !currentVal })
        .eq('id', id);
      if (error) throw error;
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, published: !currentVal } : t))
      );
      showToast('success', `Testimoni ${!currentVal ? 'diterbitkan' : 'disembunyikan'}!`);
    } catch (err: any) {
      showToast('error', err.message);
    }
  };

  // Delete Client
  const handleDeleteClient = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data klien ini?')) return;
    try {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (error) throw error;
      setClients((prev) => prev.filter((c) => c.id !== id));
      showToast('success', 'Klien berhasil dihapus!');
    } catch (err: any) {
      showToast('error', err.message);
    }
  };

  // Toggle Publish Client
  const handleTogglePublishClient = async (id: string, currentVal: boolean) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({ published: !currentVal })
        .eq('id', id);
      if (error) throw error;
      setClients((prev) =>
        prev.map((c) => (c.id === id ? { ...c, published: !currentVal } : c))
      );
      showToast('success', `Klien ${!currentVal ? 'ditampilkan' : 'disembunyikan'}!`);
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
            {currentTab === 'articles'
              ? 'Kelola Artikel Blog'
              : currentTab === 'testimonials'
              ? 'Kelola Testimoni Klien'
              : currentTab === 'clients'
              ? 'Kelola Logo Klien & Mitra'
              : 'Kelola Proyek Portofolio'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {currentTab === 'articles'
              ? `Terdapat total ${articles.length} artikel yang terdaftar di database Supabase.`
              : currentTab === 'testimonials'
              ? `Terdapat total ${testimonials.length} testimoni yang terdaftar di database Supabase.`
              : currentTab === 'clients'
              ? `Terdapat total ${clients.length} logo klien & instansi mitra di database Supabase.`
              : `Terdapat total ${projects.length} proyek portofolio, termasuk proyek silinder 3D Hero.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/analytics"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors shadow-sm"
          >
            <BarChart3 className="w-4 h-4 text-slate-700" /> Dashboard Analytics
          </Link>
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
          ) : currentTab === 'testimonials' ? (
            <button
              type="button"
              onClick={() => {
                setEditingTestimonial(null);
                setIsTestimonialModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#172657] hover:bg-[#1f3373] text-white text-xs font-bold shadow-md shadow-[#172657]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Tambah Testimoni Baru
            </button>
          ) : currentTab === 'clients' ? (
            <button
              type="button"
              onClick={() => {
                setEditingClient(null);
                setIsClientModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#172657] hover:bg-[#1f3373] text-white text-xs font-bold shadow-md shadow-[#172657]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Tambah Klien Baru
            </button>
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

            <div className="flex items-center gap-2">
              <button
                onClick={handleSeedArticles}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition cursor-pointer"
                title="Sinkronkan semua artikel bawaan dari file statis ke database Supabase"
              >
                <Sparkles className="w-3.5 h-3.5" /> Sinkronkan Artikel Bawaan
              </button>
            </div>
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
                Mulai buat artikel baru menggunakan editor Word atau sinkronkan artikel awal bawaan TechSoe ke Supabase.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleSeedArticles}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm"
                >
                  Sinkronkan Artikel Bawaan
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

      {/* ================= TAB 3: TESTIMONI KLIEN ================= */}
      {currentTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Daftar Testimoni Klien ({testimonials.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Testimoni aktif akan secara otomatis tampil di section <strong>"Apa Kata Mereka"</strong> pada Landing Page.
              </p>
            </div>

            {testimonials.length === 0 && (
              <button
                onClick={handleSeedTestimonials}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> Muat 5 Testimoni Bawaan
              </button>
            )}
          </div>

          {missingTestimonialsTable && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    Tabel <code className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-xs font-mono">public.testimonials</code> Belum Dibuat di Supabase
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Supabase memerlukan tabel <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono">testimonials</code> agar data testimoni bisa disimpan & dikelola via admin.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" /> Skrip SQL Pembuatan Tabel Testimonials
                  </span>
                  <button
                    onClick={handleCopySql}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer shadow"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Tersalin!' : 'Salin Skrip SQL'}</span>
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-emerald-400 overflow-x-auto bg-slate-950/80 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  {testimonialsSqlScript}
                </pre>
              </div>

              <div className="text-xs text-slate-700 bg-white/80 border border-amber-200 p-4 rounded-2xl space-y-1.5">
                <p className="font-bold text-slate-900">Cara mudah membuat tabel di Supabase:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>Klik tombol <strong>"Salin Skrip SQL"</strong> di atas.</li>
                  <li>Buka Dashboard Supabase Anda &rarr; Pilih menu <strong>SQL Editor</strong> &rarr; Klik <strong>New query</strong>.</li>
                  <li>Tempel (Paste) kode SQL di atas lalu tekan <strong>Run</strong>.</li>
                  <li>Setelah itu kembali ke halaman ini dan tekan <strong>Refresh Data</strong> (atau <strong>Muat 5 Testimoni Bawaan</strong>).</li>
                </ol>
              </div>
            </div>
          )}

          {loading ? (
            <div className="p-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
              <p className="text-sm font-semibold">Memuat testimoni dari Supabase...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 shadow-sm text-slate-500">
              <Quote className="w-14 h-14 mx-auto text-slate-300 mb-4" />
              <h3 className="text-slate-900 font-bold text-lg mb-1">Belum ada testimoni di database</h3>
              <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
                Gunakan tombol di bawah untuk memasukkan 5 testimoni bawaan atau buat testimoni baru.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleSeedTestimonials}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm"
                >
                  Muat 5 Testimoni Bawaan
                </button>
                <button
                  onClick={() => {
                    setEditingTestimonial(null);
                    setIsTestimonialModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#172657] hover:bg-[#1f3373] text-white rounded-xl text-xs font-bold shadow-md shadow-[#172657]/20 transition"
                >
                  Tambah Testimoni Baru
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-300 relative group"
                >
                  <div>
                    {/* Header Card: Rating & Published Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          item.published !== false
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {item.published !== false ? 'Diterbitkan' : 'Draf'}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6 italic">
                      &quot;{item.text}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {/* Client Profile */}
                    <div className="flex items-center gap-3">
                      {item.avatar_url ? (
                        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-sm bg-[#172657]">
                          <Image
                            src={item.avatar_url}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#172657] text-white font-black text-sm flex items-center justify-center shrink-0">
                          {item.name ? item.name.charAt(0) : 'K'}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.name}</h4>
                        <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
                          {item.role || 'Klien TechSoe'}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePublishTestimonial(item.id, item.published !== false)}
                        className={`p-1.5 rounded-lg text-xs transition ${
                          item.published !== false
                            ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={item.published !== false ? 'Sembunyikan dari Landing Page' : 'Tampilkan di Landing Page'}
                      >
                        {item.published !== false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setEditingTestimonial(item);
                          setIsTestimonialModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                        title="Edit Testimoni"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(item.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                        title="Hapus Testimoni"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Testimonial Modal */}
          <TestimonialModal
            isOpen={isTestimonialModalOpen}
            onClose={() => setIsTestimonialModalOpen(false)}
            onSuccess={(msg) => {
              showToast('success', msg);
              fetchData();
            }}
            testimonialToEdit={editingTestimonial}
          />
        </div>
      )}

      {/* ================= TAB 4: KLIEN & MITRA ================= */}
      {currentTab === 'clients' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Daftar Logo Klien & Mitra ({clients.length})
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSeedClients}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition cursor-pointer"
                title="Masukkan 8 klien default (UNSOED, BI, Pertamina, dll) ke Supabase"
              >
                <Sparkles className="w-3.5 h-3.5" /> Muat 8 Klien Bawaan
              </button>
            </div>
          </div>

          {/* Warning Banner if Table Missing */}
          {missingClientsTable && (
            <div className="p-6 bg-amber-50/90 border border-amber-300 rounded-3xl space-y-4 shadow-sm animate-in fade-in duration-300">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-900">
                      Tabel <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-950 font-mono">public.clients</code> Belum Dibuat di Supabase
                    </h3>
                    <p className="text-xs text-amber-800 mt-1 max-w-2xl leading-relaxed">
                      Untuk menyimpan dan mengelola logo klien secara dinamis, jalankan skrip SQL berikut di SQL Editor Supabase Anda.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyClientsSql}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition shadow-sm shrink-0 cursor-pointer"
                >
                  {copiedClientsSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedClientsSql ? 'Tersalin!' : 'Salin Skrip SQL'}</span>
                </button>
              </div>

              {/* Collapsible SQL Script Box */}
              <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl text-[11px] font-mono overflow-x-auto relative group">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 text-[10px]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-emerald-400" /> Skrip SQL Tabel Klien
                  </span>
                  <span>PostgreSQL (Supabase)</span>
                </div>
                <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">{clientsSqlScript}</pre>
              </div>

              <div className="text-xs text-slate-700 bg-white/80 border border-amber-200 p-4 rounded-2xl space-y-1.5">
                <p className="font-bold text-slate-900">Cara mudah membuat tabel di Supabase:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>Klik tombol <strong>"Salin Skrip SQL"</strong> di atas.</li>
                  <li>Buka Dashboard Supabase Anda &rarr; Pilih menu <strong>SQL Editor</strong> &rarr; Klik <strong>New query</strong>.</li>
                  <li>Tempel (Paste) kode SQL di atas lalu tekan <strong>Run</strong>.</li>
                  <li>Setelah itu kembali ke halaman ini dan tekan <strong>Refresh Data</strong> (atau <strong>Muat 8 Klien Bawaan</strong>).</li>
                </ol>
              </div>
            </div>
          )}

          {loading ? (
            <div className="p-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
              <p className="text-sm font-semibold">Memuat logo klien dari Supabase...</p>
            </div>
          ) : clients.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 shadow-sm text-slate-500">
              <Building2 className="w-14 h-14 mx-auto text-slate-300 mb-4" />
              <h3 className="text-slate-900 font-bold text-lg mb-1">Belum ada logo klien di database</h3>
              <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
                Gunakan tombol di bawah untuk memasukkan 8 logo klien bawaan TechSoe atau tambahkan klien baru secara manual.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleSeedClients}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm"
                >
                  Muat 8 Klien Bawaan
                </button>
                <button
                  onClick={() => {
                    setEditingClient(null);
                    setIsClientModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#172657] hover:bg-[#1f3373] text-white rounded-xl text-xs font-bold shadow-md shadow-[#172657]/20 transition"
                >
                  Tambah Klien Baru
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {clients.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-300 relative group"
                >
                  <div>
                    {/* Header: Category & Published Status */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[140px]">
                        {item.category || 'Mitra'}
                      </span>
                      <button
                        onClick={() => handleTogglePublishClient(item.id, item.published)}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition cursor-pointer flex items-center gap-1 ${
                          item.published
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Klik untuk mengubah status visibilitas"
                      >
                        {item.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{item.published ? 'Tampil' : 'Sembunyi'}</span>
                      </button>
                    </div>

                    {/* Logo Box */}
                    <div className="relative w-full h-24 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-3 mb-4 group-hover:bg-blue-50/20 transition">
                      <Image
                        src={item.logo_url}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Client Info */}
                    <h3 className="font-bold text-slate-900 text-sm leading-snug truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                      {item.full_name || item.name}
                    </p>
                    {item.description && (
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Urutan: #{item.order_index ?? 0}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingClient(item);
                          setIsClientModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                        title="Edit Klien"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(item.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                        title="Hapus Klien"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Client Modal */}
          <ClientModal
            isOpen={isClientModalOpen}
            onClose={() => setIsClientModalOpen(false)}
            onSuccess={(msg) => {
              showToast('success', msg);
              fetchData();
            }}
            clientToEdit={editingClient}
          />
        </div>
      )}
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

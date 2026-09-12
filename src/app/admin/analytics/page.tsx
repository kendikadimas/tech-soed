"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  FileText,
  Eye,
  ExternalLink,
  RefreshCw,
  Loader2,
  Globe,
  ArrowLeft,
  Activity,
  Users,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { blogPosts as defaultBlogPosts } from '@/lib/blogData';

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [articleViews, setArticleViews] = useState<{ [slug: string]: number }>({});
  const [totalViews, setTotalViews] = useState(0);
  const [articlesList, setArticlesList] = useState<any[]>([]);

  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-D20W7Q7SCK";

  const fetchAnalyticsData = async () => {
    setLoading(true);
    const supabase = createClient();

    try {
      const { data: dbArticles } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      let combinedArticles = [...defaultBlogPosts];
      if (dbArticles && dbArticles.length > 0) {
        const dbSlugs = new Set(dbArticles.map(a => a.slug));
        const nonDuplicateDefaults = defaultBlogPosts.filter(p => !dbSlugs.has(p.slug));
        combinedArticles = [...dbArticles, ...nonDuplicateDefaults];
      }
      setArticlesList(combinedArticles);

      const { data: viewsData, error: viewsErr } = await supabase
        .from('article_views')
        .select('slug, view_count');

      if (!viewsErr && viewsData) {
        const viewsMap: { [slug: string]: number } = {};
        let total = 0;
        viewsData.forEach((row: any) => {
          viewsMap[row.slug] = row.view_count || 0;
          total += row.view_count || 0;
        });
        setArticleViews(viewsMap);
        setTotalViews(total);
      }
    } catch (err) {
      console.error("Error fetching analytics data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const sortedArticles = [...articlesList].map(art => ({
    ...art,
    views: articleViews[art.slug] || 0
  })).sort((a, b) => b.views - a.views);

  const maxViews = Math.max(...sortedArticles.map(a => a.views), 1);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-start sm:items-center gap-3">
          <Link
            href="/admin"
            className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Analytics & Traffic Overview
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Ringkasan performa pembaca artikel dan status integrasi Google Analytics 4.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchAnalyticsData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            Google Analytics
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* GA4 Integration Panel (Clean Monochromatic Enterprise Design) */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-sm border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Tracking Active (.env.local)
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Google Analytics 4 Measurement ID
            </h2>
          </div>
          <div className="font-mono text-sm px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 self-start sm:self-center">
            {gaId}
          </div>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
          Seluruh kunjungan halaman website telah terhubung secara langsung ke dashboard Google Analytics 4. Anda dapat melihat detail negara, kota, jenis perangkat, serta sumber lalu lintas di console GA4.
        </p>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Views Artikel</span>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {loading ? <Loader2 className="w-5 h-5 animate-spin text-slate-400" /> : totalViews.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500">Jumlah pembaca di seluruh artikel</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Artikel Terpublikasi</span>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {loading ? <Loader2 className="w-5 h-5 animate-spin text-slate-400" /> : articlesList.length}
          </div>
          <p className="text-xs text-slate-500">Total artikel aktif di database</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Google Tag Status</span>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-mono font-bold text-slate-900 truncate">
            {gaId}
          </div>
          <p className="text-xs text-slate-500">Tersambung via Next.js Layout</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Laporan Lengkap</span>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:underline"
          >
            Buka Console GA4
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
          <p className="text-xs text-slate-500">Demografi & traffic channel</p>
        </div>
      </div>

      {/* Top Read Articles Clean Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-700" />
              Peringkat Artikel Populer
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Urutan artikel berdasarkan frekuensi dibaca pengunjung.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {sortedArticles.length} Artikel
          </span>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-slate-600" />
            <p className="text-xs font-medium">Memuat data statistik...</p>
          </div>
        ) : sortedArticles.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            Belum ada statistik pembaca.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sortedArticles.map((art, idx) => {
              const percentage = maxViews > 0 ? Math.round((art.views / maxViews) * 100) : 0;
              return (
                <div key={art.slug || idx} className="py-4 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-200">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <Link
                          href={`/blog/${art.slug}`}
                          target="_blank"
                          className="text-sm font-semibold text-slate-900 hover:text-slate-600 truncate block transition-colors"
                        >
                          {art.title}
                        </Link>
                        <span className="text-[11px] text-slate-400 font-mono">/blog/{art.slug}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        {art.views} views
                      </span>
                    </div>
                  </div>

                  {/* Clean Subtle Progress Bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-800 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(percentage, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

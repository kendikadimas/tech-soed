"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  Search,
  Tag,
  BookOpen,
  ChevronRight,
  User,
} from 'lucide-react';
import { blogPosts as defaultBlogPosts } from '@/lib/blogData';
import { createClient } from '@/lib/supabase/client';

export default function BlogIndexPage() {
  const [articles, setArticles] = useState<any[]>(defaultBlogPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [loading, setLoading] = useState(true);

  // Fetch articles from Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map((art) => ({
            id: art.id,
            slug: art.slug,
            title: art.title,
            category: art.category || 'Bisnis & Teknologi',
            excerpt: art.excerpt || '',
            image: art.image_url || '/projects/blog_1.png',
            author: art.author || 'TechSoe Team',
            readTime: art.read_time || '4 Menit Baca',
            date: art.created_at
              ? new Date(art.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Terbaru',
          }));
          setArticles(mapped);
        } else {
          setArticles(defaultBlogPosts);
        }
      } catch (err) {
        console.warn('BlogIndexPage: using fallback defaultBlogPosts', err);
        setArticles(defaultBlogPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter Categories list
  const categories = [
    'Semua',
    'Bisnis & Teknologi',
    'Web Development',
    'Mobile Apps',
    'UI/UX Design',
    'Tutorial & Tips',
  ];

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCategory =
        selectedCategory === 'Semua' ||
        art.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        !searchQuery.trim() ||
        art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Featured article is the first article when viewing 'Semua' and no search query
  const featuredArticle =
    selectedCategory === 'Semua' && !searchQuery.trim() && filteredArticles.length > 0
      ? filteredArticles[0]
      : null;

  // The rest of the articles for the grid
  const gridArticles = featuredArticle
    ? filteredArticles.slice(1)
    : filteredArticles;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors pb-24 sm:pb-32">
      {/* ================= 1. CLEAN WHITE HERO SECTION (FULL-WIDTH) ================= */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 px-5 sm:px-6 overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-slate-800">
        {/* Soft Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-100/80 via-indigo-50/50 to-transparent dark:from-blue-600/20 dark:via-indigo-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-blue-100/60 dark:bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Subtle Modern Dot Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:28px_28px] opacity-70 dark:opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172657]/5 dark:bg-blue-950/60 border border-[#172657]/20 dark:border-blue-800 text-[#172657] dark:text-blue-300 text-xs font-bold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#172657] dark:text-blue-400 animate-pulse" />
            <span>TechSoe Insights & Blog</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white">
            Wawasan Digital, <br className="hidden sm:inline" />
            <span className="text-[#172657] dark:text-blue-400">
              Software Engineering & Bisnis
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Eksplorasi mendalam seputar arsitektur website modern, strategi transformasi digital,
            perancangan UI/UX, dan tips teknologi dari tim engineer TechSoe.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus-within:border-[#172657] focus-within:ring-4 focus-within:ring-[#172657]/15 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik artikel (contoh: Website, UI/UX, Software House)..."
                className="w-full bg-transparent px-3 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-3 px-2 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 rounded-lg cursor-pointer transition"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Non-Sticky, Perfectly Aligned) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#172657] dark:bg-blue-600 text-white shadow-md shadow-[#172657]/20 scale-105'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 3. MAIN ARTICLES SECTION ================= */}
      <main className="max-w-7xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 space-y-12">
        {/* FEATURED ARTICLE (IF AVAILABLE) */}
        {featuredArticle && (
          <div className="relative group">
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-900 transition-all duration-300"
            >
              {/* Image Preview */}
              <div className="lg:col-span-7 relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3 h-3" />
                    Artikel Unggulan
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
                      {featuredArticle.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 flex items-center justify-center font-bold text-xs">
                      T
                    </div>
                    <span>{featuredArticle.author}</span>
                    <span>&bull;</span>
                    <span>{featuredArticle.date}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    Baca Artikel <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ARTICLES GRID */}
        <div>
          {featuredArticle && (
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-6">
              Artikel Lainnya
            </h3>
          )}

          {gridArticles.length === 0 ? (
            <div className="p-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <BookOpen className="w-12 h-12 mx-auto text-slate-400" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Tidak ada artikel yang cocok
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                }}
                className="px-5 py-2.5 bg-[#172657] dark:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer hover:bg-[#1f3373] transition-all"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gridArticles.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-bold border border-white/60 shadow-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Metadata: Read Time */}
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium mb-2">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.date}</span>
                    </div>

                    <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Baca <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

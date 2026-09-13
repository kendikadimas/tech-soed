"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import { createClient } from '@/lib/supabase/client';

export default function LatestArticles() {
  const [posts, setPosts] = useState<any[]>([...blogPosts].reverse().slice(0, 3));

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (!error && data && data.length > 0) {
          const mapped = data.map((art) => ({
            id: art.id,
            slug: art.slug,
            title: art.title,
            category: art.category,
            excerpt: art.excerpt,
            date: art.created_at
              ? new Date(art.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Terbaru',
          }));
          setPosts(mapped);
        }
      } catch (err) {
        console.warn('LatestArticles: using fallback blog posts', err);
      }
    };

    fetchLatest();
  }, []);

  const recentPosts = posts;

  return (
    <section className="py-14 lg:py-16 bg-slate-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl text-left">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white transition-colors mb-2 tracking-tight">
              Wawasan <span className="text-blue-900 dark:text-blue-400">Digital Purwokerto</span>
            </h2>
            <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 transition-colors font-medium leading-relaxed">
              Tips dan strategi pengembangan website, aplikasi mobile, serta solusi IT terintegrasi sebagai Partner Digital Professional Anda di Banyumas.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-1.5 text-xs lg:text-sm text-blue-900 dark:text-blue-400 font-bold hover:gap-2.5 transition-all"
          >
            Lihat Semua Artikel <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[85%] md:min-w-0 snap-center"
            >
              <Link 
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300"
              >
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800/50 transition-colors inline-block w-fit">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] font-semibold whitespace-nowrap shrink-0">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 transition-colors text-[11px] sm:text-xs leading-relaxed mb-4 line-clamp-2 font-medium">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors flex items-center text-blue-900 dark:text-blue-300 font-bold text-xs">
                    Baca Selengkapnya
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:ml-2.5 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

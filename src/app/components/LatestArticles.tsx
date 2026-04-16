"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blogData';

export default function LatestArticles() {
  // Take the 3 latest posts
  const recentPosts = [...blogPosts].reverse().slice(0, 3);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white transition-colors mb-4 tracking-tight">
              Wawasan <span className="text-blue-900 dark:text-blue-400">Digital Purwokerto</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 transition-colors font-medium leading-relaxed">
              Tips dan strategi pengembangan website, aplikasi mobile, serta solusi IT terintegrasi sebagai Partner Digital Professional Anda di Banyumas.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-2 text-blue-900 dark:text-blue-400 font-bold hover:gap-3 transition-all"
          >
            Lihat Semua Artikel <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide">
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
                className="group flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
              >
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800/50 transition-colors">
                      {post.category}
                    </span>
                    <div className="ml-auto flex items-center gap-1.5 text-slate-400 text-[10px] font-bold whitespace-nowrap shrink-0">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 transition-colors text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-700 transition-colors flex items-center text-blue-900 dark:text-blue-300 font-bold text-sm">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" />
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

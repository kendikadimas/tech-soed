"use client";

import React from 'react';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';

export default function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-20 sm:pb-28 transition-colors">

            {/* HEADER HERO */}
            <section className="pt-32 sm:pt-36 pb-14 sm:pb-20 px-5 sm:px-6 relative overflow-hidden bg-slate-900 dark:bg-slate-900 text-center rounded-b-[2.5rem] sm:rounded-b-[4rem] shadow-sm transition-colors">
                <div className="absolute top-0 right-0 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-blue-600 rounded-full blur-[80px] sm:blur-[100px] opacity-30 transform translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 left-0 w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] bg-blue-900 rounded-full blur-[70px] sm:blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2 z-0"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-blue-500/30">
                        <BookOpen className="w-7 h-7 sm:w-10 sm:h-10 text-blue-400" />
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                        Wawasan Digital & Teknologi
                    </h1>
                    <p className="text-sm sm:text-lg text-slate-300 sm:text-slate-400 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
                        Insight mendalam dari sudut pandang engineer TechSoe, perancangan antarmuka, hingga analisis taktis manajemen IT perusahaan yang revolusioner.
                    </p>
                </div>
            </section>

            {/* BLOG GRID */}
            <section className="max-w-7xl mx-auto px-5 sm:px-6 mt-10 sm:mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                    {blogPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white dark:bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 overflow-hidden flex flex-col h-full">
                            <div className="p-6 sm:p-8 flex flex-col flex-1">
                                <div className="mb-4 bg-slate-50 dark:bg-slate-800/70 w-fit px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold text-blue-600 dark:text-blue-300 border border-slate-100 dark:border-slate-700 transition-colors">
                                    {post.category}
                                </div>
                                <h3 className="text-[1.85rem] sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1 transition-colors">
                                    {post.excerpt}
                                </p>
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> {post.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
                                        Baca Lengkap <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

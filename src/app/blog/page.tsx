import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog & Artikel | TechSoed Purwokerto',
    description: 'Kumpulan artikel seputar teknologi, panduan membuat website, tips memilih software house, layanan web developer, dan UI/UX design dengan fokus pada bisnis digital modern di Purwokerto.',
    keywords: ["berita teknologi", "blog techsoed", "artikel software house", "tips bisnis digital", "pembuatan website purwokerto"],
};

export default function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-32">
            {/* FLOATING NAVBAR */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-sm rounded-full px-6 py-3 w-full max-w-5xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded relative flex items-center justify-center">
                            <div className="w-6 h-6 bg-blue-600 rounded-sm transform rotate-45 relative">
                                <div className="absolute -top-1.5 -left-1.5 w-2 h-2 bg-blue-400 rounded-full"></div>
                                <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-blue-400 rounded-full"></div>
                            </div>
                            <div className="w-3 h-3 bg-white absolute z-10 rounded-sm transform rotate-45"></div>
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-slate-900">TechSoed</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/" className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
                        </Link>
                    </div>
                </nav>
            </div>

            {/* HEADER HERO */}
            <section className="pt-48 pb-20 px-6 relative overflow-hidden bg-slate-900 text-center rounded-b-[4rem] shadow-sm">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px] opacity-30 transform translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2 z-0"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
                        <BookOpen className="w-10 h-10 text-blue-400" />
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Wawasan Digital & Teknologi
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Insight mendalam dari sudut pandang engineer TechSoed, perancangan antarmuka, hingga analisis taktis manajemen IT perusahaan yang revolusioner.
                    </p>
                </div>
            </section>

            {/* BLOG GRID */}
            <section className="max-w-7xl mx-auto px-6 mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                            <div className="relative h-64 overflow-hidden bg-slate-200">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> {post.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
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

"use client";

import React from 'react';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import { Navbar, Footer } from '../components';

export default function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-32">

            {/* HEADER HERO */}
            <section className="pt-20 pb-20 px-6 relative overflow-hidden bg-slate-900 text-center rounded-b-[4rem] shadow-sm">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px] opacity-30 transform translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900 rounded-full blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2 z-0"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
                        <BookOpen className="w-10 h-10 text-blue-400" />
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Wawasan Digital & Teknologi
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Insight mendalam dari sudut pandang engineer TechSoe, perancangan antarmuka, hingga analisis taktis manajemen IT perusahaan yang revolusioner.
                    </p>
                </div>
            </section>

            {/* BLOG GRID */}
            <section className="max-w-7xl mx-auto px-6 mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                            <div className="p-8 flex flex-col flex-1">
                                <div className="mb-4 bg-slate-50 w-fit px-3 py-1 rounded-full text-xs font-bold text-blue-600 border border-slate-100">
                                    {post.category}
                                </div>
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

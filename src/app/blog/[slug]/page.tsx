import React from 'react';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';

type Props = {
    params: Promise<{ slug: string }>
}

// Dynamic SEO Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) {
        return {
            title: 'Artikel Tidak Ditemukan | TechSoed',
            description: 'Konten artikel blog tidak tersedia.',
        };
    }

    return {
        title: post.title + " | TechSoed Blog",
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        }
    };
}

// Generate static routes at build time (Optional for full static export)
export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 pb-32">
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
                        <Link href="/blog" className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Kembali ke Artikel
                        </Link>
                    </div>
                </nav>
            </div>

            {/* HERO ARTICLE HEADER */}
            <section className="pt-48 pb-16 px-6 relative bg-slate-50 border-b border-slate-100">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-blue-100 text-blue-700 font-bold uppercase tracking-wider text-xs px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                            <Tag className="w-3 h-3" /> {post.category}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-500 mb-10">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-500" /> Oleh {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-500" /> {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500" /> {post.readTime}
                        </div>
                    </div>
                </div>
            </section>

            {/* COVER IMAGE */}
            <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
                <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-xl bg-slate-200 border border-slate-100">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
            </section>

            {/* MAIN ARTICLE BODY */}
            <article className="max-w-3xl mx-auto px-6 mt-16 text-lg text-slate-600 leading-relaxed font-medium pb-20 border-b border-slate-100">
                {/* Parse Markdown content cleanly */}
                <div className="prose prose-lg prose-slate prose-blue max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-img:rounded-2xl prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>

            {/* CALL TO ACTION BOTTOM */}
            <div className="max-w-3xl mx-auto px-6 mt-12 text-center bg-blue-50 rounded-3xl p-10 border border-blue-100 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Butuh Website atau Digitalisasi untuk Bisnis Anda?</h3>
                <p className="text-slate-600 mb-8">Pakar kami siap mendengarkan visi Anda dan menawarkaan konsultasi arsitektur perangkat lunak dengan optimal tanpa biaya tersembunyi.</p>
                <Link href="/#harga" className="inline-flex bg-blue-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:bg-blue-700 transition">
                    Tertarik Konsultasi Gratis
                </Link>
            </div>
        </div>
    );
}

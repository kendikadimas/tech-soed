import React from 'react';
import { Calendar, User, Clock, Tag, ArrowLeft } from 'lucide-react';
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
            title: 'Artikel Tidak Ditemukan | TechSoe',
            description: 'Konten artikel blog tidak tersedia.',
        };
    }

    return {
        title: post.title + " | TechSoe Blog",
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-24 sm:pb-32 transition-colors">

            {/* HERO ARTICLE HEADER */}
            <section className="pt-32 sm:pt-36 pb-10 sm:pb-14 px-5 sm:px-6 relative transition-colors">
                <div className="animate-blog-header max-w-4xl mx-auto rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-10 shadow-sm transition-colors">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors mb-5"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Artikel
                    </Link>
                    <div className="flex items-center gap-3 mb-5">
                        <span className="bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-black uppercase tracking-widest text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full inline-flex items-center gap-2 border border-blue-100 dark:border-blue-900/40 transition-colors">
                            <Tag className="w-3 h-3" /> {post.category}
                        </span>
                    </div>
                    <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-7 sm:mb-8 leading-tight tracking-tight break-words">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
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


            {/* MAIN ARTICLE BODY */}
            <article className="animate-blog-body max-w-3xl mx-auto px-5 sm:px-6 mt-8 sm:mt-10 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium pb-16 sm:pb-20 border-b border-slate-100 dark:border-slate-800 transition-colors">
                <div className="prose prose-base sm:prose-lg prose-slate dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-img:rounded-2xl prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed prose-li:leading-relaxed">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>

            {/* CALL TO ACTION BOTTOM */}
            <div className="animate-blog-body max-w-3xl mx-auto px-5 sm:px-6 mt-10 sm:mt-12">
                <div className="text-center bg-blue-50 dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-blue-100 dark:border-slate-800 shadow-sm transition-colors">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">Butuh Website atau Digitalisasi untuk Bisnis Anda?</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-8">Pakar kami siap mendengarkan visi Anda dan menawarkaan konsultasi arsitektur perangkat lunak dengan optimal tanpa biaya tersembunyi.</p>
                <Link href="/#harga" className="inline-flex bg-blue-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:bg-blue-700 transition">
                    Tertarik Konsultasi Gratis
                </Link>
                </div>
            </div>
        </div>
    );
}

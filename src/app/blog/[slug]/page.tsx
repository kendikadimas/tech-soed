import React from 'react';
import Image from 'next/image';
import { Calendar, User, Clock, Tag, ArrowLeft, Share2, Sparkles, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { createPublicClient } from '@/lib/supabase/public';

type Props = {
    params: Promise<{ slug: string }>
}

export const dynamicParams = true;

async function getPost(slug: string) {
    try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .maybeSingle();

        if (!error && data) {
            return {
                id: data.id,
                slug: data.slug,
                title: data.title,
                category: data.category || 'Bisnis & Teknologi',
                excerpt: data.excerpt || '',
                content: data.content || '',
                author: data.author || 'TechSoe Team',
                image: data.image_url || '/projects/blog_1.png',
                readTime: data.read_time || '4 Menit Baca',
                date: data.created_at
                    ? new Date(data.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                      })
                    : 'Terbaru',
            };
        }
    } catch (e) {
        console.warn('Error fetching article from Supabase, falling back to static:', e);
    }

    return blogPosts.find((p) => p.slug === slug) || null;
}

// Dynamic SEO Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) {
        return {
            title: 'Artikel Tidak Ditemukan | TechSoe',
            description: 'Konten artikel blog tidak tersedia.',
        };
    }

    const postUrl = `https://techsoe.com/blog/${post.slug}`;
    const imageUrl = post.image.startsWith('http') ? post.image : `https://techsoe.com${post.image}`;

    return {
        title: `${post.title} | TechSoe Blog`,
        description: post.excerpt,
        alternates: {
            canonical: postUrl,
        },
        keywords: [
            post.title,
            post.category,
            'jasa pembuatan website purwokerto',
            'partner digital professional',
            'software house banyumas',
            'techsoe blog',
            'pembuatan web aplikasi',
        ],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: postUrl,
            siteName: 'TechSoe',
            locale: 'id_ID',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author || 'TechSoe Team'],
            section: post.category,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
    };
}

// Generate static routes at build time
export async function generateStaticParams() {
    try {
        const supabase = createPublicClient();
        const { data } = await supabase.from('articles').select('slug').eq('published', true);
        if (data && data.length > 0) {
            const dynamicSlugs = data.map((art) => ({ slug: art.slug }));
            const staticSlugs = blogPosts.map((post) => ({ slug: post.slug }));
            const combined = [...staticSlugs, ...dynamicSlugs];
            const unique = Array.from(new Set(combined.map(s => s.slug))).map(slug => ({ slug }));
            return unique;
        }
    } catch (e) {
        // Fallback to static
    }

    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const postUrl = `https://techsoe.com/blog/${post.slug}`;
    const imageUrl = post.image.startsWith('http') ? post.image : `https://techsoe.com${post.image}`;

    // Schema.org Structured Data (Google Rich Snippets)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: imageUrl,
        datePublished: post.date,
        author: {
            '@type': 'Organization',
            name: post.author || 'TechSoe Team',
            url: 'https://techsoe.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'TechSoe',
            url: 'https://techsoe.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://techsoe.com/projects/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
        },
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-24 sm:pb-32 transition-colors">
            {/* Google Schema.org JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO ARTICLE HEADER */}
            <section className="pt-32 sm:pt-40 pb-6 sm:pb-10 px-5 sm:px-6 relative">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Back Link & Breadcrumb */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali ke Semua Artikel
                        </Link>
                        <span className="text-xs font-bold text-slate-400 hidden sm:inline">
                            TechSoe &bull; {post.category}
                        </span>
                    </div>

                    {/* Category Pill */}
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold uppercase tracking-wider text-xs border border-blue-200 dark:border-blue-800">
                            <Tag className="w-3.5 h-3.5" />
                            {post.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                        {post.title}
                    </h1>

                    {/* Excerpt Lead */}
                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-xl leading-relaxed border-l-4 border-blue-600 pl-4 py-1 italic">
                        {post.excerpt}
                    </p>

                    {/* Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 flex items-center justify-center font-bold text-xs">
                                    {post.author.charAt(0)}
                                </div>
                                <span className="text-slate-800 dark:text-slate-200 font-bold">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - Baca selengkapnya di TechSoe: https://techsoe.com/blog/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-bold transition-all"
                        >
                            <Share2 className="w-3.5 h-3.5" />
                            Bagikan
                        </a>
                    </div>
                </div>
            </section>

            {/* FEATURED COVER IMAGE */}
            {post.image && (
                <div className="max-w-4xl mx-auto px-5 sm:px-6 my-6 sm:my-10">
                    <div className="relative w-full aspect-[16/9] sm:aspect-[21/10] rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            unoptimized
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* MAIN ARTICLE BODY */}
            <article className="max-w-3xl mx-auto px-5 sm:px-6 mt-6 sm:mt-10 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium pb-16 sm:pb-20 border-b border-slate-200 dark:border-slate-800">
                <div className="prose prose-base sm:prose-lg prose-slate dark:prose-invert prose-blue max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white prose-img:rounded-3xl prose-img:shadow-lg prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-bold prose-p:leading-relaxed prose-li:leading-relaxed">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>

            {/* AUTHOR BIO & BOTTOM CALL TO ACTION */}
            <div className="max-w-3xl mx-auto px-5 sm:px-6 mt-12 sm:mt-16 space-y-8">
                {/* Author Card */}
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="w-14 h-14 rounded-2xl bg-[#172657] text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md">
                        T
                    </div>
                    <div>
                        <h4 className="font-bold text-base text-slate-900 dark:text-white">
                            {post.author}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                            Tim engineer dan kreator digital TechSoe. Berdedikasi membangun solusi perangkat lunak bermutu tinggi untuk bisnis lokal hingga nasional.
                        </p>
                    </div>
                </div>

                {/* Consultation Banner */}
                <div className="text-center bg-gradient-to-br from-[#172657] to-[#0f1a3b] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-400/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                            <Sparkles className="w-3.5 h-3.5" /> Konsultasi Gratis
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                            Wujudkan Website & Aplikasi Bisnis Impian Anda
                        </h3>
                        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                            Konsultasikan kebutuhan digitalisasi perusahaan Anda langsung dengan engineer TechSoe tanpa komitmen dan tanpa biaya tersembunyi.
                        </p>
                        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                            <a
                                href="https://wa.me/6285814174267?text=Halo TechSoe, saya tertarik konsultasi setelah membaca artikel blog Anda!"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-7 rounded-2xl shadow-lg shadow-green-600/25 transition active:scale-95 text-sm cursor-pointer"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Konsultasi via WhatsApp
                            </a>
                            <Link
                                href="/#portfolio"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-2xl border border-white/20 transition text-sm"
                            >
                                Lihat Portofolio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

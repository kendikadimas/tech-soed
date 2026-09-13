import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Sparkles, MessageCircle, ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ArticleRenderer, { ReadingProgress } from './ArticleRenderer';
import ArticleViewTracker from './ArticleViewTracker';
import { createPublicClient } from '@/lib/supabase/public';

type Props = {
    params: Promise<{ slug: string }>
}

export const dynamicParams = true;

// All articles (Supabase + static fallback) for prev/next navigation
async function getAllPosts() {
    try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
            .from('articles')
            .select('id, slug, title, category, image_url, created_at, read_time')
            .eq('published', true)
            .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
            const dbPosts = data.map((d) => ({
                slug: d.slug,
                title: d.title,
                category: d.category || 'Bisnis & Teknologi',
                image: d.image_url || '/projects/blog_1.png',
                readTime: d.read_time || '4 Menit Baca',
            }));
            const staticMapped = blogPosts.map((p) => ({
                slug: p.slug,
                title: p.title,
                category: p.category,
                image: p.image,
                readTime: p.readTime,
            }));
            const seen = new Set(dbPosts.map((p) => p.slug));
            const merged = [...dbPosts, ...staticMapped.filter((p) => !seen.has(p.slug))];
            return merged;
        }
    } catch (e) {
        // fallback
    }
    return blogPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        image: p.image,
        readTime: p.readTime,
    }));
}

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

// Generate article tags from title words + category
function generateTags(title: string, category: string): string[] {
    const tags: string[] = [];

    if (category) tags.push(category);

    const stopwords = new Set([
        'dan', 'untuk', 'yang', 'di', 'ke', 'dari', 'dengan', 'pada', 'adalah',
        'ini', 'itu', 'juga', 'atau', 'dalam', 'bagi', 'akan', 'para', 'cara',
        'apa', 'bagaimana', 'mengapa', 'sebuah', 'suatu', 'saat', 'era',
        'the', 'and', 'for', 'with', 'in', 'of', 'to', 'a', 'an',
    ]);

    const words = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/gi, '')
        .split(/\s+/)
        .filter((w) => w.length > 3 && !stopwords.has(w));

    words.slice(0, 5).forEach((w) => {
        const capitalized = w.charAt(0).toUpperCase() + w.slice(1);
        if (!tags.includes(capitalized)) tags.push(capitalized);
    });

    tags.push('TechSoe');

    return tags.slice(0, 8);
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
    const [post, allPosts] = await Promise.all([getPost(slug), getAllPosts()]);

    if (!post) {
        notFound();
    }

    const postUrl = `https://techsoe.com/blog/${post.slug}`;
    const imageUrl = post.image.startsWith('http') ? post.image : `https://techsoe.com${post.image}`;

    // Prev / Next navigation
    const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

    // Tags
    const tags = generateTags(post.title, post.category);

    // Schema.org Structured Data
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
            <ReadingProgress />
        <ArticleViewTracker slug={post.slug} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO ARTICLE HEADER */}
            <section className="pt-32 sm:pt-40 pb-6 sm:pb-10 px-5 sm:px-6 relative">
                <div className="max-w-4xl mx-auto space-y-6">
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

                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold uppercase tracking-wider text-xs border border-blue-200 dark:border-blue-800">
                            <Tag className="w-3.5 h-3.5" />
                            {post.category}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                        {post.title}
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-xl leading-relaxed border-l-4 border-blue-600 pl-4 py-1 italic">
                        {post.excerpt}
                    </p>

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
            <article className="max-w-3xl mx-auto px-5 sm:px-6 mt-6 sm:mt-10">
                <ArticleRenderer content={post.content} />
            </article>

            {/* POST-CONTENT SECTION */}
            <div className="max-w-3xl mx-auto px-5 sm:px-6 mt-10 sm:mt-14 space-y-10">

                {/* DIVIDER */}
                <hr className="border-slate-200 dark:border-slate-800" />

                {/* TAGS SECTION */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <Hash className="w-3.5 h-3.5" />
                        <span>Tag Artikel</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/blog?category=${encodeURIComponent(tag)}`}
                                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 transition-all"
                            >
                                <Hash className="w-3 h-3 opacity-50" />
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* PREV / NEXT NAVIGATION */}
                {(prevPost || nextPost) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {prevPost ? (
                            <Link
                                href={`/blog/${prevPost.slug}`}
                                className="group flex items-start gap-3 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all"
                            >
                                <div className="shrink-0 w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-950 dark:group-hover:text-blue-400 transition-colors mt-0.5">
                                    <ChevronLeft className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5">
                                        Artikel Sebelumnya
                                    </p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                                        {prevPost.title}
                                    </p>
                                    <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-1.5">
                                        {prevPost.category}
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <div />
                        )}

                        {nextPost ? (
                            <Link
                                href={`/blog/${nextPost.slug}`}
                                className="group flex items-start gap-3 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all sm:flex-row-reverse sm:text-right"
                            >
                                <div className="shrink-0 w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-950 dark:group-hover:text-blue-400 transition-colors mt-0.5">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5">
                                        Artikel Selanjutnya
                                    </p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                                        {nextPost.title}
                                    </p>
                                    <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-1.5">
                                        {nextPost.category}
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>
                )}

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
                            Wujudkan Website &amp; Aplikasi Bisnis Impian Anda
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

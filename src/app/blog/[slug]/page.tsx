import React from 'react';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { Navbar, Footer } from "../../components";

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
        <div className="min-h-screen bg-white font-sans text-slate-900 pb-32">

            {/* HERO ARTICLE HEADER */}
            <section className="pt-20 pb-16 px-6 relative bg-slate-50 border-b border-slate-100">
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

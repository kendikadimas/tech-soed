import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog & Artikel | TechSoe Purwokerto',
    description: 'Kumpulan artikel seputar teknologi, panduan membuat website, tips memilih software house, layanan web developer, dan UI/UX design dengan fokus pada bisnis digital modern di Purwokerto.',
    keywords: ["berita teknologi", "blog techsoe", "artikel software house", "tips bisnis digital", "pembuatan website purwokerto"],
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

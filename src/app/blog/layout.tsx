import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog Jasa Pembuatan Website Purwokerto | Partner Digital TechSoe',
    description: 'Temukan wawasan terbaru seputar jasa pembuatan website Purwokerto, tips pengembangan aplikasi mobile, sistem informasi, dan strategi partner digital professional untuk bisnis Anda.',
    keywords: ["jasa pembuatan website purwokerto", "partner digital professional", "web developer banyumas", "software house purwokerto", "artikel teknologi bisnis"],
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

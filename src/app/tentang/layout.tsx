import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tentang Kami | TechSoe - Software House Purwokerto',
    description: 'Pelajari lebih lanjut tentang TechSoe, software house terkemuka di Purwokerto yang memiliki visi membangun masa depan digital bersama Anda.',
};

export default function TentangLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

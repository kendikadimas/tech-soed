import { createPublicClient } from './supabase/public';

export interface ProjectItem {
  id?: string;
  title: string;
  category: string;
  sub_category?: string | null;
  image_url: string;
  description?: string | null;
  live_url?: string | null;
  featured_hero?: boolean;
  order_index?: number;
  created_at?: string;
}

export const defaultPortfolioFallback: ProjectItem[] = [
  {
    title: 'Larasena',
    category: 'LMS',
    image_url: 'https://techsoe.com/projects/larasena.png',
    description: 'Sistem generate batik dengan AI dan manajemen operasional konveksi batik.',
    live_url: '',
    featured_hero: true,
    order_index: 1,
  },
  {
    title: 'Jemari Point',
    category: 'Company Profile',
    image_url: 'https://techsoe.com/projects/jemari.png',
    description: 'Sistem terintegrasi manajemen toko emas.',
    live_url: '',
    featured_hero: true,
    order_index: 2,
  },
  {
    title: 'Differlok E-Learning',
    category: 'LMS',
    image_url: 'https://techsoe.com/projects/differlok.png',
    description: 'Platform pembelajaran yang menyesuaikan metode efektif belajar mahasiswa UNTIDAR.',
    live_url: '',
    featured_hero: true,
    order_index: 3,
  },
  {
    title: 'KP-SPAMS Damar Wulan',
    category: 'Company Profile',
    image_url: 'https://techsoe.com/projects/damarwulan.png',
    description: 'Sistem pengelolaan layanan air dengan fitur cek pelanggan dan laporan bulanan',
    live_url: '',
    featured_hero: true,
    order_index: 4,
  },
  {
    title: 'Website Desa Kalisabuk',
    category: 'Company Profile',
    image_url: 'https://techsoe.com/projects/kalisabuk.png',
    description: 'Sistem informasi Desa Kalisabuk dengan fitur informasi desa, berita, dan data warga.',
    live_url: '',
    featured_hero: true,
    order_index: 5,
  },
  {
    title: 'Rico Capital',
    category: 'LMS',
    image_url: 'https://techsoe.com/projects/ricocapital.png',
    description: 'Platform edukasi cryptocurrency dan blockchain',
    live_url: '',
    featured_hero: true,
    order_index: 6,
  },
];

/**
 * Normalizes an image URL to an absolute HTTPS URL.
 */
export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://techsoe.com${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
}

/**
 * Fetches all portfolio projects from Supabase with ordering.
 * Falls back to defaultPortfolioFallback if database is empty or unreachable.
 */
export async function getPortfolioProjects(): Promise<ProjectItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((p) => ({
        ...p,
        image_url: normalizeImageUrl(p.image_url),
      }));
    }
  } catch (err) {
    console.warn('getPortfolioProjects: using default fallback', err);
  }
  return defaultPortfolioFallback;
}

/**
 * Retrieves clean, deduplicated absolute image URLs of portfolio projects
 * for SEO sitemaps, OpenGraph metadata, and structured data schemas.
 */
export async function getPortfolioImageUrls(): Promise<string[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('image_url')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const urls = data
        .map((p) => normalizeImageUrl(p.image_url))
        .filter((url) => Boolean(url && url.length > 0));

      if (urls.length > 0) {
        return Array.from(new Set(urls));
      }
    }
  } catch (err) {
    console.warn('getPortfolioImageUrls: using default fallback', err);
  }

  return defaultPortfolioFallback.map((p) => p.image_url);
}

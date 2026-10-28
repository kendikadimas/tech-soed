import type { Metadata } from 'next';
import { getPortfolioProjects } from '@/lib/projects';
import LandingPageClient from './LandingPageClient';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getPortfolioProjects();
  const projectThumbnails = projects
    .map((p) => p.image_url)
    .filter(Boolean)
    .slice(0, 6);

  const ogImages = [
    {
      url: "/projects/hero.png",
      width: 1200,
      height: 630,
      alt: "Jasa Pembuatan Website Purwokerto Paling Murah - TechSoe Software House",
    },
    ...projectThumbnails.map((url, i) => ({
      url,
      width: 1280,
      height: 720,
      alt: `Highlight Portofolio TechSoe Purwokerto #${i + 1}`,
    })),
  ];

  return {
    openGraph: {
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      images: projectThumbnails.length > 0 ? [projectThumbnails[0]] : ["/projects/hero.png"],
    },
  };
}

export default async function LandingPage() {
  const projects = await getPortfolioProjects();

  return (
    <LandingPageClient initialProjects={projects} />
  );
}
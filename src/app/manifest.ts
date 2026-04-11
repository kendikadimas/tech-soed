import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TechSoe | Jasa Pembuatan Website & Aplikasi',
    short_name: 'TechSoe',
    description: 'Software House Purwokerto spesialis jasa pembuatan website, mobile apps, & sistem informasi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a1d37',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/projects/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

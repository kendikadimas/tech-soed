import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techsoe.com"),
  alternates: {
    canonical: "/",
  },
  title: "Jasa Pembuatan Website Purwokerto & Partner Digital Professional | TechSoe",
  description: "Solusi Software House & Partner Digital terbaik di Purwokerto. Kami membantu digitalisasi bisnis Anda melalui jasa pembuatan website, aplikasi mobile, dan sistem informasi dengan kualitas premium & SEO-friendly.",
  keywords: [
    "jasa pembuatan website",
    "jasa pembuatan web",
    "jasa pembuatan aplikasi",
    "jasa pembuatan aplikasi mobile",
    "jasa pembuatan sistem",
    "jasa pembuatan sistem informasi",
    "jasa bikin website purwokerto",
    "web developer purwokerto",
    "software house purwokerto",
    "sistem informasi",
    "bikin aplikasi android purwokerto",
    "digital agency purwokerto",
    "techsoe",
    "banyumas",
    "jawa tengah"
  ],
  authors: [{ name: "TechSoe" }],
  category: 'technology',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "TechSoe | Software House & Jasa Pembuatan Website Terpercaya",
    description: "Spesialis jasa pembuatan website, aplikasi mobile, web development, dan solusi sistem informasi terintegrasi dengan kualitas premium.",
    url: "https://techsoe.com",
    siteName: "TechSoe",
    images: [
      {
        url: "/projects/hero.png",
        width: 1200,
        height: 630,
        alt: "Jasa Pembuatan Website Purwokerto - TechSoe Software House",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSoe | Jasa Pembuatan Website & Aplikasi",
    description: "Solusi digital terbaik untuk bisnis Anda. Jasa pembuatan website dan aplikasi mobile profesional.",
    images: ["/projects/hero.png"],
  },
  verification: {
    google: "F5b1OkKQFg_a0eQ1KZLWcZU1_BLvdr0CgXo9kHW_MEw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { LangProvider, Navbar, Footer, WhatsAppButton, ThemeProvider } from "./components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "TechSoe Application Suite",
                "operatingSystem": "Web, Android, iOS",
                "applicationCategory": "BusinessApplication",
                "description": "TechSoe melayani jasa pembuatan website, pengembangan aplikasi mobile, dan perancangan sistem informasi bisnis terintegrasi.",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "IDR"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://techsoe.com/#organization",
                "name": "TechSoe Agency",
                "image": "https://techsoe.com/projects/logo.png",
                "url": "https://techsoe.com",
                "telephone": "+6281353424280",
                "email": "hi@techsoe.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Purwokerto",
                  "addressLocality": "Purwokerto",
                  "addressRegion": "Jawa Tengah",
                  "postalCode": "53123",
                  "addressCountry": "ID"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": -7.4244,
                  "longitude": 109.2303
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                  ],
                  "opens": "08:00",
                  "closes": "17:00"
                },
                "sameAs": [
                  "https://www.instagram.com/techsoe",
                  "https://github.com/kendikadimas"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "TechSoe",
                "url": "https://techsoe.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://techsoe.com/blog?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Jasa Pembuatan Website & Aplikasi",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "TechSoe"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Indonesia"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Digital Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Web Development",
                        "description": "Jasa pembuatan website modern dengan Next.js dan Laravel."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Mobile Apps",
                        "description": "Pengembangan aplikasi mobile Android dan iOS professional."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Sistem Informasi",
                        "description": "Solusi sistem informasi bisnis, CRM, dan ERP kustom."
                      }
                    }
                  ]
                }
              }
            ])
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased dark:bg-slate-950 transition-colors`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <Navbar />
            <main className="bg-white dark:bg-slate-950 transition-colors">
              {children}
            </main>
            <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
              <Footer />
            </div>
            <WhatsAppButton />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

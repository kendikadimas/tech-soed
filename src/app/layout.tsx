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
  title: "TechSoe | Jasa Website & Aplikasi Professional Purwokerto",
  description: "Software House Purwokerto melayani jasa pembuatan website, aplikasi mobile Android/iOS, sistem informasi, & UI/UX Design berkualitas.",
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
        alt: "TechSoe Digital Solution",
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

import { LangProvider, Navbar, Footer, WhatsAppButton } from "./components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
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
                "email": "techsoe26@gmail.com",
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
        className={`${inter.variable} antialiased`}
      >
        <LangProvider>
          <Navbar />
          <main className="bg-white">
            {children}
          </main>
          <div className="bg-white">
            <Footer />
          </div>
          <WhatsAppButton />
        </LangProvider>
      </body>
    </html>
  );
}

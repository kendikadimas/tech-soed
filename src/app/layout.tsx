import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techsoe.com"),
  alternates: {
    canonical: "/",
  },
  title: "TechSoe - Jasa Pembuatan Website Purwokerto Paling Murah & Profesional | Mulai Rp 300rb",
  description: "Jasa pembuatan website Purwokerto paling murah & profesional mulai Rp 300.000,- garansi selamanya. Solusi bikin website kilat, aplikasi mobile, sistem informasi, SEO-friendly gratis domain & hosting.",
  keywords: [
    "jasa pembuatan website purwokerto",
    "jasa pembuatan website purwokerto paling murah",
    "jasa pembuatan web purwokerto paling murah",
    "website purwokerto paling murah",
    "jasa bikin website purwokerto termurah",
    "bikin web murah purwokerto",
    "jasa pembuatan website murah purwokerto",
    "jasa website purwokerto mulai 300rb",
    "jasa pembuatan website",
    "jasa pembuatan web",
    "jasa pembuatan aplikasi",
    "jasa pembuatan aplikasi mobile",
    "jasa pembuatan sistem informasi",
    "web developer purwokerto",
    "software house purwokerto",
    "teknologi inovasi soedirman",
    "techsoe",
    "tech soe",
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
    title: "TechSoe - Jasa Pembuatan Website Purwokerto Paling Murah & Profesional",
    description: "Jasa pembuatan website Purwokerto paling murah & profesional mulai Rp 300.000,- garansi selamanya. Spesialis website modern, aplikasi mobile, dan sistem informasi.",
    url: "https://techsoe.com",
    siteName: "TechSoe (Teknologi Inovasi Soedirman)",
    images: [
      {
        url: "/projects/hero.png",
        width: 1200,
        height: 630,
        alt: "Jasa Pembuatan Website Purwokerto Paling Murah - TechSoe Software House",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSoe - Jasa Pembuatan Website Purwokerto Paling Murah & Profesional",
    description: "Jasa pembuatan website Purwokerto mulai Rp 300.000,- garansi selamanya. Solusi digital terbaik untuk bisnis Anda.",
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

import { LangProvider, MainLayoutShell, ThemeProvider } from "./components";

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
                "description": "TechSoe melayani jasa pembuatan website, pengembangan aplikasi mobile, dan perancangan sistem informasi bisnis terintegrasi di Purwokerto.",
                "offers": {
                  "@type": "Offer",
                  "price": "300000",
                  "priceCurrency": "IDR"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5.0",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "7",
                  "reviewCount": "7"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": ["LocalBusiness", "ProfessionalService"],
                "@id": "https://techsoe.com/#organization",
                "name": "Teknologi Inovasi Soedirman (TechSoe)",
                "legalName": "Teknologi Inovasi Soedirman",
                "alternateName": [
                  "TechSoe",
                  "Teknologi Inovasi Soedirman",
                  "Tech Soed",
                  "Jasa Pembuatan Website Purwokerto TechSoe"
                ],
                "description": "Jasa pembuatan website Purwokerto paling murah & profesional mulai Rp 300.000,- garansi selamanya. Partner software house dan transformasi digital terbaik di Purwokerto dan Banyumas.",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://techsoe.com/projects/logo.png",
                  "caption": "Logo TechSoe - Teknologi Inovasi Soedirman"
                },
                "image": [
                  "https://techsoe.com/projects/logo.png",
                  "https://techsoe.com/projects/larasena.png",
                  "https://techsoe.com/projects/jemari.png",
                  "https://techsoe.com/projects/differlok.png",
                  "https://techsoe.com/projects/damarwulan.png",
                  "https://techsoe.com/projects/kalisabuk.png",
                  "https://techsoe.com/projects/ricocapital.png"
                ],
                "url": "https://techsoe.com",
                "telephone": "+6285814174267",
                "email": "hi@techsoe.com",
                "priceRange": "Rp 300.000 - Rp 15.000.000",
                "hasMap": "https://maps.app.goo.gl/ss9S1x2hRGXseBW76",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Jl. Limas Agung, Glempang, Bancarkembar",
                  "addressLocality": "Purwokerto Utara",
                  "addressRegion": "Jawa Tengah",
                  "postalCode": "53121",
                  "addressCountry": "ID"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": -7.4082,
                  "longitude": 109.2458
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                  ],
                  "opens": "08:00",
                  "closes": "17:00"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5.0",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "7",
                  "reviewCount": "7"
                },
                "sameAs": [
                  "https://maps.app.goo.gl/ss9S1x2hRGXseBW76",
                  "https://www.instagram.com/techsoe",
                  "https://github.com/kendikadimas"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "Jasa Pembuatan Website Purwokerto",
                "image": "https://techsoe.com/projects/hero.png",
                "description": "Jasa pembuatan website Purwokerto paling murah & profesional mulai Rp 300.000,- garansi selamanya. Desain modern & mobile-friendly. Free hosting, domain dan email bisnis.",
                "brand": {
                  "@type": "Brand",
                  "name": "TechSoe"
                },
                "offers": {
                  "@type": "AggregateOffer",
                  "lowPrice": "300000",
                  "highPrice": "15000000",
                  "priceCurrency": "IDR",
                  "offerCount": "8",
                  "priceValidUntil": "2030-12-31",
                  "availability": "https://schema.org/InStock",
                  "seller": {
                    "@type": "Organization",
                    "name": "Teknologi Inovasi Soedirman (TechSoe)"
                  }
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5.0",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "7",
                  "reviewCount": "7"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "TechSoe",
                "alternateName": "Teknologi Inovasi Soedirman",
                "url": "https://techsoe.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://techsoe.com/blog?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Berapa biaya jasa pembuatan website di Purwokerto melalui TechSoe?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Biaya jasa pembuatan website di TechSoe mulai dari Rp 300.000,- untuk landing page promosi dan UMKM, sudah termasuk domain gratis, hosting kilat, serta garansi selamanya."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Apakah website yang dibuat di TechSoe sudah SEO-friendly dan mobile friendly?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Ya, seluruh website yang dikembangkan TechSoe menggunakan teknologi Next.js dengan prinsip Mobile-First Design, Semantic HTML, struktur schema.org, dan optimasi kecepatan loading agar mudah masuk halaman 1 Google."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Berapa lama estimasi waktu pengerjaan website?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Untuk landing page atau website standar selesai dalam 1 hingga 3 hari kerja. Untuk sistem informasi kustom atau website e-commerce kompleks memerlukan waktu 1 hingga 3 minggu."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Apakah klien mendapatkan kepemilikan penuh atas source code?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Ya, TechSoe memberikan kepemilikan penuh 100% atas source code setelah pelunasan tanpa sistem sewa terkunci."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Di mana lokasi kantor TechSoe di Purwokerto?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "TechSoe (Teknologi Inovasi Soedirman) berlokasi di Jl. Limas Agung, Bancarkembar, Kec. Purwokerto Utara, Kabupaten Banyumas, Jawa Tengah 53121."
                    }
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "TechSoe Navigation Sitelinks",
                "description": "Daftar navigasi menu utama website TechSoe",
                "itemListElement": [
                  {
                    "@type": "SiteNavigationElement",
                    "position": 1,
                    "name": "Layanan Web & Aplikasi",
                    "description": "Jasa pembuatan website modern, kilat, SEO-friendly serta pengembangan aplikasi mobile Android & iOS.",
                    "url": "https://techsoe.com/#harga"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 2,
                    "name": "Tentang TechSoe",
                    "description": "Profil software house dan partner transformasi digital profesional di Purwokerto dan Banyumas.",
                    "url": "https://techsoe.com/tentang"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 3,
                    "name": "Blog & Wawasan Teknologi",
                    "description": "Kumpulan artikel edukasi teknologi, web development, SEO, dan digitalisasi bisnis.",
                    "url": "https://techsoe.com/blog"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 4,
                    "name": "Portfolio & Showcase Proyek",
                    "description": "Eksplorasi portofolio karya aplikasi dan website klien yang sukses ditangani TechSoe.",
                    "url": "https://techsoe.com/#portfolio"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 5,
                    "name": "Testimoni Klien",
                    "description": "Ulasan kepuasan klien dan pengalaman bermitra bersama tim TechSoe.",
                    "url": "https://techsoe.com/#testimoni"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 6,
                    "name": "Tanya Jawab (FAQ)",
                    "description": "Pertanyaan umum seputar alur kerja, waktu pembuatan, biaya, dan garansi website.",
                    "url": "https://techsoe.com/#faq"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Jasa Pembuatan Website & Aplikasi",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "Teknologi Inovasi Soedirman (TechSoe)"
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
                        "description": "Jasa pembuatan website modern mulai Rp 300rb dengan Next.js dan Laravel."
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
              },
              {
                "@context": "https://schema.org",
                "@type": "ImageGallery",
                "@id": "https://techsoe.com/#portfolio-gallery",
                "name": "Portofolio Hasil Pembuatan Website & Aplikasi TechSoe",
                "description": "Koleksi thumbnail dan screenshot portofolio hasil pembuatan website, aplikasi, dan sistem informasi oleh TechSoe Purwokerto.",
                "url": "https://techsoe.com/#portfolio",
                "associatedMedia": [
                  {
                    "@type": "ImageObject",
                    "name": "Larasena - Batik AI & Manajemen Konveksi",
                    "caption": "Portofolio sistem generate batik dengan AI dan manajemen operasional konveksi batik oleh TechSoe Purwokerto.",
                    "contentUrl": "https://techsoe.com/projects/larasena.png",
                    "thumbnailUrl": "https://techsoe.com/projects/larasena.png"
                  },
                  {
                    "@type": "ImageObject",
                    "name": "Jemari Point - Sistem Manajemen Toko Emas",
                    "caption": "Portofolio sistem informasi terintegrasi manajemen toko emas oleh TechSoe Purwokerto.",
                    "contentUrl": "https://techsoe.com/projects/jemari.png",
                    "thumbnailUrl": "https://techsoe.com/projects/jemari.png"
                  },
                  {
                    "@type": "ImageObject",
                    "name": "Differlok E-Learning - Platform Pembelajaran Mahasiswa",
                    "caption": "Portofolio platform LMS pembelajaran mahasiswa oleh TechSoe Purwokerto.",
                    "contentUrl": "https://techsoe.com/projects/differlok.png",
                    "thumbnailUrl": "https://techsoe.com/projects/differlok.png"
                  },
                  {
                    "@type": "ImageObject",
                    "name": "KP-SPAMS Damar Wulan - Sistem Layanan Air",
                    "caption": "Portofolio website pengelolaan layanan air dengan fitur cek pelanggan oleh TechSoe Purwokerto.",
                    "contentUrl": "https://techsoe.com/projects/damarwulan.png",
                    "thumbnailUrl": "https://techsoe.com/projects/damarwulan.png"
                  },
                  {
                    "@type": "ImageObject",
                    "name": "Website Desa Kalisabuk - Sistem Informasi Desa",
                    "caption": "Portofolio website profil dan sistem data warga Desa Kalisabuk oleh TechSoe Purwokerto.",
                    "contentUrl": "https://techsoe.com/projects/kalisabuk.png",
                    "thumbnailUrl": "https://techsoe.com/projects/kalisabuk.png"
                  },
                  {
                    "@type": "ImageObject",
                    "name": "Rico Capital - Platform Edukasi Crypto & Blockchain",
                    "caption": "Portofolio platform edukasi cryptocurrency dan blockchain oleh TechSoe Purwokerto.",
                    "contentUrl": "https://techsoe.com/projects/ricocapital.png",
                    "thumbnailUrl": "https://techsoe.com/projects/ricocapital.png"
                  }
                ]
              }
            ])
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${geist.variable} antialiased dark:bg-slate-950 transition-colors`}
      >
        {/* Google Analytics 4 */}
        {(() => {
          const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-D20W7Q7SCK";
          return (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                    send_page_view: true
                  });
                `}
              </Script>
            </>
          );
        })()}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LangProvider>
            <MainLayoutShell>
              {children}
            </MainLayoutShell>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

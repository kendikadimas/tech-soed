import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techsoe.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "TechSoe | Jasa Pembuatan Website & Aplikasi di Purwokerto",
  description: "TechSoe menyediakan spesialisasi layanan jasa pembuatan website, jasa pembuatan aplikasi mobile, web development, dan sistem informasi (CMS/LMS) terbaik di Purwokerto.",
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
    "techsoe",
    "banyumas",
    "jawa tengah"
  ],
  authors: [{ name: "TechSoe" }],
  openGraph: {
    title: "TechSoe | Jasa Pembuatan Website & Aplikasi Terpercaya",
    description: "Spesialis jasa pembuatan website, aplikasi mobile, web development, dan solusi sistem informasi terintegrasi.",
    url: "https://techsoe.vercel.app",
    siteName: "TechSoe",
    images: [
      {
        url: "/projects/logotrans.png", // Change to the absolute path of production image logo later
        width: 800,
        height: 600,
        alt: "TechSoe Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSoe | Jasa Pembuatan Website & Aplikasi",
    description: "Spesialis layanan jasa pembuatan website dan aplikasi mobile profesional dari TechSoe.",
    images: ["/projects/logotrans.png"],
  },
  verification: {
    google: "F5b1OkKQFg_a0eQ1KZLWcZU1_BLvdr0CgXo9kHW_MEw",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "TechSoe",
              "operatingSystem": "Web",
              "applicationCategory": "BusinessApplication",
              "description": "TechSoe melayani jasa pembuatan website, jasa pembuatan aplikasi mobile, perancangan sistem informasi, CMS, LMS, dan digital marketing terpercaya di Purwokerto.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "IDR"
              },
              "provider": {
                "@type": "LocalBusiness",
                "name": "TechSoe",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Purwokerto",
                  "addressRegion": "Jawa Tengah",
                  "addressCountry": "ID"
                },
                "telephone": "+628153424280",
                "email": "halo@techsoe.com",
                "url": "https://techsoe.vercel.app"
              }
            })
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

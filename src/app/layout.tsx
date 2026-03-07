import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soedirman-inovasi.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "Soedirman Inovasi Digital | Jasa Pembuatan Website & Aplikasi di Purwokerto",
  description: "Soedirman Inovasi Digital menyediakan spesialisasi layanan jasa pembuatan website, jasa pembuatan aplikasi mobile, web development, dan sistem informasi (CMS/LMS) terbaik di Purwokerto.",
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
    "soedirmaninovasi",
    "banyumas",
    "jawa tengah"
  ],
  authors: [{ name: "Soedirman Inovasi Digital" }],
  openGraph: {
    title: "Soedirman Inovasi Digital | Jasa Pembuatan Website & Aplikasi Terpercaya",
    description: "Spesialis jasa pembuatan website, aplikasi mobile, web development, dan solusi sistem informasi terintegrasi.",
    url: "https://soedirman-inovasi.vercel.app",
    siteName: "Soedirman Inovasi Digital",
    images: [
      {
        url: "/projects/logotrans.png", // Change to the absolute path of production image logo later
        width: 800,
        height: 600,
        alt: "Soedirman Inovasi Digital Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soedirman Inovasi Digital | Jasa Pembuatan Website & Aplikasi",
    description: "Spesialis layanan jasa pembuatan website dan aplikasi mobile profesional dari Soedirman Inovasi Digital.",
    images: ["/projects/logotrans.png"],
  },
  verification: {
    google: "F5b1OkKQFg_a0eQ1KZLWcZU1_BLvdr0CgXo9kHW_MEw",
  },
};

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
              "name": "Soedirman Inovasi Digital",
              "operatingSystem": "Web",
              "applicationCategory": "BusinessApplication",
              "description": "Soedirman Inovasi Digital melayani jasa pembuatan website, jasa pembuatan aplikasi mobile, perancangan sistem informasi, CMS, LMS, dan digital marketing terpercaya di Purwokerto.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "IDR"
              },
              "provider": {
                "@type": "LocalBusiness",
                "name": "Soedirman Inovasi Digital",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Purwokerto",
                  "addressRegion": "Jawa Tengah",
                  "addressCountry": "ID"
                },
                "telephone": "+628153424280",
                "email": "halo@soedirmaninovasi.com",
                "url": "https://soedirman-inovasi.vercel.app"
              }
            })
          }}
        />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

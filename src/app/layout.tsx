import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TechSoed | Software House di Purwokerto | Jasa Buat Website & Aplikasi",
  description: "TechSoed adalah Software House dan Web Developer terpercaya di Purwokerto. Melayani jasa pembuatan website, aplikasi mobile, UI/UX design, sistem informasi (CMS/LMS), dan digital marketing terbaik.",
  keywords: [
    "software house di purwokerto",
    "jasa buat website",
    "jasa bikin website purwokerto",
    "web developer purwokerto",
    "jasa pembuatan aplikasi",
    "jasa website murah",
    "bikin aplikasi mobile",
    "jasa ui ux design",
    "sistem informasi",
    "digital branding",
    "techsoed",
    "banyumas",
    "jawa tengah"
  ],
  authors: [{ name: "TechSoed" }],
  openGraph: {
    title: "TechSoed | Software House di Purwokerto | Jasa Pembuatan Website & Aplikasi",
    description: "Software House terpercaya di Purwokerto yang melayani pembuatan website, aplikasi mobile, dan solusi teknologi digital lainnya.",
    url: "https://techsoed.com",
    siteName: "TechSoed",
    images: [
      {
        url: "/projects/logo.png", // Change to the absolute path of production image logo later
        width: 800,
        height: 600,
        alt: "TechSoed Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSoed | Software House & Web Development di Purwokerto",
    description: "Jasa pembuatan website dan aplikasi mobile profesional dari TechSoed.",
    images: ["/projects/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

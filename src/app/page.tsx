"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Trophy, Users, Briefcase, CheckCircle, Star, ShoppingCart, Check, X, MessageCircle, ChevronDown, Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Code, PenTool, Megaphone, Share2 } from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('Landing Page');
  const [showWaText, setShowWaText] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [portfolioFilter, setPortfolioFilter] = useState('Semua');

  const portfolioCategories = ['Semua', 'Website', 'Aplikasi', 'Branding'];

  const projectsData = [
    { title: 'E-Commerce SuperApp', category: 'Aplikasi', image: '/path-to-project1.jpg', desc: 'Aplikasi belanja m-commerce dengan fitur multi-vendor.', size: 'large' },
    { title: 'Dashboard Analytics', category: 'Website', image: '/path-to-project2.jpg', desc: 'SaaS platform visualisasi data terintegrasi.', size: 'small' },
    { title: 'Corporate Identity', category: 'Branding', image: '/path-to-project4.jpg', desc: 'Rebranding total identitas perusahaan manufaktur.', size: 'small' },
    { title: 'Manajemen Klinik Terpadu', category: 'Website', image: '/path-to-project3.jpg', desc: 'Sistem informasi faskes komprehensif (ERP).', size: 'large' },
    { title: 'Fintech E-Wallet App', category: 'Aplikasi', image: '/path-to-project5.jpg', desc: 'Aplikasi dompet digital dengan transfer p2p.', size: 'small' },
    { title: 'LMS Edutech Portal', category: 'Website', image: '/path-to-project6.jpg', desc: 'Sistem manajemen e-learning interaktif untuk sekolah.', size: 'small' },
  ];

  const filteredProjects = portfolioFilter === 'Semua'
    ? projectsData
    : projectsData.filter(p => p.category === portfolioFilter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWaText(false);
    }, 4000); // Teks otomatis ditutup
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    'Landing Page',
    'Company Profile',
    'CMS',
    'LMS',
    'E-Commerce',
    // 'Optimasi SEO',
    'Social Media Management'
  ];

  const pricingData: Record<string, any[]> = {
    'Landing Page': [
      {
        name: 'Starter',
        price: 'Rp 1.500.000',
        description: '*Cocok untuk bisnis baru yang ingin langsung tampil online dengan landing page elegan.',
        features: [
          'Free Domain (.com)',
          'Shared Hosting (6 Bulan)',
          'Desain Responsif (Mobile & Desktop)',
          '1 Halaman Landing Page (scroll panjang)',
          '1 Email Bisnis',
          '1 GB Disk Storage',
          'Free SSL',
          '1x Revisi Gratis',
          'Garansi Maintenance 15 Hari',
          'Video Panduan Akses Website'
        ]
      },
      {
        name: 'Growth',
        price: 'Rp 2.750.000',
        isPopular: true,
        description: '*Buat kamu yang pengen tampil lebih profesional dan punya kontrol lebih atas fitur & brand.',
        features: [
          'Semua yang ada di Starter, plus:',
          'Hosting 1 Tahun',
          'Desain Visual Lebih Kompleks (CTA, Form, Galeri)',
          'Direct WhatsApp Chat',
          '2 Email Bisnis',
          '10 GB Disk Storage',
          '3x Revisi Gratis',
          'Free SSL',
          'SEO On-Page Basic',
          'Garansi Maintenance 1 Bulan'
        ]
      },
      {
        name: 'Ultimate',
        price: 'Rp 3.750.000',
        description: '*Solusi landing page all-in-one buat bisnis digital yang pengen konversi tinggi + tampil premium.',
        features: [
          'Semua yang ada di Growth, plus:',
          'Up to 2 Halaman Tambahan (About / FAQ / Blog)',
          'Request Fitur Khusus (Popup, Accordion, Pricing)',
          'Desain Interaktif (Animated Scroll, Parallax)',
          'Speed Optimization (Lazy Load)',
          '5x Revisi Gratis',
          'Garansi Maintenance 1.5 Bulan'
        ]
      }
    ],
    'Company Profile': [
      {
        name: 'Starter', price: 'Rp 899.000',
        features: [
          'Domain (.com)', '1 halaman', 'Template custom', 'Responsive', 'SEO Basic',
          { text: 'CMS Admin', included: false }, { text: 'Blog/Artikel', included: false },
          'Form Kontak', 'Integrasi WA', 'Garansi 1 bulan', 'Revisi 2x'
        ],
        description: '*Cocok untuk perusahaan yang ingin menampilkan identitas secara ringkas.'
      },
      {
        name: 'Professional', price: 'Rp 3.500.000', isPopular: true,
        features: [
          'Domain (.com)', '5-7 halaman', 'Semi custom UI/UX', 'Responsive', 'SEO Basic',
          'CMS Admin', 'Blog/Artikel', 'Form Kontak', 'Integrasi WA', 'Garansi 2 bulan', 'Revisi 3x'
        ],
        description: '*Pilihan terbaik untuk perusahaan skala menengah.'
      },
      {
        name: 'Executive', price: 'Rp 7.500.000',
        features: [
          'Domain (.com)', 'Unlimited halaman', 'Fully custom UI/UX', 'Responsive', 'Advanced SEO',
          'CMS Admin', 'Blog/Artikel', 'Form Kontak + Auto email', 'Integrasi WA', 'Garansi 3 bulan', 'Revisi 5x'
        ],
        description: '*Solusi komprehensif untuk perusahaan berskala besar.'
      }
    ],
    'CMS': [
      {
        name: 'Basic CMS', price: 'Rp 4.500.000',
        features: [
          'Domain (.com)', 'Dashboard Admin', { text: 'Multi User Role', included: false },
          'Manajemen Produk/Service', 'Blog', 'SEO Basic', { text: 'Analytics', included: false },
          { text: 'Integrasi Payment', included: false }, { text: 'API Integration', included: false },
          'Garansi 1 bulan', 'Revisi 4x'
        ],
        description: '*Sistem dasar untuk memulai pengelolaan data.'
      },
      {
        name: 'Business CMS', price: 'Rp 8.500.000', isPopular: true,
        features: [
          'Domain (.com)', 'Dashboard Admin', 'Multi User Role',
          'Manajemen Produk/Service', 'Blog', 'SEO Advanced', 'Analytics',
          'Integrasi Payment', { text: 'API Integration', included: false },
          'Garansi 3 bulan', 'Revisi 5x'
        ],
        description: '*Optimal untuk kolaborasi tim dan pelacakan.'
      },
      {
        name: 'Enterprise CMS', price: 'Rp 14.000.000',
        features: [
          'Domain (.com)', 'Dashboard Admin', 'Multi User Role',
          'Manajemen Produk/Service', 'Blog', 'SEO Advanced + struktur schema', 'Analytics',
          'Integrasi Payment', 'API Integration',
          'Garansi 6 bulan', 'Revisi 7x'
        ],
        description: '*Kustomisasi tak terbatas dan konektivitas API penuh.'
      }
    ],
    'LMS': [
      {
        name: 'LMS Starter', price: 'Rp 9.000.000',
        features: [
          'Manajemen Course', 'Upload Video', 'Quiz / Ujian',
          { text: 'Sertifikat', included: false }, { text: 'Progress Tracking', included: false },
          { text: 'Multi Instructor', included: false }, { text: 'Payment Gateway', included: false },
          'Dashboard Statistik Basic', 'Role System Basic (4)', 'Maintenance 2 bulan', 'Revisi 4x'
        ],
        description: '*Solusi edukasi dasar untuk kursus pemula.'
      },
      {
        name: 'LMS Pro', price: 'Rp 15.000.000', isPopular: true,
        features: [
          'Manajemen Course', 'Upload Video', 'Quiz / Ujian',
          'Sertifikat', 'Progress Tracking',
          'Multi Instructor', 'Payment Gateway',
          'Dashboard Statistik Advanced', 'Role System Advanced (5)', 'Maintenance 3 bulan', 'Revisi 5x'
        ],
        description: '*Modul pembelajaran interaktif dan mandiri.'
      },
      {
        name: 'LMS Enterprise', price: 'Rp 25.000.000',
        features: [
          'Manajemen Course', 'Upload Video', 'Quiz / Ujian + Bank Soal',
          'Sertifikat Custom', 'Progress Tracking',
          'Multi Instructor', 'Payment Gateway',
          'Dashboard Statistik Advanced + Export Data', 'Role System Advanced (5)', 'Maintenance 6 bulan', 'Revisi 7x'
        ],
        description: '*Fasilitas edukasi skala besar dengan fitur terlengkap.'
      }
    ],
    'E-Commerce': [
      {
        name: 'Store Basic', price: 'Rp 10.000.000',
        features: [
          'Produk Unlimited', 'Payment Gateway', 'Manajemen Order',
          { text: 'Multi Vendor', included: false }, { text: 'Komisi Vendor', included: false },
          { text: 'Promo & Voucher', included: false }, 'Dashboard Keuangan Basic',
          { text: 'Integrasi API', included: false }, 'Mobile Optimized'
        ],
        description: '*Toko online dengan pengaturan sistem checkout mudah.'
      },
      {
        name: 'Store Pro', price: 'Rp 18.000.000', isPopular: true,
        features: [
          'Produk Unlimited', 'Payment Gateway', 'Manajemen Order',
          { text: 'Multi Vendor', included: false }, { text: 'Komisi Vendor', included: false },
          'Promo & Voucher', 'Dashboard Keuangan Advanced',
          'Integrasi API Optional', 'Mobile Optimized'
        ],
        description: '*Jangkau lebih banyak konversi dengan pemasaran otomatis.'
      },
      {
        name: 'Marketplace', price: 'Rp 35.000.000+',
        features: [
          'Produk Unlimited', 'Payment Gateway', 'Manajemen Order',
          'Multi Vendor', 'Komisi Vendor',
          'Promo & Voucher', 'Dashboard Keuangan Advanced',
          'Integrasi API', 'Mobile Optimized'
        ],
        description: '*Buka pintu bagi merchant lain di seluruh wilayah.'
      }
    ],
    'Social Media Management': [
      {
        name: 'Feed', price: 'Rp 1.500.000',
        features: [
          '12 Desain Feed Premium', 'Copywriting & Caption', 'Riset Hashtag Bertarget',
          'Penjadwalan Posting', { text: 'Produksi Video Reels', included: false },
          { text: 'Ide Konten & Storyboard', included: false }, { text: 'Laporan Analitik', included: false }
        ],
        description: '*Paket perancangan layout dan desain Feed estetis.'
      },
      {
        name: 'Reels', price: 'Rp 3.500.000', isPopular: true,
        features: [
          '8 Video Reels / TikTok', 'Ide Konten & Storyboard', 'Video Editing Transisi Estetik',
          'Copywriting & Caption', 'Penjadwalan Posting',
          { text: 'Desain Feed Statis', included: false }, { text: 'Laporan Analitik', included: false }
        ],
        description: '*Fokus pada produksi video pendek untuk jangkauan viral.'
      },
      {
        name: 'All Content', price: 'Rp 5.500.000+',
        features: [
          '12 Desain Feed Premium', '8 Video Reels / TikTok', 'Ide Konten & Storyboard',
          'Copywriting & Riset Hashtag', 'Admin Posting & Interaksi',
          'Optimasi Profil (Bio & Highlight)', 'Laporan Performansi Lengkap'
        ],
        description: '*Solusi manajemen akun hulu ke hilir untuk mendongkrak brand Anda.'
      }
    ]
  };

  // Jika paket belum diisi, fallback ke Landing Page
  const currentPricing = pricingData[activeTab] || pricingData['Landing Page'];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- FLOATING NAVBAR --- */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-sm rounded-full px-6 py-3 w-full max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded relative flex items-center justify-center">
              {/* Decorative Logo replicating image reference */}
              <div className="w-6 h-6 bg-blue-600 rounded-sm transform rotate-45 relative">
                <div className="absolute -top-1.5 -left-1.5 w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
              <div className="w-3 h-3 bg-white absolute z-10 rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">TechSoed</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Project</a>
            <a href="#harga" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Harga</a>
            <a href="#tentang" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Tentang Kami</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">FAQ</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {/* <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition px-5 py-2.5 border border-slate-200 rounded-full hover:bg-slate-50">Hubungi Kami</a> */}
            <a href="https://wa.me/628153424280" target="_blank" rel="noreferrer " className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 shadow shadow-blue-600/20 transition">Hubungi Kami</a>
          </div>
        </nav>
      </div>

      {/* --- CLEAN HERO SECTION --- */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden bg-white flex flex-col items-center text-center">
        {/* Subtle abstract background lines similar to reference */}
        <div className="absolute left-0 bottom-0 w-[400px] h-[300px] border-t-[1.5px] border-r-[1.5px] border-slate-200 rounded-tr-[100px] border-dashed opacity-40 z-0"></div>
        <div className="absolute right-0 bottom-0 w-[400px] h-[300px] border-t-[1.5px] border-l-[1.5px] border-slate-200 rounded-tl-[100px] border-dashed opacity-40 z-0"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 pt-10">
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 mb-6 tracking-tight">
            Wujudkan Ide Menjadi <br className="hidden md:block" /> Karya Digital Luar Biasa
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-10">
            Dari desain visual memukau hingga kode yang solid. Kami hadir membantu membangun produk impian yang mempercepat pertumbuhan bisnis Anda di era digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <a href="#harga" className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold shadow-xl shadow-blue-500/20 hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300">
              Mulai sekarang
            </a>
            <a href="#portfolio" className="bg-white text-slate-800 border border-slate-200 px-8 py-3 rounded-full font-semibold shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300">
              Lihat portfolio
            </a>
          </div>
        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="tentang" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Tentang TechSoed</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              Solusi Digital untuk Bisnis Anda
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              TechSoed adalah agensi digital modern yang berfokus membantu startup maupun perusahaan bertransformasi secara digital. Kami memadukan UI/UX premium dengan rekayasa teknologi terbaik untuk melahirkan produk yang solid dan berdampak nyata terhadap bisnis Anda.
            </p>
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Web Development</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Website kustom berkinerja tinggi, aman, dan dapat diskalakan.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <PenTool className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">UI/UX Design</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Rancangan antarmuka estetis dengan pengalaman pengguna sempurna.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Megaphone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Digital Branding</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Pembangunan identitas brand yang kuat dengan aset visual ikonis.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Share2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Social Media</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Strategi pemasaran konten organik dan berbayar berbasis tren analitik.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full relative">
            {/* Dekorasi Latar */}
            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] transform translate-x-4 translate-y-4 opacity-10"></div>
            <div className="absolute -inset-4 border border-slate-200 rounded-[3.5rem] transform -translate-x-2 -translate-y-2 z-0"></div>

            {/* Kontainer Gambar Utama */}
            <div className="bg-slate-200 rounded-[3rem] overflow-hidden relative aspect-square z-10 shadow-xl shadow-slate-200/50">
              <img src="/path-to-about-image.jpg" alt="Tentang TechSoed" className="w-full h-full object-cover" />

              {/* Badge Overlays */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-lg border border-white/20">
                <div className="text-3xl font-black text-blue-600">5+</div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">Tahun Pengalaman</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      {/* <section className="py-20 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-slate-200">
            <div className="text-center px-4">
              <div className="flex justify-center mb-4">
                <Trophy className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">50+</h3>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Penghargaan</p>
            </div>
            <div className="text-center px-4">
              <div className="flex justify-center mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">200+</h3>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Projek Selesai</p>
            </div>
            <div className="text-center px-4">
              <div className="flex justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">150+</h3>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Klien Puas</p>
            </div>
            <div className="text-center px-4">
              <div className="flex justify-center mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">4.9</h3>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Rating</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* --- LATEST WORK SECTION (BENTO GRID) --- */}
      <section id="portfolio" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Karya Kami</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
                Pekerjaan Terbaik <br className="hidden md:block" /> Untuk Klien Terbaik
              </h2>
            </div>
            <p className="text-slate-500 max-w-md md:text-right leading-relaxed">
              Jelajahi berbagai studi kasus proyek digital tempat ide-ide brilian Anda dan rekayasa cerdas kami bertemu.
            </p>
          </div>

          {/* Filtering Pills */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            {portfolioCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setPortfolioFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${portfolioFilter === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic Grid Layout (Bento Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
            {filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className={`group cursor-pointer relative rounded-[2rem] overflow-hidden bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-8 ${project.size === 'large' ? 'md:col-span-2 lg:col-span-2 bg-slate-800' : 'col-span-1'
                  }`}
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  {/* Fallback pattern until image is loaded/assigned */}
                  <div className="absolute inset-0 bg-slate-200 mix-blend-multiply opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out" />

                  {/* Dark Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-blue-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm max-w-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-2 mx-auto">
              Muat Lebih Banyak <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="harga" className="py-24 px-6 bg-slate-50 border-t border-slate-100 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Harga & Paket</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              Pricelist Layanan
            </h2>
            <p className="text-lg text-slate-600">
              Solusi lengkap untuk membantu bisnis Anda eksis di dunia digital!
            </p>
          </div>

          {/* TABS */}
          <div className="flex flex-wrap justify-center mb-16 gap-2 px-4 max-w-5xl mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl ${activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 border border-slate-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* PRICING CONTENT */}
          <div className="grid lg:grid-cols-3 gap-8 items-center w-full">
            {currentPricing?.map((pkg: any, index: number) => (
              <div
                key={index}
                className={`relative flex flex-col p-8 lg:p-10 transition duration-300 rounded-3xl border ${pkg.isPopular
                  ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-900/10 z-10'
                  : 'bg-white border-slate-200 hover:border-blue-200 shadow-sm'
                  }`}
              >
                {/* Accent Ribbon for Popular */}
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
                    PALING POPULER
                  </div>
                )}

                <div className="text-left mb-8 pt-4">
                  <h3 className={`text-2xl font-bold mb-2 ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className={`text-3xl font-extrabold ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>{pkg.price}</span>
                  </div>
                  <p className={`text-sm ${pkg.isPopular ? 'text-blue-100' : 'text-slate-500'} min-h-[40px]`}>
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feature: any, fIndex: number) => {
                    const text = typeof feature === 'string' ? feature : feature.text;
                    const included = typeof feature === 'string' ? true : feature.included !== false;

                    return (
                      <li key={fIndex} className={`flex items-start gap-3 text-sm ${!included ? 'opacity-40 line-through' : ''}`}>
                        {included ? (
                          <CheckCircle className={`w-5 h-5 shrink-0 ${pkg.isPopular ? 'text-blue-200' : 'text-blue-600'}`} />
                        ) : (
                          <X className={`w-5 h-5 shrink-0 ${pkg.isPopular ? 'text-blue-300' : 'text-slate-400'}`} />
                        )}
                        <span className={`${pkg.isPopular ? 'text-white' : 'text-slate-700'}`}>{text}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto">
                  <button className={`w-full py-3.5 font-bold rounded-xl transition flex items-center justify-center gap-2 ${pkg.isPopular
                    ? 'bg-white text-blue-600 hover:bg-slate-50 shadow-md'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100'
                    }`}>
                    <ShoppingCart className="w-5 h-5" /> Order Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-lg text-slate-600">
              Menghapus keraguan Anda sebelum memulai kerja sama dengan TechSoed.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Berapa lama estimasi pengerjaan website/aplikasi?',
                a: 'Waktu pengerjaan sangat bergantung pada kompleksitas fitur dan skala pengerjaan. Untuk Landing Page memakan waktu 1–2 minggu. CMS dan E-Commerce umumnya berkisar 4–8 minggu. Timeline detil akan kami sediakan setelah menganalisis kebutuhan spesifik dari diskusi awal.'
              },
              // {
              //   q: 'Apakah harga paket sudah termasuk biaya domain & hosting?',
              //   a: 'Ya! Untuk paket Landing Page dan CMS, kami memberikan domain (.com/.id) dan cloud hosting gratis (hingga 1 tahun pertama) dengan garansi stabilitas 99% uptime.'
              // },
              {
                q: 'Bagaimana jika saya memerlukan fitur kustom di luar paket di atas?',
                a: 'TechSoed mengkhususkan diri di dalam custom enterprise development. Hubungi tim representatif kami untuk mendiskusikan fitur yang belum ada dalam daftar. Kami akan menyiapkan timeline dan penawaran sesuai dengan proporsi teknologinya.'
              },
              {
                q: 'Apakah ada biaya lanjutan (Maintenance) setelah aplikasi selesai dibuat?',
                a: 'Kami memberikan Garansi Bug/Error (Maintenance Gratis) dari 15 hari hingga 6 bulan tergantung paket Anda. Setelah itu, kami sangat menyarankan layanan SLA/Maintenance opsional tahunan agar pihak kami dapat rutin menambal (patch) keamanan dan mengoptimasi infrastruktur sistem.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  className={`w-full text-left px-6 py-5 flex items-center justify-between font-bold text-lg hover:bg-slate-50 transition-colors ${openFaq === idx ? 'text-blue-600 bg-slate-50' : 'text-slate-900'
                    }`}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  {faq.q}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'
                      }`}
                  />
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-60 pb-5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA BANNER SECTION --- */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-700 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Siap Membawa Bisnis Anda Naik Kelas?
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed font-medium">
              Konsultasikan masalah teknikal bisnis Anda bersama kami. Tim teknis terbaik
              kami siap memandu pembuatan dan transisi digitalisasi tanpa hambatan sama sekali.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-extrabold hover:bg-blue-50 transition drop-shadow-lg flex items-center justify-center gap-2">
                Hubungi Kami Sekarang <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 px-6 rounded-t-[3rem] mt-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">TechSoed</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Agensi solusi digital dengan spesialisasi pengembangan perangkat lunak (website, aplikasi web, dan LMS) berkinerja tinggi. Didirikan berfokus pada efisiensi.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Layanan</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Website Enterprise</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Sistem CMS Custom</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Learning Management System</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Integrasi E-Commerce</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Perusahaan</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/tentang" className="hover:text-blue-400 transition">Tentang Kami</a></li>
              <li><a href="/syarat-dan-ketentuan" className="hover:text-blue-400 transition">Syarat & Ketentuan</a></li>
              <li><a href="/kebijakan-privasi" className="hover:text-blue-400 transition">Kebijakan Privasi</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Kontak</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">Purwokerto, Jawa Tengah</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>+62 815-3424-280</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>halo@techsoed.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} TechSoed Agency. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span>Dirancang dengan cinta 💙</span>
          </div>
        </div>
      </footer>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a
        href="https://wa.me/628153424280"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[100] flex items-center bg-[#25D366] text-white p-3 rounded-full shadow-2xl shadow-[#25D366]/30 hover:-translate-y-1 hover:bg-[#20bd5a] transition-all duration-300"
        onMouseEnter={() => setShowWaText(true)}
        onMouseLeave={() => setShowWaText(false)}
      >
        <MessageCircle className="w-7 h-7" />
        {/* <div
          className={`overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap flex items-center ${showWaText ? 'max-w-[200px] opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'
            }`}
        >
          <span className="font-bold text-sm pr-2">Ingin Konsultasi?</span>
        </div> */}
      </a>

    </div>
  );
}
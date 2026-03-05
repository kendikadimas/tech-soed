export const t = {
    id: {
        navProject: "Project",
        navHarga: "Harga",
        navTentang: "Tentang Kami",
        navFaq: "FAQ",
        navContact: "Hubungi Kami",
        heroTitle1: "Bangun Sistem Digital.",
        heroTitle2: "Tingkatkan Skala Bisnis.",
        heroDesc: "Kami menghadirkan solusi teknologi yang membantu bisnis berkembang lebih cepat, melayani lebih banyak pelanggan, dan meningkatkan pendapatan secara terukur.",
        heroBtnStart: "Mulai sekarang",
        heroBtnPort: "Lihat portfolio",
        aboutTag: "Tentang TechSoed",
        aboutTitle: "Waktunya Bisnis Anda Naik Level",
        aboutDesc: "TechSoed adalah perusahaan teknologi yang mengembangkan produk dan sistem digital terintegrasi untuk berbagai skala bisnis. Kami menyediakan layanan web development, UI/UX design, digital branding, dan strategi digital marketing untuk membantu bisnis tumbuh lebih cepat dan efisien.",
        aboutSvc1Title: "Web Development",
        aboutSvc2Title: "UI/UX Design",
        aboutSvc3Title: "Digital Branding",
        aboutSvc4Title: "Social Media",
        aboutExpNum: "5+",
        aboutExpText: "Tahun Pengalaman",
        portTag: "Karya Kami",
        portTitle: "Project Showcase",
        portDesc: "Jelajahi berbagai studi kasus proyek digital tempat ide-ide brilian Anda dan rekayasa cerdas kami bertemu.",
        portLoadMore: "Muat Lebih Banyak",
        priceTag: "Harga & Paket",
        priceTitle: "Pricelist Layanan",
        priceDesc: "Solusi lengkap untuk membantu bisnis Anda eksis di dunia digital!",
        pricePopular: "PALING POPULER",
        priceOrderText: "Order Sekarang",
        priceConsultText: "Masih bingung memilih paket yang tepat?",
        priceConsultBtn: "Konsultasi Gratis",
        testiTag: "Testimoni Klien",
        testiTitle: "Apa Kata Mereka Tentang Kami",
        faqH2: "Pertanyaan yang Sering Diajukan",
        faqDesc: "Menghapus keraguan Anda sebelum memulai kerja sama dengan TechSoed.",
        faqData: [
            {
                q: 'Berapa lama estimasi pengerjaan website/aplikasi?',
                a: 'Waktu pengerjaan sangat bergantung pada kompleksitas fitur dan skala pengerjaan. Untuk Landing Page memakan waktu 1–2 minggu. CMS dan E-Commerce umumnya berkisar 4–8 minggu. Timeline detil akan kami sediakan setelah menganalisis kebutuhan spesifik dari diskusi awal.'
            },
            {
                q: 'Bagaimana jika saya memerlukan fitur kustom di luar paket di atas?',
                a: 'TechSoed mengkhususkan diri di dalam custom enterprise development. Hubungi tim representatif kami untuk mendiskusikan fitur yang belum ada dalam daftar. Kami akan menyiapkan timeline dan penawaran sesuai dengan proporsi teknologinya.'
            },
            {
                q: 'Apakah ada biaya lanjutan (Maintenance) setelah aplikasi selesai dibuat?',
                a: 'Kami memberikan Garansi Bug/Error (Maintenance Gratis) dari 15 hari hingga 6 bulan tergantung paket Anda. Setelah itu, kami sangat menyarankan layanan SLA/Maintenance opsional tahunan agar pihak kami dapat rutin menambal (patch) keamanan dan mengoptimasi infrastruktur sistem.'
            }
        ],
        portfolioCategories: ['Semua', 'Landing Page', 'Company Profile', 'CMS', 'LMS', 'E-Commerce', 'Social Media Management'],
        projectsData: [
            { title: 'Larasena', category: 'LMS', image: '/projects/larasena.png', desc: 'Sistem generate batik dengan AI dan manajemen operasional konveksi batik.', size: 'large' },
            { title: 'Jemari Point', category: 'Company Profile', image: '/projects/jemari.png', desc: 'Sistem terintegrasi manajemen toko emas.', size: 'large' },
            { title: 'Differlok E-Learning', category: 'LMS', image: '/projects/differlok.png', desc: 'Platform pembelajaran yang menyesuaikan metode efektif belajar mahasiswa UNTIDAR.', size: 'large' },
            { title: 'KP-SPAMS Damar Wulan', category: 'Company Profile', image: '/projects/damarwulan.png', desc: 'Sistem pengelolaan layanan air dengan fitur cek pelanggan dan laporan bulanan', size: 'large' },
            { title: 'Website Desa Kalisabuk', category: 'Company Profile', image: '/projects/kalisabuk.png', desc: 'Sistem informasi Desa Kalisabuk dengan fitur informasi desa, berita, dan data warga.', size: 'large' },
            { title: 'Rico Capital', category: 'LMS', image: '/projects/ricocapital.png', desc: 'Platform edukasi cryptocurrency dan blockchain', size: 'large' },
        ],
        tabs: [
            'Landing Page',
            'Company Profile',
            'CMS',
            'LMS',
            'E-Commerce',
            'Social Media Management'
        ],
        pricingData: {
            'Landing Page': [
                {
                    name: 'Starter', price: 'Rp 599.000',
                    description: '*Cocok untuk campaign/promo yang ingin langsung tampil online dengan landing page yang ringkas.',
                    features: [
                        'Shared Hosting (6 Bulan)', 'Desain Responsif (Template)', '1 Halaman Landing Page', 'Tombol Integrasi WhatsApp',
                        { text: 'Custom Domain', included: false }, { text: 'Email Bisnis', included: false },
                        'Free SSL', '1x Revisi Gratis', 'Garansi Maintenance 15 Hari'
                    ]
                },
                {
                    name: 'Growth', price: 'Rp 1.500.000', isPopular: true,
                    description: '*Cocok untuk jualan konversi tinggi dengan kontrol fitur dan brand yang lebih komprehensif.',
                    features: [
                        'Free Domain (.com)', 'Hosting 1 Tahun', 'Desain Custom Profesional', '1 Halaman Landing Page (Panjang)',
                        '1 Email Bisnis Profesional', 'Tombol Order / Form Leads', '3x Revisi Gratis', 'SEO On-Page Basic', 'Garansi Maintenance 1 Bulan'
                    ]
                },
                {
                    name: 'Ultimate', price: 'Rp 2.750.000',
                    description: '*Solusi landing page all-in-one buat bisnis digital yang ingin dominasi konversi & tampil maksimal.',
                    features: [
                        'Semua fitur pada paket Growth', 'Up to 2 Halaman Tambahan (Thank You dsb)', 'Request Copywriting Basis Konversi',
                        'Special Effect & Animasi Scroll', 'Speed Optimization (Lazy Load)', 'Integrasi Pixel & Analytics', '5x Revisi Gratis', 'Garansi Maintenance 1.5 Bulan'
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
                        'Integrasi Payment', 'API Integration', 'Garansi 6 bulan', 'Revisi 7x'
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
                        'Sertifikat', 'Progress Tracking', 'Multi Instructor', 'Payment Gateway',
                        'Dashboard Statistik Advanced', 'Role System Advanced (5)', 'Maintenance 3 bulan', 'Revisi 5x'
                    ],
                    description: '*Modul pembelajaran interaktif dan mandiri.'
                },
                {
                    name: 'LMS Enterprise', price: 'Rp 25.000.000',
                    features: [
                        'Manajemen Course', 'Upload Video', 'Quiz / Ujian + Bank Soal',
                        'Sertifikat Custom', 'Progress Tracking', 'Multi Instructor', 'Payment Gateway',
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
                        'Multi Vendor', 'Komisi Vendor', 'Promo & Voucher', 'Dashboard Keuangan Advanced',
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
        },
        testimonials: [
            { name: 'Budi Santoso', role: 'CEO, Retail Nusantara', text: 'TechSoed berhasil mentransformasi website kami menjadi jauh lebih modern dan cepat. Penjualan meningkat drastis berkat UI/UX yang intuitif.', rating: 5 },
            { name: 'Siti Aminah', role: 'Founder, Hijab Style', text: 'Sistem E-Commerce yang dibuat sangat stabil meski sedang ada flash sale. Timnya responsif dan solutif. Sangat direkomendasikan!', rating: 5 },
            { name: 'Andi Wijaya', role: 'Direktur, PT Bangun Mandiri', text: 'Aplikasi manajemen ERP dari TechSoed membantu operasional bisnis kami menjadi lebih otomatis dan efisien. Luar biasa!', rating: 5 },
            { name: 'Lestari', role: 'Head of Marketing, EduTech', text: 'Branding dan desain landing page sangat elegan. Proses pengerjaan on time dan sesuai dengan ekspektasi. Terima kasih TechSoed!', rating: 5 },
            { name: 'Rizki Pratama', role: 'Pemilik, Kopi Kenangan', text: 'Layanan manajemen media sosial dan visual dari TechSoed membuat engagement kami naik 300% dalam sebulan. Mantap!', rating: 5 },
        ],
        ctaTitle: "Siap Membawa Bisnis Anda Naik Kelas?",
        ctaDesc: "Konsultasikan masalah teknikal bisnis Anda bersama kami. Tim teknis terbaik kami siap memandu pembuatan dan transisi digitalisasi tanpa hambatan sama sekali.",
        ctaBtn: "Hubungi Kami Sekarang",
        footerDesc: "Agensi solusi digital dengan spesialisasi pengembangan perangkat lunak (website, aplikasi web, dan LMS) berkinerja tinggi. Didirikan berfokus pada efisiensi.",
        footerSvcHeading: "Layanan",
        footerContactHeading: "Kontak",
        footerCopyright: "© {year} TechSoed Agency. Hak Cipta Dilindungi.",
        footerMadeWithLove: "Dirancang dengan cinta 💙",
        orderFormTitle: "Form Pemesanan",
        orderFormName: "Nama Lengkap",
        orderFormPhone: "Nomor WhatsApp",
        orderFormEmail: "Email (Opsional)",
        orderFormProject: "Penjelasan Singkat Bisnis/Project",
        orderFormPackage: "Paket Terpilih",
        orderFormSubmit: "Kirim via WhatsApp",
        orderFormCancel: "Batal",
        orderWaGreeting: "Halo! Saya tertarik dengan layanan TechSoed.",
        orderWaName: "Nama",
        orderWaPackage: "Paket",
        orderWaDesc: "Detail Project",
        orderWaEmail: "Email"
    },
    en: {
        navProject: "Project",
        navHarga: "Pricing",
        navTentang: "About Us",
        navFaq: "FAQ",
        navContact: "Contact Us",
        heroTitle1: "Build Digital Systems.",
        heroTitle2: "Scale Up Your Business.",
        heroDesc: "We provide technology solutions that help businesses grow faster, serve more customers, and increase revenue measurably.",
        heroBtnStart: "Get Started",
        heroBtnPort: "View Portfolio",
        aboutTag: "About TechSoed",
        aboutTitle: "Time to Level Up Your Business",
        aboutDesc: "TechSoed is a technology company developing integrated digital products and systems for various business scales. We provide web development, UI/UX design, digital branding, and digital marketing strategies to help businesses grow faster and more efficiently.",
        aboutSvc1Title: "Web Development",
        aboutSvc2Title: "UI/UX Design",
        aboutSvc3Title: "Digital Branding",
        aboutSvc4Title: "Social Media",
        aboutExpNum: "5+",
        aboutExpText: "Years of Experience",
        portTag: "Our Work",
        portTitle: "Project Showcase",
        portDesc: "Explore various digital project case studies where your brilliant ideas meet our smart engineering.",
        portLoadMore: "Load More",
        priceTag: "Pricing & Packages",
        priceTitle: "Service Pricelist",
        priceDesc: "Complete solutions to help your business thrive in the digital world!",
        pricePopular: "MOST POPULAR",
        priceOrderText: "Order Now",
        priceConsultText: "Still confused about choosing the right package?",
        priceConsultBtn: "Free Consultation",
        testiTag: "Client Testimonials",
        testiTitle: "What They Say About Us",
        faqH2: "Frequently Asked Questions",
        faqDesc: "Clearing your doubts before starting a collaboration with TechSoed.",
        faqData: [
            {
                q: 'How long is the estimated time to build a website/application?',
                a: 'The timeline highly depends on feature complexity and scope. Landing Pages take 1–2 weeks. CMS and E-Commerce generally take 4–8 weeks. A detailed timeline will be provided after analyzing your specific needs during the initial discussion.'
            },
            {
                q: 'What if I need custom features outside the packages above?',
                a: 'TechSoed specializes in custom enterprise development. Contact our representatives to discuss features not listed. We will prepare a timeline and quote matching the technological proportion.'
            },
            {
                q: 'Is there an ongoing fee (Maintenance) after the application is finished?',
                a: 'We provide a Bug/Error Warranty (Free Maintenance) for 15 days up to 6 months depending on your package. After that, we highly recommend an optional annual SLA/Maintenance service so our team can routinely apply security patches and optimize system infrastructure.'
            }
        ],
        portfolioCategories: ['All', 'Landing Page', 'Company Profile', 'CMS', 'LMS', 'E-Commerce', 'Social Media Management'],
        projectsData: [
            { title: 'Online Electronics Store', category: 'E-Commerce', image: '/path-to-project1.jpg', desc: 'Online trading system with multi-payment and shipping features.', size: 'large' },
            { title: 'EduNusantara Portal', category: 'LMS', image: '/path-to-project6.jpg', desc: 'Integrated interactive e-learning management system.', size: 'small' },
            { title: 'PT Karya Mandiri Profile', category: 'Company Profile', image: '/path-to-project4.jpg', desc: 'Elegant company profile website for a construction company.', size: 'small' },
            { title: 'Clinic Information System', category: 'CMS', image: '/path-to-project3.jpg', desc: 'Comprehensive healthcare data management system (ERP).', size: 'large' },
            { title: 'Skin Care Product Launch', category: 'Landing Page', image: '/path-to-project5.jpg', desc: 'High conversion landing page for cosmetic launch.', size: 'small' },
            { title: 'Kopi Senja Campaign', category: 'Social Media Management', image: '/path-to-project2.jpg', desc: 'Instagram Feed design concept and management.', size: 'small' },
        ],
        tabs: [
            'Landing Page',
            'Company Profile',
            'CMS',
            'LMS',
            'E-Commerce',
            'Social Media Management'
        ],
        pricingData: {
            'Landing Page': [
                {
                    name: 'Starter', price: 'Rp 599.000',
                    description: '*Suitable for campaigns/promos aiming to go online immediately with a concise landing page.',
                    features: [
                        'Shared Hosting (6 Months)', 'Responsive Design (Template)', '1 Landing Page', 'WhatsApp Integration Button',
                        { text: 'Custom Domain', included: false }, { text: 'Business Email', included: false },
                        'Free SSL', '1x Free Revision', '15 Days Maintenance Warranty'
                    ]
                },
                {
                    name: 'Growth', price: 'Rp 1.500.000', isPopular: true,
                    description: '*Suitable for high-conversion sales with more comprehensive feature and brand control.',
                    features: [
                        'Free Domain (.com)', '1 Year Hosting', 'Professional Custom Design', '1 Landing Page (Long)',
                        '1 Professional Business Email', 'Order Button / Leads Form', '3x Free Revisions', 'Basic On-Page SEO', '1 Month Maintenance Warranty'
                    ]
                },
                {
                    name: 'Ultimate', price: 'Rp 2.750.000',
                    description: '*All-in-one landing page solution for digital businesses aiming to dominate conversions & maximize presence.',
                    features: [
                        'All features in the Growth package', 'Up to 2 Additional Pages (Thank You, etc.)', 'Conversion-Based Copywriting Request',
                        'Special Effects & Scroll Animations', 'Speed Optimization (Lazy Load)', 'Pixel & Analytics Integration', '5x Free Revisions', '1.5 Months Maintenance Warranty'
                    ]
                }
            ],
            'Company Profile': [
                {
                    name: 'Starter', price: 'Rp 899.000',
                    features: [
                        'Domain (.com)', '1 page', 'Custom Template', 'Responsive', 'Basic SEO',
                        { text: 'Admin CMS', included: false }, { text: 'Blog/Articles', included: false },
                        'Contact Form', 'WhatsApp Integration', '1 Month Warranty', '2x Revisions'
                    ],
                    description: '*Suitable for companies looking to establish a concise identity.'
                },
                {
                    name: 'Professional', price: 'Rp 3.500.000', isPopular: true,
                    features: [
                        'Domain (.com)', '5-7 pages', 'Semi-Custom UI/UX', 'Responsive', 'Basic SEO',
                        'Admin CMS', 'Blog/Articles', 'Contact Form', 'WhatsApp Integration', '2 Months Warranty', '3x Revisions'
                    ],
                    description: '*The best choice for mid-scale companies.'
                },
                {
                    name: 'Executive', price: 'Rp 7.500.000',
                    features: [
                        'Domain (.com)', 'Unlimited pages', 'Fully Custom UI/UX', 'Responsive', 'Advanced SEO',
                        'Admin CMS', 'Blog/Articles', 'Contact Form + Auto Email', 'WhatsApp Integration', '3 Months Warranty', '5x Revisions'
                    ],
                    description: '*A comprehensive solution for large-scale enterprises.'
                }
            ],
            'CMS': [
                {
                    name: 'Basic CMS', price: 'Rp 4.500.000',
                    features: [
                        'Domain (.com)', 'Admin Dashboard', { text: 'Multi User Role', included: false },
                        'Product/Service Management', 'Blog', 'Basic SEO', { text: 'Analytics', included: false },
                        { text: 'Payment Integration', included: false }, { text: 'API Integration', included: false },
                        '1 Month Warranty', '4x Revisions'
                    ],
                    description: '*A foundational system to start managing data.'
                },
                {
                    name: 'Business CMS', price: 'Rp 8.500.000', isPopular: true,
                    features: [
                        'Domain (.com)', 'Admin Dashboard', 'Multi User Role',
                        'Product/Service Management', 'Blog', 'Advanced SEO', 'Analytics',
                        'Payment Integration', { text: 'API Integration', included: false },
                        '3 Months Warranty', '5x Revisions'
                    ],
                    description: '*Optimal for team collaboration and tracking.'
                },
                {
                    name: 'Enterprise CMS', price: 'Rp 14.000.000',
                    features: [
                        'Domain (.com)', 'Admin Dashboard', 'Multi User Role',
                        'Product/Service Management', 'Blog', 'Advanced SEO + Schema Structure', 'Analytics',
                        'Payment Integration', 'API Integration', '6 Months Warranty', '7x Revisions'
                    ],
                    description: '*Unlimited customization and full API connectivity.'
                }
            ],
            'LMS': [
                {
                    name: 'LMS Starter', price: 'Rp 9.000.000',
                    features: [
                        'Course Management', 'Video Upload', 'Quizzes / Exams',
                        { text: 'Certificates', included: false }, { text: 'Progress Tracking', included: false },
                        { text: 'Multi Instructor', included: false }, { text: 'Payment Gateway', included: false },
                        'Basic Stat Dashboard', 'Basic Role System (4)', '2 Months Maintenance', '4x Revisions'
                    ],
                    description: '*A basic educational solution for beginner courses.'
                },
                {
                    name: 'LMS Pro', price: 'Rp 15.000.000', isPopular: true,
                    features: [
                        'Course Management', 'Video Upload', 'Quizzes / Exams',
                        'Certificates', 'Progress Tracking', 'Multi Instructor', 'Payment Gateway',
                        'Advanced Stat Dashboard', 'Advanced Role System (5)', '3 Months Maintenance', '5x Revisions'
                    ],
                    description: '*Interactive and self-paced learning modules.'
                },
                {
                    name: 'LMS Enterprise', price: 'Rp 25.000.000',
                    features: [
                        'Course Management', 'Video Upload', 'Quizzes / Exams + Question Bank',
                        'Custom Certificates', 'Progress Tracking', 'Multi Instructor', 'Payment Gateway',
                        'Advanced Stat Dashboard + Data Export', 'Advanced Role System (5)', '6 Months Maintenance', '7x Revisions'
                    ],
                    description: '*Large-scale educational facility with the most complete features.'
                }
            ],
            'E-Commerce': [
                {
                    name: 'Store Basic', price: 'Rp 10.000.000',
                    features: [
                        'Unlimited Products', 'Payment Gateway', 'Order Management',
                        { text: 'Multi Vendor', included: false }, { text: 'Vendor Commissions', included: false },
                        { text: 'Promos & Vouchers', included: false }, 'Basic Financial Dashboard',
                        { text: 'API Integration', included: false }, 'Mobile Optimized'
                    ],
                    description: '*An online store with a straightforward checkout system setup.'
                },
                {
                    name: 'Store Pro', price: 'Rp 18.000.000', isPopular: true,
                    features: [
                        'Unlimited Products', 'Payment Gateway', 'Order Management',
                        { text: 'Multi Vendor', included: false }, { text: 'Vendor Commissions', included: false },
                        'Promos & Vouchers', 'Advanced Financial Dashboard',
                        'Optional API Integration', 'Mobile Optimized'
                    ],
                    description: '*Reach more conversions with automated marketing.'
                },
                {
                    name: 'Marketplace', price: 'Rp 35.000.000+',
                    features: [
                        'Unlimited Products', 'Payment Gateway', 'Order Management',
                        'Multi Vendor', 'Vendor Commissions', 'Promos & Vouchers', 'Advanced Financial Dashboard',
                        'API Integration', 'Mobile Optimized'
                    ],
                    description: '*Open doors to the other merchants across all regions.'
                }
            ],
            'Social Media Management': [
                {
                    name: 'Feed', price: 'Rp 1.500.000',
                    features: [
                        '12 Premium Feed Designs', 'Copywriting & Captions', 'Targeted Hashtag Research',
                        'Post Scheduling', { text: 'Reels Video Production', included: false },
                        { text: 'Content Ideas & Storyboards', included: false }, { text: 'Analytics Reports', included: false }
                    ],
                    description: '*An aesthetic Feed layout and design package.'
                },
                {
                    name: 'Reels', price: 'Rp 3.500.000', isPopular: true,
                    features: [
                        '8 Reels / TikTok Videos', 'Content Ideas & Storyboards', 'Aesthetic Transition Video Editing',
                        'Copywriting & Captions', 'Post Scheduling',
                        { text: 'Static Feed Designs', included: false }, { text: 'Analytics Reports', included: false }
                    ],
                    description: '*Focuses on short video production for viral reach.'
                },
                {
                    name: 'All Content', price: 'Rp 5.500.000+',
                    features: [
                        '12 Premium Feed Designs', '8 Reels / TikTok Videos', 'Content Ideas & Storyboards',
                        'Copywriting & Hashtag Research', 'Admin Posting & Interactions',
                        'Profile Optimization (Bio & Highlights)', 'Comprehensive Performance Reports'
                    ],
                    description: '*End-to-end account management solution to boost your brand.'
                }
            ]
        },
        testimonials: [
            { name: 'Budi Santoso', role: 'CEO, Retail Nusantara', text: 'TechSoed successfully transformed our website into something much more modern and faster. Sales skyrocketed thanks to the intuitive UI/UX.', rating: 5 },
            { name: 'Siti Aminah', role: 'Founder, Hijab Style', text: 'The E-Commerce system they built is incredibly stable even during flash sales. The team is responsive and solution-oriented. Highly recommended!', rating: 5 },
            { name: 'Andi Wijaya', role: 'Director, PT Bangun Mandiri', text: 'The ERP management application from TechSoed helped our business operations become more automated and efficient. Amazing!', rating: 5 },
            { name: 'Lestari', role: 'Head of Marketing, EduTech', text: 'The branding and landing page design are extremely elegant. The development process was strictly on time and met expectations. Thank you TechSoed!', rating: 5 },
            { name: 'Rizki Pratama', role: 'Owner, Kopi Kenangan', text: 'The social media management and visual services from TechSoed increased our engagement by 300% in just one month. Awesome!', rating: 5 },
        ],
        ctaTitle: "Ready to Take Your Business to the Next Level?",
        ctaDesc: "Consult your business's technical issues with us. Our top technical team is ready to guide the creation and digitization transition seamlessly.",
        ctaBtn: "Contact Us Now",
        footerDesc: "A digital solution agency specializing in high-performance software development (websites, web applications, and LMS). Founded with a focus on efficiency.",
        footerSvcHeading: "Services",
        footerContactHeading: "Contact",
        footerCopyright: "© {year} TechSoed Agency. All Rights Reserved.",
        footerMadeWithLove: "Designed with love 💙",
        orderFormTitle: "Order Form",
        orderFormName: "Full Name",
        orderFormPhone: "WhatsApp Number",
        orderFormEmail: "Email (Optional)",
        orderFormProject: "Brief Business/Project Description",
        orderFormPackage: "Selected Package",
        orderFormSubmit: "Send via WhatsApp",
        orderFormCancel: "Cancel",
        orderWaGreeting: "Hello! I am interested in TechSoed services.",
        orderWaName: "Name",
        orderWaPackage: "Package",
        orderWaDesc: "Project Details",
        orderWaEmail: "Email"
    }
};

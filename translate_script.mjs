import fs from 'fs';

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const t = {
    navProject: ['Project', 'Project'],
    navHarga: ['Harga', 'Pricing'],
    navTentang: ['Tentang Kami', 'About Us'],
    navFaq: ['FAQ', 'FAQ'],
    navContact: ['Hubungi Kami', 'Contact Us'],
    heroTitle1: ['Bangun Sistem Digital.', 'Build Digital Systems.'],
    heroTitle2: ['Tingkatkan Skala Bisnis.', 'Scale Up Your Business.'],
    heroDesc: [
        'Kami menghadirkan solusi teknologi yang membantu bisnis berkembang lebih cepat, melayani lebih banyak pelanggan, dan meningkatkan pendapatan secara terukur.',
        'We provide technology solutions that help businesses grow faster, serve more customers, and increase revenue measurably.'
    ],
    heroBtnStart: ['Mulai sekarang', 'Get Started'],
    heroBtnPort: ['Lihat portfolio', 'View Portfolio'],
    aboutTag: ['Tentang TechSoed', 'About TechSoed'],
    aboutTitle: ['Waktunya Bisnis Anda Naik Level', 'Time to Level Up Your Business'],
    aboutDesc: [
        'TechSoed adalah perusahaan teknologi yang mengembangkan produk dan sistem digital terintegrasi untuk berbagai skala bisnis. Kami menyediakan layanan web development, UI/UX design, digital branding, dan strategi digital marketing untuk membantu bisnis tumbuh lebih cepat dan efisien.',
        'TechSoed is a technology company developing integrated digital products and systems for various business scales. We provide web development, UI/UX design, digital branding, and digital marketing strategies to help businesses grow faster and more efficiently.'
    ],
    aboutSvc1Title: ['Web Development', 'Web Development'],
    aboutSvc2Title: ['UI/UX Design', 'UI/UX Design'],
    aboutSvc3Title: ['Digital Branding', 'Digital Branding'],
    aboutSvc4Title: ['Social Media', 'Social Media'],
    aboutExpNum: ['5+', '5+'],
    aboutExpText: ['Tahun Pengalaman', 'Years of Experience'],
    portTag: ['Karya Kami', 'Our Work'],
    portTitle: [
        'Project Showcase <br className="hidden md:block" />',
        'Project Showcase <br className="hidden md:block" />'
    ],
    portDesc: [
        'Jelajahi berbagai studi kasus proyek digital tempat ide-ide brilian Anda dan rekayasa cerdas kami bertemu.',
        'Explore various digital project case studies where your brilliant ideas meet our smart engineering.'
    ],
    portLoadMore: ['Muat Lebih Banyak', 'Load More'],
    priceTag: ['Harga & Paket', 'Pricing & Packages'],
    priceTitle: ['Pricelist Layanan', 'Service Pricelist'],
    priceDesc: [
        'Solusi lengkap untuk membantu bisnis Anda eksis di dunia digital!',
        'Complete solutions to help your business thrive in the digital world!'
    ],
    pricePopular: ['PALING POPULER', 'MOST POPULAR'],
    priceOrderText: ['Order Sekarang', 'Order Now'],
    testiTag: ['Testimoni Klien', 'Client Testimonials'],
    testiTitle: ['Apa Kata Mereka Tentang Kami', 'What They Say About Us'],
    faqH2: ['Pertanyaan yang Sering Diajukan', 'Frequently Asked Questions'],
    faqDesc: [
        'Menghapus keraguan Anda sebelum memulai kerja sama dengan TechSoed.',
        'Clearing your doubts before starting a collaboration with TechSoed.'
    ],
    ctaTitle: ['Siap Membawa Bisnis Anda Naik Kelas?', 'Ready to Take Your Business to the Next Level?'],
    ctaDesc: [
        'Konsultasikan masalah teknikal bisnis Anda bersama kami. Tim teknis terbaik\\n              kami siap memandu pembuatan dan transisi digitalisasi tanpa hambatan sama sekali.',
        'Consult your business\\\'s technical issues with us. Our top technical team is ready to guide the creation and digitization transition seamlessly.'
    ],
    ctaBtn: ['Hubungi Kami Sekarang', 'Contact Us Now'],
    footerDesc: [
        'Agensi solusi digital dengan spesialisasi pengembangan perangkat lunak (website, aplikasi web, dan LMS) berkinerja tinggi. Didirikan berfokus pada efisiensi.',
        'A digital solution agency specializing in high-performance software development (websites, web applications, and LMS). Founded with a focus on efficiency.'
    ],
    footerSvcHeading: ['Layanan', 'Services'],
    footerContactHeading: ['Kontak', 'Contact'],
    footerCopyright: [
        '© {new Date().getFullYear()} TechSoed Agency. Hak Cipta Dilindungi.',
        '© {new Date().getFullYear()} TechSoed Agency. All Rights Reserved.'
    ],
    footerMadeWithLove: ['Dirancang dengan cinta 💙', 'Designed with love 💙']
};

let translationsTS = "export const t = { id: {";
for (const [key, val] of Object.entries(t)) {
    translationsTS += "\\n  " + key + ": `" + val[0] + "`,";
}
translationsTS += "\\n}, en: {";
for (const [key, val] of Object.entries(t)) {
    translationsTS += "\\n  " + key + ": `" + val[1] + "`,";
}
translationsTS += "\\n}\\n};";

fs.writeFileSync('src/app/translations.ts', translationsTS);

const replacePairs = [
    ['>Project<', '>{t[lang].navProject}<'],
    ['>Harga<', '>{t[lang].navHarga}<'],
    ['>Tentang Kami<', '>{t[lang].navTentang}<'],
    ['>FAQ<', '>{t[lang].navFaq}<'],
    ['>Hubungi Kami<', '>{t[lang].navContact}<'],
    ['>Bangun Sistem Digital.<', '>{t[lang].heroTitle1}<'],
    ['> Tingkatkan Skala Bisnis.<', '>{t[lang].heroTitle2}<'],
    ['>\\n            Kami menghadirkan solusi teknologi yang membantu bisnis berkembang lebih cepat, melayani lebih banyak pelanggan, dan meningkatkan pendapatan secara terukur.\\n          <', '>\\n            {t[lang].heroDesc}\\n          <'],
    ['>\\n              Mulai sekarang\\n            <', '>\\n              {t[lang].heroBtnStart}\\n            <'],
    ['>\\n              Lihat portfolio\\n            <', '>\\n              {t[lang].heroBtnPort}\\n            <'],
    ['>Tentang TechSoed<', '>{t[lang].aboutTag}<'],
    ['>\\n              Waktunya Bisnis Anda Naik Level\\n            <', '>\\n              {t[lang].aboutTitle}\\n            <'],
    ['>\\n              TechSoed adalah perusahaan teknologi yang mengembangkan produk dan sistem digital terintegrasi untuk berbagai skala bisnis. Kami menyediakan layanan web development, UI/UX design, digital branding, dan strategi digital marketing untuk membantu bisnis tumbuh lebih cepat dan efisien.            <', '>\\n              {t[lang].aboutDesc}\\n            <'],
    ['>Web Development<', '>{t[lang].aboutSvc1Title}<'],
    ['>UI/UX Design<', '>{t[lang].aboutSvc2Title}<'],
    ['>Digital Branding<', '>{t[lang].aboutSvc3Title}<'],
    ['>Social Media<', '>{t[lang].aboutSvc4Title}<'],
    ['>5+<', '>{t[lang].aboutExpNum}<'],
    ['>Tahun Pengalaman<', '>{t[lang].aboutExpText}<'],
    ['>Karya Kami<', '>{t[lang].portTag}<'],
    ['>\\n              Jelajahi berbagai studi kasus proyek digital tempat ide-ide brilian Anda dan rekayasa cerdas kami bertemu.\\n            <', '>\\n              {t[lang].portDesc}\\n            <'],
    ['Muat Lebih Banyak', '{t[lang].portLoadMore}'],
    ['>Harga & Paket<', '>{t[lang].priceTag}<'],
    ['>\\n              Pricelist Layanan\\n            <', '>\\n              {t[lang].priceTitle}\\n            <'],
    ['>\\n              Solusi lengkap untuk membantu bisnis Anda eksis di dunia digital!\\n            <', '>\\n              {t[lang].priceDesc}\\n            <'],
    ['>PALING POPULER<', '>{t[lang].pricePopular}<'],
    ['Order Sekarang', '{t[lang].priceOrderText}'],
    ['>Testimoni Klien<', '>{t[lang].testiTag}<'],
    ['>\\n            Apa Kata Mereka Tentang Kami\\n          <', '>\\n            {t[lang].testiTitle}\\n          <'],
    ['>\\n              Pertanyaan yang Sering Diajukan\\n            <', '>\\n              {t[lang].faqH2}\\n            <'],
    ['>\\n              Menghapus keraguan Anda sebelum memulai kerja sama dengan TechSoed.\\n            <', '>\\n              {t[lang].faqDesc}\\n            <'],
    ['>\\n              Siap Membawa Bisnis Anda Naik Kelas?\\n            <', '>\\n              {t[lang].ctaTitle}\\n            <'],
    ['>\\n              Konsultasikan masalah teknikal bisnis Anda bersama kami. Tim teknis terbaik\\n              kami siap memandu pembuatan dan transisi digitalisasi tanpa hambatan sama sekali.\\n            <', '>\\n              {t[lang].ctaDesc}\\n            <'],
    ['Hubungi Kami Sekarang', '{t[lang].ctaBtn}'],
    ['>\\n              Agensi solusi digital dengan spesialisasi pengembangan perangkat lunak (website, aplikasi web, dan LMS) berkinerja tinggi. Didirikan berfokus pada efisiensi.\\n            <', '>\\n              {t[lang].footerDesc}\\n            <'],
    ['>Layanan<', '>{t[lang].footerSvcHeading}<'],
    ['>Kontak<', '>{t[lang].footerContactHeading}<'],
    ['© {new Date().getFullYear()} TechSoed Agency. Hak Cipta Dilindungi.', '{t[lang].footerCopyright}'],
    ['Dirancang dengan cinta 💙', '{t[lang].footerMadeWithLove}']
];

for (const [key, val] of replacePairs) {
    content = content.replace(key, val);
}

if (!content.includes("    <div className=\\"min - h - screen bg - white font - sans text - slate - 900\\">")) {
    console.log("NOT REPLACED HTML CONTAINER");
}

if (!content.includes("import { t } from './translations';")) {
    content = content.replace(
        "import React, { useState, useEffect } from 'react';",
        "import React, { useState, useEffect } from 'react';\\nimport { t } from './translations';"
    );
    content = content.replace(
        "  const [activeTab, setActiveTab] = useState('Landing Page');",
        "  const [lang, setLang] = useState<'id' | 'en'>('id');\\n  const [activeTab, setActiveTab] = useState('Landing Page');"
    );
}

const toggleJsx = `
          {/* Lang */}
          <div className="flex bg-slate-100 rounded-full p-1 ml-4 shadow-inner">
            <button onClick={() => setLang('id')} className={"px-3 py-1 text-xs font-bold rounded-full transition-all " + (lang === 'id' ? "bg-white text-blue-600 shadow" : "text-slate-500 hover:text-slate-700")}>ID</button>
            <button onClick={() => setLang('en')} className={"px-3 py-1 text-xs font-bold rounded-full transition-all " + (lang === 'en' ? "bg-white text-blue-600 shadow" : "text-slate-500 hover:text-slate-700")}>EN</button>
          </div>
        </nav>
`;

if (!content.includes("{/* Lang */}")) {
    content = content.replace("</nav>", toggleJsx);
}

fs.writeFileSync('src/app/page.tsx', content);

console.log("SUCCESS!");

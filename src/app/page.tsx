"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Zap, Trophy, Users, Briefcase, CheckCircle, Star, ShoppingCart, Check, X, MessageCircle, ChevronDown, ChevronLeft, ChevronRight, Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Code, PenTool, Megaphone, Share2, Monitor, Smartphone, Globe, Cloud, Database } from 'lucide-react';
import { t } from './translations';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [activeTab, setActiveTab] = useState('Landing Page');
  const [showWaText, setShowWaText] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [portfolioFilter, setPortfolioFilter] = useState('Semua');

  // MODAL ORDER STATE
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({ name: '', price: '', category: '' });
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', email: '', projectDesc: '' });

  const handleOrderClick = (pkg: any) => {
    setSelectedPackage({ name: pkg.name, price: pkg.price, category: activeTab });
    setIsOrderModalOpen(true);
  };

  const portfolioScrollRef = useRef<HTMLDivElement>(null);
  const pricingScrollRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = window.innerWidth * 0.8;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `${t[lang].orderWaGreeting}%0A%0A${t[lang].orderWaName}: ${orderForm.name}%0A${t[lang].orderWaEmail}: ${orderForm.email || '-'}%0A${t[lang].orderWaPackage}: ${selectedPackage.category} - ${selectedPackage.name} (${selectedPackage.price})%0A${t[lang].orderWaDesc}: ${orderForm.projectDesc}`;
    window.open(`https://wa.me/6281353424280?text=${message}`, '_blank');
    setIsOrderModalOpen(false);
    setOrderForm({ name: '', phone: '', email: '', projectDesc: '' });
  };

  const portfolioCategories = t[lang].portfolioCategories;
  const projectsData = t[lang].projectsData;
  const tabs = t[lang].tabs;
  const pricingData = t[lang].pricingData as Record<string, any[]>;
  const testimonials = t[lang].testimonials;

  const filteredProjects = (portfolioFilter === 'Semua' || portfolioFilter === 'All')
    ? projectsData
    : projectsData.filter((p: any) => p.category === portfolioFilter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWaText(false);
    }, 4000); // Teks otomatis ditutup
    return () => clearTimeout(timer);
  }, []);

  // Sync portfolioFilter default translation if language changes when it's on 'All'/'Semua'
  useEffect(() => {
    if (portfolioFilter === 'Semua' && lang === 'en') {
      setPortfolioFilter('All');
    } else if (portfolioFilter === 'All' && lang === 'id') {
      setPortfolioFilter('Semua');
    }
  }, [lang, portfolioFilter]);

  // Jika paket belum diisi, fallback ke Landing Page
  const currentPricing = pricingData[activeTab] || pricingData['Landing Page'];


  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}} />
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
            <a href="#portfolio" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">{t[lang].navProject}</a>
            <a href="#harga" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">{t[lang].navHarga}</a>
            <a href="#tentang" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">{t[lang].navTentang}</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">{t[lang].navFaq}</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="https://wa.me/628153424280" target="_blank" rel="noreferrer " className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 shadow shadow-blue-600/20 transition">{t[lang].navContact}</a>
            {/* Lang Dropdown / Toggle */}
            <div className="flex bg-slate-100 rounded-full p-1 ml-2 shadow-inner items-center">
              <button onClick={() => setLang('id')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'id' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>ID</button>
              <button onClick={() => setLang('en')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>EN</button>
            </div>
          </div>
        </nav>
      </div>

      {/* --- CLEAN HERO SECTION --- */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden bg-white flex flex-col items-center text-center">
        {/* Decorative Gradients & Grid */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[100px] opacity-60 z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[100px] opacity-60 z-0 pointer-events-none"></div>

        {/* Subtle Dot Pattern */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '32px 32px', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }}></div>

        {/* Floating Tech Accents */}
        <div className="absolute top-36 left-[12%] hidden lg:block opacity-20 animate-[bounce_4s_ease-in-out_infinite] z-0 pointer-events-none">
          <Monitor className="w-10 h-10 text-blue-500" />
        </div>
        <div className="absolute top-48 right-[15%] hidden lg:block opacity-20 animate-[pulse_3s_ease-in-out_infinite] z-0 pointer-events-none">
          <Code className="w-12 h-12 text-slate-500" />
        </div>
        {/* <div className="absolute top-1/2 left-[20%] hidden lg:block opacity-10 animate-[pulse_5s_ease-in-out_infinite] z-0 pointer-events-none">
        </div> */}
        <div className="absolute bottom-32 right-[10%] hidden lg:block opacity-20 animate-[bounce_5s_ease-in-out_infinite] z-0 pointer-events-none">
          <Smartphone className="w-9 h-9 text-slate-600" />
        </div>
        <div className="absolute bottom-20 left-[15%] hidden lg:block opacity-20 animate-[pulse_4s_ease-in-out_infinite] z-0 pointer-events-none">
          <Database className="w-14 h-14 text-blue-400" />
        </div>
        <div className="absolute top-24 right-[5%] hidden lg:block opacity-10 animate-[bounce_6s_ease-in-out_infinite] z-0 pointer-events-none">
          <Cloud className="w-14 h-14 text-slate-400" />
        </div>
        <div className="absolute top-1/3 left-6 hidden lg:block opacity-15 animate-[pulse_6s_ease-in-out_infinite] z-0 pointer-events-none">
          <Globe className="w-8 h-8 text-blue-300" />
        </div>

        {/* Subtle abstract background lines similar to reference */}
        <div className="absolute left-0 bottom-0 w-[400px] h-[300px] border-t-[1.5px] border-r-[1.5px] border-slate-200 rounded-tr-[100px] border-dashed opacity-40 z-0 pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 w-[400px] h-[300px] border-t-[1.5px] border-l-[1.5px] border-slate-200 rounded-tl-[100px] border-dashed opacity-40 z-0 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center relative z-10 pt-10"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 mb-6 tracking-tight">
            {t[lang].heroTitle1}<br className="hidden md:block" /> {t[lang].heroTitle2}
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-10">
            {t[lang].heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <a href="#harga" className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold shadow-xl shadow-blue-500/20 hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300">
              {t[lang].heroBtnStart}
            </a>
            <a href="#portfolio" className="bg-white text-slate-800 border border-slate-200 px-8 py-3 rounded-full font-semibold shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300">
              {t[lang].heroBtnPort}
            </a>
          </div>
        </motion.div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="tentang" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t[lang].aboutTag}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              {t[lang].aboutTitle}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t[lang].aboutDesc}
            </p>
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{t[lang].aboutSvc1Title}</h4>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <PenTool className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{t[lang].aboutSvc2Title}</h4>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Megaphone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{t[lang].aboutSvc3Title}</h4>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Share2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{t[lang].aboutSvc4Title}</h4>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 w-full relative"
          >
            {/* Dekorasi Latar */}
            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] transform translate-x-4 translate-y-4 opacity-10"></div>
            <div className="absolute -inset-4 border border-slate-200 rounded-[3.5rem] transform -translate-x-2 -translate-y-2 z-0"></div>

            {/* Kontainer Gambar Utama */}
            <div className="bg-slate-200 rounded-[3rem] overflow-hidden relative aspect-square z-10 shadow-xl shadow-slate-200/50">
              <img src="/path-to-about-image.jpg" alt="Tentang TechSoed" className="w-full h-full object-cover" />

              {/* Badge Overlays */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-8 left-8 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-lg border border-white/20"
              >
                <div className="text-3xl font-black text-blue-600">{t[lang].aboutExpNum}</div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">{t[lang].aboutExpText}</div>
              </motion.div>
            </div>
          </motion.div>
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
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t[lang].portTag}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
                {t[lang].portTitle}
              </h2>
            </div>
            <p className="text-slate-500 max-w-md md:text-right leading-relaxed">
              {t[lang].portDesc}
            </p>
          </div>

          {/* Filtering Pills */}
          <div className="flex overflow-x-auto snap-x snap-mandatory flex-nowrap md:flex-wrap items-center gap-3 mb-12 pb-2 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden before:content-[''] before:shrink-0 before:w-1 md:before:w-0 after:content-[''] after:shrink-0 after:w-4 md:after:w-0">
            {portfolioCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setPortfolioFilter(cat)}
                className={`snap-start shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${portfolioFilter === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic Grid Layout (Bento Style & Mobile Horizontal Scroll) */}
          <div className="relative group">
            {/* Nav Arrows */}
            <div className="absolute top-1/2 -ml-2 sm:-ml-4 md:hidden left-0 z-20 transform -translate-y-1/2 pointer-events-none">
              <button type="button" onClick={() => scrollContainer(portfolioScrollRef, 'left')} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center pointer-events-auto text-slate-600 hover:text-blue-600 transition active:scale-95 border border-slate-100">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -mr-2 sm:-mr-4 md:hidden right-0 z-20 transform -translate-y-1/2 pointer-events-none">
              <button type="button" onClick={() => scrollContainer(portfolioScrollRef, 'right')} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center pointer-events-auto text-slate-600 hover:text-blue-600 transition active:scale-95 border border-slate-100">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div ref={portfolioScrollRef} className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-[350px] pb-8 -mx-6 px-6 md:mx-0 md:px-0 scroll-pl-6 md:scroll-pl-0 before:content-[''] before:shrink-0 before:w-1 md:before:hidden after:content-[''] after:shrink-0 after:w-px md:after:hidden">
              {filteredProjects.map((project: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`group snap-center shrink-0 w-[85vw] md:w-auto min-h-[350px] md:min-h-0 cursor-pointer relative rounded-[2rem] overflow-hidden bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-8 ${project.size === 'large' ? 'md:col-span-2 lg:col-span-2 bg-slate-800' : 'md:col-span-1'
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
                </motion.div>
              ))}
            </div>
          </div>

          {/* Load More Button */}
          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-2 mx-auto">
              {t[lang].portLoadMore} <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="harga" className="py-24 px-6 bg-slate-50 border-t border-slate-100 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t[lang].priceTag}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              {t[lang].priceTitle}
            </h2>
            <p className="text-lg text-slate-600">
              {t[lang].priceDesc}
            </p>
          </div>

          {/* TABS */}
          <div className="flex overflow-x-auto snap-x snap-mandatory flex-nowrap md:flex-wrap justify-start md:justify-center mb-16 gap-2 px-6 md:px-4 max-w-5xl mx-auto -mx-6 md:mx-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden before:content-[''] before:shrink-0 before:w-1 md:before:w-0 after:content-[''] after:shrink-0 after:w-4 md:after:w-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`snap-start shrink-0 px-5 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl ${activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 border border-slate-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* PRICING CONTENT (Horizontal scroll on mobile) */}
          <div className="relative w-full group">
            {/* Nav Arrows */}
            <div className="absolute top-1/2 -ml-2 sm:-ml-4 md:hidden left-0 z-20 transform -translate-y-1/2 pointer-events-none">
              <button type="button" onClick={() => scrollContainer(pricingScrollRef, 'left')} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-xl flex items-center justify-center pointer-events-auto text-slate-600 hover:text-blue-600 transition active:scale-95 border border-slate-100">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -mr-2 sm:-mr-4 md:hidden right-0 z-20 transform -translate-y-1/2 pointer-events-none">
              <button type="button" onClick={() => scrollContainer(pricingScrollRef, 'right')} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-xl flex items-center justify-center pointer-events-auto text-slate-600 hover:text-blue-600 transition active:scale-95 border border-slate-100">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div ref={pricingScrollRef} className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 gap-8 lg:items-center w-full pb-8 pt-4 px-6 md:px-4 -mx-6 md:mx-0 scroll-pl-6 md:scroll-pl-0 before:content-[''] before:shrink-0 before:w-1 md:before:hidden after:content-[''] after:shrink-0 after:w-px lg:after:hidden">
              {currentPricing?.map((pkg: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative snap-center shrink-0 w-[85vw] lg:w-auto flex flex-col p-8 lg:p-10 transition duration-300 rounded-3xl border ${pkg.isPopular
                    ? 'bg-blue-600 border-blue-500 shadow-2xl shadow-blue-900/20 z-10 lg:scale-105'
                    : 'bg-white border-slate-200 hover:border-blue-200 shadow-sm'
                    }`}
                >
                  {/* Accent Ribbon for Popular */}
                  {pkg.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
                      {t[lang].pricePopular}
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
                    <button
                      onClick={() => handleOrderClick(pkg)}
                      className={`w-full py-3.5 font-bold rounded-xl transition flex items-center justify-center gap-2 ${pkg.isPopular
                        ? 'bg-white text-blue-600 hover:bg-slate-50 shadow-md'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100'
                        }`}>
                      <ShoppingCart className="w-5 h-5" /> {t[lang].priceOrderText}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Consultation Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t[lang].priceConsultText}</h3>
            <div className="mt-6">
              <a
                href={`https://wa.me/628153424280?text=${t[lang].orderWaGreeting}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" /> {t[lang].priceConsultBtn}
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 px-6 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-[10%] w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 z-0"></div>
        <div className="absolute bottom-0 left-[10%] w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-10 z-0"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto mb-16 text-center relative z-10 space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{t[lang].testiTag}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
            {t[lang].testiTitle}
          </h2>
        </motion.div>

        <div className="relative flex overflow-x-hidden group">
          <div className="py-4 animate-scroll flex gap-6 px-3 w-max">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[350px] sm:w-[400px] bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-xl shrink-0 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-6">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-slate-300 mb-8 italic line-clamp-4 text-lg">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg text-white shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white leading-tight">{t.name}</h4>
                    <p className="text-sm text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              {t[lang].faqH2}
            </h2>
            <p className="text-lg text-slate-600">
              {t[lang].faqDesc}
            </p>
          </motion.div>

          <div className="space-y-4">
            {t[lang].faqData.map((faq: { q: string, a: string }, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
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
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-[500px] pb-5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA BANNER SECTION --- */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-700 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {t[lang].ctaTitle}
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed font-medium">
              {t[lang].ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-extrabold hover:bg-blue-50 transition drop-shadow-lg flex items-center justify-center gap-2">
                {t[lang].ctaBtn} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
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
              {t[lang].footerDesc}
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

          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t[lang].footerSvcHeading}</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#harga" className="hover:text-blue-400 transition">Web Development</a></li>
              <li><a href="#harga" className="hover:text-blue-400 transition">UI/UX Design</a></li>
              <li><a href="#harga" className="hover:text-blue-400 transition">Sistem Informasi (CMS/LMS)</a></li>
              <li><a href="#harga" className="hover:text-blue-400 transition">Digital Branding</a></li>
              <li><a href="#harga" className="hover:text-blue-400 transition">Social Media Management</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t[lang].footerContactHeading}</h4>
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
            {t[lang].footerCopyright.replace('{year}', new Date().getFullYear().toString())}
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span>{t[lang].footerMadeWithLove}</span>
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

      {/* --- FORM ORDER MODAL --- */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsOrderModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">{t[lang].orderFormTitle}</h3>
                <button onClick={() => setIsOrderModalOpen(false)} className="text-slate-400 hover:text-slate-700 bg-white p-2 rounded-full shadow-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleOrderSubmit} className="p-6 space-y-5">

                {/* Package Card Summary */}
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t[lang].orderFormPackage}</p>
                    <p className="font-bold text-slate-900">{selectedPackage.category} - {selectedPackage.name}</p>
                    <p className="text-sm font-medium text-slate-600">{selectedPackage.price}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">{t[lang].orderFormName} *</label>
                  <input required value={orderForm.name} onChange={e => setOrderForm({ ...orderForm, name: e.target.value })} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="Budi Santoso" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">{t[lang].orderFormPhone} *</label>
                    <input required value={orderForm.phone} onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })} type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="0812..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">{t[lang].orderFormEmail}</label>
                    <input value={orderForm.email} onChange={e => setOrderForm({ ...orderForm, email: e.target.value })} type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="budi@email.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">{t[lang].orderFormProject} *</label>
                  <textarea required value={orderForm.projectDesc} onChange={e => setOrderForm({ ...orderForm, projectDesc: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none" placeholder="..."></textarea>
                </div>

                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setIsOrderModalOpen(false)} className="px-6 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition">
                    {t[lang].orderFormCancel}
                  </button>
                  <button type="submit" className="flex-1 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" /> {t[lang].orderFormSubmit}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
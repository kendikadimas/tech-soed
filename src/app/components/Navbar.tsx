"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Globe, Briefcase, Menu, X } from 'lucide-react';
import { t } from '../translations';
import { useLang } from './LangContext';


export default function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Grouped Menu Data
  const menuData = {
    services: [
      { id: 'web', title: 'Web Development', desc: lang === 'id' ? 'Website modern, cepat & SEO-friendly' : 'Modern, fast & SEO-friendly websites', href: '#harga' },
      { id: 'mobile', title: 'Mobile Apps', desc: lang === 'id' ? 'Aplikasi Android & iOS kustom' : 'Custom Android & iOS applications', href: '#harga' },
      { id: 'design', title: 'UI/UX Design', desc: lang === 'id' ? 'Desain antarmuka yang intuitif' : 'Intuitive interface design', href: '#harga' },
      { id: 'system', title: 'Sistem Informasi', desc: lang === 'id' ? 'Solusi CMS, LMS, ERP & CRM khusus' : 'Custom CMS, LMS, ERP & CRM solutions', href: '#harga' },
      { id: 'smm', title: 'Social Media', desc: lang === 'id' ? 'Manajemen konten & branding brand' : 'Content management & branding', href: '#harga' },
    ],
    company: [
      { id: 'portfolio', title: lang === 'id' ? 'Project Showcase' : 'Our Work', desc: lang === 'id' ? 'Eksplorasi hasil karya terbaik kami' : 'Explore our best work', href: '#portfolio' },
      { id: 'testi', title: lang === 'id' ? 'Testimoni' : 'Testimonials', desc: lang === 'id' ? 'Apa kata klien tentang layanan kami' : 'What clients say about our services', href: '#testimoni' },
      { id: 'about', title: lang === 'id' ? 'Tentang Kami' : 'About Us', desc: lang === 'id' ? 'Misi dan perjalanan TechSoe' : 'TechSoe mission and journey', href: '#tentang' },
    ],
    support: [
      { id: 'pricing', title: lang === 'id' ? 'Daftar Harga' : 'Pricing', href: '#harga' },
      { id: 'faq', title: 'FAQ', href: '#faq' },
      { id: 'blog', title: lang === 'id' ? 'Artikel' : 'Blog', href: '/blog' },
    ]
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-white py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* LOGO */}
            <Link href="/" className="flex items-center">
              <div className="relative w-40 h-10">
                <Image 
                  src="/projects/logo.png" 
                  alt="TechSoe Logo" 
                  fill 
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* DESKTOP MENU (LEFT ALIGNED) */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Layanan Dropdown */}
              <div 
                className="relative px-3 py-2 group cursor-pointer"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-600 transition">
                  {lang === 'id' ? 'Layanan' : 'Services'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-blue-600' : ''}`} />
                </div>
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-80 bg-white shadow-xl rounded-2xl border border-slate-100 p-4 mt-2 grid grid-cols-1 gap-1"
                    >
                      {menuData.services.map((item) => (
                        <Link key={item.id} href={item.href} className="p-3 rounded-xl hover:bg-slate-50 transition group/item">
                          <div className="font-bold text-sm text-slate-900 group-hover/item:text-blue-600">{item.title}</div>
                          <div className="text-[11px] text-slate-500 leading-tight">{item.desc}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Company Dropdown */}
              <div 
                className="relative px-3 py-2 group cursor-pointer"
                onMouseEnter={() => setActiveDropdown('company')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-600 transition">
                  {lang === 'id' ? 'Perusahaan' : 'Company'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'company' ? 'rotate-180 text-blue-600' : ''}`} />
                </div>
                <AnimatePresence>
                  {activeDropdown === 'company' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-80 bg-white shadow-xl rounded-2xl border border-slate-100 p-4 mt-2 grid grid-cols-1 gap-1"
                    >
                      {menuData.company.map((item) => (
                        <Link key={item.id} href={item.href} className="p-3 rounded-xl hover:bg-slate-50 transition group/item">
                          <div className="font-bold text-sm text-slate-900 group-hover/item:text-blue-600">{item.title}</div>
                          <div className="text-[11px] text-slate-500 leading-tight">{item.desc}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Support Dropdown */}
              <div 
                className="relative px-3 py-2 group cursor-pointer"
                onMouseEnter={() => setActiveDropdown('support')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-600 transition">
                  {lang === 'id' ? 'Dukungan' : 'Support'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'support' ? 'rotate-180 text-blue-600' : ''}`} />
                </div>
                <AnimatePresence>
                  {activeDropdown === 'support' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-2xl border border-slate-100 p-4 mt-2 grid grid-cols-1 gap-1"
                    >
                      {menuData.support.map((item) => (
                        <Link key={item.id} href={item.href} className="p-3 rounded-xl hover:bg-slate-50 transition font-bold text-sm text-slate-900 hover:text-blue-600">
                          {item.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* RIGHT TOOLS */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Lang Switcher Mekari style */}
            <div 
              className="relative group cursor-pointer py-2"
              onMouseEnter={() => setActiveDropdown('lang')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                <Globe className="w-4 h-4" />
                <span className="uppercase">{lang}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
              <AnimatePresence>
                {activeDropdown === 'lang' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 w-32 bg-white shadow-xl rounded-xl border border-slate-100 p-2 mt-1"
                  >
                    <button 
                      onClick={() => setLang('id')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${lang === 'id' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      Bindo (ID)
                    </button>
                    <button 
                      onClick={() => setLang('en')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${lang === 'en' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      English (EN)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="#portfolio" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {t[lang].navSignIn}
            </Link>

            {/* Mekari Style WhatsApp Button */}
            <a 
              href="https://wa.me/628153424280" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#25D366] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#20bd5a] shadow-md shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {t[lang].navWhatsApp}
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden p-2 text-slate-700" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU PANEL */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-4">
                <div className="font-bold text-xs text-slate-400 uppercase tracking-wider">{lang === 'id' ? 'Layanan' : 'Services'}</div>
                {menuData.services.map(p => (
                  <Link key={p.id} href={p.href} className="text-slate-700 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>{p.title}</Link>
                ))}
                
                <hr className="border-slate-50" />
                
                <div className="font-bold text-xs text-slate-400 uppercase tracking-wider">{lang === 'id' ? 'Perusahaan' : 'Company'}</div>
                {menuData.company.map(c => (
                  <Link key={c.id} href={c.href} className="text-slate-700 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>{c.title}</Link>
                ))}

                <hr className="border-slate-50" />

                <div className="font-bold text-xs text-slate-400 uppercase tracking-wider">{lang === 'id' ? 'Dukungan' : 'Support'}</div>
                {menuData.support.map(s => (
                  <Link key={s.id} href={s.href} className="text-slate-700 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>{s.title}</Link>
                ))}
                
                <div className="flex gap-4 mt-4">
                  <button onClick={() => setLang('id')} className={`px-4 py-2 rounded-lg text-sm font-bold ${lang === 'id' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>ID</button>
                  <button onClick={() => setLang('en')} className={`px-4 py-2 rounded-lg text-sm font-bold ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>EN</button>
                </div>

                <a 
                  href="https://wa.me/628153424280" 
                  className="bg-[#25D366] text-white p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {t[lang].navWhatsApp}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
    </>
  );
}

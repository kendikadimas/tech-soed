"use client";

import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { t } from '../translations';
import { useLang } from './LangContext';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 px-6 rounded-t-[3rem] mt-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-56 h-14 relative flex items-center justify-start overflow-hidden">
              <Image src="/projects/logo.png" alt="TechSoe Logo" fill className="object-contain object-left" />
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{t[lang].footerDesc}</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"><Facebook className="w-4 h-4" /></a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
        <div />
        <div>
          <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t[lang].footerSvcHeading}</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="#harga" className="hover:text-blue-400 transition">Web Development</Link></li>
            <li><Link href="#harga" className="hover:text-blue-400 transition">UI/UX Design</Link></li>
            <li><Link href="#harga" className="hover:text-blue-400 transition">Sistem Informasi (CMS/LMS)</Link></li>
            <li><Link href="#harga" className="hover:text-blue-400 transition">Digital Branding</Link></li>
            <li><Link href="#harga" className="hover:text-blue-400 transition">Social Media Management</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t[lang].footerContactHeading}</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /><span className="leading-relaxed">Purwokerto, Jawa Tengah</span></li>
            <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-blue-500 shrink-0" /><span>+62 815-3424-280</span></li>
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-blue-500 shrink-0" /><span>halo@techsoe.com</span></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500">{t[lang].footerCopyright.replace('{year}', new Date().getFullYear().toString())}</p>
        <div className="flex items-center gap-6 text-sm text-slate-500"><span>{t[lang].footerMadeWithLove}</span></div>
      </div>
    </footer>
  );
}

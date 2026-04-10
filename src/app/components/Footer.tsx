"use client";

import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { t } from '../translations';
import { useLang } from './LangContext';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-slate-900 text-slate-300 py-20 px-6 lg:px-12 rounded-t-[3rem] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900/5 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="w-56 h-14 relative flex items-center justify-start overflow-hidden">
                <Image src="/projects/logo.png" alt="TechSoe Logo" fill className="object-contain object-left" />
              </div>
            </div>
            <p className="text-sm lg:text-base text-slate-400 font-medium leading-relaxed max-w-sm">
              {t[lang].footerDesc}
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Facebook, href: '#', label: 'Facebook' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-900 hover:text-white transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-4">
              {['Layanan', 'Portfolio', 'Tentang Kami', 'Harga'].map((item, i) => (
                <li key={i}>
                  <Link href={`#${item.toLowerCase().replace(' ', '')}`} className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-500 transition-colors" />
                    <span className="text-sm font-bold">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">{t[lang].footerSvcHeading}</h3>
            <ul className="space-y-4">
              {[
                { name: 'Web Development', tag: 'Hot' },
                { name: 'UI/UX Design' },
                { name: 'Mobile Apps' },
                { name: 'Information Systems' },
                { name: 'Digital Branding' }
              ].map((svc, i) => (
                <li key={i}>
                  <Link href="#layanan" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center justify-between group">
                    <span className="text-sm font-bold">{svc.name}</span>
                    {svc.tag && <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-500/20">{svc.tag}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Reach Out</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-slate-400 leading-relaxed">
                  Purwokerto, Jawa Tengah <br /> Indonesia
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-slate-400">
                  +62 815-3424-280
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-slate-400">
                  halo@techsoe.com
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs lg:text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} TechSoe Digital Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

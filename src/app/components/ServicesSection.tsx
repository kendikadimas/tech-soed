"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Monitor, 
  Smartphone, 
  Palette, 
  Settings, 
  Megaphone, 
  Search 
} from 'lucide-react';
import { t } from '../translations';
import { useLang } from './LangContext';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesSection() {
  const { lang } = useLang();

  const services = [
    {
      id: 'web',
      title: t[lang].svcWebTitle,
      desc: lang === 'id' ? 'Website responsif & canggih.' : 'Responsive & advanced websites.',
      icon: Monitor,
      target: '#portfolio'
    },
    {
      id: 'mobile',
      title: t[lang].svcMobileTitle,
      desc: lang === 'id' ? 'Aplikasi Android & iOS kustom.' : 'Custom Android & iOS apps.',
      icon: Smartphone,
      target: '#portfolio'
    },
    {
      id: 'design',
      title: t[lang].svcDesignTitle,
      desc: lang === 'id' ? 'Desain UI/UX intuitif.' : 'Intuitive UI/UX design.',
      icon: Palette,
      target: '#portfolio'
    },
    {
      id: 'branding',
      title: t[lang].svcSMMTitle,
      desc: lang === 'id' ? 'Manajemen konten & strategi media sosial.' : 'Social media strategy & management.',
      icon: Megaphone,
      target: '#harga'
    },
    {
      id: 'system',
      title: t[lang].svcSystemTitle,
      desc: lang === 'id' ? 'Sistem internal & otomasi data bisnis.' : 'Internal systems & business automation.',
      icon: Settings,
      target: '#harga'
    }
  ];

  return (
    <section id="layanan" className="py-24 px-6 lg:px-36 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left max-w-3xl mb-16 relative">
          <div className="absolute -top-10 -left-6 w-32 h-32 bg-blue-100/50 blur-3xl rounded-full -z-10" />
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-extrabold text-[#1a2b4b] leading-tight"
          >
            {t[lang].svcTitle}
          </motion.h2>
          {/* <div className="w-12 h-1 bg-blue-600/80 mt-4 rounded-full" /> */}
        </div>

        {/* Card List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group relative rounded-lg p-6 bg-blue-950 border border-slate-200/60  hover:border-blue-500/30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04),0_10px_20px_-2px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex items-center gap-6 overflow-hidden"
              >
                {/* Accent Border */}
                {/* <div className="absolute left-0 top-0 w-1 h-full bg-transparent group-hover:bg-blue-600 transition-colors" /> */}

                {/* Icon Left */}
                <div className="flex-shrink-0 text-slate-400 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7 lg:w-9 lg:h-9 stroke-[1.5]" />
                </div>

                {/* Content */}
                <div className="flex-1 text-left relative z-10">
                  <h3 className="text-base lg:text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs lg:text-sm font-medium text-slate-400 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                {/* Arrow Right */}
                <Link 
                  href={svc.target} 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-200 group-hover:text-blue-950 group-hover:bg-blue-50 transition-all"
                >
                  <ArrowRight className="w-5 h-5 transform  transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

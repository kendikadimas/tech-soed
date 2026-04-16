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
} from 'lucide-react';
import { t } from '../translations';
import { useLang } from './LangContext';
import Link from 'next/link';

export default function ServicesSection() {
  const { lang } = useLang();

  const services = [
    {
      id: 'web',
      title: t[lang].svcWebTitle,
      desc: t[lang].svcWebDesc,
      icon: Monitor,
      target: '#portfolio'
    },
    {
      id: 'mobile',
      title: t[lang].svcMobileTitle,
      desc: t[lang].svcMobileDesc,
      icon: Smartphone,
      target: '#portfolio'
    },
    {
      id: 'design',
      title: t[lang].svcDesignTitle,
      desc: t[lang].svcDesignDesc,
      icon: Palette,
      target: '#portfolio'
    },
    {
      id: 'branding',
      title: t[lang].svcSMMTitle,
      desc: t[lang].svcSMMDesc,
      icon: Megaphone,
      target: '#harga'
    },
    {
      id: 'system',
      title: t[lang].svcSystemTitle,
      desc: t[lang].svcSystemDesc,
      icon: Settings,
      target: '#harga'
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left max-w-3xl mb-16 relative">
          <div className="absolute -top-10 -left-6 w-32 h-32 bg-blue-100/50 dark:bg-blue-900/20 blur-3xl rounded-full -z-10" />
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white transition-colors leading-[1.1] mb-6"
          >
            {t[lang].svcTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 transition-colors font-medium leading-relaxed max-w-2xl"
          >
            {t[lang].svcText}
          </motion.p>
        </div>

        {/* Card List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;

            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group relative rounded-lg p-6 bg-blue-950 border border-slate-200/60 dark:border-slate-700/60 transition-colors hover:border-blue-500/30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04),0_10px_20px_-2px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex items-center gap-6 overflow-hidden"
              >
                {/* Icon Left */}
                <div className="shrink-0 text-slate-400 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7 lg:w-9 lg:h-9 stroke-[1.5]" />
                </div>

                {/* Content */}
                <div className="flex-1 text-left relative z-10">
                  <div className="text-base lg:text-lg font-bold text-white mb-1 group-hover:text-white transition-colors ">
                    {svc.title}
                  </div>
                  <p className="text-xs lg:text-sm font-medium text-slate-400 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                {/* Arrow Right */}
                <Link
                  href={svc.target}
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-200 group-hover:text-blue-900 group-hover:bg-blue-50 transition-all font-bold"
                >
                  <ArrowRight className="w-5 h-5 transform transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

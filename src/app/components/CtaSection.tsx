"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  const { lang } = useLang();

  return (
    <section className="py-20 px-6 lg:px-12 bg-slate-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto relative bg-blue-900 rounded-[2.5rem] p-10 lg:p-16 text-center shadow-2xl shadow-blue-900/20"
      >
        {/* Simplified Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-slate-950/10 transition-colors blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 dark:bg-indigo-900/10 blur-[100px] rounded-full" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4 max-w-3xl">
            {t[lang].ctaTitle}
          </h2>

          <p className="text-base lg:text-lg text-indigo-100 font-medium mb-8 max-w-2xl opacity-90">
            {t[lang].ctaDesc}
          </p>

          <a
            href={`https://wa.me/6281234567890?text=${encodeURIComponent(t[lang].orderWaGreeting)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-blue-900 hover:bg-slate-50 transition-all font-black rounded-2xl shadow-xl hover:-translate-y-1 active:scale-95"
          >
            <span>{t[lang].ctaBtn}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

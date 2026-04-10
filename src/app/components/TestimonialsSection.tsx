"use client";

import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';
import SectionTag from './SectionTag';

export default function TestimonialsSection() {
  const { lang } = useLang();
  const testimonials = t[lang].testimonials;

  return (
    <section className="py-24 px-6 lg:px-36 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 right-[10%] w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 z-0" />
      <div className="absolute bottom-0 left-[10%] w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-10 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mb-16 text-center relative z-10 space-y-4"
      >
        <SectionTag text={t[lang].testiTag} variant="dark" />
        <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
          {t[lang].testiTitle}
        </h2>
      </motion.div>

      <div className="relative flex overflow-x-hidden group">
        <div className="py-4 animate-scroll flex gap-6 px-3 w-max">
          {[...testimonials, ...testimonials].map((testi: any, i: number) => (
            <div key={i} className="w-[350px] sm:w-[400px] bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-xl shrink-0 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-6">
                  {[...Array(testi.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-300 mb-8 italic line-clamp-4 text-base">&quot;{testi.text}&quot;</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg text-white shrink-0">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">{testi.name}</h3>
                  <p className="text-sm text-slate-400">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

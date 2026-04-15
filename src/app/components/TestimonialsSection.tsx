"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { t } from '../translations';
import { useLang } from './LangContext';

export default function TestimonialsSection() {
  const { lang } = useLang();
  const testimonials = t[lang].testimonials;

  return (
    <section id="testimoni" className="py-24 px-6 lg:px-12 bg-white overflow-hidden relative">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-[5%] w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-40 z-0" />
      <div className="absolute bottom-0 left-[5%] w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-40 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center space-y-4"
        >
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900">
            {t[lang].testiTitle}
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-sm lg:text-base">
            Kepuasan klien adalah prioritas utama kami. Berikut adalah pengalaman mereka bekerja sama dengan TechSoe.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testi: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 relative group flex flex-col h-full"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-blue-900/10 group-hover:text-blue-900/20 transition-colors">
                <Quote className="w-10 h-10 fill-current" />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(testi.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-1 text-sm lg:text-base italic">
                &quot;{testi.text}&quot;
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 border-t border-slate-200/60 pt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-blue-100 shrink-0 border-2 border-white shadow-sm">
                  <Image
                    src={`https://i.pravatar.cc/48?u=${testi.name}`}
                    alt={testi.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm lg:text-base font-black text-slate-900 leading-tight">
                    {testi.name}
                  </h3>
                  <p className="text-blue-600 font-bold text-[10px] lg:text-[11px] uppercase tracking-widest mt-0.5">
                    {testi.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

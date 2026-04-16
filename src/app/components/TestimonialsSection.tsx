"use client";

import React, { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';

export default function TestimonialsSection() {
  const { lang } = useLang();
  const testimonials = t[lang].testimonials;
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (!testimonialsScrollRef.current) return;
    const amount = testimonialsScrollRef.current.offsetWidth * 0.8;
    testimonialsScrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="testimoni" className="py-24 px-6 lg:px-12 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden relative">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-[5%] w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-[120px] opacity-40 z-0" />
      <div className="absolute bottom-0 left-[5%] w-96 h-96 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-40 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center space-y-4"
        >
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white transition-colors ">
            {t[lang].testiTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors font-medium max-w-2xl mx-auto text-sm lg:text-base">
            Kepuasan klien adalah prioritas utama kami. Berikut adalah pengalaman mereka bekerja sama dengan TechSoe.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative group/testi">
          <button
            onClick={() => scrollTestimonials('left')}
            className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>

          <button
            onClick={() => scrollTestimonials('right')}
            className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>

          <div
            ref={testimonialsScrollRef}
            className="flex gap-6 lg:gap-8 overflow-x-auto pb-4 px-2 -mx-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
          {testimonials.map((testi: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[88%] sm:min-w-[60%] lg:min-w-[32%] bg-slate-50 dark:bg-slate-950 transition-colors border border-slate-100 dark:border-slate-800 transition-colors p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 relative group flex flex-col h-full snap-center"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-blue-900/10 group-hover:text-blue-900/20 transition-colors ">
                <Quote className="w-10 h-10 fill-current" />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(testi.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-600 dark:text-slate-400 transition-colors font-medium leading-relaxed mb-8 flex-1 text-sm lg:text-base italic">
                &quot;{testi.text}&quot;
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 border-t border-slate-200/60 dark:border-slate-700/60 transition-colors pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center shrink-0 border-2 border-white shadow-sm text-white font-black text-lg">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm lg:text-base font-black text-slate-900 dark:text-white transition-colors leading-tight">
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
      </div>
    </section>
  );
}

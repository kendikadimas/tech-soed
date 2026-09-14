"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';
import { createClient } from '@/lib/supabase/client';

interface TestimonialItem {
  id?: string;
  name: string;
  role: string;
  text: string;
  rating?: number;
  avatar_url?: string;
  published?: boolean;
}

export default function TestimonialsSection() {
  const { lang } = useLang();
  const staticTestimonials = t[lang].testimonials;
  const [dbTestimonials, setDbTestimonials] = useState<TestimonialItem[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (data && data.length > 0 && !error) {
          setDbTestimonials(data);
        }
      } catch {
        // Fallback to static
      }
    }
    fetchTestimonials();
  }, []);

  const displayTestimonials = dbTestimonials.length > 0 ? dbTestimonials : staticTestimonials;
  // Duplicate array for seamless continuous infinite marquee loop
  const doubleTestimonials = [...displayTestimonials, ...displayTestimonials];

  return (
    <section id="testimoni" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden relative">
      {/* Decorative Ambient Glow */}
      <div className="absolute top-0 right-[5%] w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-[120px] opacity-40 z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-96 h-96 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-40 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 lg:mb-16 text-center space-y-3 sm:space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white transition-colors tracking-tight">
            {t[lang].testiTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors font-medium max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed">
            Kepuasan klien adalah prioritas utama kami. Berikut adalah pengalaman mereka bekerja sama dengan TechSoe.
          </p>
        </motion.div>

        {/* Continuous Horizontal Marquee Container */}
        <div
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Side Fade Overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />

          {/* Marquee Motion Track */}
          <motion.div
            className="flex gap-5 sm:gap-6 lg:gap-8 w-max"
            animate={isHovered ? {} : { x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: Math.max(25, displayTestimonials.length * 7),
                ease: 'linear',
              },
            }}
          >
            {doubleTestimonials.map((testi: any, index: number) => (
              <div
                key={index}
                className="w-[280px] sm:w-[350px] lg:w-[390px] shrink-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 lg:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-7 text-blue-900/10 dark:text-blue-400/10 group-hover:text-blue-900/20 transition-colors">
                  <Quote className="w-9 h-9 sm:w-10 sm:h-10 fill-current" />
                </div>

                <div>
                  {/* Star Rating */}
                  <div className="flex gap-1 text-amber-400 mb-4 sm:mb-5">
                    {[...Array(testi.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-slate-600 dark:text-slate-300 transition-colors font-medium leading-relaxed mb-6 text-xs sm:text-sm italic">
                    &quot;{testi.text}&quot;
                  </p>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-3.5 border-t border-slate-100 dark:border-slate-800 transition-colors pt-4 sm:pt-5">
                  {testi.avatar_url ? (
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border-2 border-white dark:border-slate-800 shadow-sm bg-[#172657]">
                      <Image
                        src={testi.avatar_url}
                        alt={testi.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#172657] dark:bg-blue-900 flex items-center justify-center shrink-0 border-2 border-white shadow-sm text-white font-black text-sm sm:text-base">
                      {testi.name ? testi.name.charAt(0) : 'K'}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white transition-colors leading-tight">
                      {testi.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">
                      {testi.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

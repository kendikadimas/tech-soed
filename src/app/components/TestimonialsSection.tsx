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
    <section id="testimoni" className="py-20 lg:py-28 bg-[#172657] dark:bg-white transition-colors overflow-hidden relative">
      {/* Background Dot Matrix Pattern (Matching Hero Section) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 pointer-events-none" />

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none" />

      {/* Constrained Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 lg:mb-16 text-center space-y-3 sm:space-y-4"
        >
          <h2 className="font-geist text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.65rem] font-bold text-white dark:text-slate-900 transition-colors leading-[1.2] sm:leading-[1.18] tracking-[-0.03em]">
            {t[lang].testiTitle}
          </h2>
          <p className="font-geist text-blue-100/80 dark:text-slate-500 transition-colors font-normal max-w-2xl mx-auto text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed">
            Kepuasan klien adalah prioritas utama kami. Berikut adalah pengalaman mereka bekerja sama dengan TechSoe.
          </p>
        </motion.div>
      </div>

      {/* Full-Bleed Slider with Smooth Edge Transparency Masking */}
      <div
        className="w-full overflow-hidden py-4 relative z-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
              className="card-3d-seamless !bg-white text-slate-900 w-[280px] sm:w-[350px] lg:w-[390px] shrink-0 p-6 sm:p-7 lg:p-8 rounded-3xl relative group flex flex-col justify-between cursor-pointer"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-7 text-slate-300/60 group-hover:text-blue-500/20 transition-colors">
                <Quote className="w-8 h-8 sm:w-9 sm:h-9 fill-current" />
              </div>

              <div>
                {/* Star Rating */}
                <div className="flex gap-1 text-amber-400 mb-4 sm:mb-5">
                  {[...Array(testi.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-600 font-normal sm:font-medium leading-relaxed mb-6 text-xs sm:text-sm italic">
                  &quot;{testi.text}&quot;
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-3.5 border-t border-slate-100 pt-4 sm:pt-5">
                {testi.avatar_url ? (
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-xs bg-[#172657]">
                    <Image
                      src={testi.avatar_url}
                      alt={testi.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shrink-0 border border-blue-400/30 shadow-xs text-white font-bold text-sm sm:text-base">
                    {testi.name ? testi.name.charAt(0) : 'K'}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug tracking-tight truncate">
                    {testi.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-normal mt-0.5 truncate">
                    {testi.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

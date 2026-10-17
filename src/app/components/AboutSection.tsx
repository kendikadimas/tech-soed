"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { t } from '../translations';
import { useLang } from './LangContext';
import IsometricOffice from './IsometricOffice';

export default function AboutSection() {
  const { lang } = useLang();

  return (
    <section id="tentang" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#172657] dark:bg-slate-900 rounded-2xl sm:rounded-3xl relative min-h-[480px] lg:min-h-[560px] flex items-center shadow-2xl shadow-blue-950/20 border border-blue-900/30 dark:border-slate-800 overflow-hidden p-6 sm:p-8 lg:p-12"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-0 w-[55%] h-full bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.18),transparent_70%)] pointer-events-none rounded-3xl" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.12),transparent_70%)] pointer-events-none" />

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-5 text-white space-y-5 sm:space-y-6 max-w-xl">
              <h2 className="font-geist text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.65rem] font-bold leading-[1.2] sm:leading-[1.18] tracking-[-0.03em] text-white">
                {t[lang].aboutTitle}
              </h2>

              <p className="font-geist text-blue-100/90 text-xs sm:text-sm lg:text-[1.02rem] leading-relaxed font-normal">
                {t[lang].aboutDesc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link 
                  href="#portfolio" 
                  className="btn-3d-base btn-3d-white px-7 sm:px-8 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider text-center min-h-[46px] flex items-center justify-center gap-2"
                >
                  <span>{t[lang].heroBtnPort}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Isometric Office Studio */}
            <div className="lg:col-span-7 w-full flex items-center justify-center">
              <IsometricOffice />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { t } from '../translations';
import { useLang } from './LangContext';

export default function HeroSection() {
  const { lang } = useLang();

  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 pb-16 px-6 lg:px-36 overflow-hidden bg-white">
      {/* Background Subtle Wavy Lines Pattern (SVG) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 600C200 400 500 800 800 600C1100 400 1400 600 1600 400"
            stroke="#6366f1"
            strokeWidth="0.5"
            strokeDasharray="10 10"
          />
          <path
            d="M-100 650C200 450 500 850 800 650C1100 450 1400 650 1600 450"
            stroke="#6366f1"
            strokeWidth="0.5"
            strokeDasharray="10 10"
          />
          <path
            d="M-100 700C200 500 500 900 800 700C1100 500 1400 700 1600 500"
            stroke="#6366f1"
            strokeWidth="0.5"
            strokeDasharray="10 10"
          />
          <path
             d="M1440 100C1200 300 900 -100 600 100C300 300 0 100 -200 300"
             stroke="#3b82f6"
             strokeWidth="0.5"
             strokeDasharray="10 10"
          />
        </svg>
      </div>

      <div className="max-w-screen mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* LEFT COLUMN: TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left"
        >
          <h1 className="text-2xl lg:text-5xl font-extrabold leading-[1.2] text-slate-900 mb-8 tracking-tight">
            {t[lang].heroTitle.split('&')[0]} 
            <span className="text-indigo-600 block lg:inline">{t[lang].heroTitle.split('&')[1]}</span>
          </h1>

          <p className="text-sm lg:text-lg text-slate-500 max-w-2xl leading-relaxed mb-10 font-medium">
            {t[lang].heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link 
              href="#harga" 
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 text-center"
            >
              {t[lang].heroBtnStart}
            </Link>
            <Link 
              href="#portfolio" 
              className="bg-white text-slate-800 border-2 border-slate-100 px-8 py-3.5 rounded-xl font-bold text-base hover:border-indigo-100 hover:bg-indigo-50/30 hover:-translate-y-1 transition-all duration-300 text-center"
            >
              {t[lang].heroBtnPort}
            </Link>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: IMAGE/MOCKUP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative lg:h-[650px] w-full flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[750px] aspect-square lg:aspect-auto lg:h-full group">
            {/* Main 3D Illustration with floating animation */}
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-full transform transition-transform duration-700 ease-out"
            >
              <Image 
                src="/projects/hero_mockup.png" 
                alt="TechSoe Digital Solution Illustration" 
                fill 
                className="object-contain lg:object-right select-none drop-shadow-[0_20px_50px_rgba(79,70,229,0.15)]"
                priority
              />
            </motion.div>
            
            {/* Visual Decorative Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-indigo-200/20 rounded-full blur-[120px] -z-10 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

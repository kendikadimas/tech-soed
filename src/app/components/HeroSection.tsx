"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { t } from '../translations';
import { useLang } from './LangContext';
import {
  Sparkles,
  Rocket,
  Users,
  CheckCircle2,
  Award,
  Zap,
  Layout,
  Smartphone,
  Palette,
  Database,
  Share2
} from 'lucide-react';

export default function HeroSection() {
  const { lang } = useLang();

  // Mapping icons to stats
  const statIcons = [CheckCircle2, Users, Award, Zap];
  const statColors = ['text-blue-900', 'text-blue-600', 'text-blue-900', 'text-blue-600'];

  const heroStats = t[lang].heroStats || [];

  return (
    <>
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-26 pb-12 px-6 md:px-16 lg:px-32 overflow-hidden bg-white">
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
              d="M1440 100C1200 300 900 -100 600 100C300 300 0 100 -200 300"
              stroke="#3b82f6"
              strokeWidth="0.5"
              strokeDasharray="10 10"
            />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center relative z-10">
          {/* LEFT COLUMN: TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left lg:pr-4"
          >
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] text-slate-900 mb-6 lg:mb-8 tracking-tight">
              {t[lang].heroTitle.split('&')[0]}
              <span className="text-blue-900 block">{t[lang].heroTitle.split('&')[1]}</span>
            </h1>

            <p className="text-base lg:text-lg text-slate-500 max-w-xl leading-relaxed mb-8 lg:mb-10 font-medium opacity-90">
              {t[lang].heroDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="#harga"
                className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-blue-900/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                {t[lang].heroBtnStart}
              </Link>
              <Link
                href="#portfolio"
                className="bg-white text-slate-800 border-2 border-slate-100 px-8 py-4 rounded-2xl font-bold text-base hover:border-indigo-100 hover:bg-indigo-50/30 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                {t[lang].heroBtnPort}
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: IMAGE/MOCKUP WITH INFO BUBBLES */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative w-full h-[450px] lg:h-[550px] xl:h-[650px] flex items-center justify-center pointer-events-none"
          >
            {/* Main Visual Container */}
            <div className="relative w-full h-full pointer-events-auto">

              {/* Main Image - Static */}
              <div className="absolute inset-0 z-10 w-full h-full">
                <Image
                  src="/projects/hero.png"
                  alt="TechSoe Digital Solution"
                  fill
                  className="object-contain object-center lg:object-right select-none transition-opacity duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Info Bubbles */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* Bubble 1: Desain Premium */}
                {/* <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: [0, -10, 0] 
                      }}
                      transition={{ 
                        delay: 1, 
                        scale: { type: "spring", stiffness: 100 },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute top-[8%] left-0 lg:-left-6 bg-white shadow-2xl shadow-indigo-200/50 p-2.5 lg:p-3.5 rounded-2xl border border-indigo-50 flex items-center gap-2.5 z-30 pointer-events-auto"
                  >
                      <div className="w-8 h-8 lg:w-9 lg:h-9 bg-blue-900 rounded-xl flex items-center justify-center text-white shrink-0">
                          <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                          <div className="text-[8px] lg:text-[9px] font-bold text-indigo-500 uppercase tracking-widest leading-none mb-1">High Quality</div>
                          <div className="text-[11px] lg:text-xs font-black text-slate-900 whitespace-nowrap">Desain Premium 💎</div>
                      </div>
                  </motion.div> */}

                {/* Bubble 2: Mobile Apps */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, 10, 0]
                  }}
                  transition={{
                    delay: 1.2,
                    scale: { type: "spring", stiffness: 100 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute top-[30%] -right-4 lg:-right-10 bg-white shadow-2xl shadow-blue-200/50 p-2.5 lg:p-3.5 rounded-2xl border border-blue-50 flex items-center gap-2.5 z-30 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-9 lg:h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[8px] lg:text-[9px] font-bold text-blue-500 uppercase tracking-widest leading-none mb-1">Mobile App</div>
                    <div className="text-[11px] lg:text-xs font-black text-slate-900 whitespace-nowrap">Android & iOS</div>
                  </div>
                </motion.div>

                {/* Bubble 3: Web Dev */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0]
                  }}
                  transition={{
                    delay: 1.4,
                    scale: { type: "spring", stiffness: 100 },
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute bottom-[25%] -left-6 lg:-left-16 bg-white shadow-2xl shadow-emerald-200/50 p-2.5 lg:p-3.5 rounded-2xl border border-emerald-50 flex items-center gap-2.5 z-30 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-9 lg:h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Layout className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[8px] lg:text-[9px] font-bold text-emerald-500 uppercase tracking-widest leading-none mb-1">Pembuatan</div>
                    <div className="text-[11px] lg:text-xs font-black text-slate-900 whitespace-nowrap">Website</div>
                  </div>
                </motion.div>

                {/* Bubble 4: UI/UX Design */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: [0, 5, 0]
                  }}
                  transition={{
                    delay: 1.5,
                    scale: { type: "spring", stiffness: 100 },
                    x: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute top-[25%] lg:-left-10 bg-white shadow-2xl shadow-purple-200/50 p-2.5 lg:p-3.5 rounded-2xl border border-purple-50 flex items-center gap-2.5 z-30 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-9 lg:h-9 bg-purple-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Palette className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[8px] lg:text-[9px] font-bold text-purple-500 uppercase tracking-widest leading-none mb-1">UI/UX Design</div>
                    <div className="text-[11px] lg:text-xs font-black text-slate-900 whitespace-nowrap">Modern Design</div>
                  </div>
                </motion.div>

                {/* Bubble 5: Social Media */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -6, 0]
                  }}
                  transition={{
                    delay: 1.7,
                    scale: { type: "spring", stiffness: 100 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute bottom-[40%] -right-6 lg:-right-16 bg-white shadow-2xl shadow-pink-200/50 p-2.5 lg:p-3.5 rounded-2xl border border-pink-50 flex items-center gap-2.5 z-30 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-9 lg:h-9 bg-pink-500 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Share2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[8px] lg:text-[9px] font-bold text-pink-500 uppercase tracking-widest leading-none mb-1">Social Media</div>
                    <div className="text-[11px] lg:text-xs font-black text-slate-900 whitespace-nowrap">Management</div>
                  </div>
                </motion.div>

                {/* Bubble 6: Semua Bisnis */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, 6, 0]
                  }}
                  transition={{
                    delay: 1.6,
                    scale: { type: "spring", stiffness: 100 },
                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute bottom-[20%] right-0 lg:-right-8 bg-slate-900 shadow-2xl shadow-slate-900/40 p-2.5 lg:p-4 rounded-2xl border border-slate-800 flex items-center gap-2.5 z-30 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-9 lg:h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/30">
                    <Rocket className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[8px] lg:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Scalable Solution</div>
                    <div className="text-xs lg:text-sm font-black text-white whitespace-nowrap">Untuk Semua Bisnis</div>
                  </div>
                </motion.div>
              </div>

              {/* Visual Decorative Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-200/10 rounded-full blur-[100px] lg:blur-[140px] z-0 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Honest Stats Section */}
      <div className="bg-white py-14 border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {heroStats.map((stat: any, index: number) => {
              const Icon = statIcons[index % statIcons.length];
              const color = statColors[index % statColors.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-50 ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-black text-slate-900 mb-1 leading-none">{stat.value}</div>
                    <div className="text-xs lg:text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

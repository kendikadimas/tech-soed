"use client";

import React from 'react';
import { motion, useInView, animate } from 'framer-motion';
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

function AnimatedCounter({ text }: { text: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = React.useState(0);
  
  const target = React.useMemo(() => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }, [text]);
  
  React.useEffect(() => {
    if (isInView && target !== null) {
      const controls = animate(0, target, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (val) => setCount(Math.floor(val)),
      });
      return controls.stop;
    }
  }, [isInView, target]);

  if (target === null) return <span>{text}</span>;

  const match = text.match(/\d+/);
  const prefix = text.substring(0, match!.index);
  const suffix = text.substring(match!.index! + match![0].length);

  return (
    <span ref={ref}>
      {prefix}{isInView ? count : 0}{suffix}
    </span>
  );
}

export default function HeroSection() {
  const { lang } = useLang();

  // Mapping icons to stats
  const statIcons = [CheckCircle2, Users, Award, Zap];
  const statColors = ['text-blue-900 dark:text-white', 'text-blue-600 dark:text-white', 'text-blue-900 dark:text-white', 'text-blue-600 dark:text-white'];

  const heroStats = t[lang].heroStats || [];

  return (
    <>
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-28 lg:pt-36 pb-8 lg:pb-12 px-6 md:px-16 lg:px-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors">
        {/* Background Subtle Wavy Lines Pattern (SVG) */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <svg
            className="w-full h-full text-blue-500"
            viewBox="0 0 1440 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-100 600C200 400 500 800 800 600C1100 400 1400 600 1600 400"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="10 10"
            />
            <path
              d="M-100 650C200 450 500 850 800 650C1100 450 1400 650 1600 450"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="10 10"
            />
            <path
              d="M1440 100C1200 300 900 -100 600 100C300 300 0 100 -200 300"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="10 10"
            />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-10 items-center relative z-10">
          
          {/* RIGHT COLUMN: IMAGE/MOCKUP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative w-full h-[180px] sm:h-[400px] lg:h-[550px] xl:h-[600px] flex items-center justify-center pointer-events-none order-1 lg:order-2 my-0 lg:-translate-y-8 xl:-translate-y-12"
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

              {/* Info Bubbles - Responsive */}
              <div className="absolute inset-0 z-20 pointer-events-none">
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
                  className="absolute top-[5%] lg:top-[30%] right-2 lg:-right-10 scale-[0.5] sm:scale-75 lg:scale-100 origin-right bg-white dark:bg-slate-950 shadow-2xl shadow-blue-200/50 dark:shadow-slate-900/50 p-3.5 rounded-2xl border border-blue-50 dark:border-slate-800 flex items-center gap-2.5 z-30 pointer-events-auto transition-colors"
                >
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-blue-500 uppercase tracking-widest leading-none mb-1">Mobile App</div>
                    <div className="text-xs font-black text-slate-900 dark:text-white transition-colors whitespace-nowrap">Android & iOS</div>
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
                  className="absolute bottom-[20%] lg:bottom-[25%] left-2 lg:-left-16 scale-[0.5] sm:scale-75 lg:scale-100 origin-left bg-white dark:bg-slate-950 shadow-2xl shadow-emerald-200/50 dark:shadow-slate-900/50 p-3.5 rounded-2xl border border-emerald-50 dark:border-slate-800 flex items-center gap-2.5 z-30 pointer-events-auto transition-colors"
                >
                  <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Layout className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest leading-none mb-1">Pembuatan</div>
                    <div className="text-xs font-black text-slate-900 dark:text-white transition-colors whitespace-nowrap">Website</div>
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
                  className="absolute top-[15%] lg:top-[25%] left-2 lg:-left-10 scale-[0.5] sm:scale-75 lg:scale-100 origin-left bg-white dark:bg-slate-950 shadow-2xl shadow-purple-200/50 dark:shadow-slate-900/50 p-3.5 rounded-2xl border border-purple-50 dark:border-slate-800 flex items-center gap-2.5 z-30 pointer-events-auto transition-colors"
                >
                  <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Palette className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-purple-500 uppercase tracking-widest leading-none mb-1">UI/UX Design</div>
                    <div className="text-xs font-black text-slate-900 dark:text-white transition-colors whitespace-nowrap">Modern Design</div>
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
                  className="absolute bottom-[35%] lg:bottom-[40%] right-2 lg:-right-16 scale-[0.5] sm:scale-75 lg:scale-100 origin-right bg-white dark:bg-slate-950 shadow-2xl shadow-pink-200/50 dark:shadow-slate-900/50 p-3.5 rounded-2xl border border-pink-50 dark:border-slate-800 flex items-center gap-2.5 z-30 pointer-events-auto transition-colors"
                >
                  <div className="w-9 h-9 bg-pink-500 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Share2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-pink-500 uppercase tracking-widest leading-none mb-1">Social Media</div>
                    <div className="text-xs font-black text-slate-900 dark:text-white transition-colors whitespace-nowrap">Management</div>
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
                  className="absolute bottom-[2%] lg:bottom-[20%] right-2 lg:-right-8 scale-[0.5] sm:scale-75 lg:scale-100 origin-right bg-slate-900 shadow-2xl shadow-slate-900/40 p-4 rounded-2xl border border-slate-800 flex items-center gap-2.5 z-30 pointer-events-auto"
                >
                  <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/30">
                    <Rocket className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Scalable Solution</div>
                    <div className="text-sm font-black text-white whitespace-nowrap">Untuk Semua Bisnis</div>
                  </div>
                </motion.div>
              </div>

              {/* Solid Background Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-blue-50/90 dark:bg-slate-950/60 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] z-0 transition-colors" />
            </div>
          </motion.div>

          {/* LEFT COLUMN: TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-4 order-2 lg:order-1 pt-0 lg:-translate-y-12"
          >
            <h1 className="text-[1.35rem] sm:text-[2rem] lg:text-[2.7rem] xl:text-[3.375rem] font-black leading-tight text-slate-900 dark:text-white mb-3 lg:mb-8 tracking-tight">
              {t[lang].heroTitle.includes('&') ? (
                <>
                  {t[lang].heroTitle.split('&')[0]}
                  <span className="text-blue-900 dark:text-blue-600 transition-colors"> {t[lang].heroTitle.split('&')[1]}</span>
                </>
              ) : t[lang].heroTitle.includes('dan') ? (
                <>
                  {t[lang].heroTitle.split('dan')[0]}
                  <span className="text-blue-900 dark:text-blue-600 transition-colors"> dan {t[lang].heroTitle.split('dan')[1]}</span>
                </>
              ) : (
                t[lang].heroTitle
              )}
            </h1>

            {/* Description - Unified for both Mobile & Desktop */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed mb-5 lg:mb-10 font-medium opacity-90 px-4 lg:px-0">
              {t[lang].heroDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 lg:px-0">
              <Link
                href="#harga"
                className="bg-blue-900 text-white min-h-[44px] px-8 py-3.5 lg:py-4 rounded-2xl font-bold text-sm lg:text-base shadow-2xl shadow-blue-900/30 dark:shadow-blue-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center"
              >
                {t[lang].heroBtnStart}
              </Link>
              <Link
                href="#portfolio"
                className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-2 border-slate-100 dark:border-slate-800 min-h-[44px] px-8 py-3.5 lg:py-4 rounded-2xl font-bold text-sm lg:text-base hover:border-blue-900 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center"
              >
                {t[lang].heroBtnPort}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Honest Stats Section */}
      <div className="bg-white dark:bg-slate-950 py-10 border-y border-slate-100 dark:border-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
                  className="flex flex-col items-center text-center gap-3 group bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300"
                >
                  <div className={`w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/40 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-1 leading-none">
                      <AnimatedCounter text={stat.value} />
                    </div>
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{stat.label}</div>
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

"use client";

import React, { useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { t } from '../translations';
import { useLang } from './LangContext';
import { Grid } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function AnimatedCounter({ text }: { text: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

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
      return () => controls.stop();
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

// 8 Default Featured Projects forming the continuous 3D panoramic ribbon (16:9 format)
const defaultProjectCards = [
  { title: "Larasena AI Batik", category: "LMS & AI", image: "/projects/larasena.png" },
  { title: "Jemari Point", category: "Company Profile", image: "/projects/jemari.png" },
  { title: "Differlok Platform", category: "E-Learning LMS", image: "/projects/differlok.png" },
  { title: "Damar Wulan System", category: "Water Service", image: "/projects/damarwulan.png" },
  { title: "Website Kalisabuk", category: "Desa Portal", image: "/projects/kalisabuk.png" },
  { title: "Rico Capital", category: "Fintech & Crypto", image: "/projects/ricocapital.png" },
  { title: "Custom UI/UX App", category: "Mobile & SaaS", image: "/projects/about_mockup.png" },
  { title: "TechSoe Studio", category: "Dev Team", image: "/projects/about_office.png" },
];

const servicesListId = [
  "Website",
  "Mobile Apps",
  "UI/UX Design",
  "Sistem Informasi",
  "Social Media",
];

const servicesListEn = [
  "Websites",
  "Mobile Apps",
  "UI/UX Design",
  "Information Systems",
  "Social Media",
];

export default function HeroSection() {
  const { lang } = useLang();
  const heroStats = t[lang].heroStats || [];
  const [isHovered, setIsHovered] = useState(false);
  const [projectCards, setProjectCards] = useState(defaultProjectCards);

  // Fetch dynamic projects from Supabase
  useEffect(() => {
    const fetchHeroProjects = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('projects')
          .select('title, category, image_url')
          .eq('featured_hero', true)
          .order('order_index', { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped = data.map((p) => ({
            title: p.title,
            category: p.category,
            image: p.image_url || '/projects/larasena.png',
          }));
          setProjectCards(mapped);
        }
      } catch (err) {
        console.warn('HeroSection: using default project cards fallback', err);
      }
    };

    fetchHeroProjects();
  }, []);

  const servicesList = lang === 'id' ? servicesListId : servicesListEn;
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState(lang === 'id' ? "Website" : "Websites");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setCurrentWordIdx(0);
    setCurrentText(lang === 'id' ? "Website" : "Websites");
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const targetWord = servicesList[currentWordIdx];

    if (!isDeleting && currentText === targetWord) {
      const timer = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timer);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % servicesList.length);
      return;
    }

    const speed = isDeleting ? 40 : 85;
    const timer = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting
          ? targetWord.substring(0, prev.length - 1)
          : targetWord.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, servicesList]);

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-28 pb-16 lg:pt-32 lg:pb-20 px-4 sm:px-8 lg:px-12 xl:px-20 overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      
      {/* Background Dot Matrix Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 pointer-events-none" />

      {/* Subtle Ambient Glowing Mesh Blobs */}
      <div className="absolute top-1/4 left-1/6 w-[400px] h-[400px] bg-[#172657]/15 dark:bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-[450px] h-[450px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col">
        
        {/* TOP: Full-width Expansive Headline with Dynamic Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full mb-5 lg:mb-6 text-left"
        >
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3.25rem] font-extrabold tracking-normal sm:tracking-wide text-slate-900 dark:text-white leading-[1.16]">
            {lang === 'id' ? (
              <>
                <span className="whitespace-nowrap inline-flex items-center">
                  Jasa Pembuatan{' '}
                  <span className="ml-2 relative inline-flex items-center text-[#172657] dark:text-blue-400 font-extrabold min-h-[1em]">
                    {currentText}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="ml-1.5 sm:ml-2 w-[3px] sm:w-[4px] h-6 sm:h-8 lg:h-10 bg-[#172657] dark:bg-blue-400 rounded-full inline-block"
                    />
                  </span>
                </span>
                <br />
                <span className="whitespace-nowrap block mt-1 sm:mt-2">
                  Lebih Cepat dengan Solusi Digital TechSoe
                </span>
              </>
            ) : (
              <>
                <span className="whitespace-nowrap inline-flex items-center">
                  Build{' '}
                  <span className="ml-2 relative inline-flex items-center text-[#172657] dark:text-blue-400 font-extrabold min-h-[1em]">
                    {currentText}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="ml-1.5 sm:ml-2 w-[3px] sm:w-[4px] h-6 sm:h-8 lg:h-10 bg-[#172657] dark:bg-blue-400 rounded-full inline-block"
                    />
                  </span>
                </span>
                <br />
                <span className="whitespace-nowrap block mt-1 sm:mt-2">
                  Faster with Our AI-Powered Dev
                </span>
              </>
            )}
          </h1>
        </motion.div>

        {/* BOTTOM: 2 Columns (Left: Desc, CTA Buttons, Stats; Right: 3D Slanted Carousel) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Subtitle Description, Buttons & Honest Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left w-full pr-0 lg:pr-6"
          >
            {/* Subtitle Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-6 font-normal">
              {t[lang].heroDesc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto mb-8">
              <a
                href={`https://wa.me/6285814174267?text=${encodeURIComponent(t[lang].orderWaGreeting)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#172657] hover:bg-[#1f3373] dark:bg-blue-600 dark:hover:bg-blue-500 text-white min-h-[48px] px-8 py-3.5 rounded-xl font-bold text-sm lg:text-base shadow-lg shadow-[#172657]/25 dark:shadow-blue-600/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-center flex items-center justify-center gap-2.5"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {t[lang].heroBtnStart}
              </a>
              <Link
                href="#portfolio"
                className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white min-h-[48px] px-8 py-3.5 rounded-xl font-bold text-sm lg:text-base border border-slate-200 dark:border-slate-800 hover:-translate-y-0.5 transition-all duration-200 text-center flex items-center justify-center gap-2"
              >
                <Grid className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                {t[lang].heroBtnPort}
              </Link>
            </div>

            {/* Integrated Honest Stats Counter directly in Hero Left Column */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {heroStats.map((stat: any, index: number) => (
                  <div key={index} className="flex flex-col">
                    <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#172657] dark:text-blue-400 tracking-tight">
                      <AnimatedCounter text={stat.value} />
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 3D Slanted Tilted Cylinder Carousel (Timedoor Aesthetic) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-5 relative w-full h-[260px] sm:h-[300px] lg:h-[340px] xl:h-[370px] flex items-center justify-center overflow-visible mt-4 sm:mt-6 lg:-mt-16 xl:-mt-24 2xl:-mt-28"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ambient 3D Depth Floor Glow tilted with the cylinder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[320px] lg:w-[400px] h-[120px] sm:h-[150px] bg-gradient-to-r from-[#172657]/25 via-blue-600/20 to-sky-400/15 blur-[65px] rounded-full pointer-events-none rotate-[-10deg]" />

            {/* 3D Perspective Stage Container */}
            <div
              className="relative w-full h-full flex items-center justify-center overflow-visible [--radius:135px] sm:[--radius:165px] lg:[--radius:195px] xl:[--radius:215px]"
              style={{
                perspective: '1000px',
                perspectiveOrigin: '50% 36%',
              }}
            >
              {/* 3D Tilted Gimbal (Diagonal slant matching Image 2: pitch down + roll slant left-to-right) */}
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(-15deg) rotateZ(-10deg) rotateY(6deg)',
                }}
              >
                {/* Continuously Rotating 3D Cylindrical Ring */}
                <motion.div
                  animate={{
                    rotateY: isHovered ? [0, 0] : [0, -360],
                  }}
                  transition={{
                    rotateY: {
                      duration: 26,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  className="relative w-0 h-0 flex items-center justify-center"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {projectCards.map((card, idx) => {
                    const angle = idx * (360 / projectCards.length);
                    return (
                      <div
                        key={idx}
                        className="absolute top-1/2 left-1/2 -ml-[50px] -mt-[28px] sm:-ml-[62px] sm:-mt-[35px] lg:-ml-[72px] lg:-mt-[40px] xl:-ml-[80px] xl:-mt-[45px] w-[100px] sm:w-[125px] lg:w-[145px] xl:w-[160px] aspect-[16/9] transition-all duration-300"
                        style={{
                          transform: `rotateY(${angle}deg) translateZ(var(--radius))`,
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {/* FRONT FACE: Crisp 16:9 Project Card */}
                        <div
                          className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden border border-white/80 dark:border-slate-700/80 shadow-[0_10px_24px_rgba(0,0,0,0.14)] dark:shadow-[0_14px_32px_rgba(0,0,0,0.7)] bg-white dark:bg-slate-900 group"
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                          }}
                        >
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 100px, (max-width: 1024px) 125px, 160px"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            priority={idx < 4}
                          />

                          {/* Gradient Overlay for Text Readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                          {/* Bottom Card Information */}
                          <div className="absolute bottom-0 left-0 right-0 p-1 sm:p-1.5 text-white z-10 flex flex-col justify-end">
                            <span className="self-start px-1.5 py-0.5 mb-0.5 rounded text-[7px] sm:text-[8px] font-bold bg-[#172657] text-white shadow-sm leading-none border border-white/20">
                              {card.category}
                            </span>
                            <h4 className="text-[8px] sm:text-[9.5px] font-bold text-white leading-tight drop-shadow-md truncate">
                              {card.title}
                            </h4>
                          </div>
                        </div>

                        {/* BACK FACE: Frosted Translucent Curved Ring Panel */}
                        <div
                          className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden border border-white/30 dark:border-slate-600/30 shadow-sm bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-md opacity-45"
                          style={{
                            transform: 'rotateY(180deg)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                          }}
                        >
                          <Image
                            src={card.image}
                            alt=""
                            fill
                            className="object-cover object-top opacity-30"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-white/10" />
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

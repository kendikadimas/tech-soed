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
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [count, setCount] = useState<number | null>(null);

  const target = React.useMemo(() => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }, [text]);

  React.useEffect(() => {
    if (isInView && target !== null) {
      const controls = animate(0, target, {
        duration: 2,
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
      {prefix}{count !== null ? count : target}{suffix}
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
  const [projectCards, setProjectCards] = useState(defaultProjectCards);

  const [dynamicProjectCount, setDynamicProjectCount] = useState<string | null>(null);

  // Fetch dynamic projects & count from Supabase
  useEffect(() => {
    const fetchHeroProjects = async () => {
      try {
        const supabase = createClient();

        // Fetch total count of projects in database
        const { count, error: countError } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });

        if (!countError && count !== null && count > 0) {
          setDynamicProjectCount(`${count}+`);
        }

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
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 px-4 sm:px-8 lg:px-12 xl:px-20 overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      
      {/* Background Dot Matrix Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 pointer-events-none" />

      {/* Subtle Ambient Glowing Mesh Blobs */}
      <div className="absolute top-1/4 left-1/6 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#172657]/15 dark:bg-blue-600/15 rounded-full blur-2xl sm:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-2xl sm:blur-[140px] pointer-events-none" />

      {/* DESKTOP ONLY: 45-Degree Diagonal Slanted Marquee (Pojok Kanan Atas ke Bagian Bawah Section) */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-auto hero-marquee-container select-none opacity-90 dark:opacity-85 hover:opacity-100 transition-opacity duration-300 overflow-hidden">
        
        {/* Ambient Glow along the 45-degree diagonal line */}
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[300px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl rounded-full pointer-events-none -rotate-[45deg]" />

        {/* 45-Degree Slanted Container (Miring 45 Derajat dari Pojok Kanan Atas ke Bagian Bawah Section) */}
        <div 
          className="absolute -top-16 right-16 sm:right-24 flex flex-col gap-5 xl:gap-6 w-[2800px] -rotate-[45deg]"
          style={{ transformOrigin: 'top right' }}
        >
          {/* ROW 1: Gliding smoothly along 45-deg line from top-right to bottom */}
          <div className="flex gap-4 xl:gap-5 w-max animate-hero-marquee-1 will-change-transform">
            {[...projectCards, ...projectCards].map((card, idx) => (
              <Link
                key={`desk-r1-${idx}`}
                href="#portfolio"
                className="relative group shrink-0 w-[200px] lg:w-[230px] xl:w-[255px] aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/90 shadow-md dark:shadow-xl bg-slate-900 transition-all duration-300 hover:scale-105 hover:border-blue-400 dark:hover:border-blue-400 cursor-pointer block"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 230px, 255px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-108"
                  priority={idx < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 text-white z-10 flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="px-2 py-0.5 rounded text-[8.5px] sm:text-[9.5px] font-bold bg-[#172657] text-white shadow-xs border border-white/20">
                      {card.category}
                    </span>
                    <span className="text-[8.5px] sm:text-[9.5px] text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 font-medium">
                      Lihat Portofolio →
                    </span>
                  </div>
                  <h4 className="text-[10px] sm:text-[11.5px] font-bold text-white leading-tight drop-shadow-md truncate">
                    {card.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>

          {/* ROW 2: Parallel 45-deg Track (Corridor 2, as drawn in the 2nd yellow line) */}
          <div className="flex gap-4 xl:gap-5 w-max animate-hero-marquee-2 will-change-transform -ml-28 xl:-ml-36">
            {[...projectCards.slice(4), ...projectCards.slice(0, 4), ...projectCards.slice(4), ...projectCards.slice(0, 4)].map((card, idx) => (
              <Link
                key={`desk-r2-${idx}`}
                href="#portfolio"
                className="relative group shrink-0 w-[200px] lg:w-[230px] xl:w-[255px] aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/90 shadow-md dark:shadow-xl bg-slate-900 transition-all duration-300 hover:scale-105 hover:border-blue-400 dark:hover:border-blue-400 cursor-pointer block"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 230px, 255px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 text-white z-10 flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="px-2 py-0.5 rounded text-[8.5px] sm:text-[9.5px] font-bold bg-[#172657] text-white shadow-xs border border-white/20">
                      {card.category}
                    </span>
                    <span className="text-[8.5px] sm:text-[9.5px] text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 font-medium">
                      Lihat Portofolio →
                    </span>
                  </div>
                  <h4 className="text-[10px] sm:text-[11.5px] font-bold text-white leading-tight drop-shadow-md truncate">
                    {card.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col">
        
        {/* MOBILE ONLY: Horizontal Marquee di paling atas sebelum header (Bebas Tabrakan) */}
        <div className="block lg:hidden w-full overflow-hidden mb-5 sm:mb-6 -mt-2 hero-marquee-container">
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex gap-2.5 sm:gap-3 w-max animate-hero-marquee-mobile will-change-transform py-0.5">
              {[...projectCards, ...projectCards].map((card, idx) => (
                <Link
                  key={`mob-${idx}`}
                  href="#portfolio"
                  className="relative shrink-0 w-[145px] sm:w-[170px] aspect-[16/10] rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-xs bg-slate-900 block"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="170px"
                    className="object-cover object-top"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-1.5 text-white z-10 flex flex-col justify-end">
                    <span className="self-start px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] font-bold bg-[#172657] text-white border border-white/20 mb-0.5 leading-none">
                      {card.category}
                    </span>
                    <h4 className="text-[8.5px] sm:text-[9.5px] font-bold text-white leading-tight truncate">
                      {card.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* TOP: Headline with Dynamic Typewriter Effect & Two-Tone Reference Typography */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full mb-4 sm:mb-5 lg:mb-6 text-left"
        >
          <h1 className="font-geist text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.65rem] tracking-[-0.03em] leading-[1.2] sm:leading-[1.18] max-w-4xl lg:max-w-[66%] xl:max-w-[62%]">
            {lang === 'id' ? (
              <>
                <span className="font-bold text-slate-900 dark:text-white inline-flex flex-wrap sm:flex-nowrap items-center">
                  <span className="whitespace-nowrap">Jasa Pembuatan</span>
                  <span className="inline-flex items-center ml-2 sm:ml-2.5 text-[#172657] dark:text-blue-400 font-bold min-h-[1.2em] py-0.5 whitespace-nowrap">
                    {currentText}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="ml-1 sm:ml-2 w-[2.5px] sm:w-[3.5px] h-[0.85em] bg-[#172657] dark:bg-blue-400 rounded-full inline-block align-middle"
                    />
                    <span className="text-slate-900 dark:text-white font-bold ml-0.5">,</span>
                  </span>
                </span>
                <span className="block mt-1 sm:mt-1.5 font-normal text-slate-400 dark:text-slate-400">
                  lebih cepat dengan solusi digital TechSoe.
                </span>
              </>
            ) : (
              <>
                <span className="font-bold text-slate-900 dark:text-white inline-flex flex-wrap sm:flex-nowrap items-center">
                  <span className="whitespace-nowrap">Build</span>
                  <span className="inline-flex items-center ml-2 sm:ml-2.5 text-[#172657] dark:text-blue-400 font-bold min-h-[1.2em] py-0.5 whitespace-nowrap">
                    {currentText}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="ml-1 sm:ml-2 w-[2.5px] sm:w-[3.5px] h-[0.85em] bg-[#172657] dark:bg-blue-400 rounded-full inline-block align-middle"
                    />
                    <span className="text-slate-900 dark:text-white font-bold ml-0.5">,</span>
                  </span>
                </span>
                <span className="block mt-1 sm:mt-1.5 font-normal text-slate-400 dark:text-slate-400">
                  faster with our AI-powered dev solutions.
                </span>
              </>
            )}
          </h1>
        </motion.div>

        {/* BOTTOM: Left Column for Content, Right Space Clear for Background Overview */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Subtitle Description, Buttons & Honest Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left w-full pr-0 lg:pr-6"
          >
            {/* Subtitle Description (Matching reference typography) */}
            <p className="font-geist text-sm sm:text-base lg:text-[1.05rem] text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed mb-6 font-normal">
              {t[lang].heroDesc}
            </p>

            {/* Action Buttons: 2-columns on mobile, flex on desktop */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3.5 w-full sm:w-auto mb-6 sm:mb-8">
              <a
                href={`https://wa.me/6285814174267?text=${encodeURIComponent(t[lang].orderWaGreeting)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-3d-base btn-3d-green min-h-[44px] sm:min-h-[50px] px-2.5 min-[380px]:px-3.5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-extrabold text-[10px] min-[360px]:text-[11px] min-[400px]:text-xs sm:text-sm lg:text-base tracking-tight min-[380px]:tracking-normal sm:tracking-wider text-center flex items-center justify-center gap-1.5 sm:gap-2.5"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="truncate">{t[lang].heroBtnStart}</span>
              </a>
              <Link
                href="#portfolio"
                className="btn-3d-base btn-3d-white dark:btn-3d-dark min-h-[44px] sm:min-h-[50px] px-2.5 min-[380px]:px-3.5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-extrabold text-[10px] min-[360px]:text-[11px] min-[400px]:text-xs sm:text-sm lg:text-base tracking-tight min-[380px]:tracking-normal sm:tracking-wider text-center flex items-center justify-center gap-1.5 sm:gap-2.5"
              >
                <Grid className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-300 shrink-0" />
                <span className="truncate">{t[lang].heroBtnPort}</span>
              </Link>
            </div>

            {/* Integrated Honest Stats Counter directly in Hero Left Column */}
            <div className="pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-800/80 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                {heroStats.map((stat: any, index: number) => {
                  const val = (index === 0 && dynamicProjectCount) ? dynamicProjectCount : stat.value;
                  return (
                    <div key={index} className="flex flex-col">
                      <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#172657] dark:text-blue-400 tracking-tight">
                        <AnimatedCounter text={val} />
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Open area allowing background overview marquee to shine freely */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 min-h-[300px] pointer-events-none" />

        </div>

      </div>
    </section>
  );
}

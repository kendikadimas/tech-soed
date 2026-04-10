"use client";

import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { t } from '../translations';
import { useLang } from './LangContext';



export default function AboutSection() {
  const { lang } = useLang();

  return (
    <section id="tentang" className="py-20 px-6 lg:px-36 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#0a1d37] rounded-xl relative min-h-[400px] lg:h-[50vh] flex items-center shadow-2xl shadow-blue-900/20"
        >
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none rounded-[3.5rem] overflow-hidden" />
          
          <div className="container mx-auto px-10 lg:px-20 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="text-white space-y-6 max-w-xl">
              <h2 className="text-2xl lg:text-4xl font-extrabold leading-tight tracking-tight">
                {t[lang].aboutTitle}
              </h2>
              <p className="text-blue-100/80 text-sm lg:text-base leading-relaxed font-medium">
                {t[lang].aboutDesc}
              </p>

              <Link 
              href="#portfolio" 
              className="bg-white text-slate-800 border-2 border-slate-100 px-8 py-3.5 rounded-xl font-bold text-base hover:border-indigo-100 hover:bg-indigo-50/30 hover:-translate-y-1 transition-all duration-300 text-center"
            >
              {t[lang].heroBtnPort}
            </Link>
              
              {/* <Link 
                href="/tentang" 
                className="inline-flex items-center gap-3 text-white font-bold group hover:text-blue-200 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 text-[#0a1d37] fill-current ml-0.5" />
                </div>
                <span className="text-sm lg:text-base underline underline-offset-8 decoration-white/20 group-hover:decoration-blue-200">
                  {t[lang].aboutLink}
                </span>
              </Link> */}
            </div>

            {/* Right Image (Out of bounds) */}
            <div className="relative hidden lg:block h-full">
              <div className="absolute bottom-[-40px] right-0 w-full h-[140%]">
                <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-700">
                  <Image 
                    src="/projects/about_mockup.png" 
                    alt="Membangun Ekonomi Digital Bersama TechSoe" 
                    fill 
                    className="object-contain object-bottom drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';
import SectionTag from './SectionTag';

const AUTOPLAY_DURATION = 5000; // 5 seconds

export default function TestimonialsSection() {
  const { lang } = useLang();
  const testimonials = t[lang].testimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset progress when index changes
    setProgress(0);
    
    const intervalTime = 100; // Update progress every 100ms
    const increment = (intervalTime / AUTOPLAY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((idx) => (idx + 1) % testimonials.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeIndex, testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimoni" className="py-24 px-6 lg:px-12 bg-white overflow-hidden relative">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-[5%] w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-40 z-0" />
      <div className="absolute bottom-0 left-[5%] w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-40 z-0" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center space-y-4"
        >
          {/* <SectionTag text={t[lang].testiTag} variant="dark" /> */}
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
            {t[lang].testiTitle}
          </h2>
        </motion.div>

        {/* Testimonial Display Area */}
        <div className="relative">
          {/* Main Navigation Arrows (Background-less) */}
          <div className="hidden md:block absolute top-[40%] -left-16 -translate-y-1/2">
            <button onClick={handlePrev} className="p-2 text-blue-900/30 hover:text-blue-900 transition-colors">
              <ChevronLeft className="w-8 h-8" />
            </button>
          </div>
          <div className="hidden md:block absolute top-[40%] -right-16 -translate-y-1/2">
            <button onClick={handleNext} className="p-2 text-blue-900/30 hover:text-blue-900 transition-colors">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-6 md:p-10 rounded-xl shadow-sm relative overflow-hidden">
            {/* Quote Icon Background */}
            <div className="absolute top-4 right-6 text-blue-900/5">
                <Quote className="w-16 h-16 fill-current" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 items-center md:items-start"
              >
                {/* Image / Initial Avatar */}
                {/* <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-900 rounded-4xl flex items-center justify-center font-black text-3xl md:text-5xl text-white shadow-xl shadow-blue-900/20 shrink-0">
                  {testimonials[activeIndex].name.charAt(0)}
                </div> */}

                <div className="flex-1 text-center md:text-left">
                  {/* <div className="flex justify-center md:justify-start text-amber-400 mb-4 gap-0.5">
                    {[...Array(testimonials[activeIndex].rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div> */}

                  <p className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed mb-6 italic">
                    &quot;{testimonials[activeIndex].text}&quot;
                  </p>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                      {testimonials[activeIndex].name}
                    </h3>
                    <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mt-1">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Indicators with Progress Bars */}
            <div className="flex gap-2 justify-center md:justify-start mt-8 md:mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="relative h-1 rounded-full bg-slate-200 transition-all overflow-hidden"
                  style={{ width: activeIndex === i ? '32px' : '8px' }}
                >
                  {activeIndex === i && (
                    <motion.div
                      className="absolute inset-0 bg-blue-900"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear", duration: 0.1 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Arrows (Bottom) */}
        <div className="flex md:hidden justify-center gap-6 mt-8">
            <button onClick={handlePrev} className="p-2 text-blue-900/40 active:text-blue-900 transition-colors">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={handleNext} className="p-2 text-blue-900/40 active:text-blue-900 transition-colors">
              <ChevronRight className="w-8 h-8" />
            </button>
        </div>
      </div>
    </section>
  );
}

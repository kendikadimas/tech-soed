"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';
import { CheckCircle2, Star, Zap } from 'lucide-react';

export default function CtaSection() {
  const { lang } = useLang();

  return (
    <section className="py-24 px-6 lg:px-36 bg-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto relative group"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-blue-600 rounded-[3rem] overflow-hidden">
            {/* Mesh Gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-400 rounded-full blur-[120px] opacity-40 animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[100px] opacity-50" />
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        </div>

        {/* Floating Badges for Desktop */}
        <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="hidden lg:flex absolute -top-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-xl items-center gap-3 border border-blue-50"
        >
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Success Rate</div>
                <div className="text-lg font-black text-slate-900">100% Guaranteed</div>
            </div>
        </motion.div>

        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="hidden lg:flex absolute -bottom-6 -left-6 z-20 bg-slate-900 p-4 rounded-2xl shadow-xl items-center gap-3 border border-slate-800"
        >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Performance</div>
                <div className="text-lg font-black text-white">Ultra Fast Loading</div>
            </div>
        </motion.div>

        <div className="relative z-10 p-12 lg:p-24 flex flex-col items-center">
          {/* Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-8"
          >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Ready to scale your business?
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl lg:text-5xl font-black text-white leading-[1.1] mb-8 max-w-3xl text-center">
            {t[lang].ctaTitle}
          </h2>

          {/* Description */}
          <p className="text-lg text-blue-100 leading-relaxed font-medium mb-10 max-w-2xl text-center opacity-90">
            {t[lang].ctaDesc}
          </p>

          {/* Features Checklist */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
                { id: 'custom', text: lang === 'id' ? 'Sistem Kustom' : 'Custom Systems' },
                { id: 'seo', text: 'SEO Optimized' },
                { id: 'support', text: lang === 'id' ? 'Dukungan 24/7' : '24/7 Support' }
            ].map((feature) => (
                <div key={feature.id} className="flex items-center gap-2 text-white/90 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-blue-200" />
                    {feature.text}
                </div>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <a 
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(t[lang].orderWaGreeting)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-600 font-extrabold rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>{t[lang].ctaBtn}</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

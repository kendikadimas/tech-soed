"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionTag from './SectionTag';
import { useLang } from './LangContext';
import { t } from '../translations';

export interface ClientItem {
  id: string;
  name: string;
  fullName: string;
  logo: string;
  category: string;
  description: string;
}

export const CLIENTS_DATA: ClientItem[] = [
  {
    id: 'unsoed',
    name: 'UNSOED',
    fullName: 'Universitas Jenderal Soedirman',
    logo: '/logo-client/unsoed.png',
    category: 'Pendidikan & Perguruan Tinggi',
    description: 'Universitas Negeri Terkemuka di Jawa Tengah',
  },
  {
    id: 'bi',
    name: 'Bank Indonesia',
    fullName: 'Bank Indonesia (BI)',
    logo: '/logo-client/logo-bi.png',
    category: 'Instansi Keuangan & Perbankan',
    description: 'Bank Sentral Republik Indonesia',
  },
  {
    id: 'pertamina',
    name: 'Pertamina',
    fullName: 'PT Pertamina (Persero)',
    logo: '/logo-client/pertamina.png',
    category: 'BUMN & Energi',
    description: 'Perusahaan Energi Nasional Terbesar',
  },
  {
    id: 'pamsimas',
    name: 'PAMSIMAS',
    fullName: 'PAMSIMAS',
    logo: '/logo-client/pamsimas.png',
    category: 'Program Pemerintah',
    description: 'Penyediaan Air Minum & Sanitasi Berbasis Masyarakat',
  },
  {
    id: 'bumdes',
    name: 'BUMDes',
    fullName: 'BUMDes (Badan Usaha Milik Desa)',
    logo: '/logo-client/bumdes.png',
    category: 'Pemberdayaan Ekonomi Desa',
    description: 'Pilar Ekonomi & Usaha Desa Mandiri',
  },
];

export default function ClientsSection() {
  const { lang } = useLang();

  // Seamless looping array for the marquee ticker (repeat 4x for continuous scroll)
  const marqueeItems = [...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA];

  return (
    <section id="clients" className="py-20 lg:py-28 px-6 lg:px-12 bg-slate-50/60 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-800/60 transition-colors overflow-hidden relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-14"
        >
          <SectionTag text={t[lang]?.clientsTag || "KLIEN KAMI"} />
          
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white transition-colors tracking-tight">
            {t[lang]?.clientsTitle || "Dipercaya oleh Instansi & Perusahaan Terkemuka"}
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 transition-colors font-medium max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            {t[lang]?.clientsDesc || "Bangga menjadi mitra transformasi digital bagi instansi pemerintah, perguruan tinggi, BUMN, hingga badan usaha daerah."}
          </p>
        </motion.div>

        {/* Continuous Marquee Ticker */}
        <div className="relative w-full overflow-hidden py-4 mb-12 group/marquee">
          {/* Left Gradient Fade */}
          <div className="absolute top-0 bottom-0 left-0 w-24 lg:w-40 bg-gradient-to-r from-slate-50/90 dark:from-slate-950/90 to-transparent z-10 pointer-events-none" />
          {/* Right Gradient Fade */}
          <div className="absolute top-0 bottom-0 right-0 w-24 lg:w-40 bg-gradient-to-l from-slate-50/90 dark:from-slate-950/90 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-scroll gap-6 lg:gap-8 items-center">
            {marqueeItems.map((client, idx) => (
              <div
                key={`${client.id}-marquee-${idx}`}
                className="flex items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all group shrink-0 min-w-[200px] lg:min-w-[240px]"
              >
                <div className="relative w-12 h-12 lg:w-14 lg:h-14 shrink-0 flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.fullName}
                    width={56}
                    height={56}
                    className="max-h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {client.name}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
                    {client.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Interactive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {CLIENTS_DATA.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:border-blue-500/50 hover:bg-gradient-to-b hover:from-white hover:to-blue-50/30 dark:hover:from-slate-900 dark:hover:to-slate-900/90 transition-all duration-300"
            >
              {/* Logo Container */}
              <div className="relative w-full h-20 lg:h-24 flex items-center justify-center mb-4">
                <Image
                  src={client.logo}
                  alt={client.fullName}
                  width={140}
                  height={80}
                  className="max-h-16 lg:max-h-20 w-auto object-contain filter grayscale group-hover:grayscale-0 opacity-75 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                />
              </div>

              {/* Title & Badge */}
              <h3 className="text-sm lg:text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {client.name}
              </h3>
              <p className="text-[11px] lg:text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                {client.category}
              </p>

              {/* Hover Indicator Glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-500/0 group-hover:border-blue-500/20 transition-all pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

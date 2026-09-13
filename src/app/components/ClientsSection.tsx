"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

  // Seamless looping array for the marquee ticker (repeat 5x for continuous scroll)
  const marqueeItems = [...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA];

  return (
    <section id="clients" className="py-14 lg:py-20 px-6 lg:px-12 bg-slate-50/60 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-800/60 transition-colors overflow-hidden relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-10 lg:mb-14"
        >
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white transition-colors tracking-tight">
            {t[lang]?.clientsTitle || "Dipercaya oleh Instansi & Perusahaan Terkemuka"}
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 transition-colors font-medium max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            {t[lang]?.clientsDesc || "Bangga menjadi mitra transformasi digital bagi instansi pemerintah, perguruan tinggi, BUMN, hingga badan usaha daerah."}
          </p>
        </motion.div>

        {/* Continuous Marquee Ticker - Pure Floating Logos (No Cards/Borders) */}
        <div className="relative w-full overflow-hidden py-4 group/marquee">
          {/* Left Gradient Fade */}
          <div className="absolute top-0 bottom-0 left-0 w-24 lg:w-40 bg-gradient-to-r from-slate-50/90 dark:from-slate-950/90 to-transparent z-10 pointer-events-none" />
          {/* Right Gradient Fade */}
          <div className="absolute top-0 bottom-0 right-0 w-24 lg:w-40 bg-gradient-to-l from-slate-50/90 dark:from-slate-950/90 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-scroll gap-12 lg:gap-20 items-center">
            {marqueeItems.map((client, idx) => (
              <div
                key={`${client.id}-marquee-${idx}`}
                title={client.fullName}
                className="flex items-center justify-center shrink-0 h-16 lg:h-20 transition-all group"
              >
                <Image
                  src={client.logo}
                  alt={client.fullName}
                  width={160}
                  height={80}
                  className="max-h-12 lg:max-h-16 w-auto object-contain filter grayscale opacity-60 dark:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

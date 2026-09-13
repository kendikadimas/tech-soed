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

  return (
    <section id="clients" className="py-16 lg:py-24 px-6 lg:px-12 bg-slate-50/60 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-800/60 transition-colors overflow-hidden relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-14 lg:mb-20"
        >
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white transition-colors tracking-tight">
            {t[lang]?.clientsTitle || "Klien Kami"}
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 transition-colors font-medium max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            {t[lang]?.clientsDesc || "Bangga menjadi mitra transformasi digital bagi instansi pemerintah, perguruan tinggi, BUMN, hingga badan usaha daerah."}
          </p>
        </motion.div>

        {/* Static Clean Floating Logos Layout - 1.5x Larger & Max 3 Logos per Row */}
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-12 sm:gap-x-16 lg:gap-x-24 gap-y-10 lg:gap-y-16">
          {CLIENTS_DATA.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              title={client.fullName}
              className="group flex items-center justify-center h-20 sm:h-24 lg:h-32 w-auto max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] p-2 transition-all"
            >
              <Image
                src={client.logo}
                alt={client.fullName}
                width={280}
                height={140}
                className="max-h-16 sm:max-h-22 lg:max-h-28 w-auto object-contain opacity-95 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

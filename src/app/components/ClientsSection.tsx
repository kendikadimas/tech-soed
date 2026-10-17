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
  {
    id: 'sadayaemas',
    name: 'Sadaya Emas',
    fullName: 'Sadaya Emas',
    logo: '/logo-client/logo-sadayaemas.svg',
    category: 'Bisnis & Perdagangan',
    description: 'Perusahaan Investasi & Perdagangan Emas',
  },
  {
    id: 'tuksirah',
    name: 'Tuk Sirah',
    fullName: 'Tuk Sirah Kali Pemali',
    logo: '/logo-client/logo-tuksirah.webp',
    category: 'Pariwisata & Konservasi',
    description: 'Destinasi Ekowisata & Konservasi Sumber Air',
  },
  {
    id: 'sdn9gandasil',
    name: 'SDN 9 Gandasil',
    fullName: 'SD Negeri 9 Gandasil',
    logo: '/logo-client/sdn9-gandasil.webp',
    category: 'Pendidikan & Sekolah Dasar',
    description: 'Institusi Pendidikan Dasar Berkualitas',
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
          <h2 className="font-geist text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.65rem] font-bold text-slate-900 dark:text-white transition-colors leading-[1.2] sm:leading-[1.18] tracking-[-0.03em]">
            {t[lang]?.clientsTitle || "Klien Kami"}
          </h2>
          
          <p className="font-geist text-slate-500 dark:text-slate-400 transition-colors font-normal max-w-2xl mx-auto text-sm lg:text-base xl:text-lg leading-relaxed">
            {t[lang]?.clientsDesc || "Bangga menjadi mitra transformasi digital bagi instansi pemerintah, perguruan tinggi, BUMN, hingga badan usaha daerah."}
          </p>
        </motion.div>

        {/* Static Clean Floating Logos Layout */}
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 lg:gap-x-18 gap-y-8 sm:gap-y-12">
          {CLIENTS_DATA.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              title={client.fullName}
              className="group flex items-center justify-center h-18 sm:h-22 lg:h-26 w-auto max-w-[200px] sm:max-w-[240px] lg:max-w-[280px] p-2 transition-all"
            >
              <Image
                src={client.logo}
                alt={client.fullName}
                width={260}
                height={130}
                unoptimized={client.logo.endsWith('.svg')}
                className="max-h-14 sm:max-h-18 lg:max-h-22 w-auto object-contain rounded-lg opacity-95 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

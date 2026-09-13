"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from './LangContext';

export default function ClientsSection() {
  const { lang } = useLang();

  // Official brand & institution clients using logos located in /public/logo
  const clients = [
    {
      id: 'bi',
      name: 'Bank Indonesia',
      logo: '/logo/bi.png',
      url: 'https://www.bi.go.id'
    },
    {
      id: 'pertamina',
      name: 'Pertamina',
      logo: '/logo/pertamina.png',
      url: 'https://www.pertamina.com'
    },
    {
      id: 'telkom',
      name: 'Telkom Indonesia',
      logo: '/logo/telkom.svg',
      url: 'https://www.telkom.co.id'
    },
    {
      id: 'mandiri',
      name: 'Bank Mandiri',
      logo: '/logo/mandiri.svg',
      url: 'https://www.bankmandiri.co.id'
    },
    {
      id: 'bca',
      name: 'Bank Central Asia (BCA)',
      logo: '/logo/bca.svg',
      url: 'https://www.bca.co.id'
    },
    {
      id: 'bri',
      name: 'Bank Rakyat Indonesia (BRI)',
      logo: '/logo/bri.svg',
      url: 'https://www.bri.co.id'
    },
    {
      id: 'banyumas',
      name: 'Pemerintah Kabupaten Banyumas',
      logo: '/logo/banyumas.png',
      url: 'https://banyumaskab.go.id'
    },
    {
      id: 'cilacap',
      name: 'Pemerintah Kabupaten Cilacap',
      logo: '/logo/cilacap.svg',
      url: 'https://cilacapkab.go.id'
    },
    {
      id: 'unsoed',
      name: 'Universitas Jenderal Soedirman (UNSOED)',
      logo: '/logo/unsoed-logo.png',
      url: 'https://unsoed.ac.id'
    }
  ];

  return (
    <section id="our-client" className="py-16 px-6 lg:px-12 bg-white dark:bg-slate-950 transition-colors border-y border-slate-100/80 dark:border-slate-800/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            {lang === 'id' ? 'Klien & Partner Kami' : 'Our Clients & Partners'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            {lang === 'id'
              ? 'Telah dipercaya oleh berbagai perusahaan, instansi pemerintah, dan brand ternama.'
              : 'Trusted by leading companies, government institutions, and modern brands.'}
          </motion.p>
        </div>

        {/* Seamless Static Client Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14 md:gap-16 lg:gap-20 py-4">
          {clients.map((client, idx) => {
            const isExternalLink = client.url && client.url !== '#';

            return (
              <motion.a
                key={client.id}
                href={client.url || '#'}
                target={isExternalLink ? '_blank' : '_self'}
                rel={isExternalLink ? 'noopener noreferrer' : undefined}
                title={client.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group relative flex items-center justify-center p-2 transition-all duration-300 cursor-pointer"
              >
                {/* Subtle aura glow on hover */}
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 dark:group-hover:bg-blue-400/10 rounded-full blur-xl transition-all duration-300 scale-75 group-hover:scale-125 pointer-events-none" />

                {/* Logo Image */}
                <div className="relative w-28 sm:w-36 h-12 sm:h-14 flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={140}
                    height={56}
                    className="max-h-12 sm:max-h-14 w-auto object-contain transition-all duration-300 transform group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-md"
                  />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

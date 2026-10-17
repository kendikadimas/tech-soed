"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquareCode, Wallet, Code2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLang } from './LangContext';
import { t } from '../translations';

export default function OrderProcessSection() {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animation for the central timeline progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      number: "01",
      stepTag: "Langkah 1",
      icon: MessageSquareCode,
      title: t[lang]?.processStep1Title || "Konsultasi & Kesepakatan Deal",
      desc: t[lang]?.processStep1Desc || "Diskusikan kebutuhan & paket website Anda secara gratis via WhatsApp. Kami berikan penawaran resmi & kesepakatan terbaik.",
      badge: t[lang]?.processStep1Badge || "Konsultasi Gratis",
      badgeColor: "bg-blue-50 dark:bg-blue-950/60 text-[#172657] dark:text-blue-300 border-blue-200/80 dark:border-blue-800 font-bold",
      points: [
        "Konsultasi kebutuhan gratis 24 jam via WA / Zoom",
        "Penentuan fitur, struktur halaman & harga paket",
        "Pemberian draft kontrak / penawaran resmi"
      ],
      isHighlight: false,
    },
    {
      number: "02",
      stepTag: "Langkah 2",
      icon: Wallet,
      title: t[lang]?.processStep2Title || "DP 50% Saat Deal",
      desc: t[lang]?.processStep2Desc || "Bayar DP 50% sebagai tanda jadi setelah sepakat. Pengerjaan website langsung resmi dimulai oleh tim kami!",
      badge: t[lang]?.processStep2Badge || "DP 50% Awal",
      badgeColor: "bg-blue-50 dark:bg-blue-950/60 text-[#172657] dark:text-blue-300 border-blue-200/80 dark:border-blue-800 font-bold",
      points: [
        "Pembayaran 50% dari total biaya projek saat deal",
        "Pencatatan invoice resmi & konfirmasi pembayaran",
        "Proses desain & koding langsung resmi berjalan"
      ],
      isHighlight: true,
      highlightText: "DP 50% Tanda Jadi",
    },
    {
      number: "03",
      stepTag: "Langkah 3",
      icon: Code2,
      title: t[lang]?.processStep3Title || "Pengerjaan & Live Preview",
      desc: t[lang]?.processStep3Desc || "Tim engineer kami mengembangkan website Anda. Anda mendapatkan link demo live untuk peninjauan & penyesuaian.",
      badge: t[lang]?.processStep3Badge || "Demo & Review",
      badgeColor: "bg-blue-50 dark:bg-blue-950/60 text-[#172657] dark:text-blue-300 border-blue-200/80 dark:border-blue-800 font-bold",
      points: [
        "Pengembangan sistem & desain responsif modern",
        "Pemberian link preview live untuk uji coba klien",
        "Proses revisi & penyesuaian konten sesuai masukan"
      ],
      isHighlight: false,
    },
    {
      number: "04",
      stepTag: "Langkah 4",
      icon: CheckCircle2,
      title: t[lang]?.processStep4Title || "Pelunasan 50% & Handover",
      desc: t[lang]?.processStep4Desc || "Setelah website 100% selesai & Anda puas, pelunasan sisa 50% dilakukan. Akses domain, hosting & source code langsung diserahkan!",
      badge: t[lang]?.processStep4Badge || "Pelunasan 50%",
      badgeColor: "bg-blue-50 dark:bg-blue-950/60 text-[#172657] dark:text-blue-300 border-blue-200/80 dark:border-blue-800 font-bold",
      points: [
        "Website 100% siap rilis & disetujui penuh oleh Anda",
        "Pelunasan 50% sisa biaya pembayaran",
        "Handover full source code, domain, & akses server"
      ],
      isHighlight: true,
      highlightText: "Pelunasan 50% Selesai",
    },
  ];

  return (
    <section id="cara-pemesanan" className="py-16 lg:py-28 px-4 sm:px-6 lg:px-12 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
      {/* Ambient Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] sm:w-[700px] h-[350px] sm:h-[400px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4 mb-14 lg:mb-20"
        >
          <h2 className="font-geist text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.65rem] font-bold text-slate-900 dark:text-white transition-colors leading-[1.2] sm:leading-[1.18] tracking-[-0.03em]">
            {t[lang]?.processTitle || "4 Langkah Mudah Pesan Website"}
          </h2>

          <p className="font-geist text-slate-500 dark:text-slate-400 transition-colors font-normal max-w-2xl mx-auto text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed">
            {t[lang]?.processDesc || "Skema pembayaran transparan & aman. Cukup bayar DP 50% saat kesepakatan (deal), dan sisa 50% ketika website Anda 100% selesai & siap rilis."}
          </p>
        </motion.div>

        {/* Vertical Timeline Interactive Layout Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto mb-16 lg:mb-20">
          {/* Central Vertical Track Line (Desktop Centered / Mobile Left) */}
          <div className="absolute top-0 bottom-0 left-7 sm:left-8 md:left-1/2 -translate-x-1/2 w-1 bg-slate-200 dark:bg-slate-800/80 rounded-full overflow-hidden">
            {/* Animated Scroll Progress Line - Solid Full Navy Blue */}
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-[#172657] dark:bg-blue-500 rounded-full origin-top"
            />
          </div>

          {/* Timeline Step Cards */}
          <div className="space-y-10 sm:space-y-12 md:space-y-16">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0; // even = Left side on desktop, odd = Right side

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Central Circular Node Indicator (No shadow) */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute left-7 sm:left-8 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#172657] dark:bg-slate-900 border-2 border-[#172657] dark:border-blue-400 flex items-center justify-center">
                      <span className="font-geist font-black text-xs sm:text-sm text-white dark:text-blue-300">
                        {step.number}
                      </span>
                    </div>
                  </motion.div>

                  {/* Step Label Pill on Opposite Side of Central Line (Desktop Only) */}
                  <div className={`hidden md:flex w-1/2 px-8 ${isEven ? "justify-start text-left" : "justify-end text-right"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="inline-flex items-center btn-3d-filter-inactive px-4 py-1.5 rounded-full text-xs font-bold shadow-sm"
                    >
                      <span>{step.stepTag}</span>
                    </motion.div>
                  </div>

                  {/* Timeline Card Container - 100% Mobile Responsive */}
                  <div className={`w-full md:w-1/2 pl-14 sm:pl-16 md:pl-0 ${isEven ? "md:pr-10 lg:pr-16" : "md:pl-10 lg:pl-16"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="card-3d-seamless group relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 flex flex-col overflow-hidden"
                    >
                      {/* Top Header Row with Badge (Matching Portfolio Card style) */}
                      <div className="flex items-center justify-between gap-2.5 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10.5px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-[#172657] dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/80 shadow-xs">
                          {step.badge}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                          {step.stepTag}
                        </span>
                      </div>

                      {/* Icon + Title */}
                      <div className="flex items-start gap-3.5 mb-2.5">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-b from-blue-50 to-blue-100/60 dark:from-slate-800 dark:to-slate-900 border border-blue-200/60 dark:border-slate-700 text-[#172657] dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <h3 className="font-geist text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="font-geist text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                        {step.desc}
                      </p>

                      {/* Structured Points List */}
                      <ul className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4 mb-4">
                        {step.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Card Footer matching Portfolio Card */}
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <span className="font-geist text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                          {step.stepTag} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                          {step.highlightText || step.badge}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

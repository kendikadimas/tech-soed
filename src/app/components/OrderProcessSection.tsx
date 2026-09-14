"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquareCode, Wallet, Code2, CheckCircle2 } from 'lucide-react';
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
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white transition-colors tracking-tight">
            {t[lang]?.processTitle || "4 Langkah Mudah Pesan Website"}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 transition-colors font-medium max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed">
            {t[lang]?.processDesc || "Skema pembayaran transparan & aman. Cukup bayar DP 50% saat kesepakatan (deal), dan sisa 50% ketika website Anda 100% selesai & siap rilis."}
          </p>
        </motion.div>

        {/* Vertical Timeline Interactive Layout Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto mb-16 lg:mb-20">
          {/* Central Vertical Track Line (Desktop Centered / Mobile Left) */}
          <div className="absolute top-0 bottom-0 left-5 sm:left-6 md:left-1/2 -translate-x-1/2 w-1 bg-slate-200 dark:bg-slate-800/80 rounded-full overflow-hidden">
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
                  {/* Timeline Central Circular Node Indicator */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute left-5 sm:left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
                  >
                    <div className="relative group">
                      {/* Solid Navy Pulse Ring Glow */}
                      <div className="absolute -inset-2 rounded-full bg-[#172657]/20 dark:bg-blue-400/30 opacity-75 blur-sm transition-all group-hover:opacity-100" />
                      
                      {/* Circle Node Badge */}
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#172657] dark:bg-slate-900 border-2 border-[#172657] dark:border-blue-400 flex items-center justify-center shadow-lg shadow-[#172657]/20">
                        <span className="font-black text-xs sm:text-sm text-white dark:text-blue-300">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Step Label Pill on Opposite Side of Central Line (Desktop Only) */}
                  <div className={`hidden md:flex w-1/2 px-8 ${isEven ? "justify-start text-left" : "justify-end text-right"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="inline-flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-1.5 rounded-full text-xs font-bold text-[#172657] dark:text-blue-300 shadow-sm"
                    >
                      <span>{step.stepTag}</span>
                    </motion.div>
                  </div>

                  {/* Timeline Card Container - 100% Mobile Responsive */}
                  <div className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-0 ${isEven ? "md:pr-10 lg:pr-16" : "md:pl-10 lg:pl-16"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="group relative bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 hover:shadow-xl hover:border-[#172657] dark:hover:border-blue-500 transition-all duration-300"
                    >
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 sm:mb-5">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-100/80 dark:bg-slate-800 text-[#172657] dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:hidden">
                            {step.stepTag}
                          </span>
                        </div>

                        <span className={`text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border ${step.badgeColor} transition-colors`}>
                          {step.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white transition-colors group-hover:text-[#172657] dark:group-hover:text-blue-400 mb-2 sm:mb-3">
                        {step.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 transition-colors text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-medium">
                        {step.desc}
                      </p>

                      {/* Structured Points List */}
                      <ul className="space-y-1.5 sm:space-y-2 border-t border-slate-200/70 dark:border-slate-800 pt-3 sm:pt-4">
                        {step.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#172657] dark:bg-blue-400 mt-1.5 shrink-0" />
                            <span className="leading-snug">{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Bottom Solid Accent Line Indicator */}
                      <div className="w-full h-1 bg-[#172657] dark:bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mt-4 sm:mt-6" />
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

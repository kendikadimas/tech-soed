"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send, ArrowUpRight } from 'lucide-react';
import { t } from '../translations';
import { useLang } from './LangContext';

export default function ContactSection() {
  const { lang } = useLang();
  const [selectedService, setSelectedService] = useState('Web Development');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const email = formData.get('email') || '';
    const service = formData.get('service') || '';
    const message = formData.get('message') || '';

    const text = lang === 'id'
      ? `Halo TechSoe, saya ingin konsultasi kebutuhan digital:\n\n*Nama:* ${name}\n*No. WhatsApp:* ${phone}\n*Email:* ${email}\n*Layanan:* ${service}\n\n*Pesan:* \n${message}`
      : `Hello TechSoe, I would like to consult about digital needs:\n\n*Name:* ${name}\n*WhatsApp:* ${phone}\n*Email:* ${email}\n*Service:* ${service}\n\n*Message:* \n${message}`;

    const whatsappUrl = `https://wa.me/6285814174267?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="kontak" className="py-20 lg:py-24 px-6 lg:px-12 bg-slate-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-[120px] opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Side: Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div>
              <h2 className="font-geist text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.65rem] font-bold text-slate-900 dark:text-white transition-colors mb-3 leading-[1.2] sm:leading-[1.18] tracking-[-0.03em]">
                {t[lang].contactTitle}
              </h2>
              <p className="font-geist text-xs sm:text-sm lg:text-base text-slate-500 dark:text-slate-400 transition-colors font-normal leading-relaxed">
                {t[lang].contactDesc}
              </p>
            </div>

            <div className="space-y-3.5 pt-1 flex-1 flex flex-col justify-between">
              {/* Email Card */}
              <a
                href="mailto:hi@techsoe.com"
                className="card-3d-seamless p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 group cursor-pointer block"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white flex items-center justify-center shrink-0 border border-blue-300/40 shadow-[0_4px_14px_rgba(37,99,235,0.3),inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(15,23,42,0.35)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    <Mail className="w-5 h-5 drop-shadow-sm" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                      {t[lang].contactInfoTitle}
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      hi@techsoe.com
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>

              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/6285814174267?text=${encodeURIComponent(lang === 'id' ? 'Halo TechSoe, saya ingin konsultasi kebutuhan website/aplikasi.' : 'Hello TechSoe, I would like to consult about website/app development.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-3d-seamless p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 group cursor-pointer block"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 text-white flex items-center justify-center shrink-0 border border-emerald-200/50 shadow-[0_4px_14px_rgba(16,185,129,0.3),inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(6,78,59,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                      WhatsApp
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                      +62 858-1417-4267
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>

              {/* Office Location Card */}
              <a
                href="https://maps.app.goo.gl/ss9S1x2hRGXseBW76"
                target="_blank"
                rel="noreferrer"
                className="card-3d-seamless p-4 sm:p-5 rounded-2xl flex items-start justify-between gap-4 group cursor-pointer block"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-slate-900 text-white flex items-center justify-center shrink-0 border border-indigo-300/40 shadow-[0_4px_14px_rgba(99,102,241,0.3),inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(15,23,42,0.4)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 mt-0.5">
                    <MapPin className="w-5 h-5 drop-shadow-sm" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                      Office
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-relaxed">
                      {t[lang].contactInfoAddress}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
              </a>

              {/* Working Hours Card */}
              <div className="card-3d-seamless p-4 sm:p-5 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 text-white flex items-center justify-center shrink-0 border border-amber-200/50 shadow-[0_4px_14px_rgba(245,158,11,0.3),inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(154,52,18,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Clock className="w-5 h-5 drop-shadow-sm" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                    Working Hours
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
                    {t[lang].contactInfoTime}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form (7 cols) - Aligned & Extended */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 card-3d-seamless p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col justify-between h-full"
          >
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
                {lang === 'id' ? 'Kirim Pesan Langsung' : 'Send Direct Message'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
                {lang === 'id'
                  ? 'Ceritakan kebutuhan proyek Anda, kami siap merespons via WhatsApp.'
                  : 'Tell us about your project, we will get back to you shortly via WhatsApp.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
              {/* Row 1: Nama Lengkap & Nomor WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                    {t[lang].contactLabelName}
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 sm:px-5 py-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/10 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                    {(t[lang] as any).contactLabelPhone || (lang === 'id' ? 'Nomor WhatsApp' : 'WhatsApp Number')}
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="081234567890"
                    className="w-full px-4 sm:px-5 py-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/10 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Alamat Email */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                  {t[lang].contactLabelEmail}
                </label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 sm:px-5 py-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/10 transition-all outline-none"
                />
              </div>

              {/* Row 3: Layanan Yang Dibutuhkan (Pill Selector) */}
              <div className="space-y-2 pt-1">
                <label className="block text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100 ml-0.5">
                  {lang === 'id' ? 'LAYANAN YANG DIBUTUHKAN' : 'SERVICE NEEDED'}
                  <span className="text-rose-500 font-bold ml-1">*</span>
                </label>
                <input type="hidden" name="service" value={selectedService} />
                <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center">
                  {[
                    { id: 'UI/UX Design', label: 'UI/UX Design' },
                    { id: 'Web Development', label: 'Web Development' },
                    { id: 'Mobile Apps', label: 'Mobile Apps' },
                    { id: 'Lainnya', label: lang === 'id' ? 'Lainnya' : 'Other' },
                  ].map((s) => {
                    const isSelected = selectedService === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedService(s.id)}
                        className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none flex items-center justify-center ${
                          isSelected
                            ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white border border-blue-500 border-b-[3px] border-b-blue-900 shadow-[0_4px_14px_rgba(37,99,235,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] -translate-y-0.5'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 border-b-[3px] border-b-slate-300 dark:border-b-slate-700 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5 active:translate-y-0'
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Pesan Anda */}
              <div className="space-y-1.5 flex-1 flex flex-col pt-1">
                <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                  {t[lang].contactLabelMessage}
                </label>
                <textarea 
                  name="message"
                  required
                  rows={3}
                  placeholder={lang === 'id' ? 'Ceritakan gambaran proyek atau kebutuhan Anda...' : 'Tell us about your project or needs...'}
                  className="w-full flex-1 min-h-[95px] px-4 sm:px-5 py-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/10 transition-all outline-none resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="btn-3d-base btn-3d-blue w-full py-4 rounded-xl font-extrabold text-sm sm:text-base tracking-wider flex items-center justify-center gap-2.5 min-h-[50px] shadow-md mt-2"
              >
                <span>{t[lang].contactBtn}</span>
                <Send className="w-4 h-4 shrink-0" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

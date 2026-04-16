"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';

export default function FaqSection() {
  const { lang } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 lg:px-12 bg-slate-50 dark:bg-slate-950 transition-colors border-t border-slate-50 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left mb-16"
        >
          {/* <div className="flex items-center gap-2 text-blue-900 font-bold mb-4 uppercase tracking-[0.2em] text-xs">
            <HelpCircle className="w-4 h-4" />
            <span>Support Center</span>
          </div> */}
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white transition-colors leading-tight mb-4">
            {t[lang].faqH2}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 transition-colors font-medium max-w-2xl">
            {t[lang].faqDesc}
          </p>
        </motion.div>

        {/* FAQ Grid Layout - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {t[lang].faqData.map((faq: { q: string; a: string }, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === idx
                ? 'border-indigo-200 dark:border-blue-800 bg-indigo-50/30 dark:bg-slate-900/80 shadow-lg shadow-blue-900/5'
                : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-200 dark:hover:border-slate-700 shadow-sm'
                }`}
            >
              <button
                className={`w-full text-left px-7 py-6 flex items-center justify-between font-bold text-base lg:text-lg transition-colors ${openFaq === idx ? 'text-blue-900 dark:text-blue-300' : 'text-slate-900 dark:text-white'
                  }`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span className="pr-4">{faq.q}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === idx ? 'bg-blue-900 dark:bg-blue-600 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-300'
                  }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <div
                className={`px-7 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-[500px] pb-7 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="pt-4 border-t border-indigo-100/50 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400 transition-colors text-sm lg:text-base leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

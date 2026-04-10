"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';

export default function FaqSection() {
  const { lang } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 lg:px-36 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
            {t[lang].faqH2}
          </h2>
          <p className="text-base text-slate-600">
            {t[lang].faqDesc}
          </p>
        </motion.div>

        <div className="space-y-4">
          {t[lang].faqData.map((faq: { q: string; a: string }, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button
                className={`w-full text-left px-6 py-5 flex items-center justify-between font-bold text-base hover:bg-slate-50 transition-colors ${openFaq === idx ? 'text-blue-600 bg-slate-50' : 'text-slate-900'
                  }`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                {faq.q}
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-[800px] pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

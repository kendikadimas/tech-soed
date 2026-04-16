"use client";

import React, { useState } from 'react';
import { ShoppingCart, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';

interface SelectedPackage {
  name: string;
  price: string;
  category: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: SelectedPackage;
}

export default function OrderModal({ isOpen, onClose, selectedPackage }: OrderModalProps) {
  const { lang } = useLang();
  const [form, setForm] = useState({ name: '', phone: '', email: '', projectDesc: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `${t[lang].orderWaGreeting}%0A%0A${t[lang].orderWaName}: ${form.name}%0A${t[lang].orderWaEmail}: ${form.email || '-'}%0A${t[lang].orderWaPackage}: ${selectedPackage.category} - ${selectedPackage.name} (${selectedPackage.price})%0A${t[lang].orderWaDesc}: ${form.projectDesc}`;
    window.open(`https://wa.me/6281353424280?text=${message}`, '_blank');
    onClose();
    setForm({ name: '', phone: '', email: '', projectDesc: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">{t[lang].orderFormTitle}</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-700 bg-white p-2 rounded-full shadow-sm">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t[lang].orderFormPackage}</p>
                  <p className="font-bold text-slate-900">{selectedPackage.category} - {selectedPackage.name}</p>
                  <p className="text-sm font-medium text-slate-600">{selectedPackage.price}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">{t[lang].orderFormName} *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="Budi Santoso" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">{t[lang].orderFormPhone} *</label>
                  <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="0812..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">{t[lang].orderFormEmail}</label>
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="budi@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">{t[lang].orderFormProject} *</label>
                <textarea required value={form.projectDesc} onChange={e => setForm({ ...form, projectDesc: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none text-sm" placeholder="..." />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={onClose} className="px-6 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition min-h-[44px]">
                  {t[lang].orderFormCancel}
                </button>
                <button type="submit" className="flex-1 px-6 py-3.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/30 transition flex items-center justify-center gap-2 min-h-[44px]">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg> {t[lang].orderFormSubmit}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

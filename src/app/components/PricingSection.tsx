"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';

interface PricingSectionProps {
  onOrderClick: (pkg: { name: string; price: string; category: string }) => void;
}

export default function PricingSection({ onOrderClick }: PricingSectionProps) {
  const { lang } = useLang();
  const pricingServiceGroups = (t[lang] as any).pricingServiceGroups || [];

  const [activeService, setActiveService] = useState('web');
  const activeGroup = pricingServiceGroups.find((g: any) => g.id === activeService) || pricingServiceGroups[0];

  const [activeTab, setActiveTab] = useState(activeGroup.tabs[0]);
  const [isWebDropdownOpen, setIsWebDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pricingScrollRef = useRef<HTMLDivElement>(null);
  const prevLang = useRef(lang);

  // Sync activeTab when language or service changes
  useEffect(() => {
    if (prevLang.current !== lang) {
      // Language changed, reset to first tab of the active group
      setActiveTab(activeGroup.tabs[0]);
      prevLang.current = lang;
    }
  }, [lang, activeService, activeGroup.tabs]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWebDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pricingData = t[lang].pricingData as Record<string, any[]>;
  const currentPricing = pricingData[activeTab] || [];

  const handleServiceChange = (serviceId: string) => {
    setActiveService(serviceId);
    const group = pricingServiceGroups.find((g: any) => g.id === serviceId);
    if (group) {
      setActiveTab(group.tabs[0]);
    }
  };

  const scrollContainer = (direction: 'left' | 'right') => {
    if (pricingScrollRef.current) {
      const scrollAmount = window.innerWidth * 0.8;
      pricingScrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleOrderClick = (pkg: any) => {
    onOrderClick({ name: pkg.name, price: pkg.price, category: `${activeGroup.name} - ${activeTab}` });
  };

  return (
    <section id="harga" className="py-24 px-6 lg:px-12 bg-slate-50 dark:bg-slate-950 transition-colors rounded-t-[3rem]">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-black leading-tight text-slate-900 dark:text-white transition-colors ">
            {t[lang].priceTitle}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 transition-colors font-medium">
            {t[lang].priceDesc}
          </p>
        </div>

        {/* Primary Service Selector - Scrollable on Mobile */}
        <div className="relative w-full max-w-5xl mb-10 group/pfilter">
          {/* Arrow Buttons for Filter (Mobile Only) */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 z-60 lg:hidden opacity-0 group-hover/pfilter:opacity-100 transition-opacity">
            <button 
              onClick={() => {
                const el = document.getElementById('pricing-filter-scroll');
                el?.scrollBy({ left: -150, behavior: 'smooth' });
              }}
              className="p-3 text-blue-900 hover:text-blue-600 transition-colors "
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-60 lg:hidden opacity-0 group-hover/pfilter:opacity-100 transition-opacity">
            <button 
              onClick={() => {
                const el = document.getElementById('pricing-filter-scroll');
                el?.scrollBy({ left: 150, behavior: 'smooth' });
              }}
              className="p-3 text-slate-400 hover:text-blue-900 transition-colors "
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div 
            id="pricing-filter-scroll"
            className="flex flex-nowrap lg:flex-wrap items-center lg:justify-center gap-2 w-full p-1.5 bg-slate-50 dark:bg-slate-950 transition-colors rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors overflow-x-auto lg:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x relative z-50"
          >
            {pricingServiceGroups.map((group: any) => (
              <div key={group.id} className="relative grow md:flex-initial snap-start" ref={group.id === 'web' ? dropdownRef : null}>
                <button
                  onClick={() => {
                    if (group.id === 'web') {
                      if (activeService !== 'web') {
                        handleServiceChange('web');
                        setIsWebDropdownOpen(true);
                      } else {
                        setIsWebDropdownOpen(!isWebDropdownOpen);
                      }
                    } else {
                      handleServiceChange(group.id);
                      setIsWebDropdownOpen(false);
                    }
                  }}
                  className={`w-full px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${activeService === group.id
                    ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20'
                    : 'text-slate-500 dark:text-slate-400 transition-colors hover:bg-slate-50 dark:bg-slate-950 transition-colors hover:shadow-sm'
                    }`}
                >
                  {group.id === 'web' && activeService === 'web' ? activeTab : group.name}
                  {group.id === 'web' && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isWebDropdownOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {group.id === 'web' && isWebDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-slate-50 dark:bg-slate-950 transition-colors border border-slate-100 dark:border-slate-800 transition-colors shadow-2xl rounded-2xl p-2 z-50"
                  >
                    {group.tabs.map((tab: string) => (
                      <button
                        key={tab}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab(tab);
                          setIsWebDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${activeTab === tab
                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                          : 'text-slate-600 dark:text-slate-400 transition-colors hover:bg-slate-50 dark:bg-slate-950 transition-colors '
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards Container */}
        <div className="relative w-full group/pcards">
          {/* Main Mobile Navigation Arrows */}
          <div className="absolute top-1/2 -left-8 -translate-y-1/2 z-40 lg:hidden pointer-events-auto">
            <button 
              onClick={() => scrollContainer('left')}
              className="p-4 text-slate-300 hover:text-blue-900 active:scale-95 transition-all drop-shadow-sm"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-8 -translate-y-1/2 z-40 lg:hidden pointer-events-auto">
            <button 
              onClick={() => scrollContainer('right')}
              className="p-4 text-slate-300 hover:text-blue-900 active:scale-95 transition-all drop-shadow-sm"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          <motion.div
            ref={pricingScrollRef}
            layout
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-nowrap lg:grid ${currentPricing.length === 1 ? 'lg:grid-cols-1 max-w-md mx-auto' :
              currentPricing.length === 2 ? 'lg:grid-cols-2 max-w-3xl mx-auto' :
                'lg:grid-cols-3 max-w-6xl mx-auto'
              } gap-6 lg:items-center w-full pb-10 pt-6 px-4 overflow-x-auto lg:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth`}
          >
            {currentPricing?.map((pkg: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative min-w-[85vw] sm:min-w-[45vw] lg:min-w-0 p-6 lg:p-7 rounded-4xl border transition-all duration-300 snap-center flex flex-col ${pkg.isPopular
                  ? 'bg-blue-900 text-white border-indigo-400 shadow-2xl shadow-blue-900/30 scale-[1.03] z-10 py-10'
                  : 'bg-slate-50 dark:bg-slate-950 transition-colors text-slate-800 dark:text-slate-200 transition-colors border-slate-100 dark:border-slate-800 transition-colors hover:border-indigo-100 shadow-lg shadow-slate-200/40'
                  }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-slate-50 dark:bg-slate-900 transition-colors text-blue-900 dark:text-blue-200 text-[10px] font-black px-4 py-1 rounded-full border border-indigo-50 dark:border-slate-700 uppercase tracking-widest">
                    {t[lang].pricePopular}
                  </div>
                )}

                <div className="text-left mb-6">
                  <div className={`text-lg lg:text-xl font-black mb-1 ${pkg.isPopular ? 'text-white' : 'text-slate-900 dark:text-white transition-colors '}`}>{pkg.name}</div>
                  <div className="mb-3 flex items-baseline gap-1">
                    <span className={`text-2xl lg:text-3xl font-black ${pkg.isPopular ? 'text-white' : 'text-slate-900 dark:text-white transition-colors '}`}>{pkg.price}</span>
                  </div>
                  <p className={`text-[12px] lg:text-xs font-medium ${pkg.isPopular ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400 transition-colors '} leading-relaxed`}>
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature: any, fIndex: number) => {
                    const text = typeof feature === 'string' ? feature : feature.text;
                    const included = typeof feature === 'string' ? true : feature.included !== false;

                    return (
                      <li key={fIndex} className={`flex items-start gap-2.5 text-xs lg:text-sm ${!included ? 'opacity-30 line-through' : ''}`}>
                        {included ? (
                          <CheckCircle className={`w-4 h-4 lg:w-5 lg:h-5 shrink-0 ${pkg.isPopular ? 'text-white' : 'text-blue-900'}`} />
                        ) : (
                          <X className={`w-4 h-4 shrink-0 ${pkg.isPopular ? 'text-indigo-300' : 'text-slate-300'}`} />
                        )}
                        <span className={`${pkg.isPopular ? 'text-white/90' : 'text-slate-600 dark:text-slate-400 transition-colors '} font-medium`}>{text}</span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => handleOrderClick(pkg)}
                  className={`w-full min-h-[44px] py-3.5 font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${pkg.isPopular
                    ? 'bg-white text-blue-900 hover:bg-slate-50 shadow-xl shadow-black/10'
                    : 'bg-slate-50 dark:bg-slate-800 transition-colors text-blue-900 dark:text-blue-100 border-2 border-indigo-100 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:border-blue-900 dark:hover:border-slate-600'
                    }`}>
                  {t[lang].priceOrderText}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 w-full max-w-3xl"
        >
          <div className="bg-slate-50 dark:bg-slate-950 transition-colors rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100 dark:border-slate-800 transition-colors ">
            <div className="text-center md:text-left">
              <h4 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white transition-colors mb-1">
                {t[lang].priceConsultText}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 transition-colors text-sm font-medium">
                {t[lang].priceConsultSubtitle}
              </p>
            </div>
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(t[lang].orderWaGreeting)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/20 active:scale-95 whitespace-nowrap text-sm min-h-[44px] flex items-center justify-center"
            >
              {t[lang].priceConsultBtn}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

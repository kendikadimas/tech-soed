"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const webGroup = pricingServiceGroups.find((g: any) => g.id === 'web');

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

  const renderPriceTag = (priceStr: string, isPopular: boolean) => {
    const str = String(priceStr || '');
    const match = str.match(/^(Rp\.?\s*)([0-9\.\,]+)(\+?.*)$/i);

    if (match) {
      const [, , amount, suffix] = match;
      return (
        <div className="flex items-baseline gap-1 sm:gap-1.5 flex-nowrap">
          <span className={`text-xs sm:text-sm font-bold tracking-tight select-none shrink-0 ${isPopular ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}`}>
            Rp
          </span>
          <span className={`text-3xl sm:text-3xl lg:text-[2.5rem] xl:text-[2.65rem] font-black tracking-[-0.035em] leading-none shrink-0 ${isPopular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
            {amount}
          </span>
          {suffix && (
            <span className={`text-base sm:text-lg lg:text-xl font-bold ml-0.5 shrink-0 ${isPopular ? 'text-blue-200' : 'text-[#172657] dark:text-blue-400'}`}>
              {suffix}
            </span>
          )}
        </div>
      );
    }

    return (
      <span className={`text-xl sm:text-2xl lg:text-3xl font-black ${isPopular ? 'text-white' : 'text-slate-900 dark:text-white transition-colors'}`}>
        {str.replace(/^rp\.?\s*/i, 'Rp ')}
      </span>
    );
  };

  return (
    <section id="harga" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-slate-50 dark:bg-slate-950 transition-colors rounded-t-[3rem] overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-geist text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.65rem] font-bold leading-[1.2] sm:leading-[1.18] text-slate-900 dark:text-white transition-colors tracking-[-0.03em]">
            {t[lang].priceTitle}
          </h2>
          <p className="font-geist text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 transition-colors font-normal leading-relaxed">
            {t[lang].priceDesc}
          </p>
        </div>

        {/* Primary Service Selector - Scrollable on Mobile */}
        <div className="relative w-full max-w-5xl mb-12 group/pfilter">
          {/* Arrow Buttons for Filter (Mobile Only) */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 z-60 lg:hidden opacity-0 group-hover/pfilter:opacity-100 transition-opacity">
            <button 
              onClick={() => {
                const el = document.getElementById('pricing-filter-scroll');
                el?.scrollBy({ left: -150, behavior: 'smooth' });
              }}
              className="p-2.5 btn-3d-filter-inactive rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-60 lg:hidden opacity-0 group-hover/pfilter:opacity-100 transition-opacity">
            <button 
              onClick={() => {
                const el = document.getElementById('pricing-filter-scroll');
                el?.scrollBy({ left: 150, behavior: 'smooth' });
              }}
              className="p-2.5 btn-3d-filter-inactive rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
          </div>

          <div 
            id="pricing-filter-scroll"
            className="flex flex-nowrap lg:flex-wrap items-center lg:justify-center gap-3 w-full py-4 -my-4 overflow-x-auto lg:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x relative z-50"
          >
            {pricingServiceGroups.map((group: any) => (
              <div key={group.id} className="relative shrink-0 snap-start" ref={group.id === 'web' ? dropdownRef : null}>
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
                  className={`btn-3d-filter ${activeService === group.id ? 'btn-3d-filter-active' : 'btn-3d-filter-inactive'}`}
                >
                  {group.id === 'web' && activeService === 'web' ? activeTab : group.name}
                  {group.id === 'web' && (
                    <ChevronDown className={`w-4 h-4 ml-1.5 transition-transform duration-300 ${isWebDropdownOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {group.id === 'web' && isWebDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hidden lg:block absolute top-full left-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-2 z-50 shadow-xl overflow-hidden"
                  >
                    {group.tabs.map((tab: string) => (
                      <button
                        key={tab}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab(tab);
                          setIsWebDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeTab === tab
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
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

          <AnimatePresence>
            {activeService === 'web' && isWebDropdownOpen && webGroup && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex lg:hidden absolute top-full left-0 right-0 flex-wrap gap-2 mt-2 p-4 bg-white/95 dark:bg-slate-950/95 transition-colors backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl z-60 shadow-2xl"
              >
                {webGroup.tabs.map((tab: string) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsWebDropdownOpen(false);
                    }}
                    className={`btn-3d-filter !py-1.5 !px-3.5 !text-xs ${activeTab === tab ? 'btn-3d-filter-active' : 'btn-3d-filter-inactive'}`}
                  >
                    {tab}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Cards Container */}
        <div className="relative w-full group/pcards">
          {/* Main Mobile Navigation Arrows (compact & within screen bounds) */}
          <div className="absolute top-1/2 left-0 sm:-left-3 -translate-y-1/2 z-40 lg:hidden pointer-events-auto">
            <button 
              onClick={() => scrollContainer('left')}
              className="p-2 sm:p-2.5 btn-3d-filter-inactive rounded-full shadow-lg transition-all active:scale-95 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800"
              aria-label="Previous Pricing"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 sm:-right-3 -translate-y-1/2 z-40 lg:hidden pointer-events-auto">
            <button 
              onClick={() => scrollContainer('right')}
              className="p-2 sm:p-2.5 btn-3d-filter-inactive rounded-full shadow-lg transition-all active:scale-95 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800"
              aria-label="Next Pricing"
            >
              <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
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
              } gap-4 sm:gap-6 lg:items-center w-full pb-8 pt-8 sm:pt-10 px-4 sm:px-6 lg:px-0 overflow-x-auto lg:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth`}
          >
            {currentPricing?.map((pkg: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`card-3d-seamless relative min-w-[85vw] sm:min-w-[42vw] lg:min-w-0 max-w-[340px] sm:max-w-none p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 snap-center flex flex-col ${pkg.isPopular
                  ? '!bg-[#172657] dark:!bg-slate-900 text-white !border-[#101b3d] dark:!border-slate-800/80 !border-b-[4px] !border-b-[#090f24] dark:!border-b-black shadow-[0_16px_36px_-6px_rgba(10,18,45,0.55),0_6px_14px_-2px_rgba(10,18,45,0.35)] dark:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.85)] hover:!border-[#16244f] hover:!border-b-[#090f24] hover:shadow-[0_22px_45px_-6px_rgba(10,18,45,0.65)] scale-100 sm:scale-[1.02] lg:scale-[1.03] z-10 py-7 sm:py-8 lg:py-10'
                  : 'text-slate-800 dark:text-slate-200'
                  }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-6 -right-6 sm:-top-7 sm:-right-8 lg:-top-9 lg:-right-12 z-30 pointer-events-none select-none transition-transform duration-300">
                    <Image
                      src="/assets/best-seller.svg"
                      alt="Best Seller"
                      width={180}
                      height={122}
                      unoptimized
                      priority
                      className="w-32 sm:w-36 lg:w-44 h-auto object-contain"
                    />
                  </div>
                )}

                <div className="text-left mb-5 sm:mb-6">
                  <div className="mb-2.5 sm:mb-3">
                    <span className={`inline-flex items-center px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-sm sm:text-base lg:text-lg font-black tracking-tight border transition-all ${
                      pkg.isPopular
                        ? 'bg-white/15 text-white border-white/25 shadow-xs backdrop-blur-xs'
                        : 'bg-blue-50/80 dark:bg-slate-800 text-[#172657] dark:text-blue-300 border-blue-100 dark:border-slate-700 shadow-2xs'
                    }`}>
                      {pkg.name}
                    </span>
                  </div>
                  <div className="mb-2.5 sm:mb-3.5 pt-0.5 sm:pt-1">
                    {renderPriceTag(pkg.price, pkg.isPopular)}
                  </div>
                  <p className={`text-[11.5px] sm:text-xs font-normal ${pkg.isPopular ? 'text-blue-100/90' : 'text-slate-500 dark:text-slate-400 transition-colors'} leading-relaxed mt-1.5 sm:mt-2`}>
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                  {pkg.features.map((feature: any, fIndex: number) => {
                    const text = typeof feature === 'string' ? feature : feature.text;
                    const included = typeof feature === 'string' ? true : feature.included !== false;

                    return (
                      <li key={fIndex} className={`flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm leading-snug ${!included ? 'opacity-30 line-through' : ''}`}>
                        {included ? (
                          <CheckCircle className={`w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 shrink-0 mt-0.5 ${pkg.isPopular ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                        ) : (
                          <X className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 mt-0.5 ${pkg.isPopular ? 'text-indigo-300' : 'text-slate-300 dark:text-slate-600'}`} />
                        )}
                        <span className={`${pkg.isPopular ? 'text-white/90' : 'text-slate-600 dark:text-slate-400 transition-colors'} font-medium`}>{text}</span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => handleOrderClick(pkg)}
                  className={`btn-3d-base w-full min-h-[44px] sm:min-h-[46px] py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-wider flex items-center justify-center gap-2 ${pkg.isPopular
                    ? 'btn-3d-green'
                    : 'btn-3d-blue'
                    }`}>
                  {t[lang].priceOrderText}
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Swipe Hint */}
          {currentPricing.length > 1 && (
            <div className="flex lg:hidden items-center justify-center gap-2 mt-2 text-xs text-slate-400 dark:text-slate-500">
              <span className="text-[11px] font-medium tracking-wide flex items-center gap-1.5 py-1 px-3 rounded-full bg-slate-200/50 dark:bg-slate-800/50 select-none">
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Geser untuk melihat paket lainnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          )}
        </div>

        {/* Consultation Section (Text Left, Button Right, No Card - Compact & Tight) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8 w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left px-4"
        >
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white transition-colors tracking-tight">
              {t[lang].priceConsultText}
            </h4>
            <p className="text-slate-500 dark:text-slate-400 transition-colors text-xs sm:text-sm font-normal leading-relaxed">
              {t[lang].priceConsultSubtitle}
            </p>
          </div>
          <a
            href={`https://wa.me/6285814174267?text=${encodeURIComponent(t[lang].orderWaGreeting)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-base btn-3d-green shrink-0 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-extrabold tracking-wider whitespace-nowrap text-xs sm:text-sm min-h-[44px] flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>{t[lang].priceConsultBtn}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

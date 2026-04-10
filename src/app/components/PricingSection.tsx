"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  CheckCircle, 
  X, 
  ShoppingCart, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../translations';
import { useLang } from './LangContext';
import SectionTag from './SectionTag';

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

  // Update sub-tab when service changes
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
    <section id="harga" className="py-24 px-6 lg:px-36 bg-white rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          {/* <SectionTag text={t[lang].priceTag} /> */}
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight text-slate-900">
            {t[lang].priceTitle}
          </h2>
          <p className="text-sm lg:text-base text-slate-600">
            {t[lang].priceDesc}
          </p>
        </div>

        {/* Primary Service Selector with Dropdown for Web Dev */}
        <div className="flex flex-wrap items-stretch justify-center gap-3 mb-10 w-full max-w-5xl p-2 bg-white/50 backdrop-blur-sm rounded-2xl md:rounded-4xl border border-slate-200 relative z-50">
          {pricingServiceGroups.map((group: any) => (
            <div key={group.id} className="relative grow md:flex-initial min-w-[140px] md:min-w-[160px]" ref={group.id === 'web' ? dropdownRef : null}>
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
                className={`w-full px-5 py-3 rounded-xl md:rounded-3xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeService === group.id 
                  ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/20 scale-[1.02]' 
                  : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {group.id === 'web' && activeService === 'web' ? activeTab : group.name}
                {group.id === 'web' && (
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isWebDropdownOpen ? 'rotate-180' : ''}`} />
                )}
              </button>

              {/* Dropdown for Web Development Tabs */}
              {group.id === 'web' && isWebDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-3 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 z-50 overflow-hidden"
                >
                  <div className="text-[10px] font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">Pilih Kategori Web</div>
                  {group.tabs.map((tab: string) => (
                    <button
                      key={tab}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(tab);
                        setIsWebDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${activeTab === tab
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
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

        {/* Active Sub-tab Indicator (for non-web or for clear feedback) */}
        {/* {activeTab && (
          <div className="mb-8 px-5 py-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-extrabold rounded-full animate-in fade-in slide-in-from-bottom-2">
            {activeService === 'web' ? activeTab : activeGroup.name}
          </div>
        )} */}

        {/* Pricing Cards */}
        <div className="relative w-full group">
          {/* Mobile Nav Arrows */}
          <div className="absolute top-1/2 -ml-2 sm:-ml-4 md:hidden left-0 z-20 transform -translate-y-1/2 pointer-events-none">
            <button type="button" onClick={() => scrollContainer('left')} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-xl flex items-center justify-center pointer-events-auto text-slate-600 hover:text-blue-600 transition active:scale-95 border border-slate-100">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -mr-2 sm:-mr-4 md:hidden right-0 z-20 transform -translate-y-1/2 pointer-events-none">
            <button type="button" onClick={() => scrollContainer('right')} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-xl flex items-center justify-center pointer-events-auto text-slate-600 hover:text-blue-600 transition active:scale-95 border border-slate-100">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <motion.div 
            ref={pricingScrollRef} 
            layout
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid ${
              currentPricing.length === 1 ? 'lg:grid-cols-1 max-w-lg mx-auto' : 
              currentPricing.length === 2 ? 'lg:grid-cols-2 max-w-4xl mx-auto' : 
              'lg:grid-cols-3'
            } gap-8 lg:items-stretch w-full pb-12 pt-10 px-6 md:px-4 -mx-6 md:mx-0 scroll-pl-6 md:scroll-pl-0 overflow-y-visible`}
          >
            {currentPricing?.map((pkg: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative min-w-[280px] md:min-w-0 h-full p-8 rounded-2xl md:rounded-3xl border transition-all duration-300 snap-center md:flex md:flex-col ${
                  pkg.isPopular 
                  ? 'bg-blue-600 text-white border-blue-500 scale-[1.05] z-10' 
                  : 'bg-white text-slate-800 border-slate-100 hover:border-blue-200 shadow-xl shadow-slate-200/50'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full  border border-slate-100">
                    {t[lang].pricePopular}
                  </div>
                )}

                <div className="text-left mb-8 pt-4">
                  <h3 className={`text-xl lg:text-2xl font-bold mb-2 ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className={`text-3xl font-extrabold ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>{pkg.price}</span>
                  </div>
                  <p className={`text-xs lg:text-sm ${pkg.isPopular ? 'text-blue-100' : 'text-slate-500'} min-h-[40px] leading-relaxed`}>
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feature: any, fIndex: number) => {
                    const text = typeof feature === 'string' ? feature : feature.text;
                    const included = typeof feature === 'string' ? true : feature.included !== false;

                    return (
                      <li key={fIndex} className={`flex items-start gap-3 text-sm ${!included ? 'opacity-40 line-through' : ''}`}>
                        {included ? (
                          <CheckCircle className={`w-5 h-5 shrink-0 ${pkg.isPopular ? 'text-blue-200' : 'text-blue-600'}`} />
                        ) : (
                          <X className={`w-5 h-5 shrink-0 ${pkg.isPopular ? 'text-blue-300' : 'text-slate-400'}`} />
                        )}
                        <span className={`${pkg.isPopular ? 'text-white' : 'text-slate-700'}`}>{text}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto">
                  <button
                    onClick={() => handleOrderClick(pkg)}
                    className={`w-full py-3.5 font-bold rounded-xl transition flex items-center justify-center gap-2 ${pkg.isPopular
                      ? 'bg-white text-blue-600 hover:bg-slate-50'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100'
                      }`}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg> {t[lang].priceOrderText}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 w-full max-w-4xl"
        >
          <div className="bg-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                Masih bingung menentukan yang cocok buat bisnis Anda?
              </h3>
              <p className="text-slate-500 text-sm md:text-base">
                Konsultasikan sekarang dengan tim ahli kami secara gratis!
              </p>
            </div>
            <a 
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(t[lang].orderWaGreeting)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#20bd5a] transition-all shadow-xl shadow-[#25D366]/20 active:scale-95 whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Konsultasikan Sekarang
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

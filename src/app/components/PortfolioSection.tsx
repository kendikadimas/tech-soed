"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { t } from '../translations';
import { useLang } from './LangContext';

export default function PortfolioSection() {
  const { lang } = useLang();
  const [portfolioMainFilter, setPortfolioMainFilter] = useState('All');
  const [websiteType, setWebsiteType] = useState('All');
  const [isWebDropdownOpen, setIsWebDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Carousel Ref
  const projectScrollRef = useRef<HTMLDivElement>(null);

  // Close dropdown logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWebDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const topCategories = [
    { id: 'All', name: lang === 'id' ? 'Semua' : 'All' },
    { id: 'Web Development', name: 'Web Development' },
    { id: 'Mobile Apps', name: 'Mobile Apps' },
    { id: 'UI/UX Design', name: 'UI/UX Design' },
    { id: 'Social Media Management', name: 'Social Media Management' },
    { id: 'Sistem Informasi / Web Apps', name: 'Sistem Informasi / Web Apps' },
  ];

  const webSubCategories = [
    { id: 'All', name: lang === 'id' ? 'Semua Website' : 'All Websites' },
    { id: 'Landing Page', name: 'Landing Page' },
    { id: 'Company Profile', name: 'Company Profile' },
    { id: 'CMS', name: 'CMS' },
    { id: 'LMS', name: 'LMS' },
    { id: 'E-Commerce', name: 'E-Commerce' },
  ];

  const projectsData = t[lang].projectsData;

  const filteredProjects = projectsData.filter((p: any) => {
    if (portfolioMainFilter === 'All') return true;
    if (portfolioMainFilter === 'Web Development') {
      const isWebProject = ['Landing Page', 'Company Profile', 'CMS', 'LMS', 'E-Commerce'].includes(p.category);
      if (!isWebProject) return false;
      if (websiteType === 'All') return true;
      return p.category === websiteType;
    }
    if (portfolioMainFilter === 'Mobile Apps') return p.category === 'Mobile Apps';
    if (portfolioMainFilter === 'UI/UX Design') return p.category === 'UI/UX Design';
    if (portfolioMainFilter === 'Social Media Management') {
      return p.category === 'Social Media Management' || p.category === 'Digital Branding';
    }
    if (portfolioMainFilter === 'Sistem Informasi / Web Apps') {
      return p.category === 'Sistem Informasi / Web Apps' || p.category === 'Enterprise Systems' || p.category === 'Web Apps';
    }
    return p.category === portfolioMainFilter;
  });

  const currentProjects = filteredProjects;

  // Refs for scrolling
  const filterScrollRef = useRef<HTMLDivElement>(null);

  const scrollFilter = (direction: 'left' | 'right') => {
    if (filterScrollRef.current) {
      const amount = 200;
      filterScrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectScrollRef.current) {
      const amount = projectScrollRef.current.offsetWidth * 0.8;
      projectScrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-24 px-6 lg:px-12 bg-white flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-left max-w-4xl mb-12 relative">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight mb-4"
          >
            {t[lang].portTitle}
          </motion.h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
            {t[lang].portDesc}
          </p>
        </div>

        {/* Filter System - Scrollable on Mobile */}
        <div className="relative mb-16 group/filter">
          {/* Arrow Buttons for Filter (Mobile Only) */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 z-60 lg:hidden opacity-0 group-hover/filter:opacity-100 transition-opacity">
            <button 
              onClick={() => scrollFilter('left')}
              className="p-3 text-slate-400 hover:text-blue-900 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-60 lg:hidden opacity-0 group-hover/filter:opacity-100 transition-opacity">
            <button 
              onClick={() => scrollFilter('right')}
              className="p-3 text-slate-400 hover:text-blue-900 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div 
            ref={filterScrollRef}
            className="flex flex-nowrap lg:flex-wrap items-center gap-3 overflow-x-auto lg:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4 -my-4 relative z-50 snap-x"
          >
            {topCategories.map((cat) => (
              <div key={cat.id} className="relative shrink-0 snap-start" ref={cat.id === 'Web Development' ? dropdownRef : null}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (cat.id === 'Web Development') {
                      setIsWebDropdownOpen(!isWebDropdownOpen);
                      setPortfolioMainFilter('Web Development');
                    } else {
                      setPortfolioMainFilter(cat.id);
                      setIsWebDropdownOpen(false);
                      setWebsiteType('All');
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${portfolioMainFilter === cat.id
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                >
                  {cat.id === 'Web Development' && portfolioMainFilter === 'Web Development' && websiteType !== 'All'
                    ? websiteType
                    : cat.name}
                  {cat.id === 'Web Development' && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isWebDropdownOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {cat.id === 'Web Development' && isWebDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hidden lg:block absolute top-full left-0 mt-3 w-64 bg-white border border-slate-100 rounded-2xl p-2 z-50 overflow-hidden"
                  >
                    {webSubCategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setWebsiteType(sub.id);
                          setIsWebDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${websiteType === sub.id
                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Sub-Filters for Mobile (Absolute Overlay) */}
          <AnimatePresence>
            {portfolioMainFilter === 'Web Development' && isWebDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex lg:hidden absolute top-full left-0 right-0 flex-wrap gap-2 mt-2 p-4 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl z-60 shadow-2xl"
              >
                {webSubCategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setWebsiteType(sub.id);
                      setIsWebDropdownOpen(false); // Close after select on mobile
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${websiteType === sub.id
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-50 text-slate-500 border border-slate-100'
                      }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Projects Carousel */}
        <div className="relative group/projects w-full">
          {/* Navigation Buttons (Desktop & Mobile) */}
          <button
            onClick={() => scrollProjects('left')}
            className="absolute -left-4 lg:-left-20 top-1/2 -translate-y-1/2 p-2 lg:p-4 bg-white/90 backdrop-blur-md border border-slate-100 text-slate-400 hover:text-blue-900 hover:border-blue-100 rounded-xl shadow-xl transition-all z-30 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 lg:w-8 lg:h-8" />
          </button>
          <button
            onClick={() => scrollProjects('right')}
            className="absolute -right-4 lg:-right-20 top-1/2 -translate-y-1/2 p-2 lg:p-4 bg-white/90 backdrop-blur-md border border-slate-100 text-slate-400 hover:text-blue-900 hover:border-blue-100 rounded-xl shadow-xl transition-all z-30 hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 lg:w-8 lg:h-8" />
          </button>

          <motion.div
            ref={projectScrollRef}
            layout
            className="flex gap-6 lg:gap-8 overflow-x-auto pb-12 pt-4 px-4 -mx-4 lg:px-0 lg:mx-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory touch-pan-x"
          >
            <AnimatePresence mode='popLayout'>
              {currentProjects.map((project: any, idx: number) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group cursor-pointer flex flex-col flex-none w-[85%] md:w-[45%] lg:w-[calc(33.333%-1.5rem)] bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 snap-center"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                    <Image
                      src={project.image}
                      alt={`Proyek ${project.title} - ${project.category}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="group-hover:scale-105 transition duration-700 ease-in-out object-contain p-2"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-wider rounded-xl shadow-sm border border-white">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 lg:p-8 flex flex-col flex-1">
                    <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-sm lg:text-base font-medium leading-relaxed line-clamp-3">
                      {project.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Mobile indicator line */}
          <div className="flex lg:hidden justify-center gap-2 mt-2">
            <div className="w-12 h-1 bg-slate-100 rounded-xl overflow-hidden">
               <motion.div 
                className="h-full bg-blue-900/20"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1 }}
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

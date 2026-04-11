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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [portfolioMainFilter, websiteType]);

  // Refs for scrolling
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const projectScrollRef = useRef<HTMLDivElement>(null);

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
            className="flex flex-nowrap lg:flex-wrap items-center gap-3 overflow-x-auto lg:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 lg:pb-0 relative z-50 snap-x"
          >
            {topCategories.map((cat) => (
              <div key={cat.id} className="relative shrink-0 snap-start" ref={cat.id === 'Web Development' ? dropdownRef : null}>
                <button
                  onClick={() => {
                    setPortfolioMainFilter(cat.id);
                    if (cat.id === 'Web Development') {
                      setIsWebDropdownOpen(!isWebDropdownOpen);
                    } else {
                      setIsWebDropdownOpen(false);
                      setWebsiteType('All');
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${portfolioMainFilter === cat.id
                    ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/20'
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
                    className="absolute top-full left-0 mt-3 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 z-50 overflow-hidden"
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
        </div>

        {/* Carousel / Grid */}
        <div className="relative min-h-[400px] group/carousel">
          {/* Mobile Arrows for Carousel */}
          <div className="absolute top-[40%] -left-8 -translate-y-1/2 z-40 lg:hidden">
            <button 
              onClick={() => scrollProjects('left')}
              className="p-4 text-blue-900 hover:text-blue-600 active:scale-90 transition-all drop-shadow-sm"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          </div>
          <div className="absolute top-[40%] -right-8 -translate-y-1/2 z-40 lg:hidden">
            <button 
              onClick={() => scrollProjects('right')}
              className="p-4 text-slate-300 hover:text-blue-900 active:scale-90 transition-all drop-shadow-sm"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          <motion.div
            ref={projectScrollRef}
            layout
            className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-10 overflow-x-auto lg:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory pb-10 scroll-smooth"
          >
            <AnimatePresence mode='popLayout'>
              {currentProjects.map((project: any, idx: number) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group cursor-pointer flex flex-col shrink-0 w-[80%] sm:w-[45%] lg:w-full snap-center"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-square sm:aspect-video rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="group-hover:scale-105 transition duration-700 ease-in-out object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase tracking-wider rounded-lg shadow-xl border border-white">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="py-6 px-1 flex flex-col flex-1">
                    <h3 className="text-lg lg:text-xl font-black text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-xs lg:text-sm font-medium leading-relaxed line-clamp-2">
                      {project.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Desktop Improved Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 hidden lg:flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-100 text-slate-400 hover:text-blue-900 hover:border-indigo-100 transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2 mx-4">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl font-bold text-sm transition-all ${currentPage === i + 1
                    ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/20'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-100 text-slate-400 hover:text-blue-900 hover:border-indigo-100 transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

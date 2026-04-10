"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { t } from '../translations';
import { useLang } from './LangContext';
import SectionTag from './SectionTag';

export default function PortfolioSection() {
  const { lang } = useLang();
  const portfolioScrollRef = useRef<HTMLDivElement>(null);
  const [portfolioMainFilter, setPortfolioMainFilter] = useState('All');
  const [websiteType, setWebsiteType] = useState('All'); // For the dropdown
  const [isWebDropdownOpen, setIsWebDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    // 1. All filter
    if (portfolioMainFilter === 'All') return true;

    // 2. Web Development with Sub-filtering
    if (portfolioMainFilter === 'Web Development') {
      const isWebProject = ['Landing Page', 'Company Profile', 'CMS', 'LMS', 'E-Commerce'].includes(p.category);
      if (!isWebProject) return false;
      if (websiteType === 'All') return true;
      return p.category === websiteType;
    }

    // 3. Other Main Categories
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

  return (
    <section id="portfolio" className="py-24 px-6 lg:px-36 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left max-w-3xl mb-12 relative">
          <div className="absolute -top-10 -left-6 w-32 h-32 bg-blue-100/50 blur-3xl rounded-full -z-10" />
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-extrabold text-[#1a2b4b] leading-tight"
          >
            {t[lang].portTitle}
          </motion.h2>
          <p className="text-sm lg:text-base text-slate-500 mt-4 leading-relaxed max-w-2xl">
            {t[lang].portDesc}
          </p>
        </div>

        {/* Filter System */}
        <div className="flex flex-wrap items-center gap-4 mb-12 relative z-50">
          {topCategories.map((cat) => (
            <div key={cat.id} className="relative" ref={cat.id === 'Web Development' ? dropdownRef : null}>
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
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap ${portfolioMainFilter === cat.id
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {cat.id === 'Web Development' && portfolioMainFilter === 'Web Development' && websiteType !== 'All' 
                  ? websiteType 
                  : cat.name}
                {cat.id === 'Web Development' && (
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isWebDropdownOpen ? 'rotate-180' : ''}`} />
                )}
              </button>

              {/* Dropdown for Web Development */}
              {cat.id === 'Web Development' && isWebDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-100 shadow-2xl rounded-xl p-2 z-50"
                >
                  {webSubCategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setWebsiteType(sub.id);
                        setIsWebDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${websiteType === sub.id
                        ? 'bg-blue-50 text-blue-700 font-bold'
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

          {/* Active Filter Indicator for Sub-category */}
          {/* {portfolioMainFilter === 'Web Development' && websiteType !== 'All' && (
            // <motion.span
            //   initial={{ opacity: 0, x: -10 }}
            //   animate={{ opacity: 1, x: 0 }}
            //   className="px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold rounded-full"
            // >
            //   Category: {websiteType}
            // </motion.span>
          )} */}
        </div>

        {/* Grid */}
        <div className="relative">
          <div ref={portfolioScrollRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8">
            {filteredProjects.map((project: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group cursor-pointer overflow-hidden bg-white transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="group-hover:scale-105 transition duration-700 ease-in-out object-cover"
                  />
                  {/* Category Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#0a1d37]/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="py-6 lg:py-8 px-0 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-600 mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs lg:text-sm leading-relaxed line-clamp-2">
                    {project.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Load More */}
          {/* <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-2 mx-auto text-sm">
              {t[lang].portLoadMore} <ChevronDown className="w-4 h-4" />
            </button>
          </div> */}
      </div>
    </section>
  );
}

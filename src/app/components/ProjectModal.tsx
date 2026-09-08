"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ArrowRight, Tag, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  image: string;
  desc: string;
  link?: string;
  live_url?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  lang: string;
}

export default function ProjectModal({ project, onClose, lang }: ProjectModalProps) {
  const rawDemoUrl = project?.live_url || project?.link;
  const demoUrl = rawDemoUrl && rawDemoUrl.trim()
    ? (rawDemoUrl.trim().startsWith('http://') || rawDemoUrl.trim().startsWith('https://')
        ? rawDemoUrl.trim()
        : `https://${rawDemoUrl.trim()}`)
    : null;

  const getDemoButtonLabel = () => {
    if (!project) return '';
    if (lang !== 'id') return 'Open Application';
    const cat = (project.category || '').toLowerCase();
    if (cat.includes('app') || cat.includes('sistem') || cat.includes('lms') || cat.includes('software')) {
      return 'Buka Aplikasi';
    }
    return 'Buka Aplikasi / Demo';
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-black/30 pointer-events-auto border border-slate-100 dark:border-slate-800">
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Tutup modal"
                className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image */}
              <div className="relative w-full aspect-[16/8] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-contain p-4"
                />
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#172657]/90 backdrop-blur-sm text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-sm">
                    <Tag className="w-3 h-3 text-blue-300" />
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                  {project.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>

                {/* Actions: Demo Link + Discuss + Close */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  {demoUrl && (
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-[#172657] hover:bg-[#1f3373] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#172657]/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 text-xs sm:text-sm cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{getDemoButtonLabel()}</span>
                    </a>
                  )}

                  <a
                    href={`https://wa.me/6285814174267?text=${encodeURIComponent(
                      lang === 'id'
                        ? `Halo TechSoe, saya tertarik dengan proyek "${project.title}" yang ada di portofolio Anda!`
                        : `Hello TechSoe, I am interested in the "${project.title}" project from your portfolio!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#20bd5a] transition-all shadow-lg shadow-green-600/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 text-xs sm:text-sm cursor-pointer"
                  >
                    <span>{lang === 'id' ? 'Diskusikan Proyek Saya' : 'Discuss My Project'}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>

                  <button
                    onClick={onClose}
                    className="px-5 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs sm:text-sm active:scale-95 cursor-pointer"
                  >
                    {lang === 'id' ? 'Tutup' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

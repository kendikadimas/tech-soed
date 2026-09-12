"use client";

import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  const rawDemoUrl = project?.live_url || project?.link;
  const demoUrl = rawDemoUrl && rawDemoUrl.trim()
    ? (rawDemoUrl.trim().startsWith('http://') || rawDemoUrl.trim().startsWith('https://')
        ? rawDemoUrl.trim()
        : `https://${rawDemoUrl.trim()}`)
    : null;

  const getDemoButtonLabel = () => {
    if (!project) return '';
    if (lang !== 'id') return 'Open Application';
    return 'Buka Aplikasi';
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            key="project-modal-card"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl max-h-[85vh] sm:max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl overflow-y-auto shadow-2xl shadow-black/30 border border-slate-100 dark:border-slate-800 my-auto flex flex-col pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Close Button */}
            <button
              onClick={onClose}
              aria-label="Tutup modal"
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image */}
            <div className="relative w-full aspect-[16/8] bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
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
            <div className="p-6 sm:p-7 flex flex-col flex-1 overflow-y-auto">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                {project.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed mb-6">
                {project.desc}
              </p>

              {/* Actions: Demo Link + Discuss + Close */}
              <div className="mt-auto flex flex-col sm:flex-row gap-2.5">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ArrowRight, Tag } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  image: string;
  desc: string;
  link?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  lang: string;
}

export default function ProjectModal({ project, onClose, lang }: ProjectModalProps) {
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
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 pointer-events-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all hover:scale-110 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image */}
              <div className="relative w-full aspect-[16/7] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain p-4"
                />
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-900/90 backdrop-blur-sm text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-sm">
                    <Tag className="w-3 h-3" />
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed mb-5">
                  {project.desc}
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm"
                    >
                      {lang === 'id' ? 'Kunjungi Website' : 'Visit Website'}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href="https://wa.me/6285814174267?text=Halo TechSoe, saya tertarik dengan proyek yang ada di portofolio Anda!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#20bd5a] transition-all shadow-lg shadow-green-600/20 active:scale-95 text-sm"
                  >
                    {lang === 'id' ? 'Diskusikan Proyek Saya' : 'Discuss My Project'}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={onClose}
                    className="px-6 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-sm active:scale-95"
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

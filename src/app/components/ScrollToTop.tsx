"use client";

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollToTopProps {
  visible: boolean;
}

export default function ScrollToTop({ visible }: ScrollToTopProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-6 z-[90] flex items-center justify-center bg-white dark:bg-slate-950 transition-colors dark:bg-slate-950 transition-colors text-slate-800 dark:text-slate-200 transition-colors dark:text-slate-200 transition-colors p-3 rounded-full shadow-lg shadow-slate-200 border border-slate-100 dark:border-slate-800 transition-colors dark:border-slate-800 transition-colors hover:-translate-y-1 hover:bg-slate-50 dark:bg-slate-950 transition-colors dark:bg-slate-950 transition-colors transition-all duration-300"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

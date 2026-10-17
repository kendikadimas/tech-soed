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
          className="btn-3d-base btn-3d-white dark:btn-3d-dark !fixed bottom-22 sm:bottom-24 right-6 z-[9999] w-14 h-14 !p-0 !rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
        >
          <ArrowUp className="w-6 h-6 shrink-0" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

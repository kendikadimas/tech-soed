"use client";

import React, { useState, useEffect } from 'react';
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  PortfolioSection,
  PricingSection,
  TestimonialsSection,
  FaqSection,
  LatestArticles,
  CtaSection,
  ScrollToTop,
  OrderModal,
  ContactSection,
} from './components';

function LandingPageContent() {
  const [scrolled, setScrolled] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({ name: '', price: '', category: '' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderClick = (pkg: { name: string; price: string; category: string }) => {
    setSelectedPackage(pkg);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-white transition-colors overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}} />

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <PricingSection onOrderClick={handleOrderClick} />
      <TestimonialsSection />
      <LatestArticles />
      <FaqSection />
      <CtaSection />
      <ContactSection />
      <ScrollToTop visible={scrolled} />
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}

export default function LandingPage() {
  return (
    <LandingPageContent />
  );
}
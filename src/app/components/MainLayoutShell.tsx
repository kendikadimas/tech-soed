"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function MainLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-slate-950 transition-colors">
        {children}
      </main>
      <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
        <Footer />
      </div>
      <WhatsAppButton />
    </>
  );
}

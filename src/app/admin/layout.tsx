"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  FileText,
  FolderGit2,
  Plus,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
  Sparkles,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function AdminNavContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'articles';

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [authChecking, setAuthChecking] = useState(pathname !== '/admin/login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (pathname === '/admin/login') {
      setAuthChecking(false);
      return;
    }

    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user }, error }) => {
        if (user && !error) {
          setUserEmail(user.email ?? null);
          setAuthChecking(false);
        } else {
          router.replace('/admin/login');
        }
      }).catch(() => {
        router.replace('/admin/login');
      });
    } catch {
      router.replace('/admin/login');
    }
  }, [pathname, router]);

  // If on login page, render without sidebar chrome
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Loading state while checking authentication
  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-bold text-slate-500 tracking-wide">Memeriksa hak akses admin...</p>
      </div>
    );
  }


  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const isArticlesActive = pathname === '/admin' && currentTab === 'articles';
  const isProjectsActive = pathname === '/admin' && currentTab === 'projects';
  const isNewArticleActive = pathname === '/admin/articles/new';
  const isNewProjectActive = pathname === '/admin/projects/new';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative w-7 h-7 shrink-0">
            <Image
              src="/projects/logo.png"
              alt="TechSoe Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-base text-slate-900 tracking-tight">
            TechSoe <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">Admin</span>
          </span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR (DESKTOP & MOBILE DRAWER) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* TOP BRANDING & NAVIGATION */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src="/projects/logo.png"
                  alt="TechSoe Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-black text-lg text-slate-900 tracking-tight block leading-tight">
                  TechSoe
                </span>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 inline-block mt-0.5">
                  Admin Panel
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-6">
            {/* Group 1: Konten Utama */}
            <div>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Konten Utama
              </p>
              <nav className="space-y-1">
                <Link
                  href="/admin?tab=articles"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isArticlesActive
                      ? 'bg-[#172657] text-white shadow-md shadow-[#172657]/15'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className={`w-4 h-4 ${isArticlesActive ? 'text-blue-300' : 'text-slate-400'}`} />
                    <span>Artikel Blog</span>
                  </div>
                  {isArticlesActive && <ChevronRight className="w-3.5 h-3.5 text-blue-300" />}
                </Link>

                <Link
                  href="/admin?tab=projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isProjectsActive
                      ? 'bg-[#172657] text-white shadow-md shadow-[#172657]/15'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FolderGit2 className={`w-4 h-4 ${isProjectsActive ? 'text-blue-300' : 'text-slate-400'}`} />
                    <span>Proyek & Hero 3D</span>
                  </div>
                  {isProjectsActive && <ChevronRight className="w-3.5 h-3.5 text-blue-300" />}
                </Link>
              </nav>
            </div>

            {/* Group 2: Aksi Cepat Buat Baru */}
            <div>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Aksi Cepat
              </p>
              <nav className="space-y-1">
                <Link
                  href="/admin/articles/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isNewArticleActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>Tulis Artikel Baru</span>
                </Link>

                <Link
                  href="/admin/projects/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isNewProjectActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>Tambah Proyek Baru</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* BOTTOM USER PROFILE & LOGOUT */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              Lihat Website
            </span>
            <span className="text-[10px] text-slate-400">techsoe.com</span>
          </Link>

          {mounted && userEmail && (
            <div className="flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="truncate flex-1">
                <p className="text-[11px] font-bold text-slate-900 truncate leading-tight">
                  {userEmail}
                </p>
                <p className="text-[10px] text-slate-500 leading-none mt-0.5">Admin Utama</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* MOBILE BACKDROP */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm md:hidden"
        />
      )}

      {/* MAIN CONTENT CANVAS (LIGHT THEME) */}
      <main className="flex-1 min-w-0 bg-slate-50 min-h-screen text-slate-900 p-4 sm:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <p className="text-sm font-semibold text-slate-500">Memuat Admin Panel...</p>
        </div>
      }
    >
      <AdminNavContent>{children}</AdminNavContent>
    </Suspense>
  );
}

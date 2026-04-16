"use client";

                  href="mailto:hi@techsoe.com"
import { Mail, MapPin, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { t } from '../translations';
import { useLang } from './LangContext';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-slate-900 dark:bg-slate-900 transition-colors text-slate-300 py-20 px-6 lg:px-12 rounded-t-[3rem] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900/5 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="w-56 h-14 relative flex items-center justify-start overflow-hidden">
                <Image src="/projects/logo.png" alt="TechSoe Logo" fill className="object-contain object-left" />
              </div>
            </div>
                    <p className="font-semibold text-sm">hi@techsoe.com</p>
              {t[lang].footerDesc}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/techsoe.id/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="https://www.tiktok.com/@techsoe.id?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-950 hover:text-white transition-all duration-300 group"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.01.07-.01.14-.01.21.03.95.53 1.86 1.33 2.39.77.53 1.77.71 2.69.48 1.31-.38 2.21-1.66 2.22-3.02.01-4.32-.02-8.63.02-12.96z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Navigation</div>
            <ul className="space-y-4">
              {['Layanan', 'Portfolio', 'Tentang Kami', 'Harga'].map((item, i) => (
                <li key={i}>
                  <Link href={`#${item === 'Tentang Kami' ? 'tentang' : item.toLowerCase()}`} className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-500 transition-colors" />
                    <span className="text-sm font-bold">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="text-white font-bold mb-8 uppercase tracking-widest text-xs">{t[lang].footerSvcHeading}</div>
            <ul className="space-y-4">
              {[
                { name: 'Web Development', tag: 'Hot' },
                { name: 'UI/UX Design' },
                { name: 'Mobile Apps' },
                { name: 'Information Systems' },
                { name: 'Digital Branding' }
              ].map((svc, i) => (
                <li key={i}>
                  <Link href="#layanan" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center justify-between group">
                    <span className="text-sm font-bold">{svc.name}</span>
                    {svc.tag && <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-500/20">{svc.tag}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Reach Out</div>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-slate-400 leading-relaxed">
                  Purwokerto, Jawa Tengah <br /> Indonesia
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-[#25D466] shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-slate-400">
                  +62 858-1417-4267
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-slate-400">
                  techsoe26@gmail.com
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs lg:text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} TechSoe Digital Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/kebijakan-privasi" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/syarat-dan-ketentuan" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

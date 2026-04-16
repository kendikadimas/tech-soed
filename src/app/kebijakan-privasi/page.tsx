import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kebijakan Privasi | TechSoe',
    description: 'Pelajari bagaimana TechSoe mengelola dan menjaga privasi data Anda dengan aman.',
};

export default function KebijakanPrivasiPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-20 sm:pb-32 transition-colors">
            {/* FLOATING NAVBAR */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border border-slate-100 dark:border-slate-800 shadow-sm rounded-full px-4 sm:px-6 py-3 w-full max-w-5xl flex items-center justify-between transition-colors">
                    <div className="flex items-center">
                        <div className="w-40 sm:w-48 h-10 sm:h-12 rounded relative flex items-center justify-start">
                            <Image src="/projects/logotrans.png" alt="TechSoe Logo" fill className="object-contain object-left" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Link href="/" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Kembali
                        </Link>
                    </div>
                </nav>
            </div>

            {/* HEADER */}
            <div className="bg-slate-900 pt-36 sm:pt-48 pb-16 sm:pb-32 px-5 sm:px-6 rounded-b-[2.5rem] sm:rounded-b-[4rem] text-center relative overflow-hidden transition-colors">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                        <ShieldAlert className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Kebijakan Privasi
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-lg">
                        Transparansi mengenai bagaimana kami menjaga dan mendedikasikan kerahasiaan data berharga Anda. <br />
                        <span className="text-blue-400 text-sm mt-2 block font-medium">Pembaruan Terakhir: {new Date().toLocaleDateString('id-ID')}</span>
                    </p>
                </div>
            </div>

            {/* DOCUMENT CONTENT */}
            <main className="max-w-4xl mx-auto px-5 sm:px-6 -mt-8 sm:-mt-16 relative z-20">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-10 md:p-14 shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 transition-colors">

                    <div className="prose prose-base sm:prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400">
                        <p className="lead text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10">
                            Di TechSoe, privasi dari pengunjung dan privasi kekayaan intelektual klien kami adalah prioritas paling tinggi bagi internal kami. Dokumen Kebijakan Privasi ini diformulasikan untuk menjelaskan pengumpulan dan protokol penggunaan informasi operasi Anda.
                        </p>

                        <div className="space-y-12">
                            {/* Seksi 1 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-2xl font-bold m-0">1. Pengumpulan Informasi</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 pl-0 sm:pl-14 leading-relaxed">
                                    Kami mengumpulkan informasi kontak pribadi dasar (seperti nama, alamat email, no. telepon) dan juga aset kepemilikan bisnis yang secara sukarela Anda serahkan kepada kami selama fase identifikasi dan pengembangan (*development phase*) sistem digital.
                                </p>
                            </div>

                            {/* Seksi 2 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-2xl font-bold m-0">2. Penggunaan & Integritas Kerahasiaan</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 pl-0 sm:pl-14 mb-4 leading-relaxed">
                                    Tujuan utama data berada di infrastruktur kami adalah eksplisit untuk fungsionalitas produk yang sedang dipesan. Kami **berjanji tidak akan pernah menjual, menyewakan, atau membocorkan** model (*source code*) khusus Anda, kredensial server pelanggan, dan rincian transaksi *e-commerce* klien kepada agen Pihak Ketiga dengan alasan apa pun.
                                </p>
                            </div>

                            {/* Seksi 3 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-2xl font-bold m-0">3. Persetujuan NDA Bersama</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 pl-0 sm:pl-14 leading-relaxed">
                                    Untuk jenis proyek *Enterprise*, klien diperbolehkan dan sangat direkomendasikan untuk menerbitkan dokumen *Non-Disclosure Agreement (NDA)* mereka sendiri agar ditandatangani oleh pejabat kami, guna mengikat perlindungan mata hukum positif Indonesia.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

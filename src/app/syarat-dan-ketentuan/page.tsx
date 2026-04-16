import React from 'react';
import { ArrowLeft, CheckCircle, Scale, ShieldCheck, FileText, BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Syarat & Ketentuan | TechSoe',
    description: 'Baca kelengkapan Syarat dan Ketentuan layanan TechSoe mengenai pembuatan website dan aplikasi.',
};

export default function SyaratKetentuanPage() {
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
                            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
                        </Link>
                    </div>
                </nav>
            </div>

            {/* HEADER HERO */}
            <section className="pt-36 sm:pt-48 pb-14 sm:pb-24 px-5 sm:px-6 relative overflow-hidden bg-slate-900 text-center rounded-b-[2.5rem] sm:rounded-b-[4rem] shadow-xl transition-colors">
                {/* Glow Effects */}
                <div className="absolute top-0 right-0 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-blue-700 rounded-full blur-[80px] sm:blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 left-0 w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] bg-blue-900 rounded-full blur-[80px] sm:blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2 z-0"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-emerald-500/30">
                        <Scale className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-5 sm:mb-6 leading-tight tracking-tight">
                        Ketentuan Layanan
                    </h1>
                    <p className="text-sm sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
                        Perjanjian komersial *(Terms of Service)* resmi ini mengklarifikasikan alur pengerjaan dan tanggung jawab yang seimbang antara TechSoe dan pihak klien.
                    </p>
                    <span className="inline-block bg-slate-800 text-slate-300 font-medium px-4 py-2 rounded-full text-sm border border-slate-700 shadow-sm">
                        Telah diperbarui: {new Date().toLocaleDateString('id-ID')}
                    </span>
                </div>
            </section>

            {/* DOCUMENT SECTIONS CARDS */}
            <section className="max-w-5xl mx-auto px-5 sm:px-6 -mt-8 sm:-mt-10 relative z-20 space-y-5 sm:space-y-6">

                {/* Card 1 */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-10 md:p-14 border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-black/20 transition-colors">
                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                            <FileText className="text-blue-900 w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">1. Termin Terminologi & SLA</h2>
                            <div className="text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
                                <p>
                                    Kerja sama desain perangkat lunak *(B2B Web/App Production)* yang dikerjakan resmi dimulai ketika kedua belah pihak sepakat pada draf **Quotation Harga**.
                                </p>
                                <ul className="list-disc pl-5 font-medium space-y-2 mt-4 text-slate-700 dark:text-slate-300">
                                    <li>Pembayaran Uang Muka (Down Payment) minimal **50%** diawal pengerjaan.</li>
                                    <li>Pelunasan terminal **50%** harus direalisasikan maksimal **3x24 Hari kerja** pasca uji coba (*testing phase*) selesai dan sebelum produk dinaikkan ke live-server klien (*production*).</li>
                                    <li>Waktu hitung mundur/SLA pengerjaan proyek mengikuti kerumitan level produk sesuai yang tercantum di faktur tagihan (Invoice).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-10 md:p-14 border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-black/20 transition-colors">
                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                            <ShieldCheck className="text-sky-600 w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">2. Hak Revisi Klien</h2>
                            <div className="text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
                                <p>
                                    TechSoe adalah entitas pelayanan klien yang fleksibel (*agile*), dan memaklumi perubahan (*change request*) selama pengembangan berjalan:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 mt-6">
                                    <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
                                        <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-500" /> Revisi Minor
                                        </h5>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">Anda dibebaskan **maksimal 3 kali balikan revisi kosmetik** (perubahan font, warna tombol, copy text, posisi elemen standar layout).</p>
                                    </div>
                                    <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/40 transition-colors">
                                        <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                            <Scale className="w-4 h-4 text-red-500" /> Revisi Mayor / Struktural
                                        </h5>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">Rombakan alur backend logika dan desain UI masif yang di luar dokumen awal (SRS) membutuhkan kontrak jam ekstra yang akan ditagihkan kepada Anda.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-10 md:p-14 border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-black/20 transition-colors">
                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                            <BadgeCheck className="text-emerald-600 w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">3. Klaim Garansi Pascabeli (After-Sales)</h2>
                            <div className="text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
                                <p>
                                    Perangkat lunak berbasis web maupun mobile rentan terkena kesalahan *runtime* di lingkungan pelanggan *real-world*. TechSoe otomatis menjamin kualitas barang dari pihak kami setelah *handover*:
                                </p>
                                <ul className="list-disc pl-5 mt-4 space-y-2 font-medium">
                                    <li><span className="text-slate-900 dark:text-white font-bold">Produk Starter/LP:</span> Memiliki cakupan asuransi *Bug Fixing* hingga **30 Hari**.</li>
                                    <li><span className="text-slate-900 dark:text-white font-bold">Aplikasi Custom & E-Commerce:</span> Dibekali *Complimentary Maintenance* membetulkan kode rusak selama periode pengawasan hingga **3-6 Bulan**.</li>
                                </ul>
                                <div className="bg-yellow-50/50 dark:bg-yellow-950/20 p-4 border border-yellow-200 dark:border-yellow-900/40 text-yellow-800 dark:text-yellow-200 text-sm mt-4 rounded-xl font-medium transition-colors">
                                    <strong>Peringatan Garansi Mutlak:</strong> Garansi layanan langsung hangus jika tim kami **mendeteksi adanya modifikasi sepihak pihak klien** merusak kodingan basis inti / direktori krusial pada server VPS yang telah kami tutup segelnya.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

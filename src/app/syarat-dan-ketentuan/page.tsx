import React from 'react';
import { ArrowLeft, CheckCircle, Scale, ShieldCheck, FileText, BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Syarat & Ketentuan | Soedirman Inovasi Digital',
    description: 'Baca kelengkapan Syarat dan Ketentuan layanan Soedirman Inovasi Digital mengenai pembuatan website dan aplikasi.',
};

export default function SyaratKetentuanPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-32">
            {/* FLOATING NAVBAR */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-sm rounded-full px-6 py-3 w-full max-w-5xl flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-48 h-12 rounded relative flex items-center justify-start">
                            <Image src="/projects/logotrans.png" alt="Soedirman Inovasi Digital Logo" fill className="object-contain object-left" />
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <a href="/" className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
                        </a>
                    </div>
                </nav>
            </div>

            {/* HEADER HERO */}
            <section className="pt-48 pb-24 px-6 relative overflow-hidden bg-slate-900 text-center rounded-b-[4rem] shadow-xl">
                {/* Glow Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-700 rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2 z-0"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-emerald-500/30">
                        <Scale className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Ketentuan Layanan
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
                        Perjanjian komersial *(Terms of Service)* resmi ini mengklarifikasikan alur pengerjaan dan tanggung jawab yang seimbang antara Soedirman Inovasi Digital dan pihak klien.
                    </p>
                    <span className="inline-block bg-slate-800 text-slate-300 font-medium px-4 py-2 rounded-full text-sm border border-slate-700 shadow-sm">
                        Telah diperbarui: {new Date().toLocaleDateString('id-ID')}
                    </span>
                </div>
            </section>

            {/* DOCUMENT SECTIONS CARDS */}
            <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20 space-y-6">

                {/* Card 1 */}
                <div className="bg-white rounded-[2rem] p-10 md:p-14 border border-slate-100 shadow-lg shadow-slate-200/50">
                    <div className="flex gap-6 items-start">
                        <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                            <FileText className="text-indigo-600 w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">1. Termin Terminologi & SLA</h2>
                            <div className="text-slate-600 space-y-4 leading-relaxed">
                                <p>
                                    Kerja sama desain perangkat lunak *(B2B Web/App Production)* yang dikerjakan resmi dimulai ketika kedua belah pihak sepakat pada draf **Quotation Harga**.
                                </p>
                                <ul className="list-disc pl-5 font-medium space-y-2 mt-4 text-slate-700">
                                    <li>Pembayaran Uang Muka (Down Payment) minimal **50%** diawal pengerjaan.</li>
                                    <li>Pelunasan terminal **50%** harus direalisasikan maksimal **3x24 Hari kerja** pasca uji coba (*testing phase*) selesai dan sebelum produk dinaikkan ke live-server klien (*production*).</li>
                                    <li>Waktu hitung mundur/SLA pengerjaan proyek mengikuti kerumitan level produk sesuai yang tercantum di faktur tagihan (Invoice).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-[2rem] p-10 md:p-14 border border-slate-100 shadow-lg shadow-slate-200/50">
                    <div className="flex gap-6 items-start">
                        <div className="w-14 h-14 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-center shrink-0">
                            <ShieldCheck className="text-sky-600 w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">2. Hak Revisi Klien</h2>
                            <div className="text-slate-600 space-y-4 leading-relaxed">
                                <p>
                                    Soedirman Inovasi Digital adalah entitas pelayanan klien yang fleksibel (*agile*), dan memaklumi perubahan (*change request*) selama pengembangan berjalan:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 mt-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                        <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-blue-500" /> Revisi Minor
                                        </h5>
                                        <p className="text-sm">Anda dibebaskan **maksimal 3 kali balikan revisi kosmetik** (perubahan font, warna tombol, copy text, posisi elemen standar layout).</p>
                                    </div>
                                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                        <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <Scale className="w-4 h-4 text-red-500" /> Revisi Mayor / Struktural
                                        </h5>
                                        <p className="text-sm">Rombakan alur backend logika dan desain UI masif yang di luar dokumen awal (SRS) membutuhkan kontrak jam ekstra yang akan ditagihkan kepada Anda.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-[2rem] p-10 md:p-14 border border-slate-100 shadow-lg shadow-slate-200/50">
                    <div className="flex gap-6 items-start">
                        <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                            <BadgeCheck className="text-emerald-600 w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">3. Klaim Garansi Pascabeli (After-Sales)</h2>
                            <div className="text-slate-600 space-y-4 leading-relaxed">
                                <p>
                                    Perangkat lunak berbasis web maupun mobile rentan terkena kesalahan *runtime* di lingkungan pelanggan *real-world*. Soedirman Inovasi Digital otomatis menjamin kualitas barang dari pihak kami setelah *handover*:
                                </p>
                                <ul className="list-disc pl-5 mt-4 space-y-2 font-medium">
                                    <li><span className="text-slate-900 font-bold">Produk Starter/LP:</span> Memiliki cakupan asuransi *Bug Fixing* hingga **30 Hari**.</li>
                                    <li><span className="text-slate-900 font-bold">Aplikasi Custom & E-Commerce:</span> Dibekali *Complimentary Maintenance* membetulkan kode rusak selama periode pengawasan hingga **3-6 Bulan**.</li>
                                </ul>
                                <div className="bg-yellow-50/50 p-4 border border-yellow-200 text-yellow-800 text-sm mt-4 rounded-xl font-medium">
                                    <strong>🚨 Pelunturan Garansi Mutlak:</strong> Garansi layanan langsung hangus jika tim kami **mendeteksi adanya modifikasi sepihak pihak klien** merusak kodingan basis inti / direktori krusial pada server VPS yang telah kami tutup segelnya.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

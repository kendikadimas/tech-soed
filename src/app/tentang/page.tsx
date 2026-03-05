import React from 'react';
import { ArrowLeft, Rocket, Target, ShieldCheck, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tentang Kami | TechSoed - Software House Purwokerto',
    description: 'Pelajari lebih lanjut tentang TechSoed, software house terkemuka di Purwokerto yang memiliki visi membangun masa depan digital bersama Anda.',
};

export default function TentangPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-32">
            {/* FLOATING NAVBAR */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-sm rounded-full px-6 py-3 w-full max-w-5xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded relative flex items-center justify-center">
                            <div className="w-6 h-6 bg-blue-600 rounded-sm transform rotate-45 relative">
                                <div className="absolute -top-1.5 -left-1.5 w-2 h-2 bg-blue-400 rounded-full"></div>
                                <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-blue-400 rounded-full"></div>
                            </div>
                            <div className="w-3 h-3 bg-white absolute z-10 rounded-sm transform rotate-45"></div>
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-slate-900">TechSoed</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="/#portfolio" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Project</a>
                        <a href="/#harga" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Harga</a>
                        <a href="/#tentang" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Tentang Kami</a>
                        <a href="/#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">FAQ</a>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <a href="/" className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Kembali
                        </a>
                    </div>
                </nav>
            </div>

            {/* HERO SECTION */}
            <section className="pt-48 pb-20 px-6 relative overflow-hidden bg-white text-center rounded-b-[4rem] shadow-sm">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 transform translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-60 transform -translate-x-1/2 translate-y-1/2 z-0"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 bg-blue-100/50 border border-blue-200 px-4 py-1.5 rounded-full mb-8">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Perkenalan Tim</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                        Membangun Massa Depan <br className="hidden md:block" /> Bersama TechSoed
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        Kami bukan sekadar *vendor*, melainkan arsitek digital untuk startup dan entitas bisnis modern yang mendambakan produk perangkat lunak bervisi jangka panjang.
                    </p>
                </div>
            </section>

            {/* BENTO GRID: VISI & MISI */}
            <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Visi */}
                    <div className="md:col-span-2 bg-slate-900 rounded-[2rem] p-10 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 opacity-10 blur-xl">
                            <Target className="w-64 h-64 text-blue-400" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-3xl font-extrabold mb-4">Visi Kami</h3>
                            <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                                Menjadi katalisator transformasi digital nomor satu bagi perusahaan yang ingin mendobrak batasan dan memenangkan pasar persaingan modern melalui desain antarmuka premium dan rekayasa kode yang kuat.
                            </p>
                        </div>
                    </div>

                    {/* Nilai Utama 1 */}
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                            <Rocket className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">Agile & Cepat</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Kami percaya eksekusi cepat dan umpan balik iteratif adalah kunci menciptakan produk sesuai kebutuhan pasar.
                        </p>
                    </div>

                    {/* Misi List */}
                    <div className="md:col-span-3 bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/3">
                            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Misi Perusahaan</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Tiga pilar strategis yang menggerakkan setiap baris kode yang kami produksi.
                            </p>
                        </div>
                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex gap-4">
                                <ShieldCheck className="w-8 h-8 text-blue-500 shrink-0" />
                                <div>
                                    <h5 className="font-bold text-slate-900 text-lg mb-1">Keamanan Utama</h5>
                                    <p className="text-slate-500 text-sm">Menyediakan arsitektur data berskala *enterprise* dengan tingkat keamanan mutlak.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Users className="w-8 h-8 text-blue-500 shrink-0" />
                                <div>
                                    <h5 className="font-bold text-slate-900 text-lg mb-1">Fokus Pengguna</h5>
                                    <p className="text-slate-500 text-sm">Desain empiris *(data-driven)* yang berpusat pada kenyamanan akhir *user* Anda.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

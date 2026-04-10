"use client";

import React from 'react';
import { Rocket, Target, ShieldCheck, Users } from 'lucide-react';
import { SectionTag } from '../components';

export default function TentangPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-32">
            {/* HERO SECTION */}
            <section className="pt-20 pb-20 px-6 relative overflow-hidden bg-white text-center rounded-b-[4rem] shadow-sm">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 transform translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-60 transform -translate-x-1/2 translate-y-1/2 z-0"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <SectionTag text="Perkenalan Tim" />
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                        Membangun Masa Depan <br className="hidden md:block" /> Bersama TechSoe
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

"use client";

import Navbar from "../components/Navbar";
import { Instagram, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen selection:bg-emerald-500/30">
      <Navbar />
      
      <main className="flex-grow w-full">
        {children}
      </main>

      <footer className="bg-black text-white pt-24 pb-12 border-t border-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-8">
              <div className="flex items-center group">
                <div className="relative h-12 w-auto">
                  <img 
                    src="/og-image.jpg" 
                    alt="MindHaven Logo" 
                    className="h-full w-auto object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Platform kesehatan mental digital yang mengintegrasikan kecerdasan buatan untuk menciptakan ruang aman bagi siapa pun, kapan pun.
              </p>
              <div className="flex gap-5">
                <Instagram size={20} className="text-slate-600 hover:text-emerald-500 cursor-pointer transition-all hover:scale-110" />
                <Github size={20} className="text-slate-600 hover:text-emerald-500 cursor-pointer transition-all hover:scale-110" />
                <Twitter size={20} className="text-slate-600 hover:text-emerald-500 cursor-pointer transition-all hover:scale-110" />
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-emerald-500">Menu Navigasi</h4>
              <div className="flex flex-col gap-4 text-sm text-slate-400 font-bold uppercase tracking-widest">
                <Link href="/" className="hover:text-emerald-400 transition-colors">Beranda</Link>
                <Link href="/tentang" className="hover:text-emerald-400 transition-colors">Tentang Kami</Link>
                <Link href="/fitur" className="hover:text-emerald-400 transition-colors">Fitur Platform</Link>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">Hubungi Kami</Link>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-emerald-500">Privasi & Keamanan</h4>
              <div className="flex flex-col gap-4 text-sm text-slate-400 font-bold uppercase tracking-widest">
                <Link href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</Link>
                <Link href="#" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</Link>
                <Link href="/bantuan-profesional" className="text-rose-500 hover:text-rose-400 transition-colors italic">Bantuan Darurat</Link>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-emerald-500">Bantuan Langsung</h4>
              <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-slate-800 flex items-center gap-4 group hover:border-emerald-500/50 transition-all shadow-2xl">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Support</p>
                  <p className="text-xs text-slate-200 font-bold truncate">support@mindhaven.app</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-900/50 flex flex-col md:flex-row justify-between gap-6 items-center">
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">
              © 2026 MindHaven Platform.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">
                System Operational
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
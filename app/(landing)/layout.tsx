"use client";

import Navbar from "../components/Navbar";
import { Heart, Instagram, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow w-full">
        {children}
      </main>

      {/* Footer Pindahan dari Root Layout */}
      <footer className="bg-black text-white pt-24 pb-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Heart className="text-emerald-500" size={24} fill="currentColor" />
                <span className="text-2xl font-black tracking-tighter uppercase">MindHaven</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Inisiatif teknologi dari <strong>AETHER CODE</strong> untuk menciptakan ruang aman bagi kesehatan mental.
              </p>
              <div className="flex gap-4">
                <Instagram size={20} className="text-slate-500 hover:text-emerald-500 cursor-pointer transition-colors" />
                <Github size={20} className="text-slate-500 hover:text-emerald-500 cursor-pointer transition-colors" />
                <Twitter size={20} className="text-slate-500 hover:text-emerald-500 cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-xs uppercase tracking-widest text-emerald-500">Menu</h4>
              <div className="flex flex-col gap-3 text-sm text-slate-400 font-medium">
                <Link href="/" className="hover:text-white transition">Beranda</Link>
                <Link href="/tentang" className="hover:text-white transition">Tentang Kami</Link>
                <Link href="/fitur" className="hover:text-white transition">Fitur Platform</Link>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-xs uppercase tracking-widest text-emerald-500">Legalitas</h4>
              <div className="flex flex-col gap-3 text-sm text-slate-400 font-medium">
                <Link href="#" className="hover:text-white transition">Kebijakan Privasi</Link>
                <Link href="#" className="hover:text-white transition">Syarat Ketentuan</Link>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-xs uppercase tracking-widest text-emerald-500">Hubungi Kami</h4>
              <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 flex items-center gap-3">
                <Mail size={18} className="text-emerald-500" />
                <span className="text-xs text-slate-300">hello@aethercode.com</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between gap-4 items-center">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest">© 2026 MindHaven by AETHER CODE.</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest">Dibuat dengan ❤️ untuk Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
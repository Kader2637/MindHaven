"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ShieldAlert, ChevronRight, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    checkUser();
  }, [pathname]);

  useEffect(() => setIsOpen(false), [pathname]);

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang" },
    { name: "Fitur Platform", href: "/fitur" },
    { name: "Kontak", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled 
        ? "py-3 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm" 
        : "py-5 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between relative">
        
        <div className="lg:hidden flex-1">
          <button 
            onClick={() => setIsOpen(true)} 
            className="w-10 h-10 flex items-center justify-center text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center lg:justify-start flex-[2] lg:flex-1">
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/og-image.jpg" 
                alt="MindHaven Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center justify-center gap-8 flex-[3]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="relative group py-1">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-900"
                }`}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline" 
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-emerald-500 rounded-full" 
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-4 flex-1">
          {!user ? (
            <>
              <Link href="/login" className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">
                Masuk
              </Link>
              <Link href="/register" className="px-5 py-2.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
                Daftar
              </Link>
            </>
          ) : (
            <Link href="/dashboard" className="px-5 py-2.5 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-emerald-700 transition-all shadow-md flex items-center gap-2 group">
              <LayoutDashboard size={14} /> Dashboard
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[150] lg:hidden flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-50">
              <img 
                src="/og-image.jpg" 
                alt="MindHaven Logo" 
                className="h-10 w-auto object-contain"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-900 rounded-2xl active:scale-90 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-2">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6">Menu Utama</p>
              {menuItems.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.name}
                >
                  <Link 
                    href={item.href} 
                    className="flex items-center justify-between py-5 border-b border-slate-50 text-2xl font-black text-slate-900 tracking-tighter uppercase italic group"
                  >
                    {item.name}
                    <ChevronRight size={20} className="text-slate-200" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="p-8 space-y-6 mt-auto">
              <Link href="/panic" className="flex items-center gap-4 p-5 bg-rose-600 text-white rounded-[2rem] shadow-xl shadow-rose-100 group">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <ShieldAlert size={24} className="animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black uppercase tracking-widest">Tombol Panik</span>
                  <span className="text-[10px] opacity-70 font-bold uppercase tracking-wider">Bantuan Darurat</span>
                </div>
              </Link>
              <div className="text-center">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.5em]">MindHaven Digital Platform</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
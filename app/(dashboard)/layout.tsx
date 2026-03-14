"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, MessageCircle, CheckSquare,
  BarChart3, Heart, LogOut, Menu, X, ShieldAlert, User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Konsultasi AI", href: "/chat", icon: <MessageCircle size={20} /> },
    { name: "Tugas Harian", href: "/tasks", icon: <CheckSquare size={20} /> },
    { name: "Statistik Mood", href: "/stats", icon: <BarChart3 size={20} /> },
    { name: "Capsule of Hope", href: "/hope", icon: <Heart size={20} /> },
  ];

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-[#FDFDFD] relative overflow-hidden font-sans text-slate-900">

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-white border-r border-slate-100 flex flex-col transition-transform duration-500 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0 lg:h-full shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-8 pb-10 flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <div className="relative h-14 w-auto transition-transform duration-300 group-hover:scale-105">
              <img
                src="/og-image.jpg"
                alt="MindHaven Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pr-2 scrollbar-hide">
          <p className="px-5 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Menu Utama</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all group ${isActive
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  }`}
              >
                <span className={`${isActive ? "text-emerald-400" : "group-hover:text-emerald-500"} transition-colors`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 space-y-2 shrink-0">
          <Link
            href="/panic"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black bg-rose-600 text-white shadow-xl shadow-rose-100 hover:bg-rose-700 transition-all uppercase tracking-[0.2em]"
          >
            <ShieldAlert size={18} /> Bantuan Darurat
          </Link>

          <div className="mt-4 p-4 bg-slate-50 rounded-[2rem] flex items-center gap-3 border border-slate-100">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm overflow-hidden">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black text-slate-900 uppercase truncate">{userEmail?.split('@')[0] || 'User'}</p>
              <button
                onClick={handleLogout}
                className="text-[9px] font-bold text-rose-500 uppercase tracking-widest hover:underline flex items-center gap-1"
              >
                <LogOut size={10} /> Keluar
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">

        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-50 flex items-center justify-between px-6 md:px-12 shrink-0 z-50">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg">
              <Menu size={20} />
            </button>
          </div>

          <div className="hidden lg:block text-sm font-bold text-slate-400 italic">
            <span className="text-slate-900 tracking-tighter uppercase">MindHaven</span> <span className="mx-2 not-italic text-slate-200">/</span> {menuItems.find(i => i.href === pathname)?.name || "Halaman"}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/panic" className="hidden md:flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100 animate-pulse">
              <ShieldAlert size={14} /> Panic Button
            </Link>
            <div className="h-10 w-[1px] bg-slate-100 mx-2 hidden md:block" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black uppercase leading-none">Status</p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Sistem Aktif</p>
              </div>
              <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scroll-smooth bg-[#FDFDFD]">
          <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>

    </div>
  );
}
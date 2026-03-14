"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ShieldAlert, Phone, MessageCircle, Heart, 
  ArrowLeft, X, ExternalLink, LifeBuoy 
} from "lucide-react";

export default function PanicPage() {
  const [showCallConfirm, setShowCallConfirm] = useState(false);

  const emergencyContacts = [
    { name: "Hotline SEJIWA", phone: "119", desc: "Layanan psikologi resmi dari pemerintah Indonesia.", color: "bg-rose-500" },
    { name: "Halo Kemenkes", phone: "1500567", desc: "Informasi dan bantuan layanan kesehatan darurat.", color: "bg-slate-900" },
  ];

  const groundingSteps = [
    "Sebutkan 5 benda yang kamu lihat sekarang.",
    "Sebutkan 4 benda yang bisa kamu sentuh.",
    "Sebutkan 3 suara yang kamu dengar.",
    "Sebutkan 2 aroma yang kamu cium.",
    "Sebutkan 1 rasa yang kamu rasakan."
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10 pb-24 font-sans">
      
      <header className="flex items-center justify-between">
        <Link href="/dashboard" className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-full text-rose-600">
          <ShieldAlert size={16} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">Pusat Bantuan Krisis</span>
        </div>
      </header>

      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 uppercase italic">
          Kamu Tidak <span className="text-rose-600">Sendiri.</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
          Bernapaslah perlahan. Jika kamu merasa sedang dalam bahaya atau butuh teman bicara profesional segera, silakan gunakan akses di bawah ini.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {emergencyContacts.map((contact, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className={`${contact.color} p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{contact.name}</h3>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">{contact.desc}</p>
              </div>
              <button 
                onClick={() => setShowCallConfirm(true)}
                className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-xl tracking-tighter flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                Hubungi {contact.phone}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-emerald-100 -z-0">
          <LifeBuoy size={120} />
        </div>
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Heart size={20} /></div>
            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic">Teknik Grounding 5-4-3-2-1</h3>
          </div>
          <div className="space-y-4">
            {groundingSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black shrink-0">{i + 1}</span>
                <p className="text-slate-600 font-bold text-sm md:text-base group-hover:text-slate-900 transition-colors">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-slate-50 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white"><MessageCircle size={20} /></div>
          <div>
            <p className="text-xs font-black text-slate-900 uppercase">Butuh teman cerita santai?</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aether AI selalu siap mendengarkan 24/7</p>
          </div>
        </div>
        <Link href="/chat" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all">
          Buka Chat AI
        </Link>
      </footer>

      <AnimatePresence>
        {showCallConfirm && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCallConfirm(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-sm bg-white rounded-[3rem] p-10 text-center shadow-2xl">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6"><Phone size={32} /></div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2 italic">Lakukan Panggilan?</h3>
              <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed italic">Anda akan diarahkan ke layanan panggilan telepon darurat ponsel Anda.</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setShowCallConfirm(false)} className="py-4 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all">Batal</button>
                <a href="tel:119" className="py-4 bg-rose-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-rose-100 hover:bg-rose-700 transition-all flex items-center justify-center">Panggil</a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
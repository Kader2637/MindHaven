"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  MessageCircle, Activity, Wind, Heart, ShieldCheck,
  Brain, Zap, Lock, Sparkles, MoveRight, Clock, Star,
  Smartphone, BarChart3, CloudRain, Sun, ShieldAlert,
  Target, LayoutDashboard, CheckCircle2
} from "lucide-react";

const mainFeatures = [
  {
    title: "Aether AI Therapy (CBT)",
    desc: "Asisten cerdas yang dilatih dengan metode Cognitive Behavioral Therapy untuk membantu mendeteksi distorsi kognitif dan merestrukturisasi pola pikir secara instan.",
    icon: <Brain size={32} />,
    color: "bg-emerald-500",
    bgLight: "bg-emerald-50",
    border: "border-emerald-100"
  },
  {
    title: "Mood Garden Evolution",
    desc: "Visualisasi pertumbuhan mental dalam bentuk taman digital dinamis. Warna dan rimbunnya pohon berubah secara otomatis mengikuti fluktuasi emosimu.",
    icon: <Activity size={32} />,
    color: "bg-teal-500",
    bgLight: "bg-teal-50",
    border: "border-teal-100"
  },
  {
    title: "Interactive 4-7-8 Relax",
    desc: "Mode pernapasan penuh layar yang dirancang untuk meredakan serangan cemas dengan panduan visual orb yang sinkron dengan detak jantung.",
    icon: <Wind size={32} />,
    color: "bg-blue-500",
    bgLight: "bg-blue-50",
    border: "border-blue-100"
  }
];

const subFeatures = [
  {
    title: "Misi Harian Cerdas",
    desc: "Sistem pelacakan tugas otomatis yang memantau kebiasaan self-care harianmu tanpa perlu input manual yang rumit.",
    icon: <Target className="text-emerald-500" />
  },
  {
    title: "Capsule of Hope",
    desc: "Simpan pesan positif saat kamu merasa bahagia dan biarkan sistem membukanya saat kamu berada di titik terendah.",
    icon: <Heart className="text-rose-500" />
  },
  {
    title: "Statistik Pikiran",
    desc: "Analisis mendalam tentang tren interaksi emosionalmu selama 7 hari terakhir untuk pemahaman diri yang lebih baik.",
    icon: <BarChart3 className="text-amber-500" />
  }
];

const technicalSpecs = [
  { title: "End-to-End Encryption", icon: <Lock />, text: "Privasi total untuk setiap curhatan." },
  { title: "Ultra-Low Latency", icon: <Zap />, text: "Respons AI yang sangat cepat dan akurat." },
  { title: "Anonymous Identity", icon: <ShieldCheck />, text: "Keamanan identitas tanpa data pribadi sensitif." },
  { title: "Cross-Device Sync", icon: <Smartphone />, text: "Akses mulus dari perangkat mobile maupun desktop." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.35, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export default function FiturPage() {
  return (
    <div className="bg-[#F8FAF5] text-slate-800 font-sans selection:bg-emerald-200 overflow-x-hidden">

      <section className="relative pt-32 pb-20 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[120px] -z-10"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] -z-10"
        />

        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center space-y-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-emerald-100 text-emerald-800 font-black text-[10px] uppercase tracking-[0.3em] shadow-sm">
              <Sparkles size={14} className="text-emerald-500 animate-pulse" /> Platform MindHaven
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter italic">
              Ekosistem <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Kesehatan Digital.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              MindHaven bukan sekadar aplikasi, melainkan teman perjalanan yang menggabungkan sains psikologi klinis dengan teknologi AI tercanggih.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {mainFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                className={`${feat.bgLight} p-12 rounded-[3.5rem] border ${feat.border} group transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden`}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className={`w-16 h-16 ${feat.color} text-white rounded-[1.5rem] flex items-center justify-center mb-10 shadow-xl transform group-hover:rotate-12 transition-transform`}>
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-5 tracking-tight uppercase italic leading-none">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium mb-10 text-lg opacity-80">{feat.desc}</p>
                <Link href="/register" className="inline-flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                  Aktifkan Fitur <MoveRight size={18} className="text-emerald-600" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#F8FAF5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Sistem Pendukung Aether</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Detail Perawatan <span className="text-emerald-500">Mental.</span></h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {subFeatures.map((sub, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {sub.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">{sub.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{sub.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase italic">
                Teknologi yang <br /> <span className="text-emerald-500 text-6xl md:text-7xl">Melindungi.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg">
                Keamanan data adalah prioritas utama AETHER CODE. Kami memastikan setiap curhatanmu tetap menjadi rahasiamu.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {technicalSpecs.map((spec, i) => (
                <div key={i} className="flex gap-5 p-6 bg-[#F8FAF5] rounded-[2rem] border border-slate-100 hover:border-emerald-200 transition-colors">
                  <div className="text-emerald-600 bg-white w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    {spec.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-[11px] tracking-widest">{spec.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 font-bold">{spec.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:pl-10"
          >
            <div className="bg-slate-900 rounded-[4rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden border-4 border-slate-800">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />
              
              <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
                <div className="flex gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 font-black text-[9px] tracking-[0.4em] uppercase">Security Active</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-5 text-white/50 font-black text-[10px] uppercase tracking-[0.3em] border-b border-white/5 pb-5 group hover:text-white transition-colors">
                  <LayoutDashboard size={18} className="text-emerald-500" /> <span>Dashboard Sync... OK</span>
                </div>
                <div className="flex items-center gap-5 text-white/50 font-black text-[10px] uppercase tracking-[0.3em] border-b border-white/5 pb-5 group hover:text-white transition-colors">
                  <CheckCircle2 size={18} className="text-emerald-500" /> <span>Daily Mission: 100%</span>
                </div>
                <div className="flex items-center gap-5 text-white/50 font-black text-[10px] uppercase tracking-[0.3em] border-b border-white/5 pb-5 group hover:text-white transition-colors">
                  <ShieldAlert size={18} className="text-rose-500" /> <span>Panic Detector: Ready</span>
                </div>
              </div>

              <div className="mt-16">
                <Link href="/login" className="flex items-center justify-center gap-4 w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-3xl hover:bg-emerald-400 transition-all text-sm uppercase tracking-[0.3em] shadow-xl shadow-emerald-900/40">
                  Akses Dashboard <MoveRight />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-rose-600 rounded-[4rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-2xl shadow-rose-200"
          >
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md text-white rounded-[2rem] flex items-center justify-center shrink-0 animate-pulse border border-white/30">
              <ShieldAlert size={48} />
            </div>
            <div className="space-y-5 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">Kondisi Darurat?</h3>
              <p className="text-rose-50 font-medium leading-relaxed opacity-90 text-lg">
                MindHaven menyediakan akses langsung ke hotline profesional nasional tanpa perlu melalui proses pendaftaran. Karena keselamatanmu adalah yang utama.
              </p>
              <Link href="/panic" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-rose-600 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-rose-50 transition-all shadow-xl">
                Buka Panic Button <MoveRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pt-32 bg-emerald-950 text-white rounded-t-[5rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center pb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
              <Heart size={40} className="text-emerald-950" fill="currentColor" />
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
              Pulih Mulai <br /> <span className="text-emerald-400">Hari Ini.</span>
            </h2>
            <p className="text-emerald-100/60 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Bergabunglah bersama ribuan orang lainnya yang telah mempercayakan perjalanan pemulihan mental mereka kepada AETHER MindHaven.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
              <Link href="/register" className="px-12 py-6 bg-emerald-500 text-emerald-950 font-black rounded-full text-lg shadow-2xl hover:bg-emerald-400 transition-all hover:scale-105 duration-300 uppercase tracking-widest">
                Daftar Gratis
              </Link>
              <Link href="/login" className="px-12 py-6 bg-transparent border-2 border-white/20 text-white font-black rounded-full text-lg hover:bg-white/10 transition-all uppercase tracking-widest">
                Masuk Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
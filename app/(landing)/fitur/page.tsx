"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MessageCircle, Activity, Wind, Heart, ShieldCheck, 
  Brain, Zap, Lock, Sparkles, MoveRight, Clock, Star,
  Smartphone, BarChart3, CloudRain, Sun, ShieldAlert
} from "lucide-react";

// ==========================================
// DATA FITUR (Dibuat Padat & Kaya Data)
// ==========================================
const mainFeatures = [
  {
    title: "AI Chat Therapy (CBT)",
    desc: "Bukan sekadar bot. AI kami menggunakan metode Cognitive Behavioral Therapy untuk membantu mendeteksi distorsi kognitif dan memberikan restrukturisasi pikiran secara real-time.",
    icon: <MessageCircle size={32} />,
    color: "bg-emerald-500",
    bgLight: "bg-emerald-50",
    border: "border-emerald-100"
  },
  {
    title: "Mood Garden Tracker",
    desc: "Visualisasikan kesehatan mentalmu dalam bentuk taman digital. Setiap jurnal yang kamu isi membantu tanaman virtualmu tumbuh dan mekar.",
    icon: <Activity size={32} />,
    color: "bg-teal-500",
    bgLight: "bg-teal-50",
    border: "border-teal-100"
  },
  {
    title: "Guided Breathing",
    desc: "Latihan napas interaktif dengan pola 4-7-8 untuk menenangkan sistem saraf parasimpatis saat kamu merasa cemas atau panic attack.",
    icon: <Wind size={32} />,
    color: "bg-blue-500",
    bgLight: "bg-blue-50",
    border: "border-blue-100"
  }
];

const technicalSpecs = [
  { title: "Enkripsi Total", icon: <Lock />, text: "Data curhatan dienkripsi end-to-end." },
  { title: "Respon Kilat", icon: <Zap />, text: "Latensi AI di bawah 1 detik." },
  { title: "Privasi Akun", icon: <ShieldCheck />, text: "Identitas anonim sepenuhnya terjaga." },
  { title: "Multi-Platform", icon: <Smartphone />, text: "Akses lancar dari HP maupun Laptop." },
];

// ==========================================
// ANIMASI
// ==========================================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.35, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export default function FiturPage() {
  return (
    <div className="bg-[#F8FAF5] text-slate-800 font-sans selection:bg-emerald-200 overflow-x-hidden">
      
      {/* 1. HERO SECTION (Visual Padat) */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/50 rounded-full blur-[100px] -z-10" 
        />
        
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center space-y-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 text-emerald-800 font-bold text-sm shadow-sm">
              <Sparkles size={16} className="text-emerald-500" /> Platform Inovatif AETHER CODE
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-black text-slate-900 leading-[1.05] tracking-tighter">
              Fitur Canggih untuk <br/>
              <span className="text-emerald-600">Pikiran yang Tenang.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              Kami menggabungkan algoritma cerdas dengan empati terdalam untuk menciptakan alat bantu kesehatan mental yang bisa diandalkan kapan saja.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. BENTO GRID FEATURES (Tidak Kosong) */}
      <section className="py-24 bg-white border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {mainFeatures.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`${feat.bgLight} p-10 rounded-[2.5rem] border ${feat.border} group transition-all duration-500 shadow-sm hover:shadow-2xl`}
              >
                <div className={`w-16 h-16 ${feat.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-12 transition-transform`}>
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light mb-8 text-lg">{feat.desc}</p>
                <Link href="/register" className="inline-flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                  Coba Sekarang <MoveRight size={20} className="text-emerald-600" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE TECH SECTION (Mengarah ke Login) */}
      <section className="py-24 bg-[#F8FAF5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Kesehatan Mental <br /> Dalam Genggaman.
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {technicalSpecs.map((spec, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors">
                  <div className="text-emerald-500 bg-emerald-50 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    {spec.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{spec.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{spec.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-slate-600 font-light italic border-l-4 border-emerald-500 pl-6">
              &quot;Misi kami di AETHER CODE adalah memastikan teknologi ini dapat diakses oleh siapa saja yang butuh didengarkan, tanpa terkecuali.&quot;
            </p>
          </motion.div>

          {/* Visual Mockup (Alive/Animasi) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
              
              <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-emerald-400 font-mono text-xs tracking-widest uppercase">System Active</div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/40 font-mono text-sm border-b border-white/5 pb-4">
                  <BarChart3 size={18} /> <span>Emotion Analysis... 100%</span>
                </div>
                <div className="flex items-center gap-4 text-emerald-400 font-mono text-sm border-b border-white/5 pb-4">
                  <Sun size={18} /> <span>CBT Reframing: Success</span>
                </div>
                <div className="flex items-center gap-4 text-blue-400 font-mono text-sm border-b border-white/5 pb-4">
                  <CloudRain size={18} /> <span>Stress Level: Decreasing</span>
                </div>
              </div>

              <div className="mt-12">
                <Link href="/login" className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all text-lg">
                  Login untuk Mencoba <MoveRight />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SOS SECTION (Penting) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-red-50 border border-red-100 rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 bg-red-500 text-white rounded-3xl flex items-center justify-center shrink-0 animate-pulse shadow-xl shadow-red-200">
              <ShieldAlert size={40} />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-red-900">Kebutuhan Darurat?</h3>
              <p className="text-red-700/80 font-light leading-relaxed">
                Jika kamu merasa dalam bahaya atau butuh pertolongan profesional segera, MindHaven memiliki daftar hotline bantuan darurat yang bisa kamu akses tanpa perlu login.
              </p>
              <Link href="/bantuan-profesional" className="inline-flex items-center gap-2 text-red-600 font-bold hover:underline">
                Buka Layanan Darurat <MoveRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER CALL TO ACTION (Padat & Menempel) */}
      <section className="pt-24 bg-emerald-950 text-white rounded-t-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center pb-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <Heart size={48} className="mx-auto text-emerald-400" />
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight">Mulai Perjalananmu <br /> Sekarang.</h2>
            <p className="text-emerald-100/70 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Bergabunglah dengan ribuan orang yang telah menemukan ruang aman mereka di MindHaven. Dikembangkan dengan sepenuh hati oleh AETHER CODE.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/register" className="px-10 py-5 bg-emerald-500 text-emerald-950 font-bold rounded-full text-xl shadow-xl hover:bg-emerald-400 transition-all hover:scale-105 duration-300">
                Buat Akun Gratis
              </Link>
              <Link href="/login" className="px-10 py-5 bg-transparent border-2 border-white/20 text-white font-bold rounded-full text-xl hover:bg-white/10 transition-all">
                Masuk ke Akun
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
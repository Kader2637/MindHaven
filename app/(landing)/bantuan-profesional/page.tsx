"use client";

import React from "react";
import { motion, Variants } from "framer-motion"; // <-- 1. Tambahkan impor Variants di sini
import {
  Phone, ShieldAlert, Heart, Info,
  ExternalLink, Siren, Wind, ShieldCheck,
  ArrowRight, MoveRight, CornerDownRight, HelpingHand
} from "lucide-react";
import Link from "next/link";

// ==========================================
// DATA HOTLINE
// ==========================================
const hotlines = [
  {
    name: "Layanan Darurat Nasional",
    number: "112",
    desc: "Akses cepat kepolisian & ambulans (24 Jam).",
    icon: <Siren size={28} />,
    color: "text-rose-600",
    bg: "bg-rose-50"
  },
  {
    name: "LISA pencegahan Bunuh Diri",
    number: "0811-3855-472",
    desc: "Dukungan emosional krisis psikologis (ID/EN).",
    icon: <HelpingHand size={28} />,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    name: "Hotline Kemenkes RI",
    number: "1500-567",
    desc: "Informasi dan konseling kesehatan resmi.",
    icon: <Phone size={28} />,
    color: "text-blue-600",
    bg: "bg-blue-50"
  }
];

const groundingSteps = [
  { id: 5, label: "LIHAT", text: "5 benda fisik di sekitar Anda." },
  { id: 4, label: "SENTUH", text: "4 tekstur berbeda (baju, meja, lantai)." },
  { id: 3, label: "DENGAR", text: "3 suara (angin, detak jam, napas)." },
  { id: 2, label: "CIUM", text: "2 aroma yang menenangkan." },
  { id: 1, label: "RASAKAN", text: "1 hal yang bisa dicicipi." },
];

// <-- 2. Tambahkan tipe : Variants pada objek animasi ini
const fIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const fUpStagger: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function EmergencyPage() {
  return (
    <div className="bg-[#FDFDFD] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">

      {/* ==========================================
          1. HERO SECTION (Light & Clean)
          ========================================= */}
      <section className="relative pt-48 pb-20 px-6 overflow-hidden border-b border-slate-100">
        {/* Visual Soft Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-50 rounded-full blur-[120px] -z-10" />

        <div className="max-w-6xl mx-auto text-center space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm"
          >
            <ShieldAlert size={18} className="text-rose-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Emergency Protocol</span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fIn}
            className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase"
          >
            Akses <br /> <span className="text-emerald-600 font-black">Bantuan.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Jika Anda berada dalam krisis mendesak atau situasi berbahaya, silakan hubungi layanan di bawah ini segera. Data Anda aman.
          </motion.p>
        </div>
      </section>

      {/* ==========================================
          2. HOTLINE BENTO GRID (Light & Minimalist)
          ========================================= */}
      <section className="py-24 px-6 bg-[#F8FAF5]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {hotlines.map((hotline, idx) => (
              <motion.div
                key={idx}
                variants={fUpStagger}
                whileHover={{ y: -10 }}
                className="group bg-white p-10 rounded-[2.5rem] border border-slate-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-full min-h-[380px]"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className={`p-4 rounded-2xl ${hotline.bg} ${hotline.color} group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm`}>
                      {hotline.icon}
                    </div>
                    <CornerDownRight className="text-slate-300" size={24} />
                  </div>

                  <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">{hotline.name}</h3>
                  <p className="text-slate-500 text-lg font-light leading-relaxed">{hotline.desc}</p>
                </div>

                <a
                  href={`tel:${hotline.number}`}
                  className="mt-10 flex items-center justify-between w-full p-6 bg-slate-900 text-white font-black rounded-3xl hover:bg-emerald-600 transition-all duration-300 text-3xl shadow-xl"
                >
                  {hotline.number} <Phone size={28} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          3. GROUNDING ZONE (Clean Soft Style)
          ========================================= */}
      <section className="py-32 px-6 bg-white relative overflow-hidden border-y border-slate-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 -z-10" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-slate-900 uppercase">Teknik <br /> <span className="text-emerald-600">Grounding.</span></h2>
            <p className="text-slate-500 font-light text-xl leading-relaxed">Fokuskan pikiran Anda pada momen saat ini menggunakan teknik 5-4-3-2-1. Ini membantu meredakan serangan panik secara instan.</p>
            <Wind size={40} className="text-emerald-600 animate-pulse" />
          </motion.div>

          <div className="space-y-4">
            {groundingSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 p-6 bg-[#F8FAF5] border border-slate-200 rounded-3xl hover:bg-white hover:border-emerald-500 hover:shadow-lg transition-all"
              >
                <div className="text-4xl font-black text-emerald-500/40">{step.id}</div>
                <div className="text-lg text-slate-700 font-light leading-snug">
                  {step.label && <span className="font-bold text-slate-900 uppercase tracking-widest text-sm bg-slate-200 px-3 py-1 rounded-full mr-3">{step.label}</span>}
                  {step.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. FINAL CTA & DISCLAIMER (Nyambung ke Footer Hitam)
          ========================================= */}
      <section className="bg-black text-white pt-32 pb-24 border-t border-slate-900 relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="max-w-3xl mx-auto"
          >
            <Heart size={48} className="mx-auto text-emerald-400 mb-10" fill="currentColor" />
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white uppercase leading-[0.9]">Anda Berharga.</h2>
            <p className="text-slate-400 text-xl md:text-2xl mb-16 font-light max-w-2xl mx-auto leading-relaxed">
              Tim AETHER CODE berkomitmen penuh untuk mendampingi langkah Anda. Jangan pernah ragu untuk mencari bantuan.
            </p>

            <Link href="/" className="px-12 py-5 bg-white text-slate-950 font-black rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-xl text-xl inline-flex items-center gap-3">
              Kembali ke Beranda <MoveRight size={22} />
            </Link>
          </motion.div>

          <div className="pt-16 border-t border-slate-800 text-left flex flex-col md:flex-row gap-6 items-start opacity-40 hover:opacity-100 transition-opacity">
            <Info className="shrink-0 text-rose-500" size={28} />
            <p className="text-[10px] font-mono font-light text-slate-500 leading-relaxed uppercase tracking-[0.1em]">
              Disclaimer AETHER CODE v1.0: MindHaven adalah alat bantu AI. Ini BUKAN pengganti layanan medis darurat, rumah sakit, atau psikiater profesional. Jika situasi mendesak, segera hubungi 112 atau kunjungi UGD rumah sakit terdekat segera.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
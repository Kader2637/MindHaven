"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  Heart, Shield, Target, Sparkles, Code, MoveRight, 
  Users, Globe2, Activity, ExternalLink, Quote, 
  Cpu, Rocket, Fingerprint
} from "lucide-react";

const teamMembers = [
  { 
    name: "Abdul Kader", 
    role: "Lead Systems Architect", 
    desc: "Bertanggung jawab atas integritas database, enkripsi keamanan, dan orkestrasi logika AI MindHaven agar tetap presisi.", 
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Abdul&backgroundColor=10b981" 
  },
  { 
    name: "Rio Andhika P. P.", 
    role: "Chief Experience Officer", 
    desc: "Penerjemah empati ke dalam baris kode frontend. Memastikan setiap interaksi visual memberikan ketenangan bagi pengguna.", 
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Rio&backgroundColor=0f766e" 
  },
  { 
    name: "Ezequiel Alaghate T.", 
    role: "Fullstack Engineer", 
    desc: "Spesialis fitur esensial. Fokus pada skalabilitas platform dan integrasi modul psikologi klinis ke dalam sistem.", 
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Ezequiel&backgroundColor=047857" 
  },
  { 
    name: "Viktorinus Dimas S.", 
    role: "Strategy & Research", 
    desc: "Menganalisis kebutuhan pasar dan memastikan solusi MindHaven menjawab masalah nyata kesehatan mental di masyarakat.", 
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Viktor&backgroundColor=065f46" 
  },
];

const values = [
  { icon: <Fingerprint size={28} />, title: "Personalitas AI", desc: "AI kami tidak hanya pintar, tapi juga memiliki 'jiwa' untuk memvalidasi perasaanmu secara manusiawi." },
  { icon: <Shield size={28} />, title: "Benteng Privasi", desc: "Data curhatanmu adalah amanah. Kami menggunakan teknologi enkripsi tingkat tinggi yang sulit ditembus." },
  { icon: <Cpu size={28} />, title: "Inovasi Tanpa Henti", desc: "Kami menggabungkan riset psikologi terbaru dengan algoritma AI tercanggih untuk hasil yang akurat." },
  { icon: <Rocket size={28} />, title: "Misi Sosial", desc: "Dibuat oleh AETHER CODE untuk memastikan akses kesehatan mental bukan lagi barang mewah." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.35, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function TentangPage() {
  return (
    <div className="bg-[#F8FAF5] text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
      
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#d1fae5_0%,transparent_70%)] opacity-60" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-10 text-center lg:text-left">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-emerald-100 text-emerald-800 font-black text-[10px] uppercase tracking-[0.4em] shadow-sm">
                <Sparkles size={14} className="text-emerald-500 animate-pulse" /> Manifesto AETHER CODE
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter italic">
                Sains <span className="text-emerald-600">Psikologi</span> <br/>
                Dalam <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Kode.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-xl text-slate-500 leading-relaxed max-w-xl font-medium mx-auto lg:mx-0">
                MindHaven bukan sekadar proyek teknologi. Ia adalah jawaban atas mahalnya biaya kesehatan mental di Indonesia, dibangun dengan dedikasi penuh oleh tim **AETHER CODE**.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/fitur" className="px-10 py-5 bg-slate-900 text-white font-black rounded-full shadow-2xl hover:bg-emerald-600 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3 group">
                  Eksplorasi Teknologi <MoveRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="flex-1 w-full relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-emerald-600 rounded-[3rem] p-10 text-white h-[280px] flex flex-col justify-between shadow-[0_30px_60px_-15px_rgba(16,185,129,0.3)]">
                    <Quote size={40} className="opacity-20" />
                    <div>
                      <div className="text-5xl font-black italic tracking-tighter">100%</div>
                      <div className="text-emerald-100 text-[10px] font-black uppercase tracking-widest mt-2">Privasi Terjamin</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                      <Globe2 size={24} />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Akses Global 24/7</p>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="bg-slate-900 rounded-[3rem] p-10 text-white h-[320px] flex flex-col justify-between shadow-2xl">
                    <Code className="text-emerald-400" size={40} />
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black uppercase italic leading-none">AETHER <br/> CODE</h3>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">Kelompok IT yang berfokus pada pengembangan perangkat lunak dengan dampak sosial nyata bagi kemanusiaan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-4">Nilai Inti Kami</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Pilar Yang Membentuk <span className="text-emerald-500">MindHaven.</span></h3>
          </div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-[#F8FAF5] p-10 rounded-[3rem] border border-slate-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 group">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-600 mb-8 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">{val.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{val.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-[#F8FAF5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-4">Para Arsitek</h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Tim Inti <span className="text-emerald-500">Aether Code.</span></h3>
            </div>
            <Link href="/" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all text-[10px] uppercase tracking-widest shadow-sm">
              Eksosistem Kode <ExternalLink size={16} className="inline ml-2" />
            </Link>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-[2rem] overflow-hidden mx-auto border-4 border-slate-50 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-lg tracking-tighter">{member.name}</h4>
                    <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mt-1">{member.role}</p>
                  </div>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
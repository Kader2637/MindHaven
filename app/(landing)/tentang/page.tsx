"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Shield, Target, Sparkles, Code, MoveRight, Users, Globe2, Activity, ExternalLink } from "lucide-react";

const teamMembers = [
  { name: "Abdul Kader", role: "Fullstack Developer", desc: "Arsitek sistem. Memastikan database, keamanan, dan logika AI MindHaven berjalan mulus.", image: "https://api.dicebear.com/7.x/notionists/svg?seed=Abdul&backgroundColor=10b981" },
  { name: "Rio Andhika P. P.", role: "UI/UX & Frontend", desc: "Mengubah kode rumit menjadi antarmuka visual yang menenangkan dan bersahabat.", image: "https://api.dicebear.com/7.x/notionists/svg?seed=Rio&backgroundColor=0f766e" },
  { name: "Ezequiel Alaghate T.", role: "Core Team", desc: "Berfokus pada pengembangan fitur esensial dan memastikan kualitas produk akhir.", image: "https://api.dicebear.com/7.x/notionists/svg?seed=Ezequiel&backgroundColor=047857" },
  { name: "Viktorinus Dimas S.", role: "Core Team", desc: "Ahli strategi. Memastikan visi MindHaven menjangkau mereka yang membutuhkan.", image: "https://api.dicebear.com/7.x/notionists/svg?seed=Viktor&backgroundColor=065f46" },
];

const values = [
  { icon: <Heart size={24} />, title: "Empati AI", desc: "Logika yang dilatih dengan rasa peduli. Mengutamakan validasi emosional di setiap respons chat." },
  { icon: <Shield size={24} />, title: "Enkripsi Total", desc: "Privasi adalah hak. Seluruh data curhatan dan profil dilindungi enkripsi standar industri." },
  { icon: <Target size={24} />, title: "Akses Inklusif", desc: "Dirancang untuk bekerja optimal di berbagai perangkat dan koneksi internet yang terbatas." },
  { icon: <Activity size={24} />, title: "Berbasis Data", desc: "Setiap intervensi psikologis AI didasarkan pada metode CBT yang teruji secara klinis." },
];

const fadeUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.35, 1] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const blobKeyframes: any = {
  borderRadius: ["50% 50% 50% 50%", "30% 70% 50% 50%", "50% 50% 30% 70%", "50% 50% 50% 50%"]
};

export default function TentangPage() {
  return (
    <div className="bg-[#F8FAF5] text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
      
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)] -z-10" />
        <motion.div animate={blobKeyframes} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 -right-20 w-80 h-80 bg-emerald-100 blur-[80px] -z-20 opacity-50" />
        <motion.div animate={blobKeyframes} transition={{ duration: 18, delay: 1, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-100 blur-[70px] -z-20 opacity-40" />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8 relative z-10 text-center md:text-left">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 text-emerald-800 font-semibold text-sm shadow-sm">
                <Sparkles size={16} className="text-emerald-500 animate-pulse" /> Visi AETHER CODE
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight">
                Membangun <br/>
                <motion.span animate={{ color: ["#10b981", "#0f766e", "#10b981"] }} transition={{ duration: 6, repeat: Infinity }} className="relative inline-block">Ketenangan</motion.span> <br/>
                Lewat Baris Kode.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-slate-600 leading-relaxed max-w-lg font-light mx-auto md:mx-0">
                MindHaven lahir dari sebuah kesadaran: di era digital, biaya psikolog yang mahal tak seharusnya menjadi penghalang untuk didengarkan.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="flex-1 w-full grid grid-cols-2 gap-4 relative z-10">
              <div className="space-y-4">
                <div className="bg-emerald-600 rounded-3xl p-8 text-white h-48 flex flex-col justify-end shadow-xl">
                  <Users className="mb-auto opacity-50" size={32} />
                  <div className="text-4xl font-bold">10k+</div>
                  <div className="text-emerald-100 text-sm">Pengguna Terbantu</div>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-slate-200 h-32 flex items-center shadow-sm">
                  <p className="text-sm text-slate-500 italic">&quot;MindHaven jadi pertolongan pertama saat saya panic attack.&quot;</p>
                </div>
              </div>
              <div className="bg-slate-900 rounded-3xl p-8 text-white h-full flex flex-col justify-between shadow-xl transform translate-y-8">
                <Code className="text-emerald-400" size={32} />
                <div>
                  <h3 className="text-xl font-bold mb-2">AETHER CODE</h3>
                  <p className="text-slate-400 text-sm font-light">Berkomitmen pada teknologi berdampak sosial tinggi.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <motion.div key={idx} variants={fadeUp} whileHover={{ y: -5 }} className="bg-[#F8FAF5] p-8 rounded-3xl border border-emerald-100/50 shadow-sm">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm">{val.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                <p className="text-slate-600 text-sm font-light">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#F8FAF5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Arsitek MindHaven</h2>
              <p className="text-lg text-slate-600 font-light">Tim inti AETHER CODE yang menggabungkan logika algoritma dengan empati.</p>
            </div>
            <Link href="/" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition text-sm">
              Eksosistem Kode <ExternalLink size={16} />
            </Link>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 shrink-0">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{member.name}</h4>
                    <p className="text-emerald-600 text-xs font-bold uppercase mt-1">{member.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm font-light">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-emerald-950 text-white rounded-t-[3rem] relative overflow-hidden">
        <div className="absolute -left-20 bottom-0 w-96 h-96 bg-emerald-500 rounded-full blur-[90px] opacity-10 -z-10" />
        <Globe2 className="absolute top-10 -right-10 w-64 h-64 text-emerald-900 opacity-20 -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-block mb-6">
            <Heart size={32} className="text-emerald-400" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Punya Visi Serupa?</h2>
          <p className="text-emerald-200 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            AETHER CODE selalu terbuka untuk kolaborasi demi menciptakan teknologi yang membawa dampak sosial positif yang terukur.
          </p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-500 text-emerald-950 font-bold rounded-full shadow-xl">
            Hubungi Tim Kami <MoveRight size={22} />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
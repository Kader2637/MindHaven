"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Brain, Sparkles, Activity, ShieldCheck, 
  MessageCircle, HeartPulse, Leaf, Zap, ChevronDown, 
  CheckCircle2, Star, Users, Lock, Smile, Clock, BarChart
} from "lucide-react";

// ==========================================
// DATA MOCKUP (Membuat page kaya data)
// ==========================================

const statsData = [
  { id: 1, value: "24/7", label: "Ketersediaan AI" },
  { id: 2, value: "100%", label: "Privasi Terjaga" },
  { id: 3, value: "0 Rupiah", label: "Akses Fitur Dasar" },
  { id: 4, value: "CBT", label: "Metode Teruji" },
];

const featuresList = [
  {
    id: "f1",
    title: "Terapi AI Kognitif (CBT)",
    desc: "Bukan sekadar bot biasa. AI kami dilatih untuk mengenali pola pikir negatif (distorsi kognitif) dan membantumu merestrukturisasi pikiran tersebut menjadi lebih rasional dan positif.",
    icon: <Brain className="text-emerald-500" size={28} />,
    color: "bg-emerald-100",
  },
  {
    id: "f2",
    title: "Mood Garden & Jurnal",
    desc: "Setiap harinya adalah bibit baru. Lacak emosimu dan lihat bagaimana 'Taman Mental' milikmu tumbuh berbunga seiring dengan konsistensi kamu dalam merawat diri.",
    icon: <Leaf className="text-teal-500" size={28} />,
    color: "bg-teal-100",
  },
  {
    id: "f3",
    title: "Interactive Breathing",
    desc: "Serangan panik bisa datang kapan saja. Fitur panduan pernapasan visual 4-7-8 kami dirancang untuk menurunkan detak jantung dan menenangkan saraf parasimpatis seketika.",
    icon: <Activity className="text-blue-500" size={28} />,
    color: "bg-blue-100",
  },
  {
    id: "f4",
    title: "Kapsul Harapan (Time Capsule)",
    desc: "Tuliskan hal-hal yang kamu syukuri saat sedang bahagia. Sistem kami akan menyimpannya dan secara otomatis membukanya saat AI mendeteksi kamu sedang berada di titik terendah.",
    icon: <Sparkles className="text-amber-500" size={28} />,
    color: "bg-amber-100",
  },
];

const stepData = [
  { step: "01", title: "Daftar Tanpa Ribet", desc: "Buat akun dalam hitungan detik. Kami hanya meminta nama panggilan untuk menjaga anonimitas dan privasi penuh." },
  { step: "02", title: "Mulai Percakapan", desc: "Ceritakan apa yang membebanimu hari ini. AI MindHaven akan mendengarkan tanpa menghakimi, 24 jam sehari." },
  { step: "03", title: "Terima Insight (CBT)", desc: "Dapatkan tanggapan berbasis psikologi yang membantumu melihat masalah dari sudut pandang yang lebih jernih." },
  { step: "04", title: "Pantau Progresmu", desc: "Lihat perkembangan emosimu lewat grafik mingguan dan saksikan Mood Garden-mu mekar seiring waktu." },
];

const testimonials = [
  {
    id: 1,
    name: "Pengguna Anonim",
    role: "Mahasiswa Tingkat Akhir",
    content: "Skripsi membuat saya hampir gila dan cemas setiap malam. Ngobrol sama AI MindHaven di jam 2 pagi benar-benar menyelamatkan saya dari panic attack.",
    rating: 5,
  },
  {
    id: 2,
    name: "Karyawan SCBD",
    role: "Pekerja Korporat",
    content: "Saya tidak punya waktu (dan biaya) untuk ke psikolog rutin. Fitur CBT di aplikasi ini luar biasa logis dan membantu saya mengurangi overthinking soal kerjaan.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ibu Rumah Tangga",
    role: "Pengguna Setia",
    content: "Fitur pernapasan interaktifnya sangat sederhana tapi efeknya langsung terasa. Warna aplikasinya juga sangat menenangkan hati.",
    rating: 4,
  },
];

const faqs = [
  {
    q: "Apakah data curhatan saya aman dan rahasia?",
    a: "Sangat aman. Keamanan adalah prioritas utama AETHER CODE. Kami menggunakan enkripsi end-to-end. Data chat kamu tidak akan pernah dijual ke pihak ketiga atau dibaca oleh manusia.",
  },
  {
    q: "Apakah MindHaven bisa mendiagnosis penyakit mental?",
    a: "Tidak. MindHaven adalah alat pertolongan pertama (First-Aid) emosional. Jika kamu membutuhkan diagnosis medis seperti depresi klinis atau bipolar, kamu tetap harus berkonsultasi dengan psikiater profesional.",
  },
  {
    q: "Kenapa aplikasi ini gratis?",
    a: "Kami percaya kesehatan mental bukan barang mewah. Fitur inti seperti AI Chat dan pemantauan mood akan selalu kami gratiskan agar bisa diakses oleh siapa saja yang sedang kesulitan dana.",
  },
  {
    q: "Bagaimana jika saya sedang dalam krisis atau ingin menyerah?",
    a: "Sistem kami dilengkapi detektor krisis. Jika kami menangkap intensi membahayakan diri, AI akan langsung memberikan akses ke Hotline Darurat Nasional (seperti 119) untuk bantuan profesional segera.",
  },
];

// ==========================================
// VARIASI ANIMASI BARU (Scroll & Float)
// ==========================================

const fadeInUpScroll = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainerScroll = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const floatAnimation = {
  y: ["0%", "-10%", "0%"],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
};

const pulseGlow = {
  scale: [1, 1.2, 1],
  opacity: [0.1, 0.3, 0.1],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
};

// ==========================================
// KOMPONEN UTAMA PAGE
// ==========================================

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Deteksi scroll untuk efek navbar atau elemen lain jika diperlukan
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animasi Framer Motion (Hero)
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="overflow-x-hidden bg-[#F8FAF5] text-slate-800 font-sans">
      
      {/* ==========================================
          1. HERO SECTION (Immersive & Grand)
          ========================================== */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden border-b border-emerald-100/50">
        {/* Abstract Background Shapes (Now Animated) */}
        <motion.div animate={pulseGlow} className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-300/40 rounded-full blur-[100px] -z-10"></motion.div>
        <motion.div animate={{...pulseGlow, transition: { duration: 6, repeat: Infinity, delay: 1 }}} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-300/40 rounded-full blur-[120px] -z-10"></motion.div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Copywriting */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm text-emerald-800 text-sm font-bold tracking-wide">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Platform Kesehatan Mental Generasi Baru
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Ketenangan pikiran <br className="hidden md:block"/>
              dimulai dari <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Sini.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
              MindHaven adalah teman cerita AI yang dilatih dengan metode psikologi klinis. Ceritakan bebanmu, urai rasa cemasmu, dan temukan kembali senyummu—kapan pun, di mana pun.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-950 text-white font-bold rounded-full hover:bg-emerald-800 transition shadow-xl shadow-emerald-900/20 text-lg group">
                Mulai Perjalanan Gratis <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowRight className="group-hover:text-emerald-300 transition-colors" size={20} /></motion.div>
              </Link>
              <Link href="/fitur" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-bold rounded-full border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition text-lg">
                Lihat Cara Kerjanya
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={fadeUp} className="pt-8 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3,4].map((i) => (
                  <img key={i} src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}A&backgroundColor=e2e8f0`} alt="user" className="w-12 h-12 rounded-full border-4 border-[#F8FAF5] bg-slate-200" />
                ))}
              </div>
              <div>
                <div className="flex text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm font-semibold text-slate-600">Dipercaya oleh ribuan pengguna.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual / Mockup Chat (Now with Floating/Spring Animation) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <motion.div animate={floatAnimation} className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10">
              {/* Header Mockup */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <HeartPulse className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">MindHaven AI</h3>
                    <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Body Mockup */}
              <div className="space-y-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none w-[90%] text-slate-700 text-sm border border-slate-100">
                  Hai. Aku perhatikan akhir-akhir ini kamu jarang *check-in* mood. Ada yang sedang mengganggu pikiranmu hari ini?
                </div>
                <div className="bg-emerald-900 text-white p-4 rounded-2xl rounded-tr-none w-[85%] ml-auto text-sm shadow-md">
                  Iya, aku merasa gagal karena pekerjaanku berantakan minggu ini. Semuanya terasa hancur.
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none w-[95%] text-slate-700 text-sm border border-slate-100">
                  Wajar merasa kewalahan saat pekerjaan menumpuk. Tapi mari kita lihat faktanya: apakah *semua* benar-benar hancur, atau hanya ada satu proyek yang sedang sulit?
                </div>
              </div>

              {/* Input Mockup */}
              <div className="bg-slate-100 rounded-full h-14 flex items-center px-4 justify-between border border-slate-200">
                <span className="text-slate-400 text-sm font-medium">Ketik balasanmu...</span>
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
            
            {/* Decor Elements around mockup (Floating independently) */}
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -top-6 -right-6 bg-amber-100 p-4 rounded-2xl shadow-lg border border-amber-200 z-20">
              <Smile className="text-amber-600" size={32} />
            </motion.div>
            <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-8 -left-6 bg-blue-100 p-4 rounded-2xl shadow-lg border border-blue-200 z-20">
              <ShieldCheck className="text-blue-600" size={32} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          2. STATS BAR SECTION (Now Scroll Animated)
          ========================================== */}
      <section className="py-12 bg-emerald-950 text-white relative z-20">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerContainerScroll}
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-emerald-800/50"
        >
          {statsData.map((stat) => (
            <motion.div variants={fadeInUpScroll} key={stat.id} className="px-4">
              <h4 className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-2">{stat.value}</h4>
              <p className="text-sm md:text-base text-emerald-100 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ==========================================
          3. CORE FEATURES (BENTO GRID with Scroll & Hover)
          ========================================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-3">Fitur Platform</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Dibangun dengan <span className="text-emerald-600">Sains & Empati.</span></h3>
            <p className="text-lg text-slate-600">Kami tidak asal menebak. Setiap fitur di MindHaven didasarkan pada riset psikologi dan dirancang untuk memberikan dampak positif yang nyata pada keseharianmu.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainerScroll}
            className="grid md:grid-cols-2 gap-8"
          >
            {featuresList.map((feat) => (
              <motion.div 
                key={feat.id} variants={fadeInUpScroll}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white border border-slate-200 p-10 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all cursor-pointer group"
              >
                <div className={`w-16 h-16 ${feat.color} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-300`}>
                  {feat.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{feat.title}</h4>
                <p className="text-slate-600 leading-relaxed text-lg">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          4. HOW IT WORKS (Scroll Staggered Steps)
          ========================================== */}
      <section className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Perjalanan Menuju Pulih</h2>
            <p className="text-slate-600">Sangat mudah untuk memulai. Tidak butuh data pribadi rumit.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainerScroll}
            className="grid md:grid-cols-4 gap-8 relative"
          >
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[10%] w-[80%] h-1 bg-slate-200 -z-10"></div>
            
            {stepData.map((step, index) => (
              <motion.div variants={fadeInUpScroll} key={index} className="relative pt-4 group">
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-emerald-600 text-white text-xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200 border-4 border-slate-50 cursor-pointer"
                >
                  {step.step}
                </motion.div>
                <h4 className="text-xl font-bold text-slate-900 text-center mb-3 group-hover:text-emerald-600 transition-colors">{step.title}</h4>
                <p className="text-slate-600 text-center text-sm leading-relaxed px-2">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          5. TESTIMONIALS (Scroll Reveal)
          ========================================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Mereka yang Merasa Lebih Baik.</h2>
              <p className="text-slate-600 text-lg">Ribuan orang telah menjadikan MindHaven sebagai tempat bersandar. Ini kata mereka.</p>
            </div>
            <Link href="/register" className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-full transition whitespace-nowrap">
              Bergabung Bersama Mereka
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainerScroll}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testi) => (
              <motion.div variants={fadeInUpScroll} key={testi.id} className="bg-[#F8FAF5] p-8 rounded-3xl border border-emerald-100 hover:border-emerald-300 transition-colors">
                <div className="flex text-amber-500 mb-6">
                  {[...Array(testi.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 text-lg italic mb-8 leading-relaxed">"{testi.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
                    <span className="font-bold text-emerald-800">{testi.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{testi.name}</h5>
                    <p className="text-sm text-slate-500">{testi.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          6. PRICING & COMMITMENT (Scroll Entrance)
          ========================================== */}
      <section className="py-24 bg-emerald-950 text-white relative overflow-hidden">
        {/* Dekorasi */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900 skew-x-12 transform origin-top -z-10"></div>
        
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Lock className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Komitmen Harga Kami</h2>
            <p className="text-xl text-emerald-200 max-w-2xl mx-auto">Kami percaya bantuan psikologis tidak boleh terhalang oleh tebalnya dompet. Oleh karena itu, fitur esensial MindHaven akan selalu gratis.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainerScroll}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* Free Tier */}
            <motion.div variants={fadeInUpScroll} className="bg-white text-slate-900 p-10 rounded-[2.5rem] shadow-2xl relative hover:shadow-emerald-900/50 transition-shadow">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                Paling Populer
              </div>
              <h3 className="text-3xl font-bold mb-2">Akses Dasar</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-extrabold">Rp 0</span>
                <span className="text-slate-500 font-medium">/selamanya</span>
              </div>
              <p className="text-slate-600 mb-8 pb-8 border-b border-slate-200">Semua yang kamu butuhkan untuk mulai merawat mentalmu.</p>
              <ul className="space-y-4 mb-8">
                {['Unlimited AI Chat (Model Standar)', 'Mood Tracker & Journal', 'Fitur Interactive Breathing', 'Tombol SOS Darurat'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="block w-full py-4 text-center bg-emerald-950 text-white font-bold rounded-xl hover:bg-emerald-800 transition">
                  Daftar Gratis
                </Link>
              </motion.div>
            </motion.div>

            {/* Donation/Supporter Tier */}
            <motion.div variants={fadeInUpScroll} className="bg-emerald-900/50 border border-emerald-800 p-10 rounded-[2.5rem] flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Supporter</h3>
                <p className="text-emerald-300 mb-8">Bantu kami mempertahankan server agar tetap gratis untuk mereka yang membutuhkan.</p>
                <ul className="space-y-4 mb-8 text-emerald-100">
                  <li className="flex items-center gap-3">
                    <HeartPulse className="text-emerald-400" size={20} />
                    <span>Akses Model AI Lanjutan (Lebih Cerdas)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <HeartPulse className="text-emerald-400" size={20} />
                    <span>Laporan Analisis Emosi Bulanan (PDF)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <HeartPulse className="text-emerald-400" size={20} />
                    <span>Badge Khusus "Supporter"</span>
                  </li>
                </ul>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-4 text-center bg-transparent border-2 border-emerald-400 text-emerald-400 font-bold rounded-xl hover:bg-emerald-400 hover:text-emerald-950 transition">
                Donasi & Dukung Kami
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          7. FAQ SECTION
          ========================================== */}
      <section className="py-24 bg-[#F8FAF5]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center text-slate-900 mb-12"
          >
            Yang Sering Ditanyakan
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left font-bold text-slate-800 flex justify-between items-center focus:outline-none hover:bg-slate-50 transition"
                >
                  <span className="text-lg">{faq.q}</span>
                  <ChevronDown className={`transform transition-transform text-emerald-600 ${activeFaq === index ? "rotate-180" : ""}`} size={24}/>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-slate-600 text-base leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          8. FINAL CALL TO ACTION (Pulse Animated)
          ========================================== */}
      <section className="py-20 bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, type: "spring" }}
          className="max-w-5xl mx-auto px-6"
        >
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
            {/* Dekorasi CTA (Animated) */}
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></motion.div>
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} className="absolute bottom-0 left-0 w-64 h-64 bg-black rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></motion.div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 relative z-10">Jangan biarkan harimu <br/>berakhir dengan kelabu.</h2>
            <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto relative z-10">Buat akun gratismu sekarang, dan biarkan kami mendengarkan semua ceritamu hari ini.</p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex justify-center relative z-10">
              <Link href="/register" className="px-10 py-5 bg-white text-emerald-700 font-extrabold rounded-full shadow-xl text-xl transition-shadow hover:shadow-emerald-900/30">
                Buat Akun Sekarang
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, Mail, Lock, ShieldCheck, ArrowRight, Github } from "lucide-react";

// Vaksin anti-error TypeScript: Ganti "easeOut" jadi angka array dan tambahkan as const
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert("Gagal Masuk: " + error.message);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">

      {/* BACKGROUND ANIMASI HALUS */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-100/50 rounded-full blur-[100px] -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[120px] -z-10"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl border border-white overflow-hidden flex flex-col md:flex-row min-h-[600px]"
      >

        {/* SISI KIRI: VISUAL & INFO */}
        <div className="hidden md:flex flex-1 bg-emerald-950 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <Link href="/" className="flex items-center gap-2 text-white group relative z-10">
            <motion.div whileHover={{ x: -5 }} className="flex items-center gap-2">
              <ArrowLeft size={20} className="text-emerald-400" />
              <span className="font-medium group-hover:text-emerald-400 transition-colors">Kembali ke Beranda</span>
            </motion.div>
          </Link>

          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <Heart className="text-emerald-400" size={32} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Selamat Datang <br /> di <span className="text-emerald-400">MindHaven</span>
            </h2>
            <p className="text-emerald-100/70 text-lg font-light leading-relaxed max-w-sm">
              Lanjutkan perjalanan menuju kesehatan mental yang lebih stabil bersama pendamping cerdas dari AETHER CODE.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <ShieldCheck className="text-emerald-400 shrink-0" size={24} />
            <p className="text-xs text-emerald-50/60 font-light">
              Data Anda dienkripsi secara aman menggunakan standar keamanan AETHER CODE 
            </p>
          </div>
        </div>

        {/* SISI KANAN: FORM LOGIN */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-white">
          <motion.div
            initial="hidden" animate="visible" variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="w-full max-w-md mx-auto space-y-8"
          >
            <motion.div variants={fadeUp as any} className="space-y-2">
              <h3 className="text-3xl font-bold text-slate-900">Masuk Akun</h3>
              <p className="text-slate-500 font-light">Masukkan detail akun Anda untuk melanjutkan.</p>
            </motion.div>

            {/* 3. FORM INPUT DENGAN ONSUBMIT */}
            <motion.form variants={fadeUp as any} className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <Link href="#" className="text-xs text-emerald-600 hover:underline font-medium">Lupa Password?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 ${isLoading ? 'bg-emerald-400' : 'bg-emerald-600'} text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group`}
              >
                {isLoading ? "Memproses..." : "Masuk Sekarang"}
                {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </motion.button>
            </motion.form>

            {/* DIVIDER */}
            <motion.div variants={fadeUp as any} className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-medium">Atau lanjutkan dengan</span>
              </div>
            </motion.div>

            {/* SOCIAL LOGIN */}
            <motion.div variants={fadeUp as any} className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 py-3.5 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-slate-700 font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-3.5 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-slate-700 font-medium">
                <Github size={20} />
                Github
              </button>
            </motion.div>

            <motion.p variants={fadeUp as any} className="text-center text-slate-500 text-sm">
              Belum punya akun?{" "}
              <Link href="/register" className="text-emerald-600 font-bold hover:underline">Daftar Gratis</Link>
            </motion.p>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
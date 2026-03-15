"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  Heart, ArrowLeft, Mail, Lock,
  User, ShieldCheck, ArrowRight, CheckCircle2
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}`,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      }

    } catch (error: any) {
      alert("Gagal daftar: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">

      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[120px] -z-10" />

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl flex flex-col items-center max-w-sm w-full text-center border border-emerald-100"
            >
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner"
              >
                <CheckCircle2 size={40} />
              </motion.div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Pendaftaran Sukses!</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Akun MindHaven kamu otomatis aktif. Kami sedang menyiapkan ruanganmu...
              </p>
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl border border-white overflow-hidden flex flex-col md:flex-row min-h-[650px]"
      >
        <div className="hidden md:flex flex-1 bg-emerald-950 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

          <Link href="/" className="flex items-center gap-2 text-white group relative z-10">
            <motion.div whileHover={{ x: -5 }} className="flex items-center gap-2">
              <ArrowLeft size={20} className="text-emerald-400" />
              <span className="font-medium group-hover:text-emerald-400 transition-colors">Kembali</span>
            </motion.div>
          </Link>

          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <Heart className="text-emerald-400" size={32} fill="currentColor" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Mulai Perjalanan <br /> <span className="text-emerald-400">Barumu.</span>
            </h2>
            <p className="text-emerald-100/70 text-lg font-light leading-relaxed max-w-sm">
              Bergabunglah dengan komunitas AETHER CODE dan temukan ruang aman untuk kesehatan mentalmu.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <ShieldCheck className="text-emerald-400 shrink-0" size={24} />
            <p className="text-xs text-emerald-50/60 font-light uppercase tracking-widest">
              Private & Secure by Aether System
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-white">
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="w-full max-w-md mx-auto space-y-8"
          >
            <motion.div variants={fadeUp as any} className="space-y-2">
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Daftar Akun</h3>
              <p className="text-slate-500 font-light">Lengkapi data di bawah untuk bergabung.</p>
            </motion.div>

            <motion.form variants={fadeUp as any} className="space-y-4" onSubmit={handleRegister}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input
                    type="text" required value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Aether Code"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Alamat Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input
                    type="password" required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                  />
                </div>
              </div>

              <motion.button
                type="submit" disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-4 ${loading ? 'bg-slate-400' : 'bg-emerald-600'} text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/10 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 mt-4 group`}
              >
                {loading ? "Mendaftarkan..." : "Buat Akun Sekarang"}
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </motion.button>
            </motion.form>

            <motion.div variants={fadeUp as any} className="text-center pt-2">
              <p className="text-slate-500 text-sm">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-emerald-600 font-bold hover:underline tracking-tight">Masuk di sini</Link>
              </p>
            </motion.div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
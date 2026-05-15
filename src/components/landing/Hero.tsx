import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, Wallet, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-accent text-sm font-medium mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            Empowering 50k+ earners worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
          >
            Turn Your Free Time Into <br />
            <span className="text-white">Real Digital Assets</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-400 mb-10 max-w-2xl"
          >
            The world's most trusted micro-tasking platform. Complete offers, take surveys, and earn unlimited rewards with TimeWall technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="/register" className="btn-primary flex items-center gap-2 group text-lg px-8 py-4">
              Start Earning Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg backdrop-blur-sm transition-all flex items-center gap-2">
              <Play className="w-4 h-4 text-brand-accent fill-brand-accent" />
              Watch How It Works
            </button>
          </motion.div>

          {/* Social Proof / Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 w-full"
          >
             <div className="flex flex-col items-center">
                <div className="text-3xl font-bold font-display text-white mb-1">$2.4M+</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">Paid Out</div>
             </div>
             <div className="flex flex-col items-center">
                <div className="text-3xl font-bold font-display text-white mb-1">540k+</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">Tasks Done</div>
             </div>
             <div className="flex flex-col items-center">
                <div className="text-3xl font-bold font-display text-white mb-1">100+</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">Countries</div>
             </div>
             <div className="flex flex-col items-center">
                <div className="text-3xl font-bold font-display text-white mb-1">24/7</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">Support</div>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-[10%] hidden xl:block glass-card p-4 neon-border"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Payment Success</div>
            <div className="text-xs text-slate-400">+ $142.50 to Binance</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-[5%] hidden xl:block glass-card p-4 border-cyan-500/30"
      >
         <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">New Bonus</div>
            <div className="text-xs text-slate-400">+ 500 XP Earned</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

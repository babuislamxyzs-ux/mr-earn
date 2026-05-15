import React from 'react';
import { motion } from 'motion/react';
import { Zap, ExternalLink, ShieldCheck, Clock, Award, Star } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function EarnPage() {
  const { user } = useAuthStore();

  const handleOpenTimeWall = () => {
    if (!user) return;
    // Real-world TimeWall URL construction
    // Typically: https://timewall.io/offers/?user_id={uid}&pub_id={pub_id}
    const pubId = '12345'; // Replace with real pub ID if available
    const url = `https://timewall.io/offers/?user_id=${user.uid}&pub_id=${pubId}`;
    window.open(url, '_blank');
  };

  const handleExploreWall = (name: string) => {
    alert(`${name} Offer Wall integration coming soon! In the meantime, try TimeWall for instant rewards.`);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-display font-bold text-white mb-2">Offer Walls</h2>
           <p className="text-slate-400">Complete tasks and surveys to earn rewards instantly.</p>
        </div>
        <div className="flex items-center gap-3 bg-brand-surface/80 border border-white/5 py-2 px-4 rounded-xl">
           <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
           <span className="text-sm font-bold text-white">Current Multiplier: {1.0 + (user?.level || 1) * 0.05}x</span>
        </div>
      </div>

      {/* Featured Offer Wall */}
      <div className="relative group overflow-hidden rounded-3xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-1">
         <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
         
         <div className="relative bg-brand-surface rounded-[22px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider">
                 Official Partner
               </div>
               <h3 className="text-4xl md:text-5xl font-display font-bold text-white">TimeWall</h3>
               <p className="text-lg text-slate-400 leading-relaxed">
                 Access thousands of high-paying surveys, app installs, and micro-tasks. TimeWall is our most popular partner with the fastest approval rates.
               </p>
               
               <ul className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Clock, text: 'Instant Approval' },
                    { icon: Star, text: 'High Rewards' },
                    { icon: ShieldCheck, text: 'Safe & Secure' },
                    { icon: Award, text: 'XP Bonuses' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <item.icon className="w-4 h-4 text-brand-accent" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </li>
                  ))}
               </ul>

               <button 
                 onClick={handleOpenTimeWall}
                 className="btn-primary flex items-center gap-3 px-10 py-5 text-lg group"
               >
                  Open TimeWall 
                  <ExternalLink className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
               </button>
            </div>

            <div className="w-full md:w-1/3 aspect-square glass-card flex items-center justify-center p-8 border-brand-accent/30 neon-border animate-float">
               <div className="text-center">
                  <Zap className="w-20 h-20 text-brand-accent mb-4 mx-auto drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
                  <p className="text-xl font-bold text-white">UP TO $50</p>
                  <p className="text-sm text-slate-400">per offer completed</p>
               </div>
            </div>
         </div>
      </div>

      {/* Grid of other offer walls */}
      <h3 className="text-xl font-display font-bold text-white mt-12 mb-6">More Offer Walls</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'AdGate Media', desc: 'Best for app installs', color: 'bg-blue-500/20 text-blue-400' },
          { name: 'BitLabs', desc: 'Premium high-paying surveys', color: 'bg-green-500/20 text-green-400' },
          { name: 'OfferToro', desc: 'Global multi-tasking', color: 'bg-red-500/20 text-red-400' },
          { name: 'Lootably', desc: 'Watch videos and earn', color: 'bg-yellow-500/20 text-yellow-400' },
        ].map((wall, i) => (
          <motion.div
            key={wall.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border-white/5 hover:border-brand-primary/30 transition-all group flex flex-col items-center text-center"
          >
            <div className={`w-12 h-12 ${wall.color} rounded-xl flex items-center justify-center mb-4 font-bold text-xl group-hover:scale-110 transition-transform`}>
              {wall.name[0]}
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{wall.name}</h4>
            <p className="text-sm text-slate-400 mb-6">{wall.desc}</p>
            <button 
              onClick={() => handleExploreWall(wall.name)}
              className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white transition-all border border-white/10"
            >
              Explore
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

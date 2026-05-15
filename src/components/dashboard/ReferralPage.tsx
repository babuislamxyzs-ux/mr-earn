import React from 'react';
import { motion } from 'motion/react';
import { Users, Copy, Share2, Award, TrendingUp, DollarSign, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/useAuthStore';

export default function ReferralPage() {
  const { user } = useAuthStore();
  const [copied, setCopied] = React.useState(false);
  const referralCode = user?.referralCode || "LOADING...";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/register?ref=${referralCode}`;
    if (navigator.share) {
      navigator.share({
        title: 'Join TimeWell and Earn Rewards!',
        text: 'I am earning with TimeWell, join now using my referral code!',
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Referral link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-display font-bold text-white mb-2">Affiliate Program</h2>
           <p className="text-slate-400">Invite friends and earn life-time commissions on their activity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Referral Card */}
        <div className="lg:col-span-2 space-y-8">
           <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary to-brand-secondary p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-brand-primary/20">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Users className="w-48 h-48" />
              </div>
              
              <div className="flex-1 relative z-10">
                 <h3 className="text-4xl font-display font-bold text-white mb-4">Earn 10% For Life</h3>
                 <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-md">
                   Get a lifetime commission every time your referred friend completes an offer or survey. No limits on earnings!
                 </p>
                 
                 <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-2 pl-6 flex items-center justify-between border border-white/20">
                      <span className="font-mono text-white font-bold tracking-wider">{referralCode}</span>
                      <button 
                        onClick={handleCopy}
                        className="p-3 bg-white text-brand-primary rounded-xl hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center min-w-[44px]"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    <button 
                      onClick={handleShare}
                      className="px-8 py-4 bg-brand-dark text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-slate-900 transition-all border border-white/10"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                 </div>
              </div>

              <div className="shrink-0 w-48 h-48 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center animate-float relative z-10">
                 <div className="text-center">
                    <DollarSign className="w-12 h-12 text-white mx-auto mb-1" />
                    <p className="text-3xl font-bold text-white tracking-tight">$842</p>
                    <p className="text-[10px] text-white/70 uppercase">Average Bonus</p>
                 </div>
              </div>
           </div>

           {/* Detailed Stats */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Total Referrals', value: '0', icon: Users, color: 'text-brand-accent' },
                { title: 'Commission Earned', value: '$0.00', icon: TrendingUp, color: 'text-green-400' },
                { title: 'Referral XP', value: '0 XP', icon: Award, color: 'text-yellow-400' },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 border-white/5">
                   <div className={`w-10 h-10 bg-white/5 ${stat.color} rounded-lg flex items-center justify-center mb-4 shadow-sm`}>
                     <stat.icon className="w-6 h-6" />
                   </div>
                   <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{stat.title}</p>
                   <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Top Referrers / Tips */}
        <div className="space-y-6">
           <div className="glass-card p-8 border-white/5">
              <h4 className="text-lg font-bold text-white mb-6">Top Referrers</h4>
              <div className="space-y-6">
                {[
                  { name: 'CryptoKing', amount: '$12,450', avatar: 'CK' },
                  { name: 'Sarah_Earns', amount: '$8,200', avatar: 'SE' },
                  { name: 'MikePro', amount: '$5,900', avatar: 'MP' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-xs font-bold text-brand-primary group-hover:scale-110 transition-transform">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{user.name}</p>
                        <p className="text-[10px] text-slate-500">Tier 5 Agent</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-brand-accent">{user.amount}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-400 border border-white/10 transition-all">
                View Full Leaderboard
              </button>
           </div>

           <div className="glass-card p-8 border-white/5 bg-gradient-to-br from-brand-surface to-brand-dark">
              <h4 className="text-lg font-bold text-white mb-4">Growth Tips</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3">
                   <div className="w-5 h-5 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0 text-xs font-bold">1</div>
                   <p>Share on Discord communities and Telegram earning groups.</p>
                </li>
                <li className="flex gap-3">
                   <div className="w-5 h-5 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0 text-xs font-bold">2</div>
                   <p>Create a short YouTube video explaining your earning strategy.</p>
                </li>
                <li className="flex gap-3">
                   <div className="w-5 h-5 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0 text-xs font-bold">3</div>
                   <p>Help your referrals set up their first offer to boost their activity.</p>
                </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}

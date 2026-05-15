import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Gift, Users, Globe, BarChart3 } from 'lucide-react';

const features = [
  {
    title: 'Instant Payouts',
    description: 'Withdraw your earnings instantly to Binance, USDT, Payeer, and many more methods with zero delays.',
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    title: 'Secure Platform',
    description: 'Enterprise-grade encryption and two-factor authentication to keep your assets and data safe.',
    icon: Shield,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    title: 'Referral Rewards',
    description: 'Invite your friends and earn up to 10% commission on all their life-time earnings.',
    icon: Users,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    title: 'Global Tasks',
    description: 'Access thousands of high-paying offers and surveys from around the world, refreshed daily.',
    icon: Globe,
    color: 'text-brand-accent',
    bg: 'bg-brand-accent/10',
  },
  {
    title: 'Experience Levels',
    description: 'Level up your profile to unlock higher reward multipliers and exclusive premium offers.',
    icon: BarChart3,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    title: 'Daily Bonuses',
    description: 'Claim daily rewards, spin the lucky wheel, and participate in challenges for extra cash.',
    icon: Gift,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Built for Serious Earners</h2>
             <p className="text-xl text-slate-400">Everything you need to maximize your earning potential in one powerful, unified dashboard.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
       </div>
    </section>
  );
}

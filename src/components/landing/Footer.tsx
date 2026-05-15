import React from 'react';
import { TrendingUp, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark/50 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center">
                <TrendingUp className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">TIMEWELL</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Join the future of micro-earning. Trusted by thousands, providing the highest rewards in the industry since 2024.
            </p>
            <div className="flex items-center gap-4">
               {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                   <Icon className="w-5 h-5" />
                 </a>
               ))}
            </div>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Platform</h4>
             <ul className="space-y-4 text-slate-400">
               <li><a href="#" className="hover:text-white transition-colors">Earning Dashboard</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Affiliate Program</a></li>
               <li><a href="#" className="hover:text-white transition-colors">XP & Ranks</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Company</h4>
             <ul className="space-y-4 text-slate-400">
               <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Newsletter</h4>
             <p className="text-slate-400 mb-6">Stay updated with latest high-paying offers and platform news.</p>
             <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-primary w-full"
                />
                <button className="btn-primary">Join</button>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Timewell Earn. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

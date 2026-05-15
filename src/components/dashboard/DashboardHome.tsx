import React from 'react';
import { motion } from 'motion/react';
import { 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  Star
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/useAuthStore';
import { formatCurrency } from '../../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', earnings: 45 },
  { name: 'Tue', earnings: 52 },
  { name: 'Wed', earnings: 48 },
  { name: 'Thu', earnings: 70 },
  { name: 'Fri', earnings: 61 },
  { name: 'Sat', earnings: 95 },
  { name: 'Sun', earnings: 110 },
];

const rankData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="glass-card p-6 border-white/5 group hover:border-brand-primary/30 transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl bg-white/5 ${color} shadow-lg`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          trend > 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
        )}>
          {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="text-slate-400 text-sm mb-1">{title}</p>
    <h3 className="text-2xl font-display font-bold text-white">{value}</h3>
  </div>
);

export default function DashboardHome() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      {/* Header Stat Section */}
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Available Balance" value={formatCurrency(user?.balance || 0)} icon={Wallet} trend={12.5} color="text-brand-accent" />
          <StatCard title="Total Earned" value={formatCurrency(user?.totalEarned || 0)} icon={TrendingUp} trend={8.2} color="text-brand-primary" />
          <StatCard title="Pending Reward" value="$0.00" icon={CreditCard} color="text-yellow-400" />
          <StatCard title="Active Referrals" value="0" icon={Users} trend={0} color="text-brand-secondary" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-8 border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Earning Performance</h3>
              <p className="text-sm text-slate-400">Total earnings over the last 7 days</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="earnings" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Level / XP Progress */}
        <div className="glass-card p-8 border-white/5 flex flex-col justify-between">
           <div>
              <h3 className="text-xl font-bold text-white mb-2">Level Progress</h3>
              <div className="flex items-center gap-2 mb-6 text-brand-accent">
                <Star className="w-5 h-5 fill-brand-accent" />
                <span className="font-bold">Level {user?.level || 1} Collector</span>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-400">XP Points</span>
                   <span className="text-white font-bold">{user?.xp || 0} / {(user?.level || 1) * 1000}</span>
                 </div>
                 <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-white/10">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${Math.min(((user?.xp || 0) / ((user?.level || 1) * 1000)) * 100, 100)}%` }}
                     transition={{ duration: 1, ease: 'easeOut' }}
                     className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                   />
                 </div>
                 <p className="text-xs text-slate-500 italic">Level up your rank to unlock higher reward multipliers!</p>
              </div>
           </div>

           <div className="mt-10 pt-10 border-t border-white/5">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                Next Big Challenge
              </h4>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                 <p className="text-sm text-white font-medium mb-1">Complete 5 App Installs</p>
                 <p className="text-xs text-slate-400 mb-3">Earn extra $2.00 + 200 XP</p>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full">
                   <div className="h-full w-2/5 bg-yellow-400 rounded-full" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-card p-8 border-white/5">
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-sm border-b border-white/5">
                <th className="pb-4 font-medium">Task / Offer</th>
                <th className="pb-4 font-medium">Provider</th>
                <th className="pb-4 font-medium">Reward</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { title: 'Download Raid: Shadow Legends', provider: 'AdGate', reward: '+ $12.50', status: 'completed', date: '2 hours ago' },
                { title: 'Complete Survey: Gaming Habits', provider: 'BitLabs', reward: '+ $0.75', status: 'pending', date: '5 hours ago' },
                { title: 'Watch Video Ad', provider: 'TimeWall', reward: '+ $0.05', status: 'completed', date: '1 day ago' },
                { title: 'Sign up for Disney+', provider: 'OfferToro', reward: '+ $5.20', status: 'rejected', date: '2 days ago' },
              ].map((item, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <p className="text-white font-medium">{item.title}</p>
                  </td>
                  <td className="py-4 text-slate-400">{item.provider}</td>
                  <td className="py-4 font-bold text-brand-accent">{item.reward}</td>
                  <td className="py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      item.status === 'completed' ? "bg-green-500/10 text-green-400" :
                      item.status === 'pending' ? "bg-yellow-500/10 text-yellow-400" :
                      "bg-red-500/10 text-red-400"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-right text-slate-500 text-sm">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

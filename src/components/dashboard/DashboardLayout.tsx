import React from 'react';
import { motion } from 'motion/react';
import { 
  NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  Users, 
  TrendingUp, 
  Settings, 
  Bell, 
  Search, 
  LogOut,
  ChevronRight,
  Zap,
  Trophy,
  History
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { logOut } from '../../services/authService';
import { useAuthStore } from '../../store/useAuthStore';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Zap, label: 'Earn Rewards', path: '/earn' },
  { icon: Wallet, label: 'Withdrawal', path: '/withdraw' },
  { icon: Users, label: 'Referrals', path: '/referrals' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const handleLogout = async () => {
    await logOut();
    setUser(null);
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-brand-dark text-slate-200 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-brand-surface border-r border-white/5 transition-all duration-300 flex flex-col z-30",
          isSidebarOpen ? "w-72" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <NavLink to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 shrink-0 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            {isSidebarOpen && <span className="text-xl font-display font-bold text-white uppercase tracking-wider whitespace-nowrap">Timewell</span>}
          </NavLink>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 custom-scrollbar overflow-y-auto">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) => cn(
                "sidebar-link",
                isActive && "active neon-border"
              )}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
           <button 
             onClick={handleLogout}
             className="sidebar-link w-full text-red-400 hover:bg-red-500/5 hover:text-red-300"
           >
             <LogOut className="w-5 h-5 shrink-0" />
             {isSidebarOpen && <span>Logout</span>}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-brand-surface/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
             <div className="relative w-full">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
               <input 
                 type="text" 
                 placeholder="Search offers or tasks..." 
                 className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-primary/50"
               />
             </div>
          </div>

          <div className="flex items-center gap-6">
             <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand-primary rounded-full border-2 border-brand-surface" />
             </button>
             
             <div className="h-8 w-px bg-white/10" />

             <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                   <p className="text-sm font-bold text-white">{user?.displayName}</p>
                   <p className="text-xs text-brand-accent">Level {user?.level || 1} Collector</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 border border-brand-primary/50 flex items-center justify-center text-brand-primary font-bold overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    user?.displayName?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
            <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-brand-primary/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-brand-secondary/5 blur-[120px] rounded-full" />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Menu, X, Wallet, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-brand-dark/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            TIMEWELL
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it Works', 'Payouts', 'Reviews'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="h-4 w-px bg-white/10" />
          <Link to="/login" className="text-sm font-medium text-white hover:text-brand-accent transition-colors">
            Login
          </Link>
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-brand-surface border-b border-white/5 p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
             {['Features', 'How it Works', 'Payouts', 'Reviews'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-lg font-medium text-slate-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <hr className="border-white/5" />
            <Link 
              to="/login" 
              className="w-full py-3 text-slate-300 font-medium text-center hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="btn-primary w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

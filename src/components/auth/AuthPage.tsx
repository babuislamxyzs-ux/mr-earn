import React from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Github, Chrome, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { loginWithEmail, registerWithEmail, signInWithGoogle } from '../../services/authService';

interface AuthPageProps {
  mode: 'login' | 'register';
}

export default function AuthPage({ mode }: AuthPageProps) {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name);
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Auth Error:', err);
      let msg = err.message || 'Authentication failed';
      if (err.code === 'auth/operation-not-allowed') {
        msg = 'Email/Password login is not enabled in Firebase Console. Please enable it in the "Sign-in method" tab.';
      } else if (err.code === 'auth/unauthorized-domain') {
        msg = 'This domain is not authorized in Firebase Auth settings. Please add your current URL to the "Authorized domains" list.';
      } else if (err.code === 'auth/popup-blocked') {
        msg = 'Popup was blocked by your browser. Please allow popups for this site or try Email login.';
      } else if (err.message?.includes('Missing or insufficient permissions')) {
        msg = 'Account created in Auth, but failed to create profile in Firestore. Check your Security Rules.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      let msg = err.message || 'Google Auth failed';
      if (err.code === 'auth/unauthorized-domain') {
        msg = 'Authorized domain error. Please add this domain to Firebase Console Authentication settings.';
      } else if (err.code === 'auth/popup-blocked') {
        msg = 'Google login popup was blocked. Please allow popups.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-secondary/10 blur-[150px] rounded-full" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-8">
           <div className="w-16 h-16 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-primary/40">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-display font-bold tracking-tight text-white">
          {isLogin ? 'Welcome Back' : 'Join Timewell Earn'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <Link to={isLogin ? "/register" : "/login"} className="font-medium text-brand-accent hover:text-brand-accent/80 transition-colors">
            {isLogin ? 'Create one for free' : 'Sign in here'}
          </Link>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="glass-card py-8 px-4 sm:px-10 border-white/5">
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 bg-white/5 border-white/10 rounded text-brand-primary focus:ring-brand-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-brand-accent hover:text-brand-accent/80">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-brand-surface text-slate-500 rounded-lg">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={handleGoogle}
                disabled={loading}
                className="w-full inline-flex justify-center py-2.5 px-4 glass-card border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                <Chrome className="w-5 h-5" />
              </button>
              <button 
                disabled={loading}
                className="w-full inline-flex justify-center py-2.5 px-4 glass-card border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

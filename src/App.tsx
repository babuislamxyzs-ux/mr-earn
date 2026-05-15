/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import Footer from './components/landing/Footer';
import AuthPage from './components/auth/AuthPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import EarnPage from './components/dashboard/EarnPage';
import WithdrawPage from './components/dashboard/WithdrawPage';
import ReferralPage from './components/dashboard/ReferralPage';
import { subscribeToAuth, getUserProfile } from './services/authService';
import { useAuthStore } from './store/useAuthStore';

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, initialized } = useAuthStore();

  if (!initialized || loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const { setUser, setLoading, setInitialized } = useAuthStore();

  React.useEffect(() => {
    const unsub = subscribeToAuth(async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          let profile = await getUserProfile(firebaseUser.uid);
          
          // If profile doesn't exist yet, it's either a new user or there's a lag.
          // Wait a bit and retry once before giving up
          if (!profile) {
            await new Promise(resolve => setTimeout(resolve, 1500));
            profile = await getUserProfile(firebaseUser.uid);
          }

          setUser(profile);
        } catch (error) {
          console.error('Error fetching profile:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
      setInitialized(true);
    });

    return () => unsub();
  }, [setUser, setLoading, setInitialized]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute children={<DashboardLayout children={<DashboardHome />} />} />} 
        />
        <Route 
          path="/earn" 
          element={<ProtectedRoute children={<DashboardLayout children={<EarnPage />} />} />} 
        />
        <Route 
          path="/withdraw" 
          element={<ProtectedRoute children={<DashboardLayout children={<WithdrawPage />} />} />} 
        />
        <Route 
          path="/referrals" 
          element={<ProtectedRoute children={<DashboardLayout children={<ReferralPage />} />} />} 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

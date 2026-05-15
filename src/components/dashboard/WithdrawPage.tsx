import React from 'react';
import { motion } from 'motion/react';
import { Wallet, CreditCard, Send, History, AlertCircle, Info, Loader2 } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { useAuthStore } from '../../store/useAuthStore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const methods = [
  { id: 'binance', name: 'Binance', fee: '1%', min: 5, icon: Send, color: 'bg-yellow-500/10 text-yellow-500' },
  { id: 'usdt', name: 'USDT TRC20', fee: '$1.00', min: 10, icon: Wallet, color: 'bg-green-500/10 text-green-500' },
  { id: 'payeer', name: 'Payeer', fee: '2%', min: 1, icon: CreditCard, color: 'bg-blue-500/10 text-blue-500' },
  { id: 'bkash', name: 'bKash / Nagad', fee: '1.5%', min: 2, icon: Send, color: 'bg-pink-500/10 text-pink-500' },
];

export default function WithdrawPage() {
  const { user } = useAuthStore();
  const [selectedMethod, setSelectedMethod] = React.useState(methods[0].id);
  const [amount, setAmount] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const currentMethod = methods.find(m => m.id === selectedMethod);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    const val = parseFloat(amount);
    if (isNaN(val) || val < (currentMethod?.min || 0)) {
      setError(`Minimum withdrawal for this method is $${currentMethod?.min}`);
      return;
    }

    if (val > (user.balance || 0)) {
      setError('Insufficient balance');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await addDoc(collection(db, 'withdrawals'), {
        userId: user.uid,
        amount: val,
        method: selectedMethod,
        details: address,
        status: 'pending',
        timestamp: Date.now(),
      });
      setSuccess('Withdrawal request submitted successfully! It will be processed within 24 hours.');
      setAmount('');
      setAddress('');
    } catch (err: any) {
      handleFirestoreError(err, OperationType.CREATE, 'withdrawals');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl pb-10">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">Withdraw Funds</h2>
            <p className="text-slate-400">Cache out your earnings securely to your preferred wallet.</p>
         </div>
         <div className="text-right">
            <p className="text-sm text-slate-500 mb-1 uppercase tracking-widest">Available Balance</p>
            <p className="text-3xl font-display font-bold text-brand-accent">{formatCurrency(user?.balance || 0)}</p>
         </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-3">
          <ShieldCheck className="w-5 h-5" />
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Method Selection */}
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {methods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "glass-card p-4 flex flex-col items-center text-center gap-3 transition-all border-white/5",
                    selectedMethod === method.id ? "bg-white/10 ring-2 ring-brand-primary border-transparent" : "hover:bg-white/5"
                  )}
                >
                  <div className={`p-3 rounded-xl ${method.color}`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-white">{method.name}</span>
                </button>
              ))}
           </div>

           {/* Withdraw Form */}
           <div className="glass-card p-8 border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Payment Details</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Withdrawal Amount ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary"
                    />
                    <div className="flex justify-between mt-2 px-1">
                      <span className="text-[10px] text-slate-500">Min: ${currentMethod?.min}.00</span>
                      <button 
                        type="button" 
                        onClick={() => setAmount((user?.balance || 0).toString())}
                        className="text-[10px] text-brand-accent font-bold hover:underline"
                      >
                        MAX BALANCE
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Recipient Address / ID</label>
                    <input 
                      type="text" 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Binance Pay ID or USDT Address" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex gap-3">
                   <Info className="w-5 h-5 text-brand-primary shrink-0" />
                   <p className="text-sm text-slate-300">
                     Withdrawals are processed within 24 hours. A network fee of <span className="font-bold text-white">{currentMethod?.fee}</span> will be applied to this transaction.
                   </p>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm Withdrawal'}
                </button>
              </form>
           </div>
        </div>

        {/* Info & Side History */}
        <div className="space-y-6">
           <div className="glass-card p-6 border-white/5">
              <div className="flex items-center gap-2 text-yellow-400 mb-4">
                 <AlertCircle className="w-5 h-5" />
                 <h4 className="font-bold">Important</h4>
              </div>
              <ul className="space-y-3 text-sm text-slate-400 leading-relaxed">
                 <li>• Double-check your wallet address. Lost funds cannot be recovered.</li>
                 <li>• Ensure your chosen method supports the network (e.g., USDT on TRC20).</li>
                 <li>• Daily withdrawal limit is $1,000 for your current level.</li>
              </ul>
           </div>

           <div className="glass-card p-6 border-white/5">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <History className="w-4 h-4 text-brand-accent" />
                Recent Withdrawals
              </h4>
              <div className="space-y-4">
                 {[
                   { amount: '$150.00', status: 'completed', date: 'Oct 24', icon: Send },
                   { amount: '$45.00', status: 'pending', date: 'Oct 28', icon: Wallet },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg">
                          <item.icon className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{item.amount}</p>
                          <p className="text-[10px] text-slate-500 uppercase">{item.date}</p>
                        </div>
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold uppercase",
                        item.status === 'completed' ? "text-green-500" : "text-yellow-500"
                      )}>
                        {item.status}
                      </span>
                   </div>
                 ))}
                 <button className="w-full text-center text-xs text-brand-accent hover:underline font-bold mt-2">View Full History</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

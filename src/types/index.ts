export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

export enum WithdrawStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  balance: number;
  totalEarned: number;
  referralCode: string;
  referredBy?: string;
  xp: number;
  level: number;
  country?: string;
  createdAt: number;
  lastLogin: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earn' | 'withdraw' | 'bonus' | 'referral';
  description: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
}

export interface Task {
  id: string;
  userId: string;
  offerId: string;
  provider: string;
  title: string;
  reward: number;
  status: TaskStatus;
  completedAt: number;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  method: string;
  details: string;
  status: WithdrawStatus;
  timestamp: number;
  fee: number;
  netAmount: number;
}

export interface Stats {
  totalUsers: number;
  totalEarnings: number;
  totalWithdrawals: number;
  activeTasks: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

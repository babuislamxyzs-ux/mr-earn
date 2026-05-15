import { create } from 'zustand';
import { Stats, Notification } from '../types';

interface DashboardState {
  stats: Stats | null;
  notifications: Notification[];
  setStats: (stats: Stats) => void;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  notifications: [],
  setStats: (stats) => set({ stats }),
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
}));

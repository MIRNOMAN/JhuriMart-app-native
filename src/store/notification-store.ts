import { create } from 'zustand';
type NotificationSettings = { payment: boolean; tracking: boolean; completeOrder: boolean; notification: boolean };
type NotificationState = NotificationSettings & { toggle: (key: keyof NotificationSettings) => void };
export const useNotificationStore = create<NotificationState>((set) => ({ payment: true, tracking: true, completeOrder: true, notification: true, toggle: (key) => set((state) => ({ [key]: !state[key] })) }));

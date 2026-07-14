import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthState = {
  hasOnboarded: boolean;
  authenticated: boolean;
  setOnboarded: () => void;
  signIn: () => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>()(persist((set) => ({
  hasOnboarded: false,
  authenticated: false,
  setOnboarded: () => set({ hasOnboarded: true }),
  signIn: () => set({ authenticated: true, hasOnboarded: true }),
  signOut: () => set({ authenticated: false }),
}), { name: 'kutuku-auth', storage: createJSONStorage(() => AsyncStorage) }));

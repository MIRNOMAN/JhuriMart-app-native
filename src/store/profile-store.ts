import { create } from 'zustand';
type Profile = { name: string; email: string; language: string };
type ProfileState = Profile & { update: (profile: Partial<Profile>) => void };
export const useProfileStore = create<ProfileState>((set) => ({ name: 'Magdalena Succrose', email: 'magdalena83@gmail.com', language: 'English', update: (profile) => set(profile) }));

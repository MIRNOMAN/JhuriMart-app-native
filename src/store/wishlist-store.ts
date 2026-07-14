import { create } from 'zustand';
type WishlistState = { ids: string[]; toggle: (id: string) => void; contains: (id: string) => boolean };
export const useWishlistStore = create<WishlistState>((set, get) => ({ ids: ['headphone-234', 'box-bag-892', 'big-bignan-283', 'merizq-kiles'], toggle: (id) => set(({ ids }) => ({ ids: ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id] })), contains: (id) => get().ids.includes(id) }));

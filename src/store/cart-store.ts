import { create } from 'zustand';

export type CartItem = { id: string; name: string; color: string; price: number; quantity: number; selected: boolean };
type CartState = { items: CartItem[]; add: (item: Omit<CartItem, 'quantity' | 'selected'>) => void; remove: (id: string) => void; changeQuantity: (id: string, by: number) => void; toggle: (id: string) => void; clear: () => void };

const initialItems: CartItem[] = [
  { id: 'box-bignan-992', name: 'Bix Bag Limited Edition 229', color: 'Brown', price: 67, quantity: 1, selected: true },
  { id: 'headphone-234', name: 'Box Headphone 132', color: 'Brown', price: 26, quantity: 1, selected: true },
  { id: 'merizq-kiles', name: 'Box Headphone 345', color: 'Pink', price: 32, quantity: 1, selected: false },
  { id: 'bog-bag-223', name: 'Bix Bag 319', color: 'Brown', price: 24, quantity: 1, selected: false },
];

export const useCartStore = create<CartState>((set) => ({
  items: initialItems,
  add: (item) => set((state) => ({ items: state.items.some(({ id }) => id === item.id) ? state.items.map((current) => current.id === item.id ? { ...current, quantity: current.quantity + 1, selected: true } : current) : [...state.items, { ...item, quantity: 1, selected: true }] })),
  remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  changeQuantity: (id, by) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + by) } : item) })),
  toggle: (id) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, selected: !item.selected } : item) })),
  clear: () => set({ items: [] }),
}));

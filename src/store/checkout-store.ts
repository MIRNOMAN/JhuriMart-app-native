import { create } from 'zustand';

export type PaymentMethod = 'mastercard' | 'paypal';
type CheckoutState = { address: string; city: string; payment: PaymentMethod; cardLast4: string; setAddress: (address: string, city: string) => void; setPayment: (payment: PaymentMethod) => void; setCard: (last4: string) => void };
export const useCheckoutStore = create<CheckoutState>((set) => ({ address: '5482 Abode Falls Rd #155n', city: 'Diego, California (CA), 92120', payment: 'mastercard', cardLast4: '1234', setAddress: (address, city) => set({ address, city }), setPayment: (payment) => set({ payment }), setCard: (cardLast4) => set({ cardLast4, payment: 'mastercard' }) }));

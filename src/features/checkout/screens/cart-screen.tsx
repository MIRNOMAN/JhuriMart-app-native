import { router, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/ui/app-button';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { useCartStore } from '@/store/cart-store';
import { CartRow } from '../components/cart-row';

export function CartScreen({ variant = 'selectable' }: { variant?: 'selectable' | 'removable' }) {
  const items = useCartStore((state) => state.items);
  const selected = items.filter((item) => item.selected);
  const subtotal = selected.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = selected.length ? 6 : 0;
  return <AppScreen padded={false}><View style={styles.headerPad}><AppHeader title="My Cart" right={<Pressable onPress={() => router.replace((variant === 'selectable' ? '/cart-v2' : '/cart') as Href)}><Ionicons name="bag-handle-outline" size={19} /></Pressable>} /></View><ScrollView contentContainerStyle={styles.content}>{items.length ? items.map((item) => <CartRow key={item.id} item={item} selectable={variant === 'selectable'} removable={variant === 'removable'} />) : <View style={styles.empty}><Ionicons name="bag-outline" size={44} color={theme.colors.subtle} /><AppText variant="subtitle">Your cart is empty</AppText></View>}<View style={styles.summary}><Pressable style={styles.promo}><Ionicons name="pricetag-outline" color={theme.colors.subtle} /><AppText variant="caption" color={theme.colors.muted} style={{ flex: 1 }}>Enter your promo code</AppText><Ionicons name="chevron-forward" color={theme.colors.subtle} /></Pressable><SummaryRow label="Subtotal" value={subtotal} /><SummaryRow label="Shipping" value={shipping} /><View style={styles.dash} /><SummaryRow label="Total amount" value={subtotal + shipping} strong /></View></ScrollView><View style={styles.bottom}><AppButton label="Checkout" disabled={!selected.length} onPress={() => router.push('/checkout' as Href)} /></View></AppScreen>;
}
function SummaryRow({ label, value, strong }: { label: string; value: number; strong?: boolean }) { return <View style={styles.row}><AppText variant={strong ? 'label' : 'caption'} color={strong ? theme.colors.ink : theme.colors.body}>{label}</AppText><AppText variant={strong ? 'subtitle' : 'label'}>${value.toFixed(2)}</AppText></View>; }
const styles = StyleSheet.create({ headerPad: { paddingHorizontal: 12 }, content: { paddingHorizontal: 12, paddingBottom: 190 }, empty: { height: 280, alignItems: 'center', justifyContent: 'center', gap: 12 }, summary: { marginTop: 18, gap: 13 }, promo: { height: 44, borderRadius: theme.radius.md, backgroundColor: theme.colors.surface, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 13 }, row: { flexDirection: 'row', justifyContent: 'space-between' }, dash: { borderTopWidth: 1, borderStyle: 'dashed', borderColor: theme.colors.lineStrong }, bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: theme.colors.white, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 18 } });

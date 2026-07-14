import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';

import { AppButton } from '@/components/ui/app-button';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { useCartStore } from '@/store/cart-store';
import { useCheckoutStore } from '@/store/checkout-store';
import { CartRow } from '../components/cart-row';

export function CheckoutScreen() {
  const items = useCartStore((state) => state.items.filter((item) => item.selected));
  const { address, city, payment, cardLast4 } = useCheckoutStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 6;
  return <AppScreen padded={false}><View style={styles.header}><AppHeader title="Payment" /></View><ScrollView contentContainerStyle={styles.content}><SectionHeading title="Address" action="Edit" onPress={() => router.push('/address' as Href)} /><Pressable style={styles.address} onPress={() => router.push('/address' as Href)}><View style={styles.map}><Ionicons name="location" color={theme.colors.danger} size={20} /></View><View><AppText variant="label">House</AppText><AppText variant="caption" color={theme.colors.muted}>{address}{`\n`}{city}</AppText></View></Pressable><AppText variant="subtitle" style={styles.section}>Products ({items.length})</AppText>{items.map((item) => <CartRow key={item.id} item={item} selectable={false} compact />)}<AppText variant="subtitle" style={styles.section}>Payment Method</AppText><Pressable style={styles.payment} onPress={() => router.push('/payment-methods' as Href)}><View style={styles.master}>{payment === 'mastercard' ? '🔴' : 'P'}</View><View style={{ flex: 1 }}><AppText variant="label">{payment === 'mastercard' ? 'Master Card' : 'Paypal'}</AppText><AppText variant="caption" color={theme.colors.muted}>{payment === 'mastercard' ? `•••• •••• ${cardLast4}` : 'example@gmail.com'}</AppText></View><Ionicons name="chevron-forward" color={theme.colors.subtle} /></Pressable><View style={styles.total}><AppText variant="caption" color={theme.colors.muted}>Total amount</AppText><AppText variant="subtitle">${total.toFixed(2)}</AppText></View></ScrollView><View style={styles.bottom}><AppButton label="Checkout Now" onPress={() => router.push('/payment-success' as Href)} /></View></AppScreen>;
}
function SectionHeading({ title, action, onPress }: { title: string; action: string; onPress: () => void }) { return <View style={styles.heading}><AppText variant="subtitle">{title}</AppText><Pressable onPress={onPress}><AppText variant="caption" color={theme.colors.violet}>{action}</AppText></Pressable></View>; }
const styles = StyleSheet.create({ header: { paddingHorizontal: 12 }, content: { paddingHorizontal: 16, paddingBottom: 110 }, heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }, address: { minHeight: 82, flexDirection: 'row', alignItems: 'center', gap: 12 }, map: { width: 73, height: 58, borderRadius: theme.radius.sm, backgroundColor: theme.colors.coolSurface, alignItems: 'center', justifyContent: 'center' }, section: { marginTop: 14, marginBottom: 6 }, payment: { height: 67, borderWidth: 1, borderColor: theme.colors.lineStrong, borderRadius: theme.radius.md, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12 }, master: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.surface, alignItems: 'center', justifyContent: 'center' }, total: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }, bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, backgroundColor: theme.colors.white } });

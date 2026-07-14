import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';

import { AppButton } from '@/components/ui/app-button';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';

export function PaymentSuccessScreen() {
  return <AppScreen padded={false}><View style={styles.dim}><View style={styles.header}><AppHeader title="Payment" /></View><AppText variant="subtitle">Address</AppText><View style={styles.fake} /><AppText variant="subtitle">Products (3)</AppText><View style={styles.fakeLarge} /></View><View style={styles.sheet}><View style={styles.handle} /><View style={styles.illustration}><Ionicons name="bag-check-outline" size={70} color={theme.colors.violet} /></View><AppText variant="title">Order Successfully</AppText><AppText variant="caption" color={theme.colors.muted} align="center">Your order will be packed by the clerk, will{`\n`}arrive at your house in 3–4 days</AppText><AppButton label="Order Tracking" onPress={() => router.replace('/order-tracking' as Href)} /><Pressable onPress={() => router.replace('/(tabs)' as Href)}><AppText variant="label" color={theme.colors.violet}>Back to Homepage</AppText></Pressable></View></AppScreen>;
}
const styles = StyleSheet.create({ dim: { flex: 1, padding: 16, gap: 12, opacity: 0.32 }, header: { marginHorizontal: -4 }, fake: { height: 70, backgroundColor: theme.colors.surface, borderRadius: 12 }, fakeLarge: { height: 180, backgroundColor: theme.colors.surface, borderRadius: 12 }, sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, minHeight: 390, padding: 16, paddingBottom: 24, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: theme.colors.white, alignItems: 'center', gap: 13, ...theme.shadow.sheet }, handle: { width: 52, height: 4, borderRadius: 2, backgroundColor: theme.colors.lineStrong }, illustration: { width: 150, height: 150, borderRadius: 75, backgroundColor: theme.colors.violetSoft, alignItems: 'center', justifyContent: 'center', marginTop: 10 } });

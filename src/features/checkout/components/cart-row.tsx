import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { useCartStore, type CartItem } from '@/store/cart-store';
import { products } from '@/features/catalog/data/catalog';

type CartRowProps = { item: CartItem; selectable?: boolean; removable?: boolean; compact?: boolean };
/** Shared cart/order line with selection, quantity, and removal variants. */
export function CartRow({ item, selectable = true, removable, compact }: CartRowProps) {
  const product = products.find(({ id }) => id === item.id) ?? products[0];
  const toggle = useCartStore((state) => state.toggle);
  const remove = useCartStore((state) => state.remove);
  const change = useCartStore((state) => state.changeQuantity);
  return <View style={[styles.root, compact && styles.compact]}>{selectable ? <Pressable onPress={() => toggle(item.id)} style={[styles.checkbox, item.selected && styles.checked]}>{item.selected ? <Ionicons name="checkmark" size={10} color="white" /> : null}</Pressable> : null}<Image source={product.image} style={[styles.image, compact && styles.compactImage]} contentFit="cover" /><View style={styles.copy}><AppText variant="label" numberOfLines={1}>{item.name}</AppText><AppText variant="caption" color={theme.colors.muted}>Color: {item.color}</AppText>{compact ? null : <View style={styles.stepper}><Pressable onPress={() => change(item.id, -1)}><Ionicons name="remove" size={12} /></Pressable><AppText variant="caption">{item.quantity}</AppText><Pressable onPress={() => change(item.id, 1)}><Ionicons name="add" size={12} /></Pressable></View>}</View><AppText variant="subtitle">${(item.price * item.quantity).toFixed(2)}</AppText>{removable ? <Pressable onPress={() => remove(item.id)} style={styles.remove}><Ionicons name="trash-outline" color={theme.colors.danger} size={14} /></Pressable> : null}</View>;
}
const styles = StyleSheet.create({ root: { minHeight: 82, flexDirection: 'row', alignItems: 'center', gap: 9, borderBottomWidth: 1, borderColor: theme.colors.line }, compact: { minHeight: 58, borderBottomWidth: 0 }, checkbox: { width: 16, height: 16, borderWidth: 1, borderColor: theme.colors.lineStrong, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }, checked: { backgroundColor: theme.colors.violet, borderColor: theme.colors.violet }, image: { width: 55, height: 55, borderRadius: theme.radius.sm, backgroundColor: theme.colors.surface }, compactImage: { width: 43, height: 43 }, copy: { flex: 1, gap: 2 }, stepper: { width: 66, height: 22, paddingHorizontal: 7, borderRadius: 11, backgroundColor: theme.colors.surface, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }, remove: { position: 'absolute', top: 7, right: 2 } });

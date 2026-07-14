import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';

import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Product } from '../data/catalog';

type ProductCardProps = { product: Product; width?: number; compact?: boolean };

/** Reusable responsive catalog tile used by home, search, store, and favorites. */
export function ProductCard({ product, width, compact }: ProductCardProps) {
  const window = useWindowDimensions();
  const cardWidth = width ?? Math.min(170, (window.width - 44) / 2);
  const favorite = useWishlistStore((state) => state.ids.includes(product.id));
  const toggle = useWishlistStore((state) => state.toggle);
  return (
    <Pressable style={[styles.root, { width: cardWidth }]} onPress={() => router.push(`/product/${product.id}` as Href)}>
      <View style={[styles.imageWrap, { height: compact ? 126 : cardWidth * 1.08 }]}>
        <Image source={product.image} style={styles.image} contentFit="cover" />
        <Pressable style={styles.favorite} onPress={(event) => { event.stopPropagation(); toggle(product.id); }}><Ionicons name={favorite ? 'heart' : 'heart-outline'} size={15} color={favorite ? theme.colors.danger : theme.colors.white} /></Pressable>
      </View>
      <AppText variant="label" numberOfLines={1} style={styles.name}>{product.name}</AppText>
      <AppText variant="caption" color={theme.colors.muted} numberOfLines={1}>{product.store}</AppText>
      <AppText variant="subtitle" style={styles.price}>${product.price.toFixed(2)}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({ root: { marginBottom: 18 }, imageWrap: { width: '100%', overflow: 'hidden', borderRadius: theme.radius.md, backgroundColor: theme.colors.surface }, image: { width: '100%', height: '100%' }, favorite: { position: 'absolute', top: 9, right: 9, width: 25, height: 25, borderRadius: 13, backgroundColor: 'rgba(37,36,56,0.38)', alignItems: 'center', justifyContent: 'center' }, name: { marginTop: 9, textAlign: 'center' }, price: { marginTop: 4, textAlign: 'center', fontSize: 13 } });

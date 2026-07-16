import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { useWishlistStore } from '@/store/wishlist-store';
import { ProductCard } from '../components/product-card';
import { SearchBar } from '../components/search-bar';
import { products } from '../data/catalog';

const filters = ['All', 'Latest', 'Most Popular', 'Cheapest'] as const;
type FavoriteFilter = (typeof filters)[number];

/** Searchable, sortable wishlist grid. The source of truth remains the wishlist store. */
export function FavoritesScreen() {
  const ids = useWishlistStore((state) => state.ids);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FavoriteFilter>('All');

  const favorites = useMemo(() => {
    const search = query.trim().toLowerCase();
    const matches = products.filter((product) => {
      if (!ids.includes(product.id)) return false;
      if (!search) return true;
      return `${product.name} ${product.store}`.toLowerCase().includes(search);
    });

    if (activeFilter === 'Latest') return matches;
    if (activeFilter === 'Most Popular') return [...matches].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (activeFilter === 'Cheapest') return [...matches].sort((a, b) => a.price - b.price);
    return matches;
  }, [activeFilter, ids, query]);

  return (
    <AppScreen padded={false}>
      <View style={styles.header}>
        <AppHeader title="My Favorite" back={false} right={<View style={styles.notification}><Ionicons name="notifications-outline" size={21} color={theme.colors.ink} /><View style={styles.dot} /></View>} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <SearchBar value={query} onChangeText={setQuery} onFilter={() => setActiveFilter('All')} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {filters.map((filter) => {
            const active = filter === activeFilter;
            return (
              <Pressable key={filter} onPress={() => setActiveFilter(filter)} style={[styles.chip, active && styles.activeChip]}>
                <AppText variant="body" color={active ? theme.colors.white : theme.colors.muted}>{filter}</AppText>
              </Pressable>
            );
          })}
        </ScrollView>

        {favorites.length ? (
          <View style={styles.grid}>
            {favorites.map((product) => <ProductCard key={product.id} product={product} compact />)}
          </View>
        ) : (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}><Ionicons name={query ? 'search-outline' : 'heart-outline'} size={28} color={theme.colors.violet} /></View>
            <AppText variant="subtitle">{query ? 'No favorites found' : 'Your favorites are empty'}</AppText>
            <AppText variant="body" color={theme.colors.muted} align="center" style={styles.emptyCopy}>{query ? 'Try a different search term.' : 'Save products you love and they will appear here.'}</AppText>
          </View>
        )}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 12 },
  notification: { width: 30, alignItems: 'flex-end' },
  dot: { position: 'absolute', top: 0, right: -1, width: 7, height: 7, borderRadius: 4, backgroundColor: theme.colors.danger },
  content: { paddingHorizontal: 22, paddingBottom: 34, gap: 14 },
  filters: { gap: 9, paddingRight: 16 },
  chip: { height: 27, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.line, alignItems: 'center', justifyContent: 'center' },
  activeChip: { backgroundColor: theme.colors.violet, borderColor: theme.colors.violet },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  empty: { alignItems: 'center', paddingHorizontal: 35, paddingTop: 78 },
  emptyIcon: { width: 68, height: 68, borderRadius: 34, backgroundColor: theme.colors.violetSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyCopy: { marginTop: 8, lineHeight: 20 },
});

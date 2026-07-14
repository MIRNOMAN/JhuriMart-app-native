import { ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { ProductCard } from '../components/product-card';
import { SearchBar } from '../components/search-bar';
import { products } from '../data/catalog';
import { useWishlistStore } from '@/store/wishlist-store';

export function FavoritesScreen() { const ids = useWishlistStore((state) => state.ids); const favorites = products.filter(({ id }) => ids.includes(id)); return <AppScreen padded={false}><View style={styles.header}><AppHeader title="My Favorite" back={false} /></View><ScrollView contentContainerStyle={styles.content}><SearchBar onFilter={() => {}} /><View style={styles.grid}>{favorites.map((product) => <ProductCard key={product.id} product={product} compact />)}</View></ScrollView></AppScreen>; }
const styles = StyleSheet.create({ header: { paddingHorizontal: 12 }, content: { paddingHorizontal: 12, paddingBottom: 30, gap: 14 }, grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' } });

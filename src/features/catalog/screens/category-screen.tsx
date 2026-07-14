import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { router, type Href } from 'expo-router';

import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { categories } from '../data/catalog';

export function CategoryScreen() {
  return <AppScreen padded={false}><ScrollView contentContainerStyle={styles.content}><View style={styles.tabs}><Pressable style={styles.tab} onPress={() => router.back()}><AppText variant="subtitle" color={theme.colors.subtle}>Home</AppText></Pressable><View style={styles.active}><AppText variant="subtitle">Category</AppText></View></View><View style={styles.feature}><View><AppText variant="subtitle">New Arrivals</AppText><AppText variant="caption">208 Product</AppText></View><Image source={categories[0].image} style={styles.featureImage} contentFit="cover" /></View><View style={styles.list}>{categories.map((category) => <Pressable key={category.id} style={styles.category} onPress={() => router.push(`/search?category=${category.id}` as Href)}><Image source={category.image} style={StyleSheet.absoluteFill} contentFit="cover" /><View style={styles.copy}><AppText variant="subtitle">{category.name}</AppText><AppText variant="caption">{category.count} Product</AppText></View></Pressable>)}</View></ScrollView></AppScreen>;
}
const styles = StyleSheet.create({ content: { paddingHorizontal: 12, paddingBottom: 28 }, tabs: { height: 112, flexDirection: 'row', alignItems: 'flex-end', marginHorizontal: 50, marginBottom: 18 }, tab: { flex: 1, alignItems: 'center', paddingBottom: 14 }, active: { flex: 1, alignItems: 'center', paddingBottom: 13, borderBottomWidth: 2, borderColor: theme.colors.violet }, feature: { height: 100, padding: 18, borderRadius: theme.radius.sm, overflow: 'hidden', backgroundColor: theme.colors.warmSurface, justifyContent: 'center', marginBottom: 15 }, featureImage: { position: 'absolute', top: 0, right: 0, bottom: 0, left: '48%' }, list: { gap: 14 }, category: { height: 101, overflow: 'hidden', borderRadius: theme.radius.sm, backgroundColor: theme.colors.surface }, copy: { flex: 1, justifyContent: 'center', paddingLeft: 17, backgroundColor: 'rgba(255,255,255,0.08)' } });

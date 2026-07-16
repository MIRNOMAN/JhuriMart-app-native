import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { ProductCard } from '@/features/catalog/components/product-card';
import { products } from '@/features/catalog/data/catalog';
import { theme } from '@/constants/theme';

export function HomeScreen() {
  const { width } = useWindowDimensions();
  const bannerWidth = Math.min(width, 560) - 46;
  const banners = [
    require('../../../../assets/images/catalog/banner.png'),
    require('../../../../assets/images/catalog/banner.png'),
    require('../../../../assets/images/catalog/banner.png'),
  ];
  const [activeBanner, setActiveBanner] = useState(0);

  return (
    <AppScreen padded={false}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}><Ionicons name="person" size={22} color={theme.colors.body} /></View>
          <View style={styles.greeting}><AppText variant="subtitle">Hi, Jonathan</AppText><AppText variant="caption" color={theme.colors.muted}>Let&apos;s go shopping</AppText></View>
          <Pressable onPress={() => router.push('/search' as Href)}><Ionicons name="search-outline" size={26} color={theme.colors.ink} /></Pressable>
          <Pressable onPress={() => router.push('/notifications' as Href)}><Ionicons name="notifications-outline" size={24} color={theme.colors.ink} /><View style={styles.dot} /></Pressable>
        </View>
        <View style={styles.tabs}>
          <View style={styles.activeTab}><AppText variant="subtitle">Home</AppText></View>
          <Pressable style={styles.tab} onPress={() => router.push('/categories' as Href)}><AppText variant="subtitle" color={theme.colors.subtle}>Category</AppText></Pressable>
        </View>
        <FlatList
          data={banners}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `home-banner-${index}`}
          renderItem={({ item }) => <Image source={item} style={[styles.banner, { width: bannerWidth }]} contentFit="cover" />}
          onMomentumScrollEnd={(event) => setActiveBanner(Math.round(event.nativeEvent.contentOffset.x / bannerWidth))}
          getItemLayout={(_, index) => ({ length: bannerWidth, offset: bannerWidth * index, index })}
        />
        <View style={styles.pagination}>{banners.map((_, index) => <View key={index} style={index === activeBanner ? styles.activeDot : styles.pageDot} />)}</View>
        <View style={styles.sectionHeader}><AppText variant="title">New Arrivals 🔥</AppText><Pressable onPress={() => router.push('/search?query=bag' as Href)}><AppText variant="label" color={theme.colors.violet}>See All</AppText></Pressable></View>
        <View style={styles.grid}>{products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} />)}</View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({ content: { paddingHorizontal: 23, paddingBottom: 28 }, header: { height: 78, flexDirection: 'row', alignItems: 'center', gap: 10 }, avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: theme.colors.avatarSurface, alignItems: 'center', justifyContent: 'center' }, greeting: { flex: 1, gap: 1 }, dot: { position: 'absolute', top: 0, right: 0, width: 7, height: 7, borderRadius: 4, backgroundColor: theme.colors.danger }, tabs: { height: 72, flexDirection: 'row', alignItems: 'flex-end', marginHorizontal: 36, marginBottom: 24 }, tab: { flex: 1, alignItems: 'center', paddingBottom: 14 }, activeTab: { flex: 1, alignItems: 'center', paddingBottom: 13, borderBottomWidth: 2, borderColor: theme.colors.violet }, banner: { width: '100%', aspectRatio: 2.4, borderRadius: theme.radius.sm }, pagination: { height: 36, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }, activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.violet }, pageDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.lineStrong }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' } });

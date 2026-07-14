import { ActivityIndicator, StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type BrandSplashScreenProps = {
  onLayout: (event: LayoutChangeEvent) => void;
};

export function BrandSplashScreen({ onLayout }: BrandSplashScreenProps) {
  return (
    <View style={styles.container} onLayout={onLayout}>
      <StatusBar style="light" />
      <View style={styles.brand}>
        <Text style={styles.logo}>JhuriMart</Text>
        <Text style={styles.tagline}>Shopping made simple, right from home</Text>
      </View>

      <View style={styles.loader}>
        <ActivityIndicator color="#FFFFFF" size="small" />
        <Text style={styles.loadingText}>Loading your store...</Text>
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5752C7',
  },
  brand: {
    alignItems: 'center',
    marginTop: -40,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '800',
    letterSpacing: -1,
  },
  tagline: {
    marginTop: 8,
    color: '#E7E5FF',
    fontSize: 13,
    fontWeight: '500',
  },
  loader: {
    position: 'absolute',
    bottom: 92,
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    color: '#E7E5FF',
    fontSize: 12,
    fontWeight: '500',
  },
  version: {
    position: 'absolute',
    bottom: 32,
    color: '#D9D7FF',
    fontSize: 11,
  },
});

import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';

export function BrandSplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.brand}>
        <AppText variant="display" color={theme.colors.white} style={styles.logo}>Kutuku</AppText>
        <AppText variant="caption" color={theme.colors.splashText}>Any shopping just from home</AppText>
      </View>
      <AppText variant="caption" color={theme.colors.splashSubtle} style={styles.version}>Version 0.0.1</AppText>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.violet }, brand: { alignItems: 'center', gap: 8 }, logo: { fontSize: 30 }, version: { position: 'absolute', bottom: 40 } });

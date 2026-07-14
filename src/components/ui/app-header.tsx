import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { theme } from '@/constants/theme';
import { AppText } from './app-text';

type AppHeaderProps = { title: string; back?: boolean; right?: React.ReactNode };

/** Compact centered app bar used by secondary Kutuku screens. */
export function AppHeader({ title, back = true, right }: AppHeaderProps) {
  return (
    <View style={styles.root}>
      <View style={styles.side}>{back ? <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={20} color={theme.colors.ink} /></Pressable> : null}</View>
      <AppText variant="label" style={styles.title}>{title}</AppText>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({ root: { height: 52, flexDirection: 'row', alignItems: 'center' }, side: { width: 42 }, right: { alignItems: 'flex-end' }, title: { flex: 1, textAlign: 'center' } });

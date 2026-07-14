import { PropsWithChildren, useMemo } from 'react';
import { Platform, ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

type ScreenShellProps = PropsWithChildren<{
  centered?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export function ScreenShell({ children, centered = false, contentStyle }: ScreenShellProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const contentInsets = useMemo(
    () => ({
      paddingTop: Platform.OS === 'android' ? Spacing.three : Spacing.four,
      paddingLeft: Spacing.four,
      paddingRight: Spacing.four,
      paddingBottom: safeAreaInsets.bottom + BottomTabInset + Spacing.four,
    }),
    [safeAreaInsets.bottom]
  );

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView
          style={styles.scroller}
          contentContainerStyle={[
            styles.scrollContent,
            contentInsets,
            centered && styles.centered,
          ]}
          showsVerticalScrollIndicator={false}>
          <ThemedView style={[styles.content, contentStyle]}>{children}</ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scroller: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.four,
    minWidth: 0,
  },
  centered: {
    justifyContent: 'center',
  },
});

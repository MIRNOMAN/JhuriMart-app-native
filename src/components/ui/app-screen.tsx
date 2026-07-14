import { ScrollView, StyleSheet, View, useWindowDimensions, type ScrollViewProps, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { layout, theme } from '@/constants/theme';

type AppScreenProps = ViewProps & { scroll?: boolean; scrollProps?: ScrollViewProps; padded?: boolean };

/** Safe-area and tablet-aware screen wrapper with a 375px design baseline. */
export function AppScreen({ scroll = false, scrollProps, padded = true, children, style, ...props }: AppScreenProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const contentWidth = width >= 600 ? layout.tabletContentWidth : width;
  const contentStyle = [styles.content, { width: contentWidth, paddingHorizontal: padded ? theme.spacing.md : 0 }, style];
  if (scroll) {
    return (
      <View className="bg-white" style={styles.root} {...props}>
        <ScrollView contentContainerStyle={[contentStyle, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} {...scrollProps}>
          {children}
        </ScrollView>
      </View>
    );
  }
  return <View className="bg-white" style={styles.root} {...props}><View style={[contentStyle, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>{children}</View></View>;
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: theme.colors.white, alignItems: 'center' }, content: { flexGrow: 1, maxWidth: '100%' } });

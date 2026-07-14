import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { PlatformMetric } from '@/features/home/data/home-dashboard';

type MetricCardProps = {
  metric: PlatformMetric;
};

function MetricCardBase({ metric }: MetricCardProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedText type="smallBold" themeColor="textSecondary">
        {metric.label}
      </ThemedText>
      <ThemedText type="subtitle" style={styles.value}>
        {metric.value}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {metric.detail}
      </ThemedText>
    </ThemedView>
  );
}

export const MetricCard = memo(MetricCardBase);

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 180,
    minWidth: 0,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  value: {
    fontSize: 22,
    lineHeight: 28,
  },
});

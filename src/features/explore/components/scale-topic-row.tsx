import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { ScaleTopic } from '@/features/explore/data/scale-playbook';

type ScaleTopicRowProps = {
  item: ScaleTopic;
};

function ScaleTopicRowBase({ item }: ScaleTopicRowProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.row}>
      <ThemedView type="backgroundSelected" style={styles.badge}>
        <ThemedText type="code">{item.owner}</ThemedText>
      </ThemedView>
      <ThemedView type="backgroundElement" style={styles.copy}>
        <ThemedText type="smallBold">{item.title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {item.summary}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

export const ScaleTopicRow = memo(ScaleTopicRowBase);

const styles = StyleSheet.create({
  row: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  copy: {
    minWidth: 0,
    gap: Spacing.one,
  },
});

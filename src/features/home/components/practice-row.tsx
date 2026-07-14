import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { EngineeringPractice } from '@/features/home/data/home-dashboard';

type PracticeRowProps = {
  item: EngineeringPractice;
};

function PracticeRowBase({ item }: PracticeRowProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.row}>
      <ThemedView type="backgroundSelected" style={styles.marker} />
      <ThemedView type="backgroundElement" style={styles.copy}>
        <ThemedText type="smallBold">{item.title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {item.description}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

export const PracticeRow = memo(PracticeRowBase);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    gap: Spacing.one,
  },
});

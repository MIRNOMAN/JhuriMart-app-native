import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { ScreenShell } from '@/shared/ui/screen-shell';

type SimpleTabScreenProps = {
  title: string;
  description: string;
};

export function SimpleTabScreen({ title, description }: SimpleTabScreenProps) {
  return (
    <ScreenShell centered contentStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.description}>
        {description}
      </ThemedText>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    maxWidth: 420,
    textAlign: 'center',
  },
});

import { Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { WebBadge } from '@/components/web-badge';
import { Spacing } from '@/constants/theme';
import { ScaleTopicRow } from '@/features/explore/components/scale-topic-row';
import { scalePlaybook } from '@/features/explore/data/scale-playbook';
import { ScreenShell } from '@/shared/ui/screen-shell';

export function ExploreScreen() {
  return (
    <ScreenShell>
      <ThemedText type="subtitle">Scale playbook</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.description}>
        The app is organized around feature ownership, shared primitives, and rendering defaults that
        stay smooth when real production data arrives.
      </ThemedText>

      <View style={styles.topicList}>
        {scalePlaybook.map((item) => (
          <ScaleTopicRow key={item.id} item={item} />
        ))}
      </View>

      {Platform.OS === 'web' && <WebBadge />}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  description: {
    maxWidth: 640,
  },
  topicList: {
    gap: Spacing.two,
  },
});

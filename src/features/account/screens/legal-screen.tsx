import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';

const paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor et ultricies, amet aliquet ut vivamus.';
export function LegalScreen() { return <AppScreen scroll><AppHeader title="Legal and Policies" right={<Ionicons name="ellipsis-vertical" size={18} />} /><View style={styles.copy}><AppText variant="subtitle">Terms</AppText><AppText variant="body" color={theme.colors.body}>{paragraph}</AppText><AppText variant="body" color={theme.colors.body}>{paragraph}</AppText><AppText variant="subtitle">Changes to the Service and/or Terms:</AppText><AppText variant="body" color={theme.colors.body}>{paragraph}</AppText><AppText variant="body" color={theme.colors.body}>{paragraph}</AppText></View></AppScreen>; }
const styles = StyleSheet.create({ copy: { gap: 14, paddingVertical: 12 } });

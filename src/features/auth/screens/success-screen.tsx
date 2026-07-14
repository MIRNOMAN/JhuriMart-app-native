import { router, type Href } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '@/components/ui/app-button';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { useAuthStore } from '@/store/auth-store';

export function RegisterSuccessScreen() {
  const signIn = useAuthStore((state) => state.signIn);
  return <AppScreen><View style={styles.content}><View style={styles.ring}><View style={styles.check}><Ionicons name="checkmark" size={27} color={theme.colors.white} /></View></View><AppText variant="title">Register Success</AppText><AppText variant="caption" color={theme.colors.muted} align="center">Congratulation! your account already created.{`\n`}Please login to get amazing experience.</AppText><AppButton label="Go to Homepage" onPress={() => { signIn(); router.replace('/(tabs)' as Href); }} /></View></AppScreen>;
}
const styles = StyleSheet.create({ content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 }, ring: { width: 82, height: 82, borderRadius: 41, backgroundColor: theme.colors.successRing, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }, check: { width: 52, height: 52, borderRadius: 26, backgroundColor: theme.colors.success, alignItems: 'center', justifyContent: 'center' } });

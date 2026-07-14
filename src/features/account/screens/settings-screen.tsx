import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { type Href, router } from 'expo-router';

import { AppButton } from '@/components/ui/app-button';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { useAuthStore } from '@/store/auth-store';
import { SettingsRow } from '../components/settings-row';

export function SettingsScreen() {
  const [logout, setLogout] = useState(false);
  const signOut = useAuthStore((state) => state.signOut);
  return <AppScreen><AppHeader title="Settings" back={false} right={<Ionicons name="ellipsis-vertical" size={18} />} /><AppText variant="subtitle" style={styles.group}>General</AppText><View style={styles.card}><SettingsRow icon="person-outline" label="Edit Profile" href={'/edit-profile' as Href} /><SettingsRow icon="lock-closed-outline" label="Change Password" href={'/change-password' as Href} /><SettingsRow icon="notifications-outline" label="Notifications" href={'/notification-settings' as Href} /><SettingsRow icon="shield-checkmark-outline" label="Security" href={'/security' as Href} /><SettingsRow icon="globe-outline" label="Language" detail="English" href={'/language' as Href} /></View><AppText variant="subtitle" style={styles.group}>Preferences</AppText><View style={styles.card}><SettingsRow icon="mail-outline" label="Messages" href={'/messages' as Href} /><SettingsRow icon="shield-outline" label="Legal and Policies" href={'/legal' as Href} /><SettingsRow icon="chatbox-ellipses-outline" label="Help & Support" href={'/help' as Href} /><SettingsRow icon="log-out-outline" label="Logout" danger onPress={() => setLogout(true)} /></View><Modal visible={logout} transparent animationType="fade"><Pressable style={styles.overlay} onPress={() => setLogout(false)} /><View style={styles.dialog}><Pressable style={styles.close} onPress={() => setLogout(false)}><Ionicons name="close" size={20} /></Pressable><AppText variant="subtitle" align="center">Are you sure you want to{`\n`}logout?</AppText><AppButton label="Cancel" onPress={() => setLogout(false)} /><AppButton variant="danger" label="Log Out" onPress={() => { signOut(); setLogout(false); router.replace('/login' as Href); }} /></View></Modal></AppScreen>;
}
const styles = StyleSheet.create({ group: { marginTop: 10, marginBottom: 8 }, card: { borderRadius: theme.radius.md, overflow: 'hidden', borderWidth: 1, borderColor: theme.colors.line }, overlay: { position: 'absolute', inset: 0, backgroundColor: theme.colors.overlay }, dialog: { position: 'absolute', top: '34%', left: 30, right: 30, padding: 20, borderRadius: theme.radius.md, backgroundColor: theme.colors.white, gap: 13 }, close: { alignSelf: 'flex-end' } });

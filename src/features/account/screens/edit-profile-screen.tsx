import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppButton } from '@/components/ui/app-button';
import { AppHeader } from '@/components/ui/app-header';
import { AppInput } from '@/components/ui/app-input';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { useProfileStore } from '@/store/profile-store';

export function EditProfileScreen() { const profile = useProfileStore(); const [name, setName] = useState(profile.name); const [email, setEmail] = useState(profile.email); return <AppScreen><AppHeader title="Edit Profile" right={<Ionicons name="ellipsis-vertical" size={18} />} /><View style={styles.avatar}><Ionicons name="person" size={42} color={theme.colors.body} /></View><View style={styles.form}><AppInput label="Username" icon="person-outline" value={name} onChangeText={setName} /><AppInput label="Email or Phone Number" icon="mail-outline" value={email} onChangeText={setEmail} /><AppText variant="label">Account Linked With</AppText><View style={styles.link}><AppText variant="subtitle" color={theme.colors.google}>G</AppText><AppText variant="label" style={{ flex: 1 }}>Google</AppText><Ionicons name="link-outline" color={theme.colors.subtle} /></View></View><View style={styles.bottom}><AppButton label="Save Changes" onPress={() => { profile.update({ name, email }); router.back(); }} /></View></AppScreen>; }
const styles = StyleSheet.create({ avatar: { width: 76, height: 76, borderRadius: 38, alignSelf: 'center', marginVertical: 18, backgroundColor: theme.colors.avatarBlue, alignItems: 'center', justifyContent: 'center' }, form: { flex: 1, gap: 15 }, link: { height: 48, paddingHorizontal: 13, borderRadius: theme.radius.md, backgroundColor: theme.colors.surface, flexDirection: 'row', alignItems: 'center', gap: 10 }, bottom: { paddingBottom: 16 } });

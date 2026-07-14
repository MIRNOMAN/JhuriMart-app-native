import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { ToggleRow } from '../components/settings-row';
import { theme } from '@/constants/theme';
import { useNotificationStore } from '@/store/notification-store';

export function NotificationSettingsScreen() { const state = useNotificationStore(); const keys = ['payment','tracking','completeOrder','notification'] as const; const labels = ['Payment','Tracking','Complete Order','Notification']; return <AppScreen><AppHeader title="Notifications" right={<Ionicons name="ellipsis-vertical" size={18} />} /><View style={styles.card}>{keys.map((key, index) => <ToggleRow key={key} label={labels[index]} value={state[key]} onValueChange={() => state.toggle(key)} />)}</View></AppScreen>; }
export function SecurityScreen() { const [face, setFace] = useState(true); const [remember, setRemember] = useState(true); const [touch, setTouch] = useState(true); return <AppScreen><AppHeader title="Security" right={<Ionicons name="ellipsis-vertical" size={18} />} /><View style={styles.card}><ToggleRow label="Face ID" value={face} onValueChange={setFace} /><ToggleRow label="Remember Password" value={remember} onValueChange={setRemember} /><ToggleRow label="Touch ID" value={touch} onValueChange={setTouch} /></View></AppScreen>; }
const styles = StyleSheet.create({ card: { marginTop: 14, borderWidth: 1, borderColor: theme.colors.line, borderRadius: theme.radius.md, overflow: 'hidden' } });

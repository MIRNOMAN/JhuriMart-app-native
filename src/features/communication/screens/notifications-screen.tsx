import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { notifications } from '../data/communication';

export function NotificationsScreen() { return <AppScreen padded={false}><View style={styles.pad}><AppHeader title="Notification" right={<Ionicons name="settings-outline" size={19} />} /></View><ScrollView contentContainerStyle={styles.content}><AppText variant="subtitle">Recent</AppText>{notifications.map((item) => <View key={item.title} style={styles.row}><View style={styles.icon}><Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={18} color={theme.colors.body} /></View><View style={{ flex: 1 }}><View style={styles.title}><AppText variant="label">{item.title}</AppText><AppText variant="caption" color={theme.colors.muted}>{item.time}</AppText></View><AppText variant="body" color={theme.colors.muted}>{item.body}</AppText>{item.title.includes('Message') ? <AppText variant="label" color={theme.colors.violet}>Reply the message</AppText> : null}</View></View>)}</ScrollView></AppScreen>; }
const styles = StyleSheet.create({ pad: { paddingHorizontal: 12 }, content: { padding: 14, gap: 14 }, row: { flexDirection: 'row', gap: 11 }, icon: { width: 38, height: 38, borderRadius: 19, backgroundColor: theme.colors.surface, alignItems: 'center', justifyContent: 'center' }, title: { flexDirection: 'row', justifyContent: 'space-between' } });

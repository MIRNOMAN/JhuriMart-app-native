import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { type Href, router } from 'expo-router';

import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';

type SettingsRowProps = { icon: keyof typeof Ionicons.glyphMap; label: string; href?: Href; detail?: string; danger?: boolean; onPress?: () => void };
export function SettingsRow({ icon, label, href, detail, danger, onPress }: SettingsRowProps) { const color = danger ? theme.colors.danger : theme.colors.body; return <Pressable style={styles.row} onPress={onPress ?? (href ? () => router.push(href) : undefined)}><Ionicons name={icon} size={17} color={color} /><AppText variant="label" color={color} style={{ flex: 1 }}>{label}</AppText>{detail ? <AppText variant="caption" color={theme.colors.muted}>{detail}</AppText> : null}{href ? <Ionicons name="chevron-forward" size={15} color={theme.colors.subtle} /> : null}</Pressable>; }
export function ToggleRow({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (value: boolean) => void }) { return <View style={styles.row}><AppText variant="label" style={{ flex: 1 }}>{label}</AppText><Switch value={value} onValueChange={onValueChange} trackColor={{ false: theme.colors.lineStrong, true: theme.colors.violet }} thumbColor={theme.colors.white} /></View>; }
const styles = StyleSheet.create({ row: { minHeight: 48, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderColor: theme.colors.line, backgroundColor: theme.colors.white } });

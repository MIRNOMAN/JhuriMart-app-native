import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { SearchBar } from '@/features/catalog/components/search-bar';
import { theme } from '@/constants/theme';
import { useProfileStore } from '@/store/profile-store';

const languages = [['🇬🇧','English'],['🇮🇩','Bahasa Indonesia'],['🇨🇳','Chinese'],['🇩🇪','Deutsch']];
export function LanguageScreen() { const profile = useProfileStore(); const [selected, setSelected] = useState(profile.language); return <AppScreen><AppHeader title="Language" right={<Ionicons name="ellipsis-vertical" size={18} />} /><SearchBar placeholder="Search language" /><View style={styles.list}>{languages.map(([flag, label]) => <Pressable key={label} onPress={() => { setSelected(label); profile.update({ language: label }); }} style={[styles.row, selected === label && styles.selected]}><AppText variant="subtitle">{flag}</AppText><AppText variant="label" style={{ flex: 1 }}>{label}</AppText>{selected === label ? <Ionicons name="checkmark" size={16} color={theme.colors.violet} /> : null}</Pressable>)}</View></AppScreen>; }
const styles = StyleSheet.create({ list: { marginTop: 14, gap: 8 }, row: { height: 45, paddingHorizontal: 12, borderWidth: 1, borderColor: theme.colors.line, borderRadius: theme.radius.sm, flexDirection: 'row', alignItems: 'center', gap: 10 }, selected: { borderColor: theme.colors.violet } });

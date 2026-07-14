import { Pressable, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

type SearchBarProps = { value?: string; onChangeText?: (value: string) => void; onPress?: () => void; onFilter?: () => void; placeholder?: string };
export function SearchBar({ value, onChangeText, onPress, onFilter, placeholder = 'Search something...' }: SearchBarProps) {
  return <Pressable style={styles.root} onPress={onPress}><Ionicons name="search-outline" size={17} color={theme.colors.muted} /><TextInput editable={!onPress} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={theme.colors.muted} style={styles.input} pointerEvents={onPress ? 'none' : 'auto'} />{onFilter ? <Pressable onPress={onFilter} hitSlop={8}><Ionicons name="options-outline" size={17} color={theme.colors.ink} /></Pressable> : null}</Pressable>;
}
const styles = StyleSheet.create({ root: { height: 42, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 12, borderRadius: theme.radius.md, backgroundColor: theme.colors.surface }, input: { flex: 1, height: '100%', fontFamily: theme.type.regular, fontSize: 10, color: theme.colors.ink } });

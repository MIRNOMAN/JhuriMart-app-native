import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { SearchBar } from '@/features/catalog/components/search-bar';
import { theme } from '@/constants/theme';

const questions = ['Lorem ipsum dolor sit amet','How do I change my address?','How can I track an order?','How do refunds work?'];
export function HelpScreen() { const [open, setOpen] = useState(1); return <AppScreen scroll><AppHeader title="Help and Support" right={<Ionicons name="ellipsis-vertical" size={18} />} /><SearchBar placeholder="Search help" /><View style={styles.list}>{questions.map((question, index) => <Pressable key={question} onPress={() => setOpen(open === index ? -1 : index)} style={styles.item}><View style={styles.heading}><AppText variant="label" style={{ flex: 1 }}>{question}</AppText><Ionicons name={open === index ? 'chevron-up' : 'chevron-down'} size={15} /></View>{open === index ? <AppText variant="body" color={theme.colors.body}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</AppText> : null}</Pressable>)}</View></AppScreen>; }
const styles = StyleSheet.create({ list: { marginTop: 12 }, item: { paddingVertical: 14, borderBottomWidth: 1, borderColor: theme.colors.line, gap: 10 }, heading: { flexDirection: 'row', alignItems: 'center' } });

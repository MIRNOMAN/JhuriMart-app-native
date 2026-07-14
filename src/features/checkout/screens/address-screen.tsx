import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { AppButton } from '@/components/ui/app-button';
import { AppHeader } from '@/components/ui/app-header';
import { AppInput } from '@/components/ui/app-input';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';
import { useCheckoutStore } from '@/store/checkout-store';

const locations = [{ city: 'Los Angeles', detail: 'Los Angeles, United States', color: '#14C979' }, { city: 'San Francisco', detail: 'San Francisco, United States', color: '#9D8BFA' }, { city: 'New York', detail: 'New York, United States', color: '#FF7481' }];
export function AddressScreen() {
  const [selected, setSelected] = useState(0);
  const setAddress = useCheckoutStore((state) => state.setAddress);
  return <AppScreen><AppHeader title="Address" /><View style={styles.content}><AppText variant="subtitle">Choose your location</AppText><AppText variant="body" color={theme.colors.muted}>Let&apos;s find your unforgettable event. Choose a{`\n`}location below to get started.</AppText><AppInput icon="location-outline" value="San Diego, CA" editable={false} /><AppText variant="label">Select location</AppText><View style={styles.list}>{locations.map((location, index) => <Pressable key={location.city} onPress={() => setSelected(index)} style={[styles.location, selected === index && styles.selected]}><View style={{ flex: 1 }}><AppText variant="label">{location.city}</AppText><AppText variant="caption" color={theme.colors.muted}>{location.detail}</AppText></View><View style={[styles.pin, { borderColor: location.color }]}><Ionicons name="location" size={14} color={location.color} /></View></Pressable>)}</View></View><View style={styles.bottom}><AppButton label="Confirm" onPress={() => { const location = locations[selected]; setAddress('5482 Abode Falls Rd #155n', location.detail); router.back(); }} /></View></AppScreen>;
}
const styles = StyleSheet.create({ content: { flex: 1, gap: 13, paddingTop: 12 }, list: { gap: 10 }, location: { height: 68, paddingHorizontal: 12, borderWidth: 1, borderColor: theme.colors.line, borderRadius: theme.radius.md, flexDirection: 'row', alignItems: 'center' }, selected: { borderColor: theme.colors.violet }, pin: { width: 38, height: 38, borderRadius: 19, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }, bottom: { paddingBottom: 16 } });

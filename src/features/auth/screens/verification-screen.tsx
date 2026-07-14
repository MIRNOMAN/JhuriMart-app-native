import { useRef, useState } from 'react';
import { router, type Href } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from '@/components/ui/app-button';
import { AppHeader } from '@/components/ui/app-header';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';

export function VerificationScreen() {
  const [digits, setDigits] = useState(['6', '3', '8', '']);
  const refs = useRef<(TextInput | null)[]>([]);
  return (
    <AppScreen>
      <AppHeader title="Verification" />
      <View style={styles.content}>
        <View style={styles.iconRing}><View style={styles.icon}><Ionicons name="mail-unread" size={24} color={theme.colors.white} /></View></View>
        <AppText variant="title">Verification Code</AppText>
        <AppText variant="caption" color={theme.colors.muted} align="center">We have to sent the code verification to{`\n`}magdalena83@gmail.com</AppText>
        <View style={styles.otp}>{digits.map((digit, index) => <TextInput key={index} ref={(node) => { refs.current[index] = node; }} value={digit} keyboardType="number-pad" maxLength={1} onChangeText={(value) => { const next = [...digits]; next[index] = value; setDigits(next); if (value) refs.current[index + 1]?.focus(); }} style={[styles.cell, index === 3 && styles.activeCell]} />)}</View>
        <AppButton label="Submit" onPress={() => router.push('/register-success' as Href)} />
        <AppText variant="caption" color={theme.colors.muted}>Didn&apos;t receive the code? <AppText variant="caption" color={theme.colors.violet}>Resend</AppText></AppText>
      </View>
    </AppScreen>
  );
}
const styles = StyleSheet.create({ content: { flex: 1, alignItems: 'center', paddingTop: 50, gap: 14 }, iconRing: { width: 76, height: 76, borderRadius: 38, backgroundColor: theme.colors.violetSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 18 }, icon: { width: 50, height: 50, borderRadius: 25, backgroundColor: theme.colors.violet, alignItems: 'center', justifyContent: 'center' }, otp: { flexDirection: 'row', gap: 9, marginVertical: 18 }, cell: { width: 48, height: 48, borderRadius: 10, backgroundColor: theme.colors.surface, textAlign: 'center', color: theme.colors.ink, fontFamily: theme.type.semibold, fontSize: 16 }, activeCell: { borderWidth: 1, borderColor: theme.colors.violet, backgroundColor: theme.colors.white } });

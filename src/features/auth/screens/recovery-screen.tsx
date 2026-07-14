import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, type Href } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

import { AppButton } from '@/components/ui/app-button';
import { AppInput } from '@/components/ui/app-input';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';

const emailSchema = z.object({ email: z.string().email() });
const passwordSchema = z.object({ password: z.string().min(8), confirm: z.string().min(8) }).refine(({ password, confirm }) => password === confirm, { path: ['confirm'], message: 'Passwords must match' });

export function RecoveryScreen({ mode }: { mode: 'forgot' | 'new-password' }) {
  const forgot = mode === 'forgot';
  const { control, handleSubmit, formState: { errors } } = useForm<any>({ resolver: zodResolver(forgot ? emailSchema : passwordSchema), defaultValues: forgot ? { email: 'magdalena83@gmail.com' } : { password: '', confirm: '' } });
  return (
    <AppScreen>
      <View style={styles.scrimContent}><AppText variant="title">Login Account</AppText><AppText variant="caption" color={theme.colors.muted}>Please login with registered account</AppText></View>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <AppText variant="subtitle">{forgot ? 'Forgot Password' : 'Create New Password'}</AppText>
        <AppText variant="caption" color={theme.colors.muted}>{forgot ? 'Enter your email or phone number' : 'Create a secure password for your account'}</AppText>
        <View style={styles.form}>
          {forgot ? <Controller control={control} name="email" render={({ field: { value, onChange } }) => <AppInput label="Email or Phone Number" icon="mail-outline" value={value} onChangeText={onChange} error={errors.email?.message as string} />} /> : <><Controller control={control} name="password" render={({ field: { value, onChange } }) => <AppInput label="Password" icon="lock-closed-outline" password value={value} onChangeText={onChange} error={errors.password?.message as string} />} /><Controller control={control} name="confirm" render={({ field: { value, onChange } }) => <AppInput label="Confirm Password" icon="lock-closed-outline" password value={value} onChangeText={onChange} error={errors.confirm?.message as string} />} /></>}
        </View>
        <AppButton label={forgot ? 'Send Code' : 'Change Password'} onPress={handleSubmit(() => forgot ? router.push('/new-password' as Href) : router.replace('/login' as Href))} />
      </View>
    </AppScreen>
  );
}
const styles = StyleSheet.create({ scrimContent: { paddingTop: 50, gap: 5, opacity: 0.45 }, sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 30, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: theme.colors.white, ...theme.shadow.sheet, gap: 8 }, handle: { width: 54, height: 4, borderRadius: 2, backgroundColor: theme.colors.lineStrong, alignSelf: 'center', marginBottom: 12 }, form: { gap: 14, marginVertical: 14 } });

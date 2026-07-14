import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { z } from 'zod';

import { AppButton } from '@/components/ui/app-button';
import { AppInput } from '@/components/ui/app-input';
import { AppScreen } from '@/components/ui/app-screen';
import { AppText } from '@/components/ui/app-text';
import { theme } from '@/constants/theme';

const createSchema = z.object({ username: z.string().min(2, 'Enter your username'), email: z.string().email('Enter a valid email'), password: z.string().min(8, 'Use at least 8 characters') });
type CreateValues = z.infer<typeof createSchema>;

type AuthFormScreenProps = { mode: 'create' | 'login' };

export function AuthFormScreen({ mode }: AuthFormScreenProps) {
  const create = mode === 'create';
  const { control, handleSubmit, formState: { errors } } = useForm<CreateValues>({ resolver: zodResolver(createSchema), defaultValues: { username: create ? '' : 'Login User', email: '', password: '' } });
  const submit = () => router.push((create ? '/verification' : '/(tabs)') as Href);
  return (
    <AppScreen scroll scrollProps={{ contentContainerStyle: styles.screen }}>
      <View style={styles.heading}>
        <AppText variant="title">{create ? 'Create Account' : 'Login Account'}</AppText>
        <AppText variant="caption" color={theme.colors.muted}>{create ? 'Start learning with create your account' : 'Please login with registered account'}</AppText>
      </View>
      <View style={styles.form}>
        {create ? <Controller control={control} name="username" render={({ field: { onChange, onBlur, value } }) => <AppInput label="Username" icon="person-outline" placeholder="Create your username" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.username?.message} />} /> : null}
        <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => <AppInput label="Email or Phone Number" icon="mail-outline" placeholder="Enter your email or phone number" autoCapitalize="none" keyboardType="email-address" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.email?.message} />} />
        <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => <AppInput label="Password" icon="lock-closed-outline" placeholder="Create your password" password value={value} onChangeText={onChange} onBlur={onBlur} error={errors.password?.message} />} />
        {!create ? <Pressable onPress={() => router.push('/forgot-password' as Href)}><AppText variant="caption" color={theme.colors.violet} align="right">Forgot Password?</AppText></Pressable> : null}
      </View>
      <AppButton label={create ? 'Create Account' : 'Sign In'} onPress={handleSubmit(submit)} />
      <View style={styles.divider}><View style={styles.line} /><AppText variant="caption" color={theme.colors.muted}>Or using other method</AppText><View style={styles.line} /></View>
      <View style={styles.socials}>
        <AppButton variant="outline" label={`${create ? 'Sign Up' : 'Sign In'} with Google`} left={<AppText variant="subtitle" color={theme.colors.google}>G</AppText>} />
        <AppButton variant="outline" label={`${create ? 'Sign Up' : 'Sign In'} with Facebook`} left={<Ionicons name="logo-facebook" size={18} color={theme.colors.facebook} />} />
      </View>
      <Pressable style={styles.switcher} onPress={() => router.replace((create ? '/login' : '/create-account') as Href)}>
        <AppText variant="body" color={theme.colors.violet}>{create ? 'Already Have an Account' : 'Create a New Account'}</AppText>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({ screen: { flexGrow: 1, paddingTop: 36, paddingBottom: 24 }, heading: { gap: 5, marginBottom: 30 }, form: { gap: 17, marginBottom: 26 }, divider: { marginVertical: 18, flexDirection: 'row', alignItems: 'center', gap: 12 }, line: { flex: 1, height: 1, backgroundColor: theme.colors.line }, socials: { gap: 12 }, switcher: { marginTop: 18, alignItems: 'center' } });

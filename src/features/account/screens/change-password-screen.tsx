import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';
import { AppButton } from '@/components/ui/app-button';
import { AppHeader } from '@/components/ui/app-header';
import { AppInput } from '@/components/ui/app-input';
import { AppScreen } from '@/components/ui/app-screen';

const schema = z.object({ password: z.string().min(8), confirm: z.string().min(8) }).refine((value) => value.password === value.confirm, { path: ['confirm'], message: 'Passwords must match' });
type Values = z.infer<typeof schema>;
export function ChangePasswordScreen() { const { control, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { password: '', confirm: '' } }); return <AppScreen><AppHeader title="Change Password" /><View style={styles.form}><Controller name="password" control={control} render={({ field }) => <AppInput {...field} onChangeText={field.onChange} label="New Password" icon="lock-closed-outline" password placeholder="Enter new password" error={errors.password?.message} />} /><Controller name="confirm" control={control} render={({ field }) => <AppInput {...field} onChangeText={field.onChange} label="Confirm Password" icon="lock-closed-outline" password placeholder="Confirm your new password" error={errors.confirm?.message} />} /></View><View style={styles.bottom}><AppButton label="Change Now" onPress={handleSubmit(() => router.back())} /></View></AppScreen>; }
const styles = StyleSheet.create({ form: { flex: 1, paddingTop: 16, gap: 16 }, bottom: { paddingBottom: 16 } });

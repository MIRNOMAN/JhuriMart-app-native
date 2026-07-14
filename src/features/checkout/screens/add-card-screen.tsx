import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

import { AppButton } from '@/components/ui/app-button';
import { AppHeader } from '@/components/ui/app-header';
import { AppInput } from '@/components/ui/app-input';
import { AppScreen } from '@/components/ui/app-screen';
import { useCheckoutStore } from '@/store/checkout-store';

const schema = z.object({ number: z.string().regex(/^\d{16}$/, 'Enter a 16 digit card number'), name: z.string().min(2, 'Enter the card holder name'), expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Use MM/YY'), cvc: z.string().regex(/^\d{3,4}$/, 'Enter a valid CVC') });
type CardValues = z.infer<typeof schema>;
export function AddCardScreen() {
  const setCard = useCheckoutStore((state) => state.setCard);
  const { control, handleSubmit, formState: { errors } } = useForm<CardValues>({ resolver: zodResolver(schema), defaultValues: { number: '', name: '', expiry: '', cvc: '' } });
  return <AppScreen><AppHeader title="Add New Card" /><View style={styles.form}><Controller control={control} name="number" render={({ field }) => <AppInput {...field} onChangeText={field.onChange} label="Card Number" icon="card-outline" placeholder="Enter Card Number" keyboardType="number-pad" maxLength={16} error={errors.number?.message} />} /><Controller control={control} name="name" render={({ field }) => <AppInput {...field} onChangeText={field.onChange} label="Card Holder Name" icon="person-outline" placeholder="Enter Holder Name" error={errors.name?.message} />} /><Controller control={control} name="expiry" render={({ field }) => <AppInput {...field} onChangeText={field.onChange} label="Expired" icon="calendar-outline" placeholder="MM/YY" error={errors.expiry?.message} />} /><Controller control={control} name="cvc" render={({ field }) => <AppInput {...field} onChangeText={field.onChange} label="CVV Code" icon="lock-closed-outline" placeholder="CVC" keyboardType="number-pad" maxLength={4} error={errors.cvc?.message} />} /></View><View style={styles.bottom}><AppButton label="Add Card" onPress={handleSubmit(({ number }) => { setCard(number.slice(-4)); router.back(); })} /></View></AppScreen>;
}
const styles = StyleSheet.create({ form: { flex: 1, gap: 16, paddingTop: 16 }, bottom: { paddingBottom: 16 } });

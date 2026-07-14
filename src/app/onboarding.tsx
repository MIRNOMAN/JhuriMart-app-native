import { router, type Href } from 'expo-router';
import { OnboardingScreen } from '@/features/onboarding/screens/onboarding-screen';
import { useAuthStore } from '@/store/auth-store';

export default function OnboardingRoute() {
  const setOnboarded = useAuthStore((state) => state.setOnboarded);
  return <OnboardingScreen onCreateAccount={() => { setOnboarded(); router.push('/create-account' as Href); }} onLogin={() => { setOnboarded(); router.push('/login' as Href); }} />;
}

import { useEffect } from 'react';
import { router, type Href } from 'expo-router';

import { BrandSplashScreen } from '@/features/onboarding/screens/brand-splash-screen';
import { useAuthStore } from '@/store/auth-store';

export default function SplashRoute() {
  const { authenticated, hasOnboarded } = useAuthStore();
  useEffect(() => {
    const timeout = setTimeout(() => router.replace((authenticated ? '/(tabs)' : hasOnboarded ? '/login' : '/onboarding') as Href), 1300);
    return () => clearTimeout(timeout);
  }, [authenticated, hasOnboarded]);
  return <BrandSplashScreen />;
}

import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import AppTabs from '@/components/app-tabs';
import { SignupFlowScreen } from '@/features/auth/screens/signup-flow-screen';
import { BrandSplashScreen } from '@/features/onboarding/screens/brand-splash-screen';
import { OnboardingScreen } from '@/features/onboarding/screens/onboarding-screen';


SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 350, fade: true });

const ONBOARDING_KEY = '@jhurimart/onboarding-complete';
const AUTH_KEY = '@jhurimart/auth-complete';
const MINIMUM_SPLASH_TIME = 1400;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_800ExtraBold,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function prepareApp() {
      const startedAt = Date.now();

      try {
        const [storedValue, storedAuth] = await Promise.all([
          AsyncStorage.getItem(ONBOARDING_KEY),
          AsyncStorage.getItem(AUTH_KEY),
        ]);
        if (mounted) {
          setHasSeenOnboarding(storedValue === 'true');
          setIsAuthenticated(storedAuth === 'true');
        }
      } catch {
        // If storage is unavailable, onboarding remains visible instead of being skipped.
      }

      const remainingTime = Math.max(0, MINIMUM_SPLASH_TIME - (Date.now() - startedAt));
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      if (mounted) {
        setIsLoading(false);
      }
    }

    prepareApp();

    return () => {
      mounted = false;
    };
  }, []);

  const handleRootLayout = useCallback(() => {
    SplashScreen.hide();
  }, []);

  const finishOnboarding = useCallback(async () => {
    setHasSeenOnboarding(true);
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } catch {
      // The user can still enter the app when persistence fails.
    }
  }, []);

  const finishAuthentication = useCallback(async () => {
    setIsAuthenticated(true);
    try {
      await AsyncStorage.setItem(AUTH_KEY, 'true');
    } catch {
      // Authentication can still finish if local persistence is unavailable.
    }
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {isLoading || (!fontsLoaded && !fontError) ? (
          <BrandSplashScreen  onLayout={handleRootLayout} />
        ) : isAuthenticated ? (
          <AppTabs />
        ) : hasSeenOnboarding ? (
          <SignupFlowScreen onComplete={finishAuthentication} />
        ) : (
          <OnboardingScreen onComplete={finishOnboarding} />
        )}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

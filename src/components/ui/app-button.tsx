import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { theme } from '@/constants/theme';
import { AppText } from './app-text';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';
type AppButtonProps = PressableProps & { label: string; variant?: ButtonVariant; left?: React.ReactNode; fullWidth?: boolean };

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Animated button supporting all core Kutuku action styles. */
export function AppButton({ label, variant = 'primary', left, fullWidth = true, disabled, style, ...props }: AppButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPressIn={() => { scale.set(withTiming(0.98, { duration: 90 })); }}
      onPressOut={() => { scale.set(withTiming(1, { duration: 120 })); }}
      style={[styles.base, styles[variant], fullWidth && styles.full, disabled && styles.disabled, animatedStyle, style]}
      {...props}>
      {left ? <View style={styles.icon}>{left}</View> : null}
      <AppText variant="label" color={variant === 'primary' ? theme.colors.white : variant === 'danger' ? theme.colors.danger : theme.colors.violet}>
        {label}
      </AppText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 48, paddingHorizontal: 20, borderRadius: theme.radius.pill, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  full: { width: '100%' },
  primary: { backgroundColor: theme.colors.violet },
  outline: { backgroundColor: theme.colors.white, borderWidth: 1, borderColor: theme.colors.lineStrong },
  ghost: { backgroundColor: theme.colors.transparent },
  danger: { backgroundColor: theme.colors.white },
  icon: { marginRight: 10 },
  disabled: { opacity: 0.45 },
});

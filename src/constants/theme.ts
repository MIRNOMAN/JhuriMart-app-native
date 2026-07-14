import { Platform } from 'react-native';

export const palette = {
  violet: '#5752C7',
  violetDark: '#4843B3',
  violetSoft: '#EFEEFF',
  ink: '#252438',
  body: '#5F5E70',
  muted: '#AAA9BC',
  subtle: '#CAC9D7',
  white: '#FFFFFF',
  surface: '#F8F8FC',
  surfaceStrong: '#F1F1F7',
  line: '#ECECF3',
  lineStrong: '#DDDDE9',
  success: '#13C76B',
  successSoft: '#E5FAEF',
  danger: '#FF4D5E',
  dangerSoft: '#FFF0F2',
  warning: '#FF9A5A',
  warningSoft: '#FFF2E9',
  info: '#4E9BFF',
  infoSoft: '#E9F6FF',
  google: '#4285F4',
  facebook: '#1877F2',
  splashText: '#E9E8FF',
  splashSubtle: '#DDDBFF',
  successRing: '#E3FBF0',
  warmSurface: '#EAE7E2',
  coolSurface: '#DDF3F3',
  heroSurface: '#F5F0F5',
  avatarSurface: '#EEEAE7',
  avatarBlue: '#D6E7E8',
  overlay: 'rgba(37, 36, 56, 0.28)',
  transparent: 'transparent',
} as const;

export const theme = {
  colors: palette,
  spacing: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 20, xl: 24, xxl: 32, huge: 40 },
  radius: { xs: 6, sm: 8, md: 12, lg: 16, xl: 24, pill: 999 },
  type: {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semibold: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
  },
  shadow: {
    card: Platform.select({
      ios: { shadowColor: '#252438', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 2 },
      default: { boxShadow: '0 4px 16px rgba(37,36,56,0.06)' },
    }),
    sheet: Platform.select({
      ios: { shadowColor: '#252438', shadowOpacity: 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: -4 } },
      android: { elevation: 12 },
      default: { boxShadow: '0 -4px 24px rgba(37,36,56,0.12)' },
    }),
  },
} as const;

export const layout = { referenceWidth: 375, maxPhoneWidth: 430, tabletContentWidth: 560 } as const;

export type AppColor = keyof typeof palette;
export const productSwatches = ['#B77778', '#050505', '#2CA7B2', '#14C979'] as const;
export const filterSwatches = ['#252438', '#DCD3EF', '#D4E5F3', '#E8DAB8', '#F1D4D4'] as const;
export const avatarSwatches = ['#EBD8D0', '#D5E8F2', '#EAD7D9', '#DED4C7'] as const;
export const locationSwatches = ['#14C979', '#9D8BFA', '#FF7481'] as const;

// Compatibility exports for legacy screens while they are migrated to Kutuku primitives.
export const Colors = {
  light: { text: palette.ink, background: palette.white, backgroundElement: palette.surface, backgroundSelected: palette.violetSoft, textSecondary: palette.body },
  dark: { text: palette.white, background: palette.ink, backgroundElement: palette.body, backgroundSelected: palette.violetDark, textSecondary: palette.subtle },
} as const;
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
export const Fonts = { sans: theme.type.regular, serif: theme.type.regular, rounded: theme.type.medium, mono: 'monospace' } as const;
export const Spacing = { half: 2, one: 4, two: 8, three: 16, four: 24, five: 32, six: 64 } as const;
export const BottomTabInset = 90;
export const MaxContentWidth = 800;

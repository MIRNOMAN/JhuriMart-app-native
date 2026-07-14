import { Text, type TextProps, type TextStyle } from 'react-native';

import { theme } from '@/constants/theme';

type AppTextVariant = 'caption' | 'body' | 'label' | 'subtitle' | 'title' | 'display';

type AppTextProps = TextProps & { variant?: AppTextVariant; color?: string; align?: TextStyle['textAlign'] };

const variants: Record<AppTextVariant, TextStyle> = {
  caption: { fontFamily: theme.type.regular, fontSize: 10, lineHeight: 15 },
  body: { fontFamily: theme.type.regular, fontSize: 12, lineHeight: 18 },
  label: { fontFamily: theme.type.semibold, fontSize: 11, lineHeight: 16 },
  subtitle: { fontFamily: theme.type.semibold, fontSize: 14, lineHeight: 20 },
  title: { fontFamily: theme.type.bold, fontSize: 18, lineHeight: 25 },
  display: { fontFamily: theme.type.bold, fontSize: 26, lineHeight: 34 },
};

/** Typography primitive backed by the Kutuku font scale. */
export function AppText({ variant = 'body', color = theme.colors.ink, align, style, ...props }: AppTextProps) {
  return <Text {...props} style={[variants[variant], { color, textAlign: align }, style]} />;
}

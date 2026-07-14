import { forwardRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '@/constants/theme';
import { AppText } from './app-text';

type AppInputProps = TextInputProps & { label?: string; error?: string; icon?: keyof typeof Ionicons.glyphMap; password?: boolean };

/** Labelled form field with icon, password visibility, focus, and validation states. */
export const AppInput = forwardRef<TextInput, AppInputProps>(function AppInput({ label, error, icon, password, style, onFocus, onBlur, ...props }, ref) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(password);
  return (
    <View style={styles.group}>
      {label ? <AppText variant="label" style={styles.label}>{label}</AppText> : null}
      <View style={[styles.field, focused && styles.focused, error && styles.invalid]}>
        {icon ? <Ionicons name={icon} size={17} color={focused ? theme.colors.violet : theme.colors.subtle} /> : null}
        <TextInput
          ref={ref}
          placeholderTextColor={theme.colors.subtle}
          secureTextEntry={Boolean(hidden)}
          style={[styles.input, style]}
          onFocus={(event) => { setFocused(true); onFocus?.(event); }}
          onBlur={(event) => { setFocused(false); onBlur?.(event); }}
          {...props}
        />
        {password ? (
          <Pressable onPress={() => setHidden((value) => !value)} hitSlop={8}>
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={17} color={theme.colors.subtle} />
          </Pressable>
        ) : null}
      </View>
      {error ? <AppText variant="caption" color={theme.colors.danger}>{error}</AppText> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  group: { gap: 7 }, label: { marginLeft: 1 },
  field: { minHeight: 48, paddingHorizontal: 13, borderWidth: 1, borderColor: theme.colors.transparent, borderRadius: theme.radius.md, backgroundColor: theme.colors.surface, flexDirection: 'row', alignItems: 'center', gap: 10 },
  focused: { borderColor: theme.colors.violet, backgroundColor: theme.colors.white },
  invalid: { borderColor: theme.colors.danger },
  input: { flex: 1, paddingVertical: 0, color: theme.colors.ink, fontFamily: theme.type.regular, fontSize: 11 },
});

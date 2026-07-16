import { Ionicons } from "@expo/vector-icons";
import { router, type Href, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { AppButton } from "@/components/ui/app-button";
import { AppHeader } from "@/components/ui/app-header";
import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/app-text";
import { theme } from "@/constants/theme";

export function VerificationScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(30);
  const refs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const updateDigits = (value: string, index: number) => {
    const numbers = value.replace(/\D/g, "");
    if (!numbers) {
      setDigits((current) => current.map((digit, i) => (i === index ? "" : digit)));
      setError("");
      return;
    }

    const next = [...digits];
    numbers.slice(0, 4 - index).split("").forEach((digit, offset) => {
      next[index + offset] = digit;
    });
    setDigits(next);
    setError("");
    const nextIndex = Math.min(index + numbers.length, 3);
    refs.current[nextIndex]?.focus();
  };

  const submit = () => {
    if (digits.some((digit) => !digit)) {
      setError("Please enter the complete 4-digit code");
      refs.current[digits.findIndex((digit) => !digit)]?.focus();
      return;
    }
    router.replace("/register-success" as Href);
  };

  const resend = () => {
    if (secondsLeft > 0) return;
    setDigits(["", "", "", ""]);
    setError("");
    setSecondsLeft(30);
    refs.current[0]?.focus();
  };

  return (
    <AppScreen style={styles.screen}>
      <AppHeader title="Verification" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.content}
      >
        <View style={styles.iconRing}>
          <View style={styles.icon}>
            <Ionicons name="mail-unread" size={24} color={theme.colors.white} />
          </View>
        </View>
        <AppText variant="title">Verification Code</AppText>
        <AppText variant="caption" color={theme.colors.muted} align="center">
          We sent a verification code to{`\n`}
          <AppText variant="caption" color={theme.colors.ink}>
            {email ?? "magdalena83@gmail.com"}
          </AppText>
        </AppText>
        <View style={styles.otp}>
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(node) => {
                refs.current[index] = node;
              }}
              value={digit}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete={index === 0 ? "sms-otp" : "off"}
              maxLength={index === 0 ? 4 : 1}
              selectTextOnFocus
              accessibilityLabel={`Verification digit ${index + 1}`}
              onFocus={() => setFocusedIndex(index)}
              onChangeText={(value) => updateDigits(value, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
                  refs.current[index - 1]?.focus();
                }
              }}
              style={[
                styles.cell,
                focusedIndex === index && styles.activeCell,
                error && styles.errorCell,
              ]}
            />
          ))}
        </View>
        {error ? (
          <AppText variant="caption" color={theme.colors.danger} align="center">
            {error}
          </AppText>
        ) : null}
        <AppButton
          label="Submit"
          onPress={submit}
        />
        <Pressable
          accessibilityRole="button"
          disabled={secondsLeft > 0}
          hitSlop={8}
          onPress={resend}
        >
          <AppText variant="caption" color={theme.colors.muted}>
            Didn&apos;t receive the code?{" "}
            <AppText
              variant="caption"
              color={secondsLeft > 0 ? theme.colors.subtle : theme.colors.violet}
            >
              {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend"}
            </AppText>
          </AppText>
        </Pressable>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}
const styles = StyleSheet.create({
  screen: { paddingHorizontal: 12 },
  content: { flex: 1, alignItems: "center", paddingTop: 40, gap: 14 },
  iconRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: theme.colors.violetSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.violet,
    alignItems: "center",
    justifyContent: "center",
  },
  otp: { flexDirection: "row", gap: 8, marginTop: 18, marginBottom: 4 },
  cell: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    textAlign: "center",
    color: theme.colors.ink,
    fontFamily: theme.type.semibold,
    fontSize: 16,
  },
  activeCell: {
    borderWidth: 1,
    borderColor: theme.colors.violet,
    backgroundColor: theme.colors.white,
  },
  errorCell: { borderWidth: 1, borderColor: theme.colors.danger },
});

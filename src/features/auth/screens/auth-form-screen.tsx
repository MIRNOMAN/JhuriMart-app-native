import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

import { AppButton } from "@/components/ui/app-button";
import { AppInput } from "@/components/ui/app-input";
import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/app-text";
import { theme } from "@/constants/theme";
import { useAuthStore } from "@/store/auth-store";

const createSchema = z.object({
  username: z.string().min(2, "Enter your username"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
});
type CreateValues = z.infer<typeof createSchema>;

const recoverySchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string().min(8, "Use at least 8 characters"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });
type RecoveryValues = z.infer<typeof recoverySchema>;
type RecoveryStep = "forgot" | "new-password";

type AuthFormScreenProps = { mode: "create" | "login" };

export function AuthFormScreen({ mode }: AuthFormScreenProps) {
  const create = mode === "create";
  const signIn = useAuthStore((state) => state.signIn);
  const [recoveryStep, setRecoveryStep] = useState<RecoveryStep | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateValues>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      username: create ? "" : "Login User",
      email: "",
      password: "",
    },
  });
  const submit = ({ email }: CreateValues) => {
    if (create) {
      router.push({ pathname: "/verification", params: { email } });
      return;
    }
    signIn();
    router.replace("/(tabs)" as Href);
  };
  return (
    <AppScreen scroll style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.heading}>
        <AppText variant="title" style={styles.title}>
          {create ? "Create Account" : "Login Account"}
        </AppText>
        <AppText
          variant="caption"
          style={styles.description}
          color={theme.colors.muted}
        >
          {create
            ? "Start learning with create your account"
            : "Please login with registered account"}
        </AppText>
      </View>
      <View style={styles.form}>
        {create ? (
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Username"
                icon="person-outline"
                placeholder="Create your username"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.username?.message}
              />
            )}
          />
        ) : null}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              style={styles.input}
              fieldStyle={!create ? styles.loginField : undefined}
              label="Email or Phone Number"
              icon="mail-outline"
              placeholder="Enter your email or phone number"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              style={styles.input}
              fieldStyle={!create ? styles.loginField : undefined}
              label="Password"
              icon="lock-closed-outline"
              placeholder="Create your password"
              password
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
        />
        {!create ? (
          <Pressable
            style={styles.forgot}
            onPress={() => setRecoveryStep("forgot")}
          >
            <AppText
              variant="caption"
              color={theme.colors.violet}
              align="right"
            >
              Forgot Password?
            </AppText>
          </Pressable>
        ) : null}
      </View>
      <AppButton
        style={styles.primaryButton}
        labelStyle={styles.buttonLabel}
        label={create ? "Create Account" : "Sign In"}
        onPress={handleSubmit(submit)}
      />
      <View style={styles.divider}>
        {create ? <View style={styles.line} /> : null}
        <AppText variant="caption" color={theme.colors.muted}>
          Or using other method
        </AppText>
        {create ? <View style={styles.line} /> : null}
      </View>
      <View style={styles.socials}>
        <AppButton
          style={!create ? styles.socialButton : undefined}
          labelStyle={!create ? styles.socialLabel : undefined}
          variant="outline"
          label={`${create ? "Sign Up" : "Sign In"} with Google`}
          left={
            <Ionicons
              name="logo-google"
              size={20}
              color={theme.colors.google}
            />
          }
        />
        <AppButton
          style={!create ? styles.socialButton : undefined}
          labelStyle={!create ? styles.socialLabel : undefined}
          variant="outline"
          label={`${create ? "Sign Up" : "Sign In"} with Facebook`}
          left={
            <Ionicons
              name="logo-facebook"
              size={20}
              color={theme.colors.facebook}
            />
          }
        />
      </View>
      {!create ? (
        <AppButton
          variant="outline"
          style={styles.signupButton}
          labelStyle={styles.signupLabel}
          label="Create New Account"
          onPress={() => router.push("/create-account" as Href)}
        />
      ) : null}
      {create ? (
        <Pressable
          style={styles.switcher}
          onPress={() => router.replace("/login" as Href)}
        >
          <AppText variant="body" color={theme.colors.violet}>
            {create ? "Already Have an Account" : "Create a New Account"}
          </AppText>
        </Pressable>
      ) : null}
      {!create ? (
        <RecoveryModal
          step={recoveryStep}
          onClose={() => setRecoveryStep(null)}
          onNext={() => setRecoveryStep("new-password")}
        />
      ) : null}
    </AppScreen>
  );
}

function RecoveryModal({
  step,
  onClose,
  onNext,
}: {
  step: RecoveryStep | null;
  onClose: () => void;
  onNext: () => void;
}) {
  const insets = useSafeAreaInsets();
  const forgot = step === "forgot";
  const {
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<RecoveryValues>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: "magdalena83@gmail.com",
      password: "",
      confirmPassword: "",
    },
  });

  const close = () => {
    reset();
    onClose();
  };

  const submit = async () => {
    if (forgot) {
      if (await trigger("email")) onNext();
      return;
    }
    if (await trigger(["password", "confirmPassword"])) close();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      statusBarTranslucent
      visible={step !== null}
      onRequestClose={close}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.modalRoot}
      >
        <Pressable
          accessibilityLabel="Close password recovery"
          style={styles.backdrop}
          onPress={close}
        />
        <View
          style={[
            styles.sheet,
            forgot ? styles.forgotSheet : styles.passwordSheet,
            { paddingBottom: Math.max(insets.bottom, 24) },
          ]}
        >
          <View style={styles.handle} />
          <Animated.View
            key={step}
            style={styles.sheetBody}
            entering={FadeInRight.duration(220)}
            exiting={FadeOutLeft.duration(160)}
          >
            <AppText variant="title" style={styles.sheetTitle}>
              {forgot ? "Forgot Password" : "Create New Password"}
            </AppText>
            <AppText
              variant="caption"
              style={styles.sheetDescription}
              color={theme.colors.muted}
            >
              {forgot
                ? "Enter your email or phone number"
                : "Enter your new password below"}
            </AppText>
            <View style={styles.recoveryForm}>
              {forgot ? (
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onBlur, onChange, value } }) => (
                    <AppInput
                      autoCapitalize="none"
                      keyboardType="email-address"
                      label="Email or Phone Number"
                      icon="mail-outline"
                      fieldStyle={styles.recoveryField}
                      style={styles.input}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.email?.message}
                    />
                  )}
                />
              ) : (
                <>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <AppInput
                        label="Password"
                        icon="lock-closed-outline"
                        placeholder="Create your new password"
                        password
                        fieldStyle={styles.recoveryField}
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={errors.password?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <AppInput
                        label="Confirm Password"
                        icon="lock-closed-outline"
                        placeholder="Confirm your new password"
                        password
                        fieldStyle={styles.recoveryField}
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={errors.confirmPassword?.message}
                      />
                    )}
                  />
                </>
              )}
            </View>
            <AppButton
              style={styles.recoveryButton}
              labelStyle={styles.buttonLabel}
              label={forgot ? "Send Code" : "Change Password"}
              onPress={submit}
            />
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 28 },
  heading: { gap: 5, marginTop: 30, marginBottom: 31 },
  title: { fontSize: 24, lineHeight: 35 },
  description: { fontSize: 13, lineHeight: 17 },
  form: { gap: 20, marginBottom: 34 },
  loginField: { minHeight: 56, borderRadius: 14, paddingHorizontal: 14 },
  input: { fontSize: 14 },
  forgot: { marginTop: -6, fontSize: 15 },
  primaryButton: { minHeight: 55 },
  buttonLabel: { fontSize: 15, lineHeight: 20 },
  divider: {
    marginTop: 19,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  line: { flex: 1, height: 1, backgroundColor: theme.colors.line },
  socials: { gap: 14 },
  socialButton: {
    minHeight: 54,
    borderColor: theme.colors.line,
    borderRadius: 27,
  },
  socialLabel: { color: theme.colors.ink, fontSize: 14, lineHeight: 20 },
  signupButton: {
    minHeight: 54,
    marginTop: 18,
    borderColor: theme.colors.violet,
    borderRadius: 27,
  },
  signupLabel: { color: theme.colors.violet, fontSize: 14, lineHeight: 20 },
  switcher: { marginTop: 18, alignItems: "center" },
  modalRoot: { flex: 1, justifyContent: "flex-end" },
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(37, 36, 56, 0.34)",
  },
  sheet: {
    paddingHorizontal: 28,
    paddingTop: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: theme.colors.white,
    ...theme.shadow.sheet,
  },
  forgotSheet: { minHeight: 370 },
  passwordSheet: { minHeight: 480 },
  sheetBody: { flex: 1 },
  handle: {
    width: 54,
    height: 5,
    marginBottom: 22,
    borderRadius: 3,
    backgroundColor: theme.colors.lineStrong,
    alignSelf: "center",
  },
  sheetTitle: { fontSize: 19, lineHeight: 27 },
  sheetDescription: { marginTop: 4, fontSize: 12, lineHeight: 18 },
  recoveryForm: { gap: 18, marginTop: 25, marginBottom: 29 },
  recoveryField: { minHeight: 56, borderRadius: 14, paddingHorizontal: 14 },
  recoveryButton: { minHeight: 55, marginTop: "auto" },
});

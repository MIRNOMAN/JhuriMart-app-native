import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PURPLE = '#5752C7';
const INK = '#27263A';
const MUTED = '#AAA9BC';
const BORDER = '#EFEFF5';
const FIELD = '#FAFAFD';

type SignupFlowScreenProps = {
  onComplete: () => void;
};

type FieldProps = {
  icon: string;
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'email-address';
  secureTextEntry?: boolean;
  trailingIcon?: string;
};

function Field({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry,
  trailingIcon,
}: FieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.field, focused && styles.fieldFocused]}>
        <Text style={[styles.fieldIcon, focused && styles.fieldIconFocused]}>{icon}</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={keyboardType}
          onBlur={() => setFocused(false)}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          placeholderTextColor="#C6C5D4"
          secureTextEntry={secureTextEntry}
          selectionColor={PURPLE}
          style={styles.fieldInput}
          value={value}
        />
        {trailingIcon ? <Text style={styles.trailingIcon}>{trailingIcon}</Text> : null}
      </View>
    </View>
  );
}

function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  const [scale] = useState(() => new Animated.Value(1));

  const animate = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      damping: 18,
      stiffness: 330,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        onPressIn={() => animate(0.975)}
        onPressOut={() => animate(1)}
        style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

function SignupStep({ onNext }: { onNext: (email: string) => void }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={8}
      style={styles.flex}>
      <View style={styles.signupContent}>
        <View style={styles.headingBlock}>
          <Text style={styles.heading}>Create Account</Text>
          <Text style={styles.subheading}>Start learning with create your account</Text>
        </View>

        <Field
          icon="♙"
          label="Username"
          onChangeText={setUsername}
          placeholder="Create your username"
          value={username}
        />
        <Field
          icon="✉"
          keyboardType="email-address"
          label="Email or Phone Number"
          onChangeText={setEmail}
          placeholder="Enter your email or phone number"
          value={email}
        />
        <Field
          icon="♙"
          label="Password"
          onChangeText={setPassword}
          placeholder="Create your password"
          secureTextEntry
          trailingIcon="◉"
          value={password}
        />

        <View style={styles.buttonSpace}>
          <PrimaryButton
            label="Create Account"
            onPress={() => onNext(email.trim() || 'magdalena83@gmail.com')}
          />
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or using other method</Text>
          <View style={styles.divider} />
        </View>

        <Pressable style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}>
          <Text style={styles.google}>G</Text>
          <Text style={styles.socialText}>Sign Up with Google</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}>
          <View style={styles.facebookCircle}>
            <Text style={styles.facebook}>f</Text>
          </View>
          <Text style={styles.socialText}>Sign Up with Facebook</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function VerificationStep({
  email,
  onBack,
  onSuccess,
}: {
  email: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const changeDigit = (value: string, index: number) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < 3) inputs.current[index + 1]?.focus();
  };

  return (
    <View style={styles.verification}>
      <View style={styles.topBar}>
        <Pressable accessibilityLabel="Back" hitSlop={12} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Verification</Text>
        <View style={styles.topBarSpacer} />
      </View>

      <View style={styles.verificationBody}>
        <View style={styles.mailHalo}>
          <View style={styles.mailCircle}>
            <Text style={styles.mailIcon}>✉</Text>
            <View style={styles.mailBadge}>
              <Text style={styles.mailBadgeText}>✓</Text>
            </View>
          </View>
        </View>

        <Text style={styles.verificationTitle}>Verification Code</Text>
        <Text style={styles.verificationCopy}>
          We have to sent the code verification to{'\n'}
          <Text style={styles.emailText}>{email}</Text>
        </Text>

        <View style={styles.otpRow}>
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(input) => {
                inputs.current[index] = input;
              }}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(value) => changeDigit(value, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
                  inputs.current[index - 1]?.focus();
                }
              }}
              selectionColor={PURPLE}
              style={[styles.otpInput, digit && styles.otpInputFilled]}
              value={digit}
            />
          ))}
        </View>

        <View style={styles.submitButton}>
          <PrimaryButton label="Submit" onPress={onSuccess} />
        </View>
        <Text style={styles.resendText}>
          Didn&apos;t receive the code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </View>
    </View>
  );
}

function SuccessSheet({ onComplete }: { onComplete: () => void }) {
  const [backdrop] = useState(() => new Animated.Value(0));
  const [slide] = useState(() => new Animated.Value(420));
  const [checkScale] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(backdrop, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(slide, {
        toValue: 0,
        damping: 21,
        stiffness: 175,
        mass: 0.8,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.spring(checkScale, {
        toValue: 1,
        damping: 11,
        stiffness: 220,
        useNativeDriver: true,
      }).start();
    });
  }, [backdrop, checkScale, slide]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[styles.backdrop, { opacity: backdrop }]} />
      <Animated.View style={[styles.successSheet, { transform: [{ translateY: slide }] }]}>
        <View style={styles.sheetHandle} />
        <Animated.View style={[styles.successHalo, { transform: [{ scale: checkScale }] }]}>
          <View style={styles.successCircle}>
            <Text style={styles.check}>✓</Text>
          </View>
        </Animated.View>
        <Text style={styles.successTitle}>Register Success</Text>
        <Text style={styles.successCopy}>
          Congratulation! your account already created.{'\n'}Please login to get amazing experience.
        </Text>
        <View style={styles.homeButton}>
          <PrimaryButton label="Go to Homepage" onPress={onComplete} />
        </View>
      </Animated.View>
    </View>
  );
}

export function SignupFlowScreen({ onComplete }: SignupFlowScreenProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [step, setStep] = useState<'signup' | 'verification'>('signup');
  const [email, setEmail] = useState('magdalena83@gmail.com');
  const [showSuccess, setShowSuccess] = useState(false);
  const [transition] = useState(() => new Animated.Value(1));

  const contentStyle = useMemo(
    () => ({
      opacity: transition,
      transform: [
        {
          translateX: transition.interpolate({
            inputRange: [0, 1],
            outputRange: [Math.min(width * 0.08, 30), 0],
          }),
        },
      ],
    }),
    [transition, width],
  );

  const moveTo = (nextStep: 'signup' | 'verification') => {
    Animated.timing(transition, {
      toValue: 0,
      duration: 120,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setStep(nextStep);
      Animated.timing(transition, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 10), paddingBottom: insets.bottom },
      ]}>
      <StatusBar style="dark" />
      <Animated.View style={[styles.flex, contentStyle]}>
        {step === 'signup' ? (
          <SignupStep
            onNext={(value) => {
              setEmail(value);
              moveTo('verification');
            }}
          />
        ) : (
          <VerificationStep
            email={email}
            onBack={() => moveTo('signup')}
            onSuccess={() => setShowSuccess(true)}
          />
        )}
      </Animated.View>
      {showSuccess ? <SuccessSheet onComplete={onComplete} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  signupContent: { flex: 1, paddingHorizontal: 25, paddingTop: 24 },
  headingBlock: { marginBottom: 27 },
  heading: { color: INK, fontSize: 18, lineHeight: 23, fontWeight: '800', letterSpacing: -0.35 },
  subheading: { marginTop: 8, color: MUTED, fontSize: 10, lineHeight: 14 },
  fieldGroup: { marginBottom: 18 },
  fieldLabel: { marginBottom: 8, color: INK, fontSize: 11, lineHeight: 14, fontWeight: '700' },
  field: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: FIELD,
    borderRadius: 12,
    backgroundColor: FIELD,
    paddingHorizontal: 14,
  },
  fieldFocused: { borderColor: PURPLE, backgroundColor: '#FFFFFF' },
  fieldIcon: { width: 23, color: '#B9B8CA', fontSize: 16 },
  fieldIconFocused: { color: PURPLE },
  fieldInput: { flex: 1, color: INK, fontSize: 10, height: '100%', paddingVertical: 0 },
  trailingIcon: { color: '#B9B8CA', fontSize: 12 },
  buttonSpace: { marginTop: 4 },
  primaryButton: {
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
    backgroundColor: PURPLE,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 2,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 19 },
  divider: { flex: 1, height: 1, backgroundColor: BORDER },
  dividerText: { color: MUTED, fontSize: 9 },
  socialButton: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 25,
    marginBottom: 12,
  },
  pressed: { opacity: 0.68 },
  socialText: { marginLeft: 12, color: INK, fontSize: 10, fontWeight: '700' },
  google: { color: '#4285F4', fontSize: 18, fontWeight: '800' },
  facebookCircle: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: '#1877F2',
  },
  facebook: { color: '#FFFFFF', fontSize: 14, lineHeight: 17, fontWeight: '800' },
  verification: { flex: 1 },
  topBar: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingHorizontal: 24,
  },
  backArrow: { color: INK, fontSize: 28, lineHeight: 30, fontWeight: '300' },
  topBarTitle: { color: INK, fontSize: 11, fontWeight: '700' },
  topBarSpacer: { width: 18 },
  verificationBody: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 39 },
  mailHalo: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    backgroundColor: '#F0EFFE',
  },
  mailCircle: {
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 33,
    backgroundColor: PURPLE,
  },
  mailIcon: { color: '#FFFFFF', fontSize: 25 },
  mailBadge: {
    position: 'absolute',
    right: 13,
    bottom: 14,
    width: 13,
    height: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  mailBadgeText: { color: PURPLE, fontSize: 8, fontWeight: '900' },
  verificationTitle: { marginTop: 24, color: INK, fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  verificationCopy: { marginTop: 10, color: MUTED, fontSize: 10, lineHeight: 16, textAlign: 'center' },
  emailText: { color: INK, fontWeight: '600' },
  otpRow: { flexDirection: 'row', gap: 9, marginTop: 27 },
  otpInput: {
    width: 53,
    height: 58,
    padding: 0,
    borderWidth: 1,
    borderColor: FIELD,
    borderRadius: 12,
    backgroundColor: FIELD,
    color: INK,
    fontSize: 21,
    fontWeight: '600',
    textAlign: 'center',
  },
  otpInputFilled: { borderColor: PURPLE, backgroundColor: '#FFFFFF' },
  submitButton: { width: '100%', marginTop: 35 },
  resendText: { marginTop: 20, color: MUTED, fontSize: 9 },
  resendLink: { color: PURPLE, fontWeight: '700' },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(30, 30, 42, 0.20)',
  },
  successSheet: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 430,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
  },
  sheetHandle: { width: 42, height: 4, borderRadius: 2, backgroundColor: '#E6E5EC', marginTop: 10 },
  successHalo: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    backgroundColor: '#E5FAEE',
    marginTop: 36,
  },
  successCircle: {
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 33,
    backgroundColor: '#10CE70',
  },
  check: { color: '#FFFFFF', fontSize: 26, fontWeight: '900' },
  successTitle: { marginTop: 23, color: INK, fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  successCopy: { marginTop: 10, color: MUTED, fontSize: 9, lineHeight: 15, textAlign: 'center' },
  homeButton: { position: 'absolute', right: 25, bottom: 23, left: 25 },
});

import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PURPLE = '#5752C7';
const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 60 };

const slides = [
  {
    id: 'collections',
    image: require('../../../../assets/images/onboarding/collections.png'),
    title: 'Various Collections Of The\nLatest Products',
  },
  {
    id: 'choices',
    image: require('../../../../assets/images/onboarding/colors-and-sizes.png'),
    title: 'Complete Collection Of\nColors And Sizes',
  },
  {
    id: 'outfit',
    image: require('../../../../assets/images/onboarding/outfit.png'),
    title: 'Find The Most Suitable\nOutfit For You',
  },
] as const;

type OnboardingScreenProps = {
  onComplete: () => void;
};

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<(typeof slides)[number]>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const compact = height < 720;
  const horizontalInset = Math.max(26, (width - 430) / 2);
  const imageWidth = width - horizontalInset * 2;
  const imageHeight = Math.min(imageWidth * 1.205, compact ? height * 0.43 : 392);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<(typeof slides)[number]>[] }) => {
      const nextIndex = viewableItems[0]?.index;
      if (typeof nextIndex === 'number') {
        setActiveIndex(nextIndex);
      }
    },
    [],
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}>
      <StatusBar style="dark" />

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width, paddingHorizontal: horizontalInset }]}> 
            <Image
              source={item.image}
              style={[styles.image, { width: imageWidth, height: imageHeight }]}
              contentFit="cover"
            />
            <Text style={[styles.title, compact && styles.compactTitle]}>{item.title}</Text>
            <Text style={styles.description}>
              {'Urna amet, suspendisse ullamcorper ac elit diam\nfacilisis cursus vestibulum.'}
            </Text>
          </View>
        )}
      />

      <View style={[styles.footer, { paddingHorizontal: horizontalInset }]}> 
        <View style={styles.dots}>
          {slides.map((slide, index) => (
            <View
              key={slide.id}
              style={[styles.dot, index === activeIndex && styles.activeDot]}
            />
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onComplete}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
          <Text style={styles.primaryButtonText}>Create Account</Text>
        </Pressable>

        <Pressable accessibilityRole="button" onPress={onComplete} hitSlop={8}>
          <Text style={styles.loginText}>Already Have an Account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    alignItems: 'center',
    paddingTop: 30,
  },
  image: {
    borderRadius: 38,
    backgroundColor: '#F0EFF1',
  },
  title: {
    marginTop: 30,
    color: '#29283A',
    fontSize: 24,
    lineHeight: 30,
    fontFamily: 'Poppins_800ExtraBold',
    textAlign: 'center',
    letterSpacing: -0.35,
  },
  compactTitle: {
    marginTop: 18,
    fontSize: 24,
    lineHeight: 30,
  },
  description: {
    marginTop: 14,
    color: '#B3B2C4',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  footer: {
    width: '100%',
  },
  dots: {
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 13,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#D9D8E7',
  },
  activeDot: {
    backgroundColor: PURPLE,
  },
  primaryButton: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: PURPLE,
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
  },
  loginText: {
    marginTop: 24,
    color: PURPLE,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
});

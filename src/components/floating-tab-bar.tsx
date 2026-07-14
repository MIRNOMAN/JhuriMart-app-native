import {
  Tabs,
  TabList,
  TabSlot,
  TabTrigger,
  type TabListProps,
  type TabTriggerSlotProps,
} from 'expo-router/ui';
import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabIconName = 'shop' | 'explore' | 'cart' | 'heart' | 'account';

const activeColor = '#4CB276';
const inactiveColor = '#20202C';

const tabs = [
  { name: 'shop', href: '/', label: 'Shop', icon: 'shop' },
  { name: 'explore', href: '/explore', label: 'Explore', icon: 'explore' },
  { name: 'cart', href: '/cart', label: 'Cart', icon: 'cart' },
  { name: 'favourite', href: '/favourite', label: 'Favourite', icon: 'heart' },
  { name: 'account', href: '/account', label: 'Account', icon: 'account' },
] as const;

export default function FloatingTabBar() {
  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <FloatingTabList>
          {tabs.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton icon={tab.icon}>{tab.label}</TabButton>
            </TabTrigger>
          ))}
        </FloatingTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  children,
  icon,
  isFocused,
  ...props
}: TabTriggerSlotProps & PropsWithChildren<{ icon: TabIconName }>) {
  const color = isFocused ? activeColor : inactiveColor;

  return (
    <Pressable {...props} style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}>
      <TabIcon name={icon} color={color} />
      <Text style={[styles.tabLabel, { color }]} numberOfLines={1} adjustsFontSizeToFit>
        {children}
      </Text>
    </Pressable>
  );
}

function FloatingTabList({ style, ...props }: TabListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        styles.tabListContainer,
        { paddingBottom: Math.max(insets.bottom, 10) },
        style,
      ]}>
      <View style={styles.tabPanel}>{props.children}</View>
      <View style={styles.homeIndicator} />
    </View>
  );
}

function TabIcon({ name, color }: { name: TabIconName; color: string }) {
  if (name === 'shop') {
    return (
      <View style={styles.iconBox}>
        <View style={[styles.shopAwning, { borderColor: color }]}>
          <View style={[styles.shopPost, { backgroundColor: color }]} />
          <View style={[styles.shopPost, { backgroundColor: color }]} />
        </View>
        <View style={[styles.shopBody, { borderColor: color }]}>
          <View style={[styles.shopDoor, { borderColor: color }]} />
        </View>
      </View>
    );
  }

  if (name === 'explore') {
    return (
      <View style={styles.iconBox}>
        <View style={[styles.searchLine, { backgroundColor: color, top: 5, left: 3 }]} />
        <View style={[styles.searchLine, { backgroundColor: color, top: 13, left: 3 }]} />
        <View style={[styles.searchCircle, { borderColor: color }]} />
        <View style={[styles.searchHandle, { backgroundColor: color }]} />
      </View>
    );
  }

  if (name === 'cart') {
    return (
      <View style={styles.iconBox}>
        <View style={[styles.cartHandle, { backgroundColor: color }]} />
        <View style={[styles.cartBasket, { borderColor: color }]} />
        <View style={[styles.cartWheel, { backgroundColor: color, left: 8 }]} />
        <View style={[styles.cartWheel, { backgroundColor: color, right: 4 }]} />
      </View>
    );
  }

  if (name === 'heart') {
    return (
      <Text style={[styles.heartIcon, { color }]} allowFontScaling={false}>
        ♡
      </Text>
    );
  }

  return (
    <View style={styles.iconBox}>
      <View style={[styles.userHead, { borderColor: color }]} />
      <View style={[styles.userBody, { borderColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    height: '100%',
  },
  tabListContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 3,
    paddingTop: 8,
  },
  tabPanel: {
    width: '100%',
    minHeight: 96,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 12,
  },
  tabButton: {
    width: '20%',
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pressed: {
    opacity: 0.65,
  },
  tabLabel: {
    maxWidth: '100%',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '700',
    textAlign: 'center',
  },
  homeIndicator: {
    width: 174,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#D9D9D9',
    marginTop: -16,
  },
  iconBox: {
    width: 30,
    height: 30,
  },
  shopAwning: {
    position: 'absolute',
    top: 3,
    left: 5,
    width: 20,
    height: 9,
    borderWidth: 3,
    borderRadius: 2,
  },
  shopPost: {
    position: 'absolute',
    top: -3,
    bottom: -3,
    width: 3,
    left: 6,
  },
  shopBody: {
    position: 'absolute',
    top: 12,
    left: 7,
    width: 16,
    height: 13,
    borderWidth: 3,
    borderTopWidth: 0,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  shopDoor: {
    position: 'absolute',
    right: 2,
    bottom: 0,
    width: 5,
    height: 8,
    borderLeftWidth: 2,
  },
  searchLine: {
    position: 'absolute',
    width: 9,
    height: 3,
    borderRadius: 3,
  },
  searchCircle: {
    position: 'absolute',
    top: 3,
    right: 4,
    width: 18,
    height: 18,
    borderWidth: 3,
    borderRadius: 9,
  },
  searchHandle: {
    position: 'absolute',
    right: 2,
    bottom: 5,
    width: 12,
    height: 3,
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  cartHandle: {
    position: 'absolute',
    top: 4,
    left: 3,
    width: 9,
    height: 3,
    borderRadius: 3,
    transform: [{ rotate: '15deg' }],
  },
  cartBasket: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 17,
    height: 12,
    borderWidth: 3,
    borderTopWidth: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    transform: [{ skewX: '-8deg' }],
  },
  cartWheel: {
    position: 'absolute',
    bottom: 4,
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  heartIcon: {
    width: 30,
    height: 30,
    marginTop: -9,
    fontSize: 40,
    lineHeight: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
  userHead: {
    position: 'absolute',
    top: 3,
    left: 11,
    width: 9,
    height: 9,
    borderWidth: 3,
    borderRadius: 5,
  },
  userBody: {
    position: 'absolute',
    top: 16,
    left: 7,
    width: 17,
    height: 10,
    borderWidth: 3,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomWidth: 3,
  },
});

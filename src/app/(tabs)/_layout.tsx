import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { theme } from '@/constants/theme';

const icons: Record<string, keyof typeof Ionicons.glyphMap> = { index: 'home', orders: 'receipt', favourite: 'heart', profile: 'person' };
export default function TabsLayout() {
  return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: theme.colors.violet, tabBarInactiveTintColor: theme.colors.subtle, tabBarLabelStyle: { fontFamily: theme.type.medium, fontSize: 9 }, tabBarStyle: { height: 66, paddingTop: 5, paddingBottom: 8, borderTopColor: theme.colors.line }, tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name] ?? 'ellipse'} color={color} size={size} /> })}><Tabs.Screen name="index" options={{ title: 'Home' }} /><Tabs.Screen name="orders" options={{ title: 'My Order' }} /><Tabs.Screen name="favourite" options={{ title: 'Favorite' }} /><Tabs.Screen name="profile" options={{ title: 'My Profile' }} /></Tabs>;
}

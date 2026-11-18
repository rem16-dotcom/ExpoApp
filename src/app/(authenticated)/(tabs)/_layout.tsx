import { Tabs } from "expo-router";
import { Home, User } from 'lucide-react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/src/context/theme";

export default function TabsLayout() {
  const { c, dark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
   <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: c.accent,
      tabBarInactiveTintColor: c.text,
      tabBarLabelStyle: { fontSize: 13, fontWeight: '700' },
      // Floating rounded bar, like Hunnypie
      tabBarStyle: {
        position: 'absolute',
        left: 40,
        right: 40,
        bottom: insets.bottom + 10,
        height: 66,
        borderRadius: 28,
        borderTopWidth: 0,
        backgroundColor: c.navBg,
        paddingTop: 6,
        paddingBottom: 6,
        shadowColor: '#000',
        shadowOpacity: dark ? 0 : 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: dark ? 0 : 4,
      },
    }}
   >
    <Tabs.Screen name="home" options={{
        title: "Home",
        tabBarIcon: ({ color, focused }) => <Home size={24} color={color} strokeWidth={focused ? 2.6 : 2} />
    }} />
    <Tabs.Screen name="profile" options={{
        title: "Profile",
        tabBarIcon: ({ color, focused }) => <User size={24} color={color} strokeWidth={focused ? 2.6 : 2} />
    }} />
   </Tabs>
  )
}

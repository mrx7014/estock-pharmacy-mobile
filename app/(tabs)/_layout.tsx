import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.success, tabBarInactiveTintColor: colors.muted, tabBarButton: HapticTab, tabBarStyle: { paddingTop: 7, paddingBottom: bottomPadding, height: 56 + bottomPadding, backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1 } }}>
    <Tabs.Screen name="index" options={{ title: "Overview", tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={23} color={color} /> }} />
    <Tabs.Screen name="inventory" options={{ title: "Inventory", tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={23} color={color} /> }} />
    <Tabs.Screen name="sales" options={{ title: "Sales", tabBarIcon: ({ color }) => <IconSymbol name="chart.bar.fill" size={23} color={color} /> }} />
    <Tabs.Screen name="settings" options={{ title: "Settings", tabBarIcon: ({ color }) => <IconSymbol name="gearshape.fill" size={23} color={color} /> }} />
  </Tabs>;
}

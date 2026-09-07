import { Tabs, router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

const navItems = [
  { label: "Overview", path: "/", icon: "house.fill" as const },
  { label: "Inventory", path: "/inventory", icon: "house.fill" as const },
  { label: "Sales", path: "/sales", icon: "chart.bar.fill" as const },
  { label: "Purchasing", path: "/purchasing", icon: "cart.fill" as const },
  { label: "Operations", path: "/operations", icon: "bolt.fill" as const },
  { label: "Settings", path: "/settings", icon: "gearshape.fill" as const },
];

function WebSidebar() {
  const colors = useColors();
  const pathname = usePathname();
  return <View style={[styles.sidebar, { backgroundColor: colors.surface, borderRightColor: colors.border }]}>
    <View style={styles.brand}><View style={[styles.brandMark, { backgroundColor: colors.primary }]}><IconSymbol name="house.fill" size={18} color="#fff" /></View><View><Text style={[styles.brandName, { color: colors.foreground }]}>eStock</Text><Text style={[styles.brandSub, { color: colors.success }]}>PHARMACY OS</Text></View></View>
    <Text style={[styles.navCaption, { color: colors.muted }]}>WORKSPACE</Text>
    <View style={styles.navList}>{navItems.map((item) => { const active = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path); return <Pressable key={item.path} onPress={() => router.push(item.path as never)} style={({ pressed }) => [styles.navItem, active && { backgroundColor: "#DDF4EE" }, pressed && { opacity: 0.7 }]}><IconSymbol name={item.icon} size={20} color={active ? colors.primary : colors.muted} /><Text style={[styles.navText, { color: active ? colors.primary : colors.muted }]}>{item.label}</Text></Pressable>; })}</View>
    <View style={[styles.sideFooter, { borderTopColor: colors.border }]}><View style={[styles.statusDot, { backgroundColor: colors.success }]} /><View><Text style={[styles.footerTitle, { color: colors.foreground }]}>Local snapshot</Text><Text style={[styles.footerMeta, { color: colors.muted }]}>Synced and ready</Text></View></View>
  </View>;
}

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const desktopWeb = Platform.OS === "web" && width >= 900;
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  return <View style={{ flex: 1 }}>{desktopWeb && <WebSidebar />}<Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.success, tabBarInactiveTintColor: colors.muted, tabBarButton: HapticTab, tabBarStyle: desktopWeb ? { display: "none" } : { paddingTop: 7, paddingBottom: bottomPadding, height: 56 + bottomPadding, backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1 } }}>
    <Tabs.Screen name="index" options={{ title: "Overview", tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={22} color={color} /> }} />
    <Tabs.Screen name="inventory" options={{ title: "Inventory", tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={22} color={color} /> }} />
    <Tabs.Screen name="sales" options={{ title: "Sales", tabBarIcon: ({ color }) => <IconSymbol name="chart.bar.fill" size={22} color={color} /> }} />
    <Tabs.Screen name="purchasing" options={{ title: "Purchasing", tabBarIcon: ({ color }) => <IconSymbol name="cart.fill" size={22} color={color} /> }} />
    <Tabs.Screen name="operations" options={{ title: "Operations", tabBarIcon: ({ color }) => <IconSymbol name="bolt.fill" size={22} color={color} /> }} />
    <Tabs.Screen name="settings" options={{ title: "Settings", tabBarIcon: ({ color }) => <IconSymbol name="gearshape.fill" size={22} color={color} /> }} />
  </Tabs></View>;
}

const styles = StyleSheet.create({ sidebar: { position: "absolute", left: 0, top: 0, bottom: 0, width: 224, paddingHorizontal: 14, paddingTop: 26, paddingBottom: 18, borderRightWidth: 1, zIndex: 20 }, brand: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 8, marginBottom: 42 }, brandMark: { width: 34, height: 34, borderRadius: 11, alignItems: "center", justifyContent: "center" }, brandName: { fontSize: 18, fontWeight: "900", letterSpacing: -0.4 }, brandSub: { fontSize: 8, fontWeight: "900", letterSpacing: 1.4, marginTop: 1 }, navCaption: { fontSize: 10, fontWeight: "800", letterSpacing: 1.3, paddingHorizontal: 10, marginBottom: 10 }, navList: { gap: 4 }, navItem: { height: 46, borderRadius: 12, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 12 }, navText: { fontSize: 13, fontWeight: "800" }, sideFooter: { marginTop: "auto", borderTopWidth: 1, paddingHorizontal: 8, paddingTop: 16, flexDirection: "row", alignItems: "center", gap: 9 }, statusDot: { width: 8, height: 8, borderRadius: 4 }, footerTitle: { fontSize: 11, fontWeight: "800" }, footerMeta: { fontSize: 10, marginTop: 2 } });

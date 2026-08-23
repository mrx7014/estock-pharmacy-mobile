import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { products, purchases, sales, sourceStats, statusFor, stockFor } from "@/lib/estock-data";
import { useColors } from "@/hooks/use-colors";

export default function HomeScreen() {
  const colors = useColors();
  const metrics = useMemo(() => ({
    units: products.reduce((sum, product) => sum + (stockFor(product)?.quantity ?? 0), 0),
    low: products.filter((product) => ["low", "out"].includes(statusFor(product))).length,
    expiring: products.filter((product) => statusFor(product) === "expiring").length,
    sales: sales.reduce((sum, sale) => sum + sale.total, 0),
  }), []);
  const Metric = ({ label, value, tone, route }: { label: string; value: string; tone: string; route: string }) => (
    <Pressable onPress={() => router.push(route as never)} style={({ pressed }) => [styles.metric, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
      <View style={[styles.metricDot, { backgroundColor: tone }]} /><Text style={[styles.metricValue, { color: colors.foreground }]}>{value}</Text><Text style={[styles.metricLabel, { color: colors.muted }]}>{label}</Text>
    </Pressable>
  );
  return <ScreenContainer className="px-5" containerClassName="bg-background">
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}><View><Text style={[styles.eyebrow, { color: colors.success }]}>eSTOCK PHARMACY</Text><Text style={[styles.title, { color: colors.foreground }]}>Good morning</Text><Text style={[styles.subtitle, { color: colors.muted }]}>Your pharmacy, at a glance.</Text></View><View style={[styles.avatar, { backgroundColor: colors.primary }]}><IconSymbol name="house.fill" size={24} color="#fff" /></View></View>
      <View style={[styles.branchCard, { backgroundColor: colors.primary }]}><View><Text style={styles.branchEyebrow}>ACTIVE BRANCH</Text><Text style={styles.branchName}>Main Branch</Text><Text style={styles.branchMeta}>Updated from local backup · 33 tables</Text></View><IconSymbol name="chevron.right" size={22} color="#BCEFE3" /></View>
      <View style={styles.sectionRow}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Today’s overview</Text><Text style={[styles.sectionLink, { color: colors.success }]}>Live snapshot</Text></View>
      <View style={styles.metrics}><Metric label="Units on hand" value={metrics.units.toLocaleString()} tone={colors.success} route="/inventory" /><Metric label="Needs attention" value={String(metrics.low)} tone={colors.error} route="/operations" /><Metric label="Expiring batches" value={String(metrics.expiring)} tone={colors.warning} route="/operations" /><Metric label="Recent sales" value={`${metrics.sales.toFixed(0)} EGP`} tone={colors.primary} route="/sales" /></View>
      <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 22 }]}>Quick actions</Text>
      <View style={styles.actions}><Pressable onPress={() => router.push("/inventory" as never)} style={({ pressed }) => [styles.action, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="magnifyingglass" size={21} color={colors.primary} /><Text style={[styles.actionText, { color: colors.foreground }]}>Find a product</Text></Pressable><Pressable onPress={() => router.push("/operations" as never)} style={({ pressed }) => [styles.action, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="plus" size={22} color={colors.success} /><Text style={[styles.actionText, { color: colors.foreground }]}>Adjust stock</Text></Pressable></View>
      <View style={[styles.insight, { backgroundColor: "#E4F6F1" }]}><View style={[styles.insightIcon, { backgroundColor: colors.success }]}><IconSymbol name="bolt.fill" size={18} color="#fff" /></View><View style={{ flex: 1 }}><Text style={[styles.insightTitle, { color: colors.foreground }]}>Snapshot ready</Text><Text style={[styles.insightText, { color: colors.muted }]}>{sourceStats.products.toLocaleString()} products are represented in the source backup. Use Import status in Operations for the full dataset plan.</Text></View></View>
      <View style={styles.footer}><Text style={[styles.footerText, { color: colors.muted }]}>Last source review · 24 Aug 2026</Text><Text style={[styles.footerText, { color: colors.muted }]}>{purchases.length} recent purchases loaded</Text></View>
    </ScrollView>
  </ScreenContainer>;
}
const styles = StyleSheet.create({ content: { paddingTop: 20, paddingBottom: 36 }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }, eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 1.5 }, title: { fontSize: 30, lineHeight: 36, fontWeight: "800", marginTop: 5 }, subtitle: { fontSize: 15, marginTop: 3 }, avatar: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" }, branchCard: { borderRadius: 22, padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, branchEyebrow: { color: "#BCEFE3", fontSize: 11, fontWeight: "800", letterSpacing: 1.3 }, branchName: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 4 }, branchMeta: { color: "#D9F3EE", fontSize: 12, marginTop: 8 }, sectionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 25, marginBottom: 12 }, sectionTitle: { fontSize: 18, fontWeight: "800" }, sectionLink: { fontSize: 12, fontWeight: "700" }, metrics: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, metric: { width: "48%", minHeight: 105, borderRadius: 18, padding: 15, borderWidth: 1 }, metricDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 12 }, metricValue: { fontSize: 24, fontWeight: "800" }, metricLabel: { fontSize: 12, marginTop: 4 }, actions: { flexDirection: "row", gap: 10, marginTop: 12 }, action: { flex: 1, minHeight: 64, borderRadius: 16, borderWidth: 1, padding: 14, gap: 8, flexDirection: "row", alignItems: "center" }, actionText: { fontWeight: "700", fontSize: 13 }, insight: { marginTop: 22, borderRadius: 18, padding: 16, flexDirection: "row", gap: 12, alignItems: "flex-start" }, insightIcon: { width: 32, height: 32, borderRadius: 10, alignItems: "center", justifyContent: "center" }, insightTitle: { fontWeight: "800", fontSize: 14 }, insightText: { fontSize: 12, lineHeight: 18, marginTop: 3 }, footer: { marginTop: 24, gap: 5 }, footerText: { fontSize: 11 }, pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] } });

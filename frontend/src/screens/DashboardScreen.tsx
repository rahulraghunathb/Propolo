import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import AppScreen from "@/components/AppScreen";
import EmptyState from "@/components/EmptyState";
import ScreenHeader from "@/components/ScreenHeader";
import SectionCard from "@/components/SectionCard";
import StatPill from "@/components/StatPill";
import SummaryCard from "@/components/SummaryCard";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { useDashboard } from "@/hooks/useDashboard";
import { APP_TITLE, PG_NAME } from "@/utils/constants";
import { formatCurrency } from "@/utils/currency";
import { getCurrentPaymentMonth } from "@/utils/date";

export default function DashboardScreen() {
  const { summary, isLoading, error, refresh } = useDashboard();
  const collectionRate =
    summary && summary.totalTenants > 0
      ? Math.round((summary.paidTenants / summary.totalTenants) * 100)
      : 0;

  return (
    <AppScreen scrollable>
      <ScreenHeader
        title={APP_TITLE}
        subtitle={`${PG_NAME} | ${getCurrentPaymentMonth()}`}
        rightSlot={<StatPill label={isLoading ? "Syncing" : "Local SQLite"} tone="primary" />}
      />

      {error ? (
        <EmptyState title="Dashboard unavailable" description={error} />
      ) : null}

      <SectionCard>
        <View style={styles.heroHeader}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>This month at a glance</Text>
            <Text style={styles.heroText}>
              Track rent collection fast and keep pending follow-up visible room by room.
            </Text>
          </View>
          <View style={styles.rateBadge}>
            <Text style={styles.rateValue}>{collectionRate}%</Text>
            <Text style={styles.rateLabel}>collected</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <SummaryCard label="Total Rooms" value={summary?.totalRooms ?? 0} accent="primary" />
          <SummaryCard label="Total Tenants" value={summary?.totalTenants ?? 0} accent="primary" />
          <SummaryCard label="Paid Tenants" value={summary?.paidTenants ?? 0} accent="success" />
          <SummaryCard label="Pending Tenants" value={summary?.pendingTenants ?? 0} accent="warning" />
          <SummaryCard
            label="Expected Rent"
            value={formatCurrency(summary?.totalExpectedRent ?? 0)}
            accent="primary"
          />
          <SummaryCard
            label="Collected Rent"
            value={formatCurrency(summary?.totalCollectedRent ?? 0)}
            accent="success"
          />
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.actionRow}>
          <Pressable style={styles.primaryButton} onPress={() => router.push("/payments")}>
            <Text style={styles.primaryButtonText}>Go to Payments</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => void refresh()}>
            <Text style={styles.secondaryButtonText}>Refresh Summary</Text>
          </Pressable>
        </View>
      </SectionCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  heroCopy: {
    flex: 1,
    gap: 6
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary
  },
  heroText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary
  },
  rateBadge: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minWidth: 92,
    alignItems: "center",
    justifyContent: "center"
  },
  rateValue: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary
  },
  rateLabel: {
    fontSize: 12,
    color: colors.textSecondary
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary
  },
  actionRow: {
    gap: spacing.sm
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.surface
  },
  secondaryButton: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary
  }
});

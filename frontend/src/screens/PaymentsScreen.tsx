import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import AppScreen from "@/components/AppScreen";
import EmptyState from "@/components/EmptyState";
import FilterChip from "@/components/FilterChip";
import RoomCard from "@/components/RoomCard";
import ScreenHeader from "@/components/ScreenHeader";
import SearchInput from "@/components/SearchInput";
import SectionCard from "@/components/SectionCard";
import StatPill from "@/components/StatPill";
import { usePayments } from "@/hooks/usePayments";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { FILTER_OPTIONS, PG_NAME } from "@/utils/constants";
import { getCurrentPaymentMonth } from "@/utils/date";
import { filterRoomPayments, type PaymentFilter } from "@/utils/paymentFilters";

export default function PaymentsScreen() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentFilter>("ALL");
  const { rooms, isLoading, isMutating, error, refresh, markPaid } = usePayments();

  const filteredRooms = useMemo(
    () => filterRoomPayments(rooms, query, statusFilter),
    [rooms, query, statusFilter]
  );

  const pendingCount = rooms.reduce(
    (count, room) => count + room.tenants.filter((tenant) => tenant.status === "PENDING").length,
    0
  );

  return (
    <AppScreen scrollable>
      <ScreenHeader
        title="Payments"
        subtitle={`${PG_NAME} | ${getCurrentPaymentMonth()}`}
        rightSlot={
          <StatPill
            label={isMutating ? "Updating" : `${pendingCount} pending`}
            tone={pendingCount === 0 ? "success" : "warning"}
          />
        }
      />

      <SectionCard>
        <SearchInput value={query} onChangeText={setQuery} />
        <View style={styles.chipsRow}>
          {FILTER_OPTIONS.map((option) => (
            <FilterChip
              key={option}
              label={option}
              selected={statusFilter === option}
              onPress={() => setStatusFilter(option)}
            />
          ))}
        </View>
      </SectionCard>

      <View style={styles.toolbar}>
        <Text style={styles.toolbarText}>{filteredRooms.length} rooms visible</Text>
        <Pressable onPress={() => void refresh()}>
          <Text style={styles.refreshText}>Refresh</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loaderText}>Loading current month payments...</Text>
        </View>
      ) : null}

      {error ? <EmptyState title="Payments unavailable" description={error} /> : null}

      {!isLoading && !error && filteredRooms.length === 0 ? (
        <EmptyState
          title="No rooms found"
          description="Try clearing the search or changing the payment filter."
        />
      ) : null}

      {!isLoading && !error
        ? filteredRooms.map((room) => (
            <RoomCard
              key={room.roomId}
              room={room}
              onMarkPaid={(tenantId, amountPaid) => void markPaid(tenantId, amountPaid)}
            />
          ))
        : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  toolbarText: {
    fontSize: 14,
    color: colors.textSecondary
  },
  refreshText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xxl
  },
  loaderText: {
    fontSize: 14,
    color: colors.textSecondary
  }
});

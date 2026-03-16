import { StyleSheet, Text, View } from "react-native";
import type { RoomPaymentGroup } from "@/domain/paymentView";
import StatPill from "@/components/StatPill";
import TenantRow from "@/components/TenantRow";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { formatCurrency } from "@/utils/currency";

type RoomCardProps = {
  room: RoomPaymentGroup;
  onMarkPaid?: (tenantId: number, amountPaid: number) => void;
};

export default function RoomCard({ room, onMarkPaid }: RoomCardProps) {
  const paidTenants = room.tenants.filter((tenant) => tenant.status === "PAID").length;
  const totalRent = room.tenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Room {room.roomNumber}</Text>
          <Text style={styles.subtitle}>{room.sharingType}</Text>
        </View>
        <StatPill
          label={`${paidTenants}/${room.tenants.length} paid`}
          tone={paidTenants === room.tenants.length ? "success" : "warning"}
        />
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>{room.tenants.length} active tenants</Text>
        <Text style={styles.meta}>{formatCurrency(totalRent)} expected</Text>
      </View>

      <View style={styles.tenantList}>
        {room.tenants.map((tenant) => (
          <TenantRow key={tenant.tenantId} tenant={tenant} onMarkPaid={onMarkPaid} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  titleBlock: {
    flex: 1,
    gap: 2
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  meta: {
    fontSize: 14,
    color: colors.textSecondary
  },
  tenantList: {
    marginTop: spacing.xs,
    gap: spacing.md
  }
});

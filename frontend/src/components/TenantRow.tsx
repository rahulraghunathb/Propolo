import { Pressable, StyleSheet, Text, View } from "react-native";
import type { TenantPaymentItem } from "@/domain/paymentView";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { formatCurrency } from "@/utils/currency";

type TenantRowProps = {
  tenant: TenantPaymentItem;
  onMarkPaid?: (tenantId: number, amountPaid: number) => void;
};

export default function TenantRow({ tenant, onMarkPaid }: TenantRowProps) {
  const isPaid = tenant.status === "PAID";

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{tenant.residentName}</Text>
        <Text style={styles.meta}>{tenant.mobileNumber}</Text>
        <Text style={styles.meta}>Deposit: {formatCurrency(tenant.depositPaid)}</Text>
        <Text style={styles.meta}>Rent: {formatCurrency(tenant.rentAmount)}</Text>
        <Text style={[styles.status, isPaid ? styles.statusPaid : styles.statusPending]}>
          {isPaid ? `Paid${tenant.paidOn ? ` on ${tenant.paidOn}` : ""}` : "Pending"}
        </Text>
      </View>
      <Pressable
        disabled={isPaid}
        onPress={() => onMarkPaid?.(tenant.tenantId, tenant.rentAmount)}
        style={[styles.button, isPaid ? styles.buttonPaid : styles.buttonPending]}
      >
        <Text style={styles.buttonText}>{isPaid ? "Paid" : "Mark Paid"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  info: {
    flex: 1,
    gap: 2
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary
  },
  status: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700"
  },
  statusPaid: {
    color: colors.success
  },
  statusPending: {
    color: colors.warning
  },
  button: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  buttonPaid: {
    backgroundColor: colors.success
  },
  buttonPending: {
    backgroundColor: colors.warning
  },
  buttonText: {
    color: colors.surface,
    fontWeight: "700"
  }
});

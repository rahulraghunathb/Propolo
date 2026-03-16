import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

type SummaryCardProps = {
  label: string;
  value: string | number;
  accent?: "primary" | "success" | "warning";
};

export default function SummaryCard({ label, value, accent = "primary" }: SummaryCardProps) {
  const accentColor = {
    primary: colors.primary,
    success: colors.success,
    warning: colors.warning
  }[accent];

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "47%",
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary
  },
  value: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "700"
  }
});

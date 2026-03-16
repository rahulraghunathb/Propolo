import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/colors";

type StatPillProps = {
  label: string;
  tone?: "primary" | "success" | "warning";
};

export default function StatPill({ label, tone = "primary" }: StatPillProps) {
  const toneStyles = {
    primary: { backgroundColor: colors.primarySoft, color: colors.primary },
    success: { backgroundColor: colors.successSoft, color: colors.success },
    warning: { backgroundColor: colors.warningSoft, color: colors.warning }
  }[tone];

  return (
    <View style={[styles.pill, { backgroundColor: toneStyles.backgroundColor }]}>
      <Text style={[styles.label, { color: toneStyles.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start"
  },
  label: {
    fontSize: 12,
    fontWeight: "700"
  }
});

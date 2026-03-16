import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/colors";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
};

export default function ScreenHeader({ title, subtitle, rightSlot }: ScreenHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {rightSlot}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12
  },
  container: {
    gap: 4,
    flex: 1
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary
  }
});

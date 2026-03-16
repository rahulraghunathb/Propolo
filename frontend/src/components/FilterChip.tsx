import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/theme/colors";

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.selected]}>
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  selected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary
  },
  selectedText: {
    color: colors.primary
  }
});

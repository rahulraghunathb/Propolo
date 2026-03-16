import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "@/theme/colors";

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChangeText,
  placeholder = "Search by room or tenant"
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.textPrimary
  }
});

import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useInitializeApp } from "@/hooks/useInitializeApp";
import { APP_TITLE } from "@/utils/constants";

export default function RootLayout() {
  const { isReady, error } = useInitializeApp();

  return (
    <SafeAreaProvider>
      {!isReady ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0F766E" />
          <Text style={styles.title}>{APP_TITLE}</Text>
          <Text style={styles.subtitle}>{error ?? "Preparing local rent data..."}</Text>
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7F4",
    padding: 24,
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#16302B"
  },
  subtitle: {
    fontSize: 15,
    color: "#5A6B66",
    textAlign: "center"
  }
});

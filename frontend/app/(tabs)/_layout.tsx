import { Tabs } from "expo-router";
import { Text } from "react-native";

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text
      style={{
        fontSize: 13,
        fontWeight: focused ? "700" : "500",
        color: focused ? "#0F766E" : "#7A8A86"
      }}
    >
      {label}
    </Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 72,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8E4"
        },
        tabBarActiveTintColor: "#0F766E",
        tabBarInactiveTintColor: "#7A8A86",
        sceneStyle: {
          backgroundColor: "#F5F7F4"
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => <TabIcon label="Home" focused={focused} />
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Payments",
          tabBarIcon: ({ focused }) => <TabIcon label="Rent" focused={focused} />
        }}
      />
    </Tabs>
  );
}

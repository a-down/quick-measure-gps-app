import { Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AutoMeasureScreen"
        options={{
          title: "Auto Measure",
          headerBackTitleVisible: false,
          headerTintColor: "#6DAB64",
          headerRight: () => (
            <Feather
              name="help-circle"
              size={24}
              color="#1D3F13"
              onPress={() => router.push("/HelpScreen")}
            />
          ),
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            color: "#1D3F13",
            fontFamily: "Jost_600SemiBold",
            fontSize: 18,
          },
        }}
      />
      <Stack.Screen
        name="ManualMeasureScreen"
        options={{
          title: "Manual Measure",
          headerBackTitleVisible: false,
          headerTintColor: "#6DAB64",
          headerRight: () => (
            <Feather
              name="help-circle"
              size={24}
              color="#1D3F13"
              onPress={() => router.push("/HelpScreen")}
            />
          ),
          headerTitleStyle: {
            color: "#1D3F13",
            fontFamily: "Jost_600SemiBold",
            fontSize: 18,
          },
        }}
      />
      <Stack.Screen
        name="TapMeasureScreen"
        options={{
          title: "Tap to Measure",
          headerBackTitleVisible: false,
          headerTintColor: "#6DAB64",
          headerRight: () => (
            <Feather
              name="help-circle"
              size={24}
              color="#1D3F13"
              onPress={() => router.push("/HelpScreen")}
            />
          ),
          headerTitleStyle: {
            color: "#1D3F13",
            fontFamily: "Jost_600SemiBold",
            fontSize: 18,
          },
        }}
      />
      <Stack.Screen
        name="HelpScreen"
        options={{
          title: "Help",
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#6DAB64",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Jost_600SemiBold",
            fontSize: 18,
          },
        }}
      />
      <Stack.Screen
        name="PurchaseScreen"
        options={{
          title: "Purchase",
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#6DAB64",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Jost_600SemiBold",
            fontSize: 18,
          },
        }}
      />
    </Stack>
  );
}

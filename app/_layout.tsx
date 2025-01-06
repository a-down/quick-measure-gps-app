import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const router = useRouter();

  return (
    <GluestackUIProvider mode="light">
      <GestureHandlerRootView style={{ flex: 1 }}>
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
              headerBackButtonDisplayMode: "minimal",
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
              headerBackButtonDisplayMode: "minimal",
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
              headerBackButtonDisplayMode: "minimal",
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
              headerBackButtonDisplayMode: "minimal",
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
              headerBackButtonDisplayMode: "minimal",
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
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}

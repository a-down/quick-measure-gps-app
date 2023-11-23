import { Stack, useLocalSearchParams } from 'expo-router';

export default function Layout() {
  const params = useLocalSearchParams();

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false,
        }} />
        <Stack.Screen name="AutoMeasureScreen" options={{
          title: 'Auto Measure',
          headerBackTitleVisible: false,
          headerTintColor: '#1D3F13',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#1D3F13',
          },
        }} />
        <Stack.Screen name="TapMeasureScreen" options={{
          title: 'Tap to Measure',
          headerBackTitleVisible: false,
          headerTintColor: '#6DAB64',
          headerTitleStyle: {
            color: '#1D3F13',
          },
        }} />
        <Stack.Screen name="SaveMapFormScreen" options={{
          title: "",
          headerStyle: {
            backgroundColor: '#6DAB64',
          },
          headerBackTitleVisible: false,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
        }} />
      </Stack>
  )
}
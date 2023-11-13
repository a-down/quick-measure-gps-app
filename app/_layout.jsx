import { Stack, useLocalSearchParams } from 'expo-router';


export default function Layout() {
  const params = useLocalSearchParams();

  return (
      <Stack>
        <Stack.Screen name="index" options={{
          title: 'Quick Measure',
          headerBackTitleVisible: false
        }} />
        <Stack.Screen name="auto-measure" options={{
          title: 'Auto Measure',
          headerBackTitleVisible: false
        }} />
        <Stack.Screen name="pinpoint-measure" options={{
          title: 'Pinpoint Measure',
          headerBackTitleVisible: false
        }} />
        <Stack.Screen name="saved-measurements" options={{
          title: 'Saved Measurements',
          headerBackTitleVisible: false
        }} />
        <Stack.Screen name="saved-map" options={{
          title: params.name,
          headerBackTitleVisible: false
        }} />
      </Stack>
  )
}
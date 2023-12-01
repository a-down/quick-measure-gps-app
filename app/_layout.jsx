import { Stack } from 'expo-router';

export default function Layout() {

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false,
        }} />
        <Stack.Screen name="AutoMeasureScreen" options={{
          title: 'Auto Measure',
          headerBackTitleVisible: false,
          headerTintColor: '#6DAB64',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#1D3F13',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18
          },
        }} />
        <Stack.Screen name="PinpointMeasureScreen" options={{
          title: 'Manual Measure',
          headerBackTitleVisible: false,
          headerTintColor: '#6DAB64',
          headerTitleStyle: {
            color: '#1D3F13',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18
          },
        }} />
        <Stack.Screen name="TapMeasureScreen" options={{
          title: 'Tap to Measure',
          headerBackTitleVisible: false,
          headerTintColor: '#6DAB64',
          headerTitleStyle: {
            color: '#1D3F13',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18
          },
        }} />
      </Stack>
  )
}
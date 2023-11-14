import { Stack, useLocalSearchParams } from 'expo-router';
import { Button } from 'react-native';
import { MapTypeAlert } from '../components';

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
          headerBackTitleVisible: false,
          // headerRight: () => (
          //   <Button 
          //     title="Map Type"
          //     color="#888"
          //     onPress={MapTypeAlert}/>
          // )
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
        <Stack.Screen name="settings" options={{
          title: 'Settings',
          headerBackTitleVisible: false
        }} />
      </Stack>
  )
}
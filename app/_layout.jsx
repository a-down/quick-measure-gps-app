import { Stack, useLocalSearchParams } from 'expo-router';
import { createContext, useState } from 'react';

// const PreferencesContext = createContext(null);

// const defaultPref = {measurement: {area: 'sq meters', areaShort: 'sqm', distance: 'meters', distanceShort: 'm'}}

export default function Layout() {
  // const [ preferences, setPreferences ] = useState(defaultPref);
  const params = useLocalSearchParams();

  return (
      <Stack>
        {/* <PreferencesContext.Provider value={{ preferences, setPreferences }}> */}
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
        {/* </PreferencesContext.Provider> */}
      </Stack>
  )
}
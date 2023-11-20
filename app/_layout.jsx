import { Stack, useLocalSearchParams } from 'expo-router';
import { Button, View, Text } from 'react-native';
import { MapTypeAlert } from '../components';

export default function Layout() {
  const params = useLocalSearchParams();

  // const homeHeader = () = {
  //   return (

  //   )
  // }

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false,
        }} />
        {/* <Stack.Screen name="(tabs)/index" options={{
          title: 'Quick Measure',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#6DAB64',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTitleAlign: "left",
          headerRight: () => (
            <View style={{width: 24, height: 24, backgroundColor: "#fff"}}></View>
          ),
        }} /> */}
        <Stack.Screen name="auto-measure" options={{
          title: 'Auto Measure',
          headerBackTitleVisible: false,
          headerTintColor: '#6DAB64',
          // headerStyle: {
          //   backgroundColor: '#1D3F13',
          // },
          headerTitleStyle: {
            color: '#1D3F13',
          },
          // headerRight: () => (
          //   <Button 
          //     title="Map Type"
          //     color="#888"
          //     onPress={MapTypeAlert}/>
          // )
        }} />
        <Stack.Screen name="pinpoint-measure" options={{
          title: 'Pinpoint Measure',
          headerBackTitleVisible: false,
          headerTintColor: '#6DAB64',
          headerTitleStyle: {
            color: '#1D3F13',
          },
        }} />
        <Stack.Screen name="saved-measurements" options={{
          title: 'Saved Measurements',
          headerBackTitleVisible: false,
          headerTintColor: '#6DAB64',
          headerTitleStyle: {
            color: '#1D3F13',
          },
        }} />
        {/* <Stack.Screen name="saved-map" options={{
          headerBackTitleVisible: false,
          headerTintColor: '#6DAB64',
          headerTitleStyle: {
            color: '#1D3F13',
          },
        }} /> */}
        <Stack.Screen name="save-map-form" options={{
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
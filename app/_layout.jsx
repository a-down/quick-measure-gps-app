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
          // headerRight: () => (
          //   <Button 
          //     title="Map Type"
          //     color="#888"
          //     onPress={MapTypeAlert}/>
          // )
        }} />
        <Stack.Screen name="TapMeasureScreen" options={{
          title: 'Tap to Measure',
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
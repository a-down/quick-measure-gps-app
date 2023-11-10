import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { useEffect, useState} from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, convertArea } from 'geolib';
import { useRouter, Link } from 'expo-router';

export default function App() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  return (
    <ScrollView className="h-full flex p-4">
      <Pressable className="flex w-full mb-4 shadow-sm" onPress={() => router.push('/auto-measure')}>
        <View className="aspect-video w-full bg-gray-300 rounded-t-md">

        </View>
        <View className="bg-white w-full p-2 rounded-b-md">
          <Text className="text-lg font-semibold">Auto Measure</Text>
          <Text className="text-base">Track your location with GPS</Text>
        </View>
      </Pressable>

      <Pressable className="flex w-full mb-4 shadow-sm" onPress={() => router.push('/pinpoint-measure')}>
        <View className="aspect-video w-full bg-gray-300 rounded-t-md">

        </View>
        <View className="bg-white w-full p-2 rounded-b-md">
          <Text className="text-lg font-semibold">Pinpoint Measure</Text>
          <Text className="text-base">Manually log points with GPS</Text>
        </View>
      </Pressable>

      <Pressable className="flex w-full mb-4 shadow-sm" onPress={() => router.push('/pinpoint-measure')}>
        <View className="aspect-video w-full bg-gray-300 rounded-t-md">

        </View>
        <View className="bg-white w-full p-2 rounded-b-md">
          <Text className="text-lg font-semibold">Tap To Measure</Text>
          <Text className="text-base">Add points manually by tapping the map</Text>
        </View>
      </Pressable>

      <View className="flex-row w-full mb-16" style={{gap: 16}}>
        {/* <View className="p-2 flex-1 bg-white rounded-md items-center shadow-sm" style={{gap: 8}}>
          <Text className="text-center text-lg font-semibold">Saved</Text>
          <View className="h-12 w-12 bg-gray-400"></View>
        </View>

        <View className="p-2 flex-1 bg-white rounded-md items-center shadow-sm" style={{gap: 8}}>
          <Text className="text-center text-lg font-semibold">Settings</Text>
          <View className="h-12 w-12 bg-gray-400"></View>
        </View> */}

      <Pressable className="flex-1 w-full mb-4 shadow-sm" onPress={() => router.push('/auto-measure')}>
        <View className="aspect-video w-full bg-gray-300 rounded-t-md">

        </View>
        <View className="bg-white w-full p-2 rounded-b-md">
          <Text className="text-lg font-semibold">Saved Measurements</Text>
        </View>
      </Pressable>

      <Pressable className="flex-1 w-full mb-4 shadow-sm" onPress={() => router.push('/auto-measure')}>
        <View className="aspect-video w-full bg-gray-300 rounded-t-md">

        </View>
        <View className="bg-white w-full p-2 rounded-b-md">
          <Text className="text-lg font-semibold">Quick Measure Settings</Text>
        </View>
      </Pressable>

      </View>

      {/* <Pressable className=" p-4 rounded-md mb-8 bg-[#92e1c0]" onPress={() => router.push('/auto-measure')}>
        <Text>Go To Auto Measure</Text>
      </Pressable>
      <Pressable className=" p-4 rounded-md mb-8" onPress={() => router.push('/pinpoint-measure')}>
        <Text>Go To Pinpoint Measure</Text>
      </Pressable>
      <Pressable className=" p-4 rounded-md mb-8" onPress={() => router.push('/saved-measurements')}>
        <Text>Go To Saved Measurements</Text>
      </Pressable> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
});
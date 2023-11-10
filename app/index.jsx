import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { useEffect, useState} from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, convertArea } from 'geolib';
import { useRouter, Link } from 'expo-router';

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable className=" p-4 rounded-md mb-8" onPress={() => router.push('/auto-measure')}>
        <Text>Go To Auto Measure</Text>
      </Pressable>
      <Pressable className=" p-4 rounded-md mb-8" onPress={() => router.push('/pinpoint-measure')}>
        <Text>Go To Pinpoint Measure</Text>
      </Pressable>
      <Pressable className=" p-4 rounded-md mb-8" onPress={() => router.push('/saved-measurements')}>
        <Text>Go To Saved Measurements</Text>
      </Pressable>
    </View>
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
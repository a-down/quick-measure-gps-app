import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, useWindowDimensions, Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, convertArea, getPathLength } from 'geolib';

const demoCoordinates = [
  {
    latitude: 44.007199,
    longitude: -92.404200
  },
  {
    latitude: 44.008040,
    longitude: -92.410658
  },
  {
    latitude: 44.010862,
    longitude: -92.411936
  },
  {
    latitude: 44.011397,
    longitude: -92.405360
  },
]

const walkToMailbox = [{latitude: 44.00719339068559, longitude: -92.39045458757248}, {latitude: 44.00720777521759, longitude: -92.39044857257788}, {latitude: 44.00722463996818, longitude: -92.39044552876923}, {latitude: 44.00723910893775, longitude: -92.39043884259915}, {latitude: 44.007253440055344, longitude: -92.3904339617919}, {latitude: 44.00726996411364, longitude: -92.39043368123015}, {latitude: 44.00728242210206, longitude: -92.39042937761312}, {latitude: 44.00729738115168, longitude: -92.39042271172833}, {latitude: 44.00730698411163, longitude: -92.39041823226454}, {latitude: 44.00731678282986, longitude: -92.39041522381036}, {latitude: 44.007331483445654, longitude: -92.39041748500719}, {latitude: 44.00734617151441, longitude: -92.3904142248112}, {latitude: 44.00735833376541, longitude: -92.39039820105242}, {latitude: 44.007364923916036, longitude: -92.39038508187748}, {latitude: 44.007367904436194, longitude: -92.39036323363482}, {latitude: 44.00737559615935, longitude: -92.39032280977409}, {latitude: 44.007378468563495, longitude: -92.39030045648173}]


export default function AutoMeasure() {
  const { height, width } = useWindowDimensions();
  const [ currentLocation, setCurrentLocation ] = useState(null);
  const [ initialRegion, setInitialRegion ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState(walkToMailbox)
  const [ polygonArea, setPolygonArea ] = useState()
  const [ polygonAreaMeasurement, setPolygonAreaMeasurement ] = useState('sqft')
  const [ polygonDistance, setPolygonDistance ] = useState()

  useEffect(() => {
    const getInitialLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      const locationSubscription = await Location.watchPositionAsync(
        {accuracy:Location.Accuracy.BestForNavigation, distanceInterval: 3},
        (loc) => {
          console.log(loc)
          setCurrentLocation(loc.coords)
        }
      );
    };

    getInitialLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      addLocationToPolygon(currentLocation)
    }
    if (polygonCoordinates.length > 1) {
      setPolygonDistance(getPathLength(polygonCoordinates).toFixed(2))
      setPolygonArea(getAreaOfPolygon(polygonCoordinates).toFixed(2))
    }
  }, [currentLocation])

  const addLocationToPolygon = async (newLocation) => {
    await setPolygonCoordinates([{ latitude: newLocation.latitude, longitude: newLocation.longitude}, ...polygonCoordinates])
    console.log(polygonCoordinates)
  }

  const resetMeasurements = () => {
    setPolygonCoordinates([])
    setPolygonArea(null)
    setPolygonDistance(null)
  }

  return (
    <View className="flex-1 items-center justify-center">
      {initialRegion && (
        <MapView 
          style={{flex: 1, width: '100%'}}
          initialRegion={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}>

            {currentLocation && (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Your Location"
              />
            )}

            <Polygon 
              strokeColor="red"
              strokeWidth={2}
              coordinates={polygonCoordinates}
            />
        </MapView>
      )}

      <View className="bg-white p-4 absolute top-2 rounded-sm shadow-sm" style={{width: width-16}}>
        <View className="flex-row justify-between flex-wrap">
          <Text className="text-lg mb-4">
            <Text className="text-3xl">{ polygonArea || 0}</Text>
            {` `}sq meters
          </Text>
          <Text className="text-lg mb-4">
            <Text className="text-3xl">{ polygonDistance || 0 }</Text>
            {` `}meters
          </Text>
        </View>

        <Pressable className="w-full" onPress={() => Alert.alert("You changed them!")}>
          <Text className="text-center text-gray-700">Change Units of Measurement</Text>
        </Pressable>
      </View>

      <View className="absolute bottom-8" style={{width: width-32}}>
        <Pressable className="bg-white p-4 rounded-md shadow-sm">
          <Text className="text-center text-xl">
            Stop GPS
          </Text>
        </Pressable>

        <View className="w-full flex-row justify-between">
          <Pressable className="flex-grow p-4" onPress={resetMeasurements}>
            <Text className="text-center text-lg">Reset</Text>
          </Pressable>
          <Pressable className="flex-grow p-4">
            <Text className="text-center text-lg">Save</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
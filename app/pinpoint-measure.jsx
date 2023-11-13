import { Text, View, Pressable, useWindowDimensions, Alert } from 'react-native';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength } from 'geolib';
import { useRouter, Link } from 'expo-router';
import { MeasurementDisplay, AddMarkerButton, ResetMeasurementsButton } from '../components';

const walkToMailbox = [{latitude: 44.00719339068559, longitude: -92.39045458757248}, {latitude: 44.00720777521759, longitude: -92.39044857257788}, {latitude: 44.00722463996818, longitude: -92.39044552876923}, {latitude: 44.00723910893775, longitude: -92.39043884259915}, {latitude: 44.007253440055344, longitude: -92.3904339617919}, {latitude: 44.00726996411364, longitude: -92.39043368123015}, {latitude: 44.00728242210206, longitude: -92.39042937761312}, {latitude: 44.00729738115168, longitude: -92.39042271172833}, {latitude: 44.00730698411163, longitude: -92.39041823226454}, {latitude: 44.00731678282986, longitude: -92.39041522381036}, {latitude: 44.007331483445654, longitude: -92.39041748500719}, {latitude: 44.00734617151441, longitude: -92.3904142248112}, {latitude: 44.00735833376541, longitude: -92.39039820105242}, {latitude: 44.007364923916036, longitude: -92.39038508187748}, {latitude: 44.007367904436194, longitude: -92.39036323363482}, {latitude: 44.00737559615935, longitude: -92.39032280977409}, {latitude: 44.007378468563495, longitude: -92.39030045648173}]

export default function AutoMeasure() {
  const router = useRouter();  

  const { height, width } = useWindowDimensions();
  const [ currentLocation, setCurrentLocation ] = useState(null);
  const [ initialRegion, setInitialRegion ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState([])
  const [ polygonArea, setPolygonArea ] = useState()
  const [ polygonDistance, setPolygonDistance ] = useState()
  const [ isMeasuring, setIsMeasuring ] = useState(true)

  // check if location permission is granted
    // if so, set initial region as current location
  useEffect(() => {
    const getInitialLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Required",
          "Please enable location services in your phone settings to use this feature.",
          [
            { text: "Go Back", style: "cancel", onPress: () => router.back()}
          ]
        )
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

    };
    getInitialLocation();
  }, []);

  const updateLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
  }

  // when location changes and the user is measuring, add the new location to the polygon and generate measurements for the polygon
  useEffect(() => {
    if (currentLocation && isMeasuring) {
      addLocationToPolygon(currentLocation)
    }
    if (polygonCoordinates.length > 1) {
      setPolygonDistance(getPathLength(polygonCoordinates))
      setPolygonArea(getAreaOfPolygon(polygonCoordinates))
    }
  }, [currentLocation])

  // add a new location to the polygon
  const addLocationToPolygon = async (newLocation) => {
    await setPolygonCoordinates([{ latitude: newLocation.latitude, longitude: newLocation.longitude}, ...polygonCoordinates])
    console.log(polygonCoordinates)
  }

  // reset the polygon coordinates and measurements
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

            {polygonCoordinates && (
              (polygonCoordinates.map((coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                  }}
                  title="Location"
                  />
              )))
            )}

            {polygonCoordinates.length < 3 && (
              <Polyline
                strokeColor="red"
                strokeWidth={2}
                coordinates={polygonCoordinates}
              />
            )}

            {polygonCoordinates.length > 2 && (
              <Polygon 
                strokeColor="red"
                strokeWidth={2}
                coordinates={polygonCoordinates}
              />
            )}
        </MapView>
      )}

      <MeasurementDisplay 
        polygonArea={polygonArea} 
        polygonDistance={polygonDistance} />

      <View className="absolute bottom-8" style={{width: width-32}}>
        <AddMarkerButton updateLocation={updateLocation} />

        <View className="w-full flex-row justify-between">
          <ResetMeasurementsButton resetMeasurements={resetMeasurements} />
          <Pressable className="flex-grow p-4">
            <Text className="text-center text-lg">Save</Text>
          </Pressable>
        </View>
      </View>
      
    </View>
  );
}
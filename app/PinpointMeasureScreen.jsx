import { Text, View, Pressable, useWindowDimensions, Alert, Button } from 'react-native';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength, getCenterOfBounds } from 'geolib';
import { useRouter, Link, Stack } from 'expo-router';
import { MeasurementDisplay, AddMarkerButton, ResetMeasurementsButton, RedoMarkerButton, SaveMeasurementsButton } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStorage } from '../hooks';

const walkToMailbox = [{latitude: 44.00719339068559, longitude: -92.39045458757248}, {latitude: 44.00720777521759, longitude: -92.39044857257788}, {latitude: 44.00722463996818, longitude: -92.39044552876923}, {latitude: 44.00723910893775, longitude: -92.39043884259915}, {latitude: 44.007253440055344, longitude: -92.3904339617919}, {latitude: 44.00726996411364, longitude: -92.39043368123015}, {latitude: 44.00728242210206, longitude: -92.39042937761312}, {latitude: 44.00729738115168, longitude: -92.39042271172833}, {latitude: 44.00730698411163, longitude: -92.39041823226454}, {latitude: 44.00731678282986, longitude: -92.39041522381036}, {latitude: 44.007331483445654, longitude: -92.39041748500719}, {latitude: 44.00734617151441, longitude: -92.3904142248112}, {latitude: 44.00735833376541, longitude: -92.39039820105242}, {latitude: 44.007364923916036, longitude: -92.39038508187748}, {latitude: 44.007367904436194, longitude: -92.39036323363482}, {latitude: 44.00737559615935, longitude: -92.39032280977409}, {latitude: 44.007378468563495, longitude: -92.39030045648173}]

export default function AutoMeasure() {
  const router = useRouter();  

  const { height, width } = useWindowDimensions();
  const [ currentLocation, setCurrentLocation ] = useState(null);
  const [ region, setRegion ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState([])
  const [ polygonArea, setPolygonArea ] = useState()
  const [ polygonDistance, setPolygonDistance ] = useState()
  const [ isMeasuring, setIsMeasuring ] = useState(true)
  const [ mapType, setMapType ] = useState("")

  // check if location permission is granted
    // if so, set initial region as current location
  useEffect(() => {
    getMapPreferences()
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

    };
    getInitialLocation();
    getCurrentMap();
  }, []);

  const updateLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    await setCurrentLocation(location.coords);
  }

  const redoPreviousMarker = async () => {
    await updateLocation()
    // let oldCoordinates = [...polygonCoordinates]
    polygonCoordinates.length === 1
      ? await setPolygonCoordinates([currentLocation.coords])
      : await setPolygonCoordinates(polygonCoordinates.slice(0, -1).push(currentLocation.coords))
    // console.log(polygonCoordinates)
  }

  // when location changes and the user is measuring, add the new location to the polygon and generate measurements for the polygon
  useEffect(() => {
    if (currentLocation && isMeasuring) {
      addLocationToPolygon(currentLocation)
      setRegion(currentLocation)
    }
    if (polygonCoordinates.length > 1) {
      setPolygonDistance(getPathLength(polygonCoordinates))
      setPolygonArea(getAreaOfPolygon(polygonCoordinates))
    }
  }, [currentLocation])

  const getMapPreferences = async () => {
    try {
      const value = await AsyncStorage.getItem('mapPreferences');
      if (value !== null) {
        setMapType(JSON.parse(value))
      } 
    } catch (error) {
        console.log(error)
    }
  }

  const getCurrentMap = async () => {
    try {
      const value = await AsyncStorage.getItem('currentPinpointCoordinates');
      if (value !== null) {
        setPolygonCoordinates(JSON.parse(value))
        const center = getCenterOfBounds(JSON.parse(value))
        setRegion(center)

      } else {
        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }

    } catch (error) {
      console.log(error)
    }
  }

  const removeCurrentMapFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('currentPinpointCoordinates')
    } catch (error) {
      console.log(error)
    }
  }

  // add a new location to the polygon
  const addLocationToPolygon = async () => {
    await setPolygonCoordinates([{ latitude: currentLocation.latitude, longitude: currentLocation.longitude}, ...polygonCoordinates])
    useStorage('save', 'currentPinpointCoordinates', polygonCoordinates)
    // console.log(polygonCoordinates)
  }

  // reset the polygon coordinates and measurements
  const resetMeasurements = () => {
    removeCurrentMapFromStorage()
    setPolygonCoordinates([])
    setPolygonArea(null)
    setPolygonDistance(null)
  }

  return (
    <>
      <Stack.Screen options={{
        title: 'Pinpoint Measure',
        headerBackTitleVisible: false,
        headerTintColor: '#6DAB64',
        headerTitleStyle: {
          color: '#1D3F13',
        },
      }} />

    <View className="flex-1 items-center justify-center">
      {region && (
        <MapView 
          style={{flex: 1, width: '100%'}}
          region={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}
          mapType={mapType || "standard"}>

            {polygonCoordinates.length > 0 && (
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
              <>
                <Polygon
                  strokeColor='transparent'
                  fillColor="rgba(255, 255, 255, 0.6)"
                  strokeWidth={1}
                  coordinates={polygonCoordinates} />
                
                <Polyline
                  strokeColor="red"
                  strokeWidth={2}
                  coordinates={polygonCoordinates} />
              </>
            )}
        </MapView>
      )}

      <MeasurementDisplay 
        polygonArea={polygonArea} 
        polygonDistance={polygonDistance}
        setMapType={setMapType}/>

      <View className="absolute bottom-2 py-4 px-2 w-full items-end mb-2" style={{gap: 8}}>

        <View className="w-full flex-row justify-between absolute bottom-24 left-2">
          <ResetMeasurementsButton resetMeasurements={resetMeasurements} mapType={mapType} />
          <SaveMeasurementsButton polygonCoordinates={polygonCoordinates} polygonArea={polygonArea} polygonDistance={polygonDistance} mapType={mapType}/>
        </View>

        <AddMarkerButton updateLocation={updateLocation} />

        {/* <View className="w-full flex-row justify-between mb-1" style={{gap: 8}}>
          <ResetMeasurementsButton resetMeasurements={resetMeasurements} mapType={mapType} />
          <SaveMeasurementsButton polygonCoordinates={polygonCoordinates} polygonArea={polygonArea} polygonDistance={polygonDistance} mapType={mapType}/>
        </View> */}
      </View>

      
    </View>
  </>
  );
}
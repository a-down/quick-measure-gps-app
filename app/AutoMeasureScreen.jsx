import { Text, View, Pressable, useWindowDimensions, Alert, Button } from 'react-native';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength } from 'geolib';
import { useRouter, Link } from 'expo-router';
import { MeasurementDisplay, StopMeasuringButton, ResetMeasurementsButton, MapTypeAlert, SaveMeasurementsButton } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const walkToMailbox = [{latitude: 44.00719339068559, longitude: -92.39045458757248}, {latitude: 44.00720777521759, longitude: -92.39044857257788}, {latitude: 44.00722463996818, longitude: -92.39044552876923}, {latitude: 44.00723910893775, longitude: -92.39043884259915}, {latitude: 44.007253440055344, longitude: -92.3904339617919}, {latitude: 44.00726996411364, longitude: -92.39043368123015}, {latitude: 44.00728242210206, longitude: -92.39042937761312}, {latitude: 44.00729738115168, longitude: -92.39042271172833}, {latitude: 44.00730698411163, longitude: -92.39041823226454}, {latitude: 44.00731678282986, longitude: -92.39041522381036}, {latitude: 44.007331483445654, longitude: -92.39041748500719}, {latitude: 44.00734617151441, longitude: -92.3904142248112}, {latitude: 44.00735833376541, longitude: -92.39039820105242}, {latitude: 44.007364923916036, longitude: -92.39038508187748}, {latitude: 44.007367904436194, longitude: -92.39036323363482}, {latitude: 44.00737559615935, longitude: -92.39032280977409}, {latitude: 44.007378468563495, longitude: -92.39030045648173}]

export default function AutoMeasure() {
  const router = useRouter();  

  const { height, width } = useWindowDimensions();
  const [ currentLocation, setCurrentLocation ] = useState(null);
  // const [ region, setRegion ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState(walkToMailbox)
  const [ polygonArea, setPolygonArea ] = useState()
  const [ polygonDistance, setPolygonDistance ] = useState()
  const [ isMeasuring, setIsMeasuring ] = useState(true)
  const [ mapType, setMapType ] = useState("")


  // check if location permission is granted
    // if so, set initial region as current location
    // if so, start locationSubscription
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

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      // setRegion({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      //   latitudeDelta: 0.005,
      //   longitudeDelta: 0.005,
      // });

      const locationSubscription = await Location.watchPositionAsync(
        {accuracy:Location.Accuracy.BestForNavigation, distanceInterval: 1},
        (loc) => {
          setCurrentLocation(loc.coords)
        }
      );
    };
    getInitialLocation();
  }, []);

  // when location changes and the user is measuring, add the new location to the polygon and generate measurements for the polygon
  useEffect(() => {
    if (currentLocation && isMeasuring) {
      addLocationToPolygon(currentLocation)
    }
    if (polygonCoordinates.length > 1 && isMeasuring) {
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

  // add a new location to the polygon
  const addLocationToPolygon = async (newLocation) => {
    await setPolygonCoordinates([{ latitude: newLocation.latitude, longitude: newLocation.longitude}, ...polygonCoordinates])
    // console.log(polygonCoordinates)
  }

  // reset the polygon coordinates and measurements
  const resetMeasurements = () => {
    setPolygonCoordinates([])
    setPolygonArea(null)
    setPolygonDistance(null)
  }

  const getDistanceTraveled = (coordinates) => {
    let distance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      distance += getPathLength([coordinates[i], coordinates[i+1]])
    }
    return distance;
  }

  return (
    <View className="flex-1 items-center justify-center">
      {currentLocation && mapType && (
        <MapView 
          style={{flex: 1, width: '100%'}}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}
          mapType={mapType || "standard"}>

            {currentLocation && (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Your Location"
                mapPadding={'0px'}
              />
            )}

            <Polyline 
              strokeColor="red"
              strokeWidth={2}
              coordinates={polygonCoordinates}
            />

            <Polyline 
              strokeColor="gray"
              strokeWidth={1}
              coordinates={[polygonCoordinates[0], polygonCoordinates[polygonCoordinates.length - 1]]}
            />
        </MapView>
      )}

      <MeasurementDisplay 
        polygonArea={polygonArea} 
        polygonDistance={polygonDistance}
        setMapType={setMapType}
        absolute={true} />

      <View className="absolute bottom-0 bg-white p-4 w-full rounded-t-3xl" style={{gap: 8}}>
        <StopMeasuringButton isMeasuring={isMeasuring} setIsMeasuring={setIsMeasuring} polygonCoordinates={polygonCoordinates} />

        <View className="w-full flex-row justify-between mb-1">
          <ResetMeasurementsButton resetMeasurements={resetMeasurements} mapType={mapType} />
          <SaveMeasurementsButton polygonCoordinates={polygonCoordinates} polygonArea={polygonArea} polygonDistance={polygonDistance} mapType={mapType}/>
        </View>
      </View>
      
    </View>
  );
}
import { View, useWindowDimensions, Alert } from 'react-native';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength } from 'geolib';
import { useRouter } from 'expo-router';
import { MeasurementDisplay, StopMeasuringButton, ResetMeasurementsButton, SaveMeasurementsButton, Map } from '../components';
import { useStorage } from '../hooks';

const walkToMailbox = [{latitude: 44.00719339068559, longitude: -92.39045458757248}, {latitude: 44.00720777521759, longitude: -92.39044857257788}, {latitude: 44.00722463996818, longitude: -92.39044552876923}, {latitude: 44.00723910893775, longitude: -92.39043884259915}, {latitude: 44.007253440055344, longitude: -92.3904339617919}, {latitude: 44.00726996411364, longitude: -92.39043368123015}, {latitude: 44.00728242210206, longitude: -92.39042937761312}, {latitude: 44.00729738115168, longitude: -92.39042271172833}, {latitude: 44.00730698411163, longitude: -92.39041823226454}, {latitude: 44.00731678282986, longitude: -92.39041522381036}, {latitude: 44.007331483445654, longitude: -92.39041748500719}, {latitude: 44.00734617151441, longitude: -92.3904142248112}, {latitude: 44.00735833376541, longitude: -92.39039820105242}, {latitude: 44.007364923916036, longitude: -92.39038508187748}, {latitude: 44.007367904436194, longitude: -92.39036323363482}, {latitude: 44.00737559615935, longitude: -92.39032280977409}, {latitude: 44.007378468563495, longitude: -92.39030045648173}]

export default function AutoMeasure() {
  const router = useRouter();  

  const [ currentLocation, setCurrentLocation ] = useState(null);
  // const [ region, setRegion ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState([])
  const [ polygonArea, setPolygonArea ] = useState()
  const [ polygonDistance, setPolygonDistance ] = useState()
  const [ isMeasuring, setIsMeasuring ] = useState(true)
  const [ mapType, setMapType ] = useState("")
  const [ areaVisible, setAreaVisible ] = useState(true)

  // check if location permission is granted
    // if so, set initial region as current location
    // if so, start locationSubscription
  useEffect(() => {
    useStorage('get', 'mapPreferences').then(value => setMapType(value))
    useStorage('get', 'currentAutoCoordinates').then(value => {
      if (value) setPolygonCoordinates(value)
    })
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
      useStorage('set', 'currentAutoCoordinates', polygonCoordinates)
    }
    if (polygonCoordinates.length > 1 && isMeasuring) {
      setPolygonDistance(getPathLength(polygonCoordinates))
      setPolygonArea(getAreaOfPolygon(polygonCoordinates))
    }
  }, [currentLocation])

  // add a new location to the polygon
  const addLocationToPolygon = async (newLocation) => {
    await setPolygonCoordinates([{ latitude: newLocation.latitude, longitude: newLocation.longitude}, ...polygonCoordinates])
  }

  // reset the polygon coordinates and measurements
  const resetMeasurements = () => {
    useStorage('remove', 'currentAutoCoordinates')
    setPolygonCoordinates([])
    setPolygonArea(null)
    setPolygonDistance(null)
  }

  return (
    <View className="flex-1 items-center justify-center">
      {currentLocation && (
        <Map 
          region={currentLocation}
          polygonCoordinates={polygonCoordinates}
          mapType={mapType}
          areaVisible={areaVisible}/>
      )}

      <MeasurementDisplay 
        polygonArea={polygonArea} 
        polygonDistance={polygonDistance}
        setMapType={setMapType}
        areaVisible={areaVisible}
        setAreaVisible={setAreaVisible}/>

      <View className="absolute bottom-2 py-4 px-2 w-full mb-2" style={{gap: 8}}>
        <View className="w-full flex-row justify-between absolute bottom-24 left-2">
          <ResetMeasurementsButton resetMeasurements={resetMeasurements} mapType={mapType} />
          <SaveMeasurementsButton polygonCoordinates={polygonCoordinates} polygonArea={polygonArea} polygonDistance={polygonDistance} mapType={mapType}/>
        </View>

        <StopMeasuringButton isMeasuring={isMeasuring} setIsMeasuring={setIsMeasuring} polygonCoordinates={polygonCoordinates} />
      </View>
      
    </View>
  );
}
import { View, Alert } from 'react-native';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { useEffect, useState, useRef } from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength, getCenterOfBounds } from 'geolib';
import { useRouter } from 'expo-router';
import { MeasurementDisplay, AddMarkerButton, ResetMeasurementsButton, SaveMeasurementsButton, Map, ToggleDeleteModeButton, DeleteOptionsBottomSheet, DeleteMarkersButton } from '../components';
import { useStorage } from '../hooks';

const walkToMailbox = [{latitude: 44.00719339068559, longitude: -92.39045458757248}, {latitude: 44.00720777521759, longitude: -92.39044857257788}, {latitude: 44.00722463996818, longitude: -92.39044552876923}, {latitude: 44.00723910893775, longitude: -92.39043884259915}, {latitude: 44.007253440055344, longitude: -92.3904339617919}, {latitude: 44.00726996411364, longitude: -92.39043368123015}, {latitude: 44.00728242210206, longitude: -92.39042937761312}, {latitude: 44.00729738115168, longitude: -92.39042271172833}, {latitude: 44.00730698411163, longitude: -92.39041823226454}, {latitude: 44.00731678282986, longitude: -92.39041522381036}, {latitude: 44.007331483445654, longitude: -92.39041748500719}, {latitude: 44.00734617151441, longitude: -92.3904142248112}, {latitude: 44.00735833376541, longitude: -92.39039820105242}, {latitude: 44.007364923916036, longitude: -92.39038508187748}, {latitude: 44.007367904436194, longitude: -92.39036323363482}, {latitude: 44.00737559615935, longitude: -92.39032280977409}, {latitude: 44.007378468563495, longitude: -92.39030045648173}]

export default function AutoMeasure() {
  const router = useRouter();  

  const deleteSheetRef = useRef();
  const saveSheetRef = useRef();

  const [ currentLocation, setCurrentLocation ] = useState(null);
  const [ region, setRegion ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState([])
  const [ polygonArea, setPolygonArea ] = useState()
  const [ polygonDistance, setPolygonDistance ] = useState()
  const [ mapType, setMapType ] = useState("")
  const [ areaVisible, setAreaVisible ] = useState(true)
  const [ markersVisible, setMarkersVisible ] = useState(true)
  const [ deleteMode, setDeleteMode ] = useState(false)
  const [ markersToDelete, setMarkersToDelete ] = useState([])
  const [ previousCoordinates, setPreviousCoordinates ] = useState([])

  // check if location permission is granted
    // if so, set initial region as current location
  useEffect(() => {
    useStorage('get', 'mapPreferences').then(value => setMapType(value))
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
    getCurrentMap();
    getInitialLocation();
  }, []);

  const updateLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    await setCurrentLocation(location.coords);
  }

  // when location changes and the user is measuring, add the new location to the polygon and generate measurements for the polygon
  useEffect(() => {
    if (currentLocation) {
      addLocationToPolygon(currentLocation)
      setRegion(currentLocation)
    }
    if (polygonCoordinates.length > 1) {
      setPolygonDistance(getPathLength(polygonCoordinates))
      setPolygonArea(getAreaOfPolygon(polygonCoordinates))
    }
  }, [currentLocation])

  // get the current map from storage or set the map to the user's current location
  const getCurrentMap = async () => {
    const value = await useStorage('get', 'currentPinpointCoordinates')

    if (value !== null && value.length > 0) {
      setPolygonCoordinates(value)
      setRegion(getCenterOfBounds(value))

    } else {
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }

  // add a new location to the polygon
  const addLocationToPolygon = async () => {
    await setPolygonCoordinates([{ latitude: currentLocation.latitude, longitude: currentLocation.longitude}, ...polygonCoordinates])
    useStorage('set', 'currentPinpointCoordinates', polygonCoordinates)
  }

  // reset the polygon coordinates and measurements
  const resetMeasurements = () => {
    deleteSheetRef.current.close()
    setMarkersToDelete([])
    useStorage('remove', 'currentPinpointCoordinates')
    setPolygonCoordinates([])
    setPolygonArea(null)
    setPolygonDistance(null)
  }

  return (
    <>
      <View className="flex-1 items-center justify-center">

        {region && polygonCoordinates && (
          <Map 
            region={region}
            polygonCoordinates={polygonCoordinates}
            mapType={mapType}
            areaVisible={areaVisible}
            deleteMode={deleteMode}
            markersToDelete={markersToDelete}
            setMarkersToDelete={setMarkersToDelete}
            markersVisible={markersVisible}/>
        )}

        <MeasurementDisplay 
          polygonArea={polygonArea} 
          polygonDistance={polygonDistance}
          setMapType={setMapType}
          areaVisible={areaVisible}
          setAreaVisible={setAreaVisible}
          markersVisible={markersVisible}
          setMarkersVisible={setMarkersVisible} />

        <View className="absolute bottom-2 py-4 px-2 w-full mb-2" style={{gap: 8}}>
          <View className="w-full flex-row justify-between absolute bottom-24 left-2">
            <ToggleDeleteModeButton
              setDeleteMode={setDeleteMode}
              setMarkersToDelete={setMarkersToDelete}
              deleteMode={deleteMode}
              mapType={mapType} />

            <SaveMeasurementsButton 
              polygonCoordinates={polygonCoordinates} 
              polygonArea={polygonArea} 
              polygonDistance={polygonDistance} 
              mapType={mapType} 
              saveSheetReg={saveSheetRef}/>
          </View>

          <AddMarkerButton updateLocation={updateLocation} />
        </View>

        <DeleteOptionsBottomSheet
          deleteSheetRef={deleteSheetRef}
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          setPolygonCoordinates={setPolygonCoordinates}
          previousCoordinates={previousCoordinates}
          setPreviousCoordinates={setPreviousCoordinates}
          setMarkersToDelete={setMarkersToDelete}>

          <DeleteMarkersButton 
            polygonCoordinates={polygonCoordinates}
            setPolygonCoordinates={setPolygonCoordinates}
            markersToDelete={markersToDelete}
            setMarkersToDelete={setMarkersToDelete}
            mapType={mapType}
            resetMeasurements={resetMeasurements}
            previousCoordinates={previousCoordinates}
            setPreviousCoordinates={setPreviousCoordinates}
            polygonCoordinatesLength={polygonCoordinates.length} />

          <ResetMeasurementsButton resetMeasurements={resetMeasurements} mapType={mapType} markersToDelete={markersToDelete} polygonCoordinatesLength={polygonCoordinates.length}/>
        </DeleteOptionsBottomSheet>

      </View>
    </>
  );
}
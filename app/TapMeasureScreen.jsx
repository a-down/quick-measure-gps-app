import { View, Alert, ScrollView, Text, Pressable, Button, useWindowDimensions } from 'react-native';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength, getCenterOfBounds } from 'geolib';
import { useRouter } from 'expo-router';
import { MeasurementDisplay, ResetMeasurementsButton, SaveMeasurementsButton, Map, ToggleDeleteModeButton, DeleteMarkersButton } from '../components';
import { useStorage } from '../hooks';
import BottomSheet from '@gorhom/bottom-sheet';
import { Feather } from '@expo/vector-icons';

const walkToMailbox = [{latitude: 44.00719339068559, longitude: -92.39045458757248}, {latitude: 44.00720777521759, longitude: -92.39044857257788}, {latitude: 44.00722463996818, longitude: -92.39044552876923}, {latitude: 44.00723910893775, longitude: -92.39043884259915}, {latitude: 44.007253440055344, longitude: -92.3904339617919}, {latitude: 44.00726996411364, longitude: -92.39043368123015}, {latitude: 44.00728242210206, longitude: -92.39042937761312}, {latitude: 44.00729738115168, longitude: -92.39042271172833}, {latitude: 44.00730698411163, longitude: -92.39041823226454}, {latitude: 44.00731678282986, longitude: -92.39041522381036}, {latitude: 44.007331483445654, longitude: -92.39041748500719}, {latitude: 44.00734617151441, longitude: -92.3904142248112}, {latitude: 44.00735833376541, longitude: -92.39039820105242}, {latitude: 44.007364923916036, longitude: -92.39038508187748}, {latitude: 44.007367904436194, longitude: -92.39036323363482}, {latitude: 44.00737559615935, longitude: -92.39032280977409}, {latitude: 44.007378468563495, longitude: -92.39030045648173}]

export default function TapMeasure() {
  const router = useRouter();  
  const { width } = useWindowDimensions();

  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => [200], []);
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setDeleteMode(false)
      setPreviousCoordinates([])
    }
  }, []);

  const [ region, setRegion ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState([])
  const [ polygonArea, setPolygonArea ] = useState()
  const [ polygonDistance, setPolygonDistance ] = useState()
  const [ mapType, setMapType ] = useState("")
  const [ areaVisible, setAreaVisible ] = useState(true)
  const [ selectedCoordinateIndex, setSelectedCoordinateIndex ] = useState(null)
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
    getInitialLocation();
    getCurrentMap()
  }, []);

  useEffect(() => {
    if (polygonCoordinates.length > 1) {
      setPolygonDistance(getPathLength(polygonCoordinates))
      setPolygonArea(getAreaOfPolygon(polygonCoordinates))
      useStorage('set', 'currentTapCoordinates', polygonCoordinates)
    }
  }, [polygonCoordinates])

  // get the current map from storage or set the map to the user's current location
  const getCurrentMap = async () => {
    const value = await useStorage('get', 'currentTapCoordinates')

    if (value !== null) {
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
  const addLocationToPolygon = async (location) => {
    if (polygonCoordinates.includes(location) === false) await setPolygonCoordinates([{ latitude: location.latitude, longitude: location.longitude}, ...polygonCoordinates])
  }

  const removeLocationFromPolygon = async (location) => {
    await setPolygonCoordinates(polygonCoordinates.filter(coordinate => coordinate.latitude !== location.latitude && coordinate.longitude !== location.longitude))
  }

  // reset the polygon coordinates and measurements
  const resetMeasurements = () => {
    bottomSheetRef.current.close()
    setMarkersToDelete([])
    useStorage('remove', 'currentTapCoordinates')
    setPolygonCoordinates([])
    setPolygonArea(null)
    setPolygonDistance(null)
  }

  return (
    <View className="flex-1 items-center justify-center">
      {region && (
        <Map 
          region={region}
          polygonCoordinates={polygonCoordinates}
          mapType={mapType}
          tappable={true}
          addLocationToPolygon={addLocationToPolygon}
          areaVisible={areaVisible}
          removeLocationFromPolygon={removeLocationFromPolygon}
          selectedCoordinateIndex={selectedCoordinateIndex}
          deleteMode={deleteMode}
          markersToDelete={markersToDelete}
          setMarkersToDelete={setMarkersToDelete}/>
      )}

      <MeasurementDisplay 
        polygonArea={polygonArea} 
        polygonDistance={polygonDistance}
        setMapType={setMapType}
        distanceAround={true}
        areaVisible={areaVisible}
        setAreaVisible={setAreaVisible} />

        <View className="absolute bottom-0 w-full items-center" style={{gap: 8}}>
          <View className="w-full flex flex-row justify-between mb-14 p-4 rounded-lg">

            <ToggleDeleteModeButton
              setDeleteMode={setDeleteMode}
              setMarkersToDelete={setMarkersToDelete}
              deleteMode={deleteMode}
              mapType={mapType} />

            {/* {deleteMode && (
              <DeleteMarkersButton 
                onPress={() => setDeleteMode(!deleteMode)}
                polygonCoordinates={polygonCoordinates}
                setPolygonCoordinates={setPolygonCoordinates}
                markersToDelete={markersToDelete}
                setMarkersToDelete={setMarkersToDelete}
                mapType={mapType}
                resetMeasurements={resetMeasurements} />
            )}

            {deleteMode && (
              <ResetMeasurementsButton resetMeasurements={resetMeasurements} mapType={mapType} />
            )} */}

            <SaveMeasurementsButton polygonCoordinates={polygonCoordinates} polygonArea={polygonArea} polygonDistance={polygonDistance} mapType={mapType}/>
          </View>
        </View>

      <BottomSheet
        style={{ flex: 1 }}
        color={'#7f1d1d'}
        backgroundStyle={{ backgroundColor: '#7f1d1d' }}
        handleIndicatorStyle={{ backgroundColor: '#fee2e2' }}
        ref={bottomSheetRef}
        index={deleteMode ? 0 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
      >
        <View className="flex-1 px-6 justify-start relative" style={{gap: 24}}>

            <Text className=" text-[#fee2e2] text-sm text-center mb-2 ">(swipe down to dismiss)</Text>

            {previousCoordinates.length > 0 && (
              <Pressable className="absolute left-4 p-2 bg-[#fee2e2] text-[#7f1d1d] rounded-md flex-row"
                style={{gap: 4}} 
                onPress={() => {
                  setPolygonCoordinates(previousCoordinates[0])
                  previousCoordinates.length > 1 
                    ? setPreviousCoordinates(previousCoordinates.slice(1))
                    : setPreviousCoordinates([])
              }}>
                <Feather name="rotate-ccw" size={16} color="black" />
                <Text>Undo</Text>
              </Pressable>
            )}

            <DeleteMarkersButton 
              onPress={() => setDeleteMode(!deleteMode)}
              polygonCoordinates={polygonCoordinates}
              setPolygonCoordinates={setPolygonCoordinates}
              markersToDelete={markersToDelete}
              setMarkersToDelete={setMarkersToDelete}
              mapType={mapType}
              resetMeasurements={resetMeasurements}
              previousCoordinates={previousCoordinates}
              setPreviousCoordinates={setPreviousCoordinates} />

            <ResetMeasurementsButton resetMeasurements={resetMeasurements} mapType={mapType} />
        </View>
      </BottomSheet>

    </View>
  );
}
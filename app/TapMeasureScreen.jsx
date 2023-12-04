import { View, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength, getCenterOfBounds } from 'geolib';
import { useRouter } from 'expo-router';
import { MeasurementDisplay, ResetMeasurementsButton, SaveMeasurementsButton, Map, ToggleDeleteModeButton, DeleteMarkersButton, DeleteOptionsBottomSheet, SaveMapBottomSheet } from '../components';
import { useStorage } from '../hooks';


export default function TapMeasure() {
  const router = useRouter();  

  const deleteSheetRef = useRef();
  const saveSheetRef = useRef();

  const [ region, setRegion ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState([{"latitude": 40.76507834389219, "longitude": -73.97257207305711}, {"latitude": 40.76507842207806, "longitude": -73.97263471694518}, {"latitude": 40.76522142114563, "longitude": -73.97297091312403}, {"latitude": 40.765212491991, "longitude": -73.9733044264009}, {"latitude": 40.76476507759784, "longitude": -73.97360789171819}, {"latitude": 40.76473604139859, "longitude": -73.97369075704603}, {"latitude": 40.76791791241632, "longitude": -73.98120038289578}, {"latitude": 40.768079358691224, "longitude": -73.98118608011002}, {"latitude": 40.768318886080344, "longitude": -73.98126830869528}, {"latitude": 40.76850807781592, "longitude": -73.98142510110712}, {"latitude": 40.80027460355391, "longitude": -73.95824935657963}, {"latitude": 40.80029066002276, "longitude": -73.95803835272892}, {"latitude": 40.800398678286925, "longitude": -73.9578469072631}, {"latitude": 40.80040391922109, "longitude": -73.95778528670533}, {"latitude": 40.79699673591258, "longitude": -73.94973602781586}, {"latitude": 40.79677797274195, "longitude": -73.9496994391203}, {"latitude": 40.79659462142288, "longitude": -73.94955385545865}, {"latitude": 40.76507834389219, "longitude": -73.97257207305711}])
  const [ polygonArea, setPolygonArea ] = useState()
  const [ polygonDistance, setPolygonDistance ] = useState()
  const [ mapType, setMapType ] = useState("")
  const [ areaVisible, setAreaVisible ] = useState(true)
  const [ markersVisible, setMarkersVisible ] = useState(true)
  const [ deleteMode, setDeleteMode ] = useState(false)
  const [ markersToDelete, setMarkersToDelete ] = useState([])
  const [ previousCoordinates, setPreviousCoordinates ] = useState([])
  const [ currentPreferences, setCurrentPreferences ] = useState(null)

  console.log(polygonCoordinates)

  // check if location permission is granted
    // if so, set initial region as current location
  useEffect(() => {
    useStorage('get', 'mapPreferences').then(value => setMapType(value))
    start()
  }, []);

  const start = async () => {
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
    await getCurrentMap()
    await getPreferencesForSave()
  }

  // when a coordinate is added to polygonCoordinates, generate measurements and store the current polygon to storage
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

  // reset the polygon coordinates and measurements
  const resetMeasurements = () => {
    deleteSheetRef.current.close()
    setMarkersToDelete([])
    useStorage('remove', 'currentTapCoordinates')
    setPolygonCoordinates([])
    setPolygonArea(null)
    setPolygonDistance(null)
  }

  // get preferences to display on SaveMapBottomSheet
  const getPreferencesForSave = async () => {
    const value = await useStorage('get', 'measurementPreferences')
    if (value !== null) setCurrentPreferences(value)
  }

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="dark" />
      {!region && (
        <ActivityIndicator size="small" color="#6DAB64" />
      )}

      {region && (
        <Map 
          region={region}
          polygonCoordinates={polygonCoordinates}
          mapType={mapType}
          tappable={true}
          addLocationToPolygon={addLocationToPolygon}
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
        distanceAround={true}
        areaVisible={areaVisible}
        setAreaVisible={setAreaVisible}
        markersVisible={markersVisible}
        setMarkersVisible={setMarkersVisible}
        getPreferencesForSave={getPreferencesForSave} />

      <View className="absolute bottom-0 w-full items-center" style={{gap: 8}}>
        <View className="w-full flex flex-row justify-between mb-14 p-4 rounded-lg">
          <ToggleDeleteModeButton
            setDeleteMode={setDeleteMode}
            setMarkersToDelete={setMarkersToDelete}
            deleteMode={deleteMode}
            mapType={mapType} />

          <SaveMeasurementsButton saveSheetRef={saveSheetRef} mapType={mapType}/>
        </View>
      </View>

      <DeleteOptionsBottomSheet
        deleteSheetRef={deleteSheetRef}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        setPolygonCoordinates={setPolygonCoordinates}
        previousCoordinates={previousCoordinates}
        setPreviousCoordinates={setPreviousCoordinates}
        setMarkersToDelete={setMarkersToDelete}
        >
          
        <DeleteMarkersButton 
          polygonCoordinates={polygonCoordinates}
          setPolygonCoordinates={setPolygonCoordinates}
          markersToDelete={markersToDelete}
          setMarkersToDelete={setMarkersToDelete}
          mapType={mapType}
          resetMeasurements={resetMeasurements}
          previousCoordinates={previousCoordinates}
          setPreviousCoordinates={setPreviousCoordinates} />

        <ResetMeasurementsButton resetMeasurements={resetMeasurements} mapType={mapType} markersToDelete={markersToDelete} polygonCoordinatesLength={polygonCoordinates.length}/>
      </DeleteOptionsBottomSheet>

      <SaveMapBottomSheet 
        polygonCoordinates={polygonCoordinates}
        saveSheetRef={saveSheetRef}
        mapType={mapType}
        polygonArea={polygonArea}
        polygonDistance={polygonDistance}
        currentPreferences={currentPreferences}
        tool={'TapMeasure'}/>

    </View>
  );
}
import { View, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength } from 'geolib';
import { useRouter } from 'expo-router';
import { MeasurementDisplay, ToggleMeasuringButton, ResetMeasurementsButton, SaveMeasurementsButton, Map, ToggleDeleteModeButton, DeleteOptionsBottomSheet, DeleteMarkersButton, SaveMapBottomSheet } from '../components';
import { useStorage } from '../hooks';


export default function AutoMeasure() {
  const router = useRouter();  

  const deleteSheetRef = useRef();
  const saveSheetRef = useRef();

  const [ region, setRegion ] = useState(null);
  const [ currentLocation, setCurrentLocation ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState([{"latitude": 36.5613419495347, "longitude": -121.94035277951814}, {"latitude": 36.561320353528366, "longitude": -121.94032320403902}, {"latitude": 36.56130811577776, "longitude": -121.94028377005317}, {"latitude": 36.56130595617645, "longitude": -121.9402434398544}, {"latitude": 36.56132179324036, "longitude": -121.9402004209757}, {"latitude": 36.561342669390484, "longitude": -121.94016905302965}, {"latitude": 36.5613664249903, "longitude": -121.94013858133755}, {"latitude": 36.5614074573727, "longitude": -121.94010542096552}, {"latitude": 36.56144920958814, "longitude": -121.94008749641905}, {"latitude": 36.561477284348385, "longitude": -121.94006867565965}, {"latitude": 36.56151610406361, "longitude": -121.94007355852877}, {"latitude": 36.56155416509598, "longitude": -121.94008428736507}, {"latitude": 36.56158504476788, "longitude": -121.94008786363023}, {"latitude": 36.561629568951, "longitude": -121.94010663909374}, {"latitude": 36.56167193868202, "longitude": -121.9401173679301}, {"latitude": 36.56169348261525, "longitude": -121.94013703744969}, {"latitude": 36.56172077159969, "longitude": -121.94016922395866}, {"latitude": 36.56176242316126, "longitude": -121.94018799942219}, {"latitude": 36.56181341041146, "longitude": -121.94018352910098}, {"latitude": 36.561861525088375, "longitude": -121.94019246978431}, {"latitude": 36.56189455905772, "longitude": -121.94019425793734}, {"latitude": 36.56191035788623, "longitude": -121.94024253770074}, {"latitude": 36.561927592980126, "longitude": -121.94026578348547}, {"latitude": 36.56194985495973, "longitude": -121.94029707593839}, {"latitude": 36.561987915778445, "longitude": -121.9403355209215}, {"latitude": 36.562005150855036, "longitude": -121.94035429638508}, {"latitude": 36.562029567196, "longitude": -121.94038827104708}, {"latitude": 36.5620575741784, "longitude": -121.94042850418327}, {"latitude": 36.562097789325776, "longitude": -121.94045532627406}])
  const [ polygonArea, setPolygonArea ] = useState(getAreaOfPolygon(polygonCoordinates))
  const [ polygonDistance, setPolygonDistance ] = useState(getPathLength(polygonCoordinates))
  const [ isMeasuring, setIsMeasuring ] = useState(false)
  const [ mapType, setMapType ] = useState("")
  const [ areaVisible, setAreaVisible ] = useState(true)
  const [ markersVisible, setMarkersVisible ] = useState(true)
  const [ deleteMode, setDeleteMode ] = useState(false)
  const [ markersToDelete, setMarkersToDelete ] = useState([])
  const [ previousCoordinates, setPreviousCoordinates ] = useState([])
  const [ currentPreferences, setCurrentPreferences ] = useState(null)

  // check if location permission is granted
    // if so, set initial region as current location
    // if so, start locationSubscription for location updates
  useEffect(() => {
    useStorage('get', 'mapPreferences').then(value => setMapType(value))
    useStorage('get', 'currentAutoCoordinates').then(value => {
      if (value) setPolygonCoordinates(value)
    })
    getPreferencesForSave()
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
      setRegion(location.coords);

      const locationSubscription = await Location.watchPositionAsync(
        {accuracy:Location.Accuracy.Highest, distanceInterval: 1},
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
      setRegion(currentLocation)
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
    deleteSheetRef.current.close()
    setMarkersToDelete([])
    useStorage('remove', 'currentAutoCoordinates')
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
      {!currentLocation && (
        <ActivityIndicator size="small" color="#6DAB64" />
      )}

      {currentLocation && (
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
        deleteMode={deleteMode}
        markersToDelete={markersToDelete}
        setMarkersToDelete={setMarkersToDelete}
        markersVisible={markersVisible}
        setMarkersVisible={setMarkersVisible}
        getPreferencesForSave={getPreferencesForSave} />

      <View className="absolute bottom-10 py-4 px-2 w-full mb-2" style={{gap: 8}}>
        <View className="w-full flex-row justify-between absolute bottom-24 left-2">
          <ToggleDeleteModeButton
            setDeleteMode={setDeleteMode}
            setMarkersToDelete={setMarkersToDelete}
            deleteMode={deleteMode}
            mapType={mapType} />

          <SaveMeasurementsButton 
            mapType={mapType}
            saveSheetRef={saveSheetRef}/>
        </View>

        <ToggleMeasuringButton isMeasuring={isMeasuring} setIsMeasuring={setIsMeasuring} polygonCoordinates={polygonCoordinates} setPolygonCoordinates={setPolygonCoordinates} />
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

      <SaveMapBottomSheet 
        polygonCoordinates={polygonCoordinates}
        saveSheetRef={saveSheetRef}
        mapType={mapType}
        polygonArea={polygonArea}
        polygonDistance={polygonDistance}
        currentPreferences={currentPreferences}
        tool={'AutoMeasure'}/>
      
    </View>
  );
}
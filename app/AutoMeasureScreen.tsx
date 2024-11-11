import { View, Alert, ActivityIndicator, StatusBar } from "react-native";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength } from "geolib";
import { useRouter } from "expo-router";
import {
  MeasurementDisplay,
  ToggleMeasuringButton,
  ResetMeasurementsButton,
  SaveMeasurementsButton,
  Map,
  ToggleDeleteModeButton,
  DeleteOptionsBottomSheet,
  DeleteMarkersButton,
  SaveMapBottomSheet,
} from "../components";
import { useStorage } from "../hooks";

export default function AutoMeasure() {
  const router = useRouter();

  const deleteSheetRef = useRef();
  const saveSheetRef = useRef();

  const [region, setRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [polygonArea, setPolygonArea] = useState();
  const [polygonDistance, setPolygonDistance] = useState();
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [mapType, setMapType] = useState("");
  const [areaVisible, setAreaVisible] = useState(true);
  const [markersVisible, setMarkersVisible] = useState(true);
  const [deleteMode, setDeleteMode] = useState(false);
  const [markersToDelete, setMarkersToDelete] = useState([]);
  const [previousCoordinates, setPreviousCoordinates] = useState([]);
  const [currentPreferences, setCurrentPreferences] = useState(null);

  // check if location permission is granted
  // if so, set initial region as current location
  // if so, start locationSubscription for location updates
  useEffect(() => {
    useStorage("get", "mapPreferences").then((value) => setMapType(value));
    useStorage("get", "currentAutoCoordinates").then((value) => {
      if (value) {
        setPolygonCoordinates(value);
        setPolygonDistance(getPathLength(value));
        setPolygonArea(getAreaOfPolygon(value));
      }
    });
    getPreferencesForSave();
    const getInitialLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Required",
          "Please enable location services in your phone settings to use this feature.",
          [{ text: "Go Back", style: "cancel", onPress: () => router.back() }]
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion(location.coords);

      const locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, distanceInterval: 1 },
        (loc) => {
          setCurrentLocation(loc.coords);
        }
      );
    };
    getInitialLocation();
  }, []);

  // when location changes and the user is measuring, add the new location to the polygon and generate measurements for the polygon
  useEffect(() => {
    if (currentLocation && isMeasuring) {
      setRegion(currentLocation);
      addLocationToPolygon(currentLocation);
    }
    if (polygonCoordinates.length > 1 && isMeasuring) {
      setPolygonDistance(getPathLength(polygonCoordinates));
      setPolygonArea(getAreaOfPolygon(polygonCoordinates));
    }
  }, [currentLocation]);

  // add a new location to the polygon
  const addLocationToPolygon = async (newLocation) => {
    await setPolygonCoordinates([
      { latitude: newLocation.latitude, longitude: newLocation.longitude },
      ...polygonCoordinates,
    ]);
    await useStorage("set", "currentAutoCoordinates", [
      { latitude: newLocation.latitude, longitude: newLocation.longitude },
      ...polygonCoordinates,
    ]);
  };

  // reset the polygon coordinates and measurements
  const resetMeasurements = () => {
    deleteSheetRef.current.close();
    setMarkersToDelete([]);
    useStorage("remove", "currentAutoCoordinates");
    setPolygonCoordinates([]);
    setPolygonArea(null);
    setPolygonDistance(null);
  };

  // get preferences to display on SaveMapBottomSheet
  const getPreferencesForSave = async () => {
    const value = await useStorage("get", "measurementPreferences");
    value !== null
      ? setCurrentPreferences(value)
      : setCurrentPreferences({
          area: "sq meters",
          areaShort: "sqm",
          distance: "meters",
          distanceShort: "m",
        });
  };

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar barStyle="dark-content" />
      {!currentLocation && <ActivityIndicator size="small" color="#6DAB64" />}

      {currentLocation && (
        <Map
          region={region}
          polygonCoordinates={polygonCoordinates}
          mapType={mapType}
          areaVisible={areaVisible}
          deleteMode={deleteMode}
          markersToDelete={markersToDelete}
          setMarkersToDelete={setMarkersToDelete}
          markersVisible={markersVisible}
        />
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
        getPreferencesForSave={getPreferencesForSave}
      />

      <View
        className="absolute bottom-10 py-4 px-2 w-full mb-2"
        style={{ gap: 8 }}
      >
        <View className="w-full flex-row justify-between absolute bottom-24 left-2">
          <ToggleDeleteModeButton
            setDeleteMode={setDeleteMode}
            setMarkersToDelete={setMarkersToDelete}
            deleteMode={deleteMode}
            mapType={mapType}
          />

          <SaveMeasurementsButton
            mapType={mapType}
            saveSheetRef={saveSheetRef}
          />
        </View>

        <ToggleMeasuringButton
          isMeasuring={isMeasuring}
          setIsMeasuring={setIsMeasuring}
          polygonCoordinates={polygonCoordinates}
          setPolygonCoordinates={setPolygonCoordinates}
        />
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
          setPreviousCoordinates={setPreviousCoordinates}
          polygonCoordinatesLength={polygonCoordinates.length}
        />

        <ResetMeasurementsButton
          resetMeasurements={resetMeasurements}
          mapType={mapType}
          markersToDelete={markersToDelete}
          polygonCoordinatesLength={polygonCoordinates.length}
        />
      </DeleteOptionsBottomSheet>

      <SaveMapBottomSheet
        polygonCoordinates={polygonCoordinates}
        saveSheetRef={saveSheetRef}
        mapType={mapType}
        polygonArea={polygonArea}
        polygonDistance={polygonDistance}
        currentPreferences={currentPreferences}
        tool={"AutoMeasure"}
      />
    </View>
  );
}

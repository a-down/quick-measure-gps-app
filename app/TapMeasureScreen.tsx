import { View, Alert, ActivityIndicator, StatusBar } from "react-native";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength, getCenterOfBounds } from "geolib";
import { useRouter } from "expo-router";
import {
  MeasurementDisplay,
  SaveMeasurementsButton,
  Map,
  ToggleDeleteModeButton,
  DeleteOptionsBottomSheet,
  DeleteMarkersButton,
  ResetMeasurementsButton,
  SaveMapBottomSheet,
} from "../components";
import { useStorage } from "../hooks";

export default function TapMeasure() {
  const router = useRouter();

  const deleteSheetRef = useRef();
  const saveSheetRef = useRef();

  const [region, setRegion] = useState(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [polygonArea, setPolygonArea] = useState();
  const [polygonDistance, setPolygonDistance] = useState();
  const [mapType, setMapType] = useState("");
  const [areaVisible, setAreaVisible] = useState(true);
  const [markersVisible, setMarkersVisible] = useState(true);
  const [deleteMode, setDeleteMode] = useState(false);
  const [markersToDelete, setMarkersToDelete] = useState([]);
  const [previousCoordinates, setPreviousCoordinates] = useState([]);
  const [currentPreferences, setCurrentPreferences] = useState(null);

  // check if location permission is granted
  // if so, set initial region as current location
  useEffect(() => {
    useStorage("get", "mapPreferences").then((value) => setMapType(value));
    start();
  }, []);

  const start = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Location Permission Required",
        "Please enable location services in your phone settings to use this feature.",
        [{ text: "Go Back", style: "cancel", onPress: () => router.back() }]
      );
      return;
    }
    await getCurrentMap();
    await getPreferencesForSave();
  };

  // when a coordinate is added to polygonCoordinates, generate measurements and store the current polygon to storage
  useEffect(() => {
    if (polygonCoordinates.length > 1) {
      setPolygonDistance(getPathLength(polygonCoordinates));
      setPolygonArea(getAreaOfPolygon(polygonCoordinates));
      useStorage("set", "currentTapCoordinates", polygonCoordinates);
    }
  }, [polygonCoordinates]);

  // get the current map from storage or set the map to the user's current location
  const getCurrentMap = async () => {
    const value = await useStorage("get", "currentTapCoordinates");

    if (value !== null) {
      setPolygonCoordinates(value);
      setRegion(getCenterOfBounds(value));
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  // add a new location to the polygon
  const addLocationToPolygon = async (location) => {
    if (polygonCoordinates.includes(location) === false)
      await setPolygonCoordinates([
        { latitude: location.latitude, longitude: location.longitude },
        ...polygonCoordinates,
      ]);
    if (polygonCoordinates.length === 0) {
      const reviewStatus = await useStorage("get", "reviewStatus");
      await useStorage("set", "reviewStatus", {
        ...reviewStatus,
        significantEvents: reviewStatus.significantEvents + 1,
        requiredActions: { ...reviewStatus.requiredActions, measured: true },
      });
    }
  };

  // reset the polygon coordinates and measurements
  const resetMeasurements = () => {
    deleteSheetRef.current.close();
    setMarkersToDelete([]);
    useStorage("remove", "currentTapCoordinates");
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
      {!region && <ActivityIndicator size="small" color="#6DAB64" />}

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
          markersVisible={markersVisible}
        />
      )}

      <MeasurementDisplay
        polygonArea={polygonArea}
        polygonDistance={polygonDistance}
        setMapType={setMapType}
        areaVisible={areaVisible}
        setAreaVisible={setAreaVisible}
        markersVisible={markersVisible}
        setMarkersVisible={setMarkersVisible}
        getPreferencesForSave={getPreferencesForSave}
      />

      <View
        className="absolute bottom-0 w-full items-center"
        style={{ gap: 8 }}
      >
        <View className="w-full flex flex-row justify-between mb-14 p-4 rounded-lg">
          <ToggleDeleteModeButton
            setDeleteMode={setDeleteMode}
            setMarkersToDelete={setMarkersToDelete}
            deleteMode={deleteMode}
            mapType={mapType}
          />

          <SaveMeasurementsButton
            saveSheetRef={saveSheetRef}
            mapType={mapType}
          />
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
          resetMeasurements={resetMeasurements}
          previousCoordinates={previousCoordinates}
          setPreviousCoordinates={setPreviousCoordinates}
        />

        <ResetMeasurementsButton
          resetMeasurements={resetMeasurements}
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
        tool={"TapMeasure"}
      />
    </View>
  );
}

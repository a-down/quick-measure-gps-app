import { View, Alert, ActivityIndicator, StatusBar } from "react-native";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { getAreaOfPolygon, getPathLength, getCenterOfBounds } from "geolib";
import { useRouter } from "expo-router";
import {
  MeasurementDisplay,
  AddMarkerButton,
  ResetMeasurementsButton,
  SaveMeasurementsButton,
  Map,
  ToggleDeleteModeButton,
  DeleteOptionsBottomSheet,
  DeleteMarkersButton,
  SaveMapBottomSheet,
} from "../components";
import { useStorage } from "../hooks";
import { activateKeepAwakeAsync } from "expo-keep-awake";
import { Coordinate, MapTypes, Preferences } from "../types";
import BottomSheetMethods from "@gorhom/bottom-sheet";

export default function AutoMeasure() {
  const router = useRouter();

  const deleteSheetRef = useRef<BottomSheetMethods>();
  const saveSheetRef = useRef();

  const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(
    null
  );
  const [region, setRegion] = useState<Coordinate | null>(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState<Coordinate[]>(
    []
  );
  const [polygonArea, setPolygonArea] = useState<number>();
  const [polygonDistance, setPolygonDistance] = useState<number>();
  const [mapType, setMapType] = useState<MapTypes | null>(null);
  const [areaVisible, setAreaVisible] = useState(true);
  const [markersVisible, setMarkersVisible] = useState(true);
  const [deleteMode, setDeleteMode] = useState(false);
  const [markersToDelete, setMarkersToDelete] = useState<Coordinate[]>([]);
  const [previousCoordinates, setPreviousCoordinates] = useState<Coordinate[]>(
    []
  );
  const [currentPreferences, setCurrentPreferences] =
    useState<Preferences | null>(null);

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
    await activateKeepAwakeAsync();
    await getPreferencesForSave();
  };

  // get the user's current location
  // called when the user presses the add marker button
  const updateLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    await setCurrentLocation(location.coords);
    if (polygonCoordinates.length === 0) {
      const reviewStatus = await useStorage("get", "reviewStatus");
      await useStorage("set", "reviewStatus", {
        ...reviewStatus,
        significantEvents: reviewStatus.significantEvents + 1,
        requiredActions: { ...reviewStatus.requiredActions, measured: true },
      });
    }
  };

  // when location changes with updateLocation, add the new location to the polygon and generate measurements for the polygon
  useEffect(() => {
    if (currentLocation) {
      addLocationToPolygon();
      setRegion(currentLocation);
    }
    if (polygonCoordinates.length > 1) {
      setPolygonDistance(getPathLength(polygonCoordinates));
      setPolygonArea(getAreaOfPolygon(polygonCoordinates));
    }
  }, [currentLocation]);

  // get the current map from storage or set the map to the user's current location
  const getCurrentMap = async () => {
    const value = await useStorage("get", "currentPinpointCoordinates");

    if (value !== null && value.length > 0) {
      setPolygonCoordinates(value);
      setRegion(getCenterOfBounds(value));
      setPolygonDistance(getPathLength(value));
      setPolygonArea(getAreaOfPolygon(value));
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  // add a new location to the polygon
  const addLocationToPolygon = async () => {
    await setPolygonCoordinates([
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      ...polygonCoordinates,
    ]);
    useStorage("set", "currentPinpointCoordinates", polygonCoordinates);
  };

  // reset the polygon coordinates and measurements
  const resetMeasurements = () => {
    deleteSheetRef.current.close();
    setMarkersToDelete([]);
    useStorage("remove", "currentPinpointCoordinates");
    setPolygonCoordinates([]);
    setPolygonArea(null);
    setPolygonDistance(null);
  };

  // get preferences to display on SaveMapBottomSheet
  const getPreferencesForSave = async () => {
    const value = await useStorage("get", "measurementPreferences");
    if (value !== null) {
      setCurrentPreferences(value);
      return;
    }
    setCurrentPreferences({
      area: "sq meters",
      areaShort: "sqm",
      distance: "meters",
      distanceShort: "m",
    });
  };

  return (
    <>
      <View className="flex-1 items-center justify-center">
        <StatusBar barStyle="dark-content" />
        {!currentLocation && <ActivityIndicator size="small" color="#6DAB64" />}

        {region && polygonCoordinates && (
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

          <AddMarkerButton updateLocation={updateLocation} />
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
          tool={"ManualMeasure"}
        />
      </View>
    </>
  );
}

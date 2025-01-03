import { useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  Text,
  Pressable,
  View,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import { useState } from "react";
import { useStorage } from "../hooks";
import uuid from "react-native-uuid";
import { Feather } from "@expo/vector-icons";
import { regular, medium, semibold } from "../hooks/useJostFont";
import { handleConvertArea } from "../utils";
import { convertDistance } from "geolib";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface SaveMapBottomSheetProps {
  polygonCoordinates: { latitude: number; longitude: number }[];
  // TODO: Fix
  saveSheetRef: any;
  mapType: string;
  polygonArea: number;
  polygonDistance: number;
  currentPreferences: any;
  tool: string;
}

function SaveMapBottomSheet({
  polygonCoordinates,
  saveSheetRef,
  mapType,
  polygonArea,
  polygonDistance,
  currentPreferences,
  tool,
}: SaveMapBottomSheetProps) {
  const [mapName, setMapName] = useState("");

  const snapPoints = useMemo(() => ["80%"], []);
  const handleSheetChanges = useCallback((index) => {
    if (index !== 0) Keyboard.dismiss();
  }, []);

  const keyboardDismiss = () => {
    Keyboard.dismiss();
    saveSheetRef.current.snapToIndex(0);
  };

  // save the map to storage
  // view in saved maps screen
  const saveMap = async () => {
    if (!mapName) return Alert.alert("Please enter a name for the map");

    try {
      const defaultMeasurements = {
        area: "sq meters",
        areaShort: "sqm",
        distance: "meters",
        distanceShort: "m",
      };
      const measurements = await useStorage("get", "measurementPreferences");
      const measurementsToSave = { ...defaultMeasurements, ...measurements };

      const value = await useStorage("get", "savedMaps");

      // create new array or add current map to existing array
      let data;
      if (value !== null) {
        data = [
          ...value,
          {
            id: uuid.v4(),
            dateCreated: new Date(),
            mapName,
            mapType,
            polygonCoordinates,
            measurements: measurementsToSave,
            tool: tool,
          },
        ];
      } else {
        data = [
          {
            id: uuid.v4(),
            dateCreated: new Date(),
            mapName,
            mapType,
            polygonCoordinates,
            measurements: measurementsToSave,
            tool: tool,
          },
        ];
      }
      await useStorage("set", "savedMaps", data);

      Alert.alert(`${mapName} saved!`);
      saveSheetRef.current.close();
      Keyboard.dismiss();
      const reviewStatus = await useStorage("get", "reviewStatus");
      await useStorage("set", "reviewStatus", {
        ...reviewStatus,
        significantEvents: reviewStatus.significantEvents + 1,
        requiredActions: { ...reviewStatus.requiredActions, saved: true },
      });
    } catch (error) {
      Alert.alert("There was an error saving the map. Please try again.");
    }
  };

  return (
    <BottomSheet
      style={{ flex: 1 }}
      backgroundStyle={{ backgroundColor: "#fff" }}
      ref={saveSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      onPress={keyboardDismiss}
    >
      <BottomSheetView style={{ gap: 8 }}>
        <View style={{ gap: 8 }} className="px-6">
          <Text style={[medium, { fontSize: 20 }]}>
            Enter a name for the map
          </Text>

          <TextInput
            className="w-full bg-white p-2 rounded-sm border-gray-4 border text-gray-8"
            style={regular}
            value={mapName}
            onChangeText={setMapName}
            onFocus={() => saveSheetRef.current.snapToIndex(0)}
            onBlur={() => Keyboard.dismiss()}
          />
        </View>

        <Text className="text-gray-6 text-center px-6" style={regular}>
          You cannot change this map's preferences after saving. Preview below{" "}
          <Feather name="chevron-down" size={16} color="#7E7E7E" />
        </Text>

        <Pressable
          className="mx-4 p-4 rounded-2xl shadow-sm flex-row justify-center items-center bg-green-5 active:bg-green-4 mb-8"
          style={{ gap: 8 }}
          onPress={saveMap}
        >
          <Feather name="download" size={24} color="white" />
          <Text
            className="text-center text-white"
            style={[semibold, { fontSize: 22 }]}
          >
            Save Map
          </Text>
        </Pressable>

        {currentPreferences && (
          <View className="px-6">
            <Text style={medium}>Measurements and Preferences to Save:</Text>

            <Text style={regular}>
              Area:{" "}
              {polygonArea > 0
                ? handleConvertArea(
                    polygonArea,
                    currentPreferences.areaShort
                  ).toFixed(2)
                : 0}{" "}
              {currentPreferences.area}
            </Text>

            <Text style={regular}>
              Distance:{" "}
              {polygonArea > 0
                ? convertDistance(
                    polygonDistance,
                    currentPreferences.distanceShort
                  ).toFixed(2)
                : 0}{" "}
              {currentPreferences.distance}
            </Text>

            <Text style={regular}>Map Type: {mapType || "hybrid"}</Text>
            <Text style={regular} className="ml-2 mb-8 text-gray-6">
              (ex. satellite, hybrid, standard)
            </Text>
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

export default SaveMapBottomSheet;

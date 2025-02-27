import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Alert,
} from "react-native";
import { convertDistance } from "geolib";
import { handleConvertArea } from "../utils";
import { Feather } from "@expo/vector-icons";
import { useStorage } from "../hooks";
import { regular } from "../hooks/useJostFont";
import { MapTypes, Preferences } from "../types";

interface MeasurementDisplayProps {
  areaVisible: boolean;
  setAreaVisible: (value: boolean) => void;
  getPreferencesForSave?: () => void;
  polygonArea: number;
  polygonDistance: number;
  setMapType?: (value: MapTypes) => void;
  markersVisible: boolean;
  setMarkersVisible: (value: boolean) => void;
  preferredMeasurements?: Preferences;
}

// preferences default to sq meters and meters
const defaultPreferences = {
  area: "sq meters",
  areaShort: "sqm",
  distance: "meters",
  distanceShort: "m",
};

const MeasurementDisplay = ({
  polygonArea,
  polygonDistance,
  setMapType,
  preferredMeasurements,
  areaVisible,
  setAreaVisible,
  markersVisible,
  setMarkersVisible,
  getPreferencesForSave,
}: MeasurementDisplayProps) => {
  const { width } = useWindowDimensions();
  const [measurementPreferences, setMeasurementPreferences] =
    useState(defaultPreferences);

  // set preferences
  useEffect(() => {
    if (preferredMeasurements) {
      setMeasurementPreferences(preferredMeasurements);
    } else {
      getPreferences();
    }
  }, []);

  // get preferrences from storage
  const getPreferences = async () => {
    const value = await useStorage("get", "measurementPreferences");
    if (value !== null) setMeasurementPreferences(value);
  };

  // store preferences to storage
  const storePreferences = async (data) => {
    setMeasurementPreferences(data);
    await useStorage("set", "measurementPreferences", data);
    await getPreferencesForSave();
  };

  // Alert prompts used to update preferences
  const updateAreaAlert = () => {
    Alert.alert(
      "Area Unit of Measurement",
      "What unit of measurement would you like to use for area?",
      [
        {
          text: "Sq Feet",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              area: "sq feet",
              areaShort: "sqft",
            }),
        },
        {
          text: "Sq Yards",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              area: "sq yards",
              areaShort: "sqyd",
            }),
        },
        {
          text: "Acres",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              area: "acres",
              areaShort: "a",
            }),
        },
        {
          text: "Sq Miles",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              area: "sq miles",
              areaShort: "sqmi",
            }),
        },
        {
          text: "Sq Meters",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              area: "sq meters",
              areaShort: "sqm",
            }),
        },
        {
          text: "Hectares",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              area: "hectares",
              areaShort: "ha",
            }),
        },
        {
          text: "Sq Kilometers",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              area: "sq km",
              areaShort: "sqkm",
            }),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  // Alert prompts used to update distance measurement
  const updateDistanceAlert = () => {
    Alert.alert(
      "Area Unit of Measurement",
      "What unit of measurement would you like to use for area?",
      [
        {
          text: "Feet",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              distance: "feet",
              distanceShort: "ft",
            }),
        },
        {
          text: "Yards",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              distance: "yards",
              distanceShort: "yd",
            }),
        },
        {
          text: "Miles",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              distance: "miles",
              distanceShort: "mi",
            }),
        },
        {
          text: "Meters",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              distance: "meters",
              distanceShort: "m",
            }),
        },
        {
          text: "Kilometers",
          onPress: () =>
            storePreferences({
              ...measurementPreferences,
              distance: "km",
              distanceShort: "km",
            }),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  // store map type preferences - standard, hybrid, satellite
  const storeMapPreferences = async (data) => {
    setMapType(data);
    useStorage("set", "mapPreferences", data);
  };

  // Alert prompts used to update map type
  const mapTypeAlert = async () => {
    Alert.alert("Map Type", "What type of map would you like to use?", [
      { text: "Satellite", onPress: () => storeMapPreferences("satellite") },
      { text: "Hybrid", onPress: () => storeMapPreferences("hybrid") },
      { text: "Standard", onPress: () => storeMapPreferences("standard") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <React.Fragment>
      <View
        className="bg-gray-1 p-3 py-2 top-0 rounded-b-sm shadow-lg absolute flex-row justify-between"
        style={{ width: width, gap: 8 }}
      >
        <View className=" justify-between flex-wrap">
          {areaVisible && (
            <View className="flex-row items-center " style={{ gap: 8 }}>
              <Text className=" text-gray-9" style={regular}>
                <Text
                  className=" text-black"
                  style={[regular, { fontSize: 20 }]}
                >
                  {polygonArea
                    ? handleConvertArea(
                        polygonArea,
                        measurementPreferences.areaShort
                      ).toFixed(2)
                    : 0}
                </Text>
                {` `}
                {measurementPreferences.area}
                <Text className="text-sm text-gray-6"> (area)</Text>
              </Text>
            </View>
          )}

          <View>
            <Text className="text-base text-gray-9" style={regular}>
              <Text
                className="text-xl text-black"
                style={[regular, { fontSize: 20 }]}
              >
                {polygonDistance
                  ? convertDistance(
                      polygonDistance,
                      measurementPreferences.distanceShort
                    ).toFixed(2)
                  : 0}
              </Text>
              {` `}
              {measurementPreferences.distance}
              <Text className="text-sm text-gray-6"> (distance)</Text>
            </Text>
          </View>
        </View>

        {setMapType ? (
          <Pressable
            className="h-full pt-0.5 pr-1 active:opacity-40"
            hitSlop={28}
            onPress={() => {
              Alert.alert("Map Settings", "What would you like to change?", [
                {
                  text: areaVisible ? "Show Distance Only" : "Show Area",
                  onPress: () => setAreaVisible(!areaVisible),
                },
                {
                  text: markersVisible ? "Hide Markers" : "Show Markers",
                  onPress: () => setMarkersVisible(!markersVisible),
                },
                { text: "Map Type", onPress: () => mapTypeAlert() },
                { text: "Area Units", onPress: () => updateAreaAlert() },
                {
                  text: "Distance Units",
                  onPress: () => updateDistanceAlert(),
                },
                { text: "Cancel", style: "cancel" },
              ]);
            }}
          >
            <Feather name="settings" size={24} color="#3A7032" />
          </Pressable>
        ) : (
          <Pressable
            className="h-full pt-0.5 pr-1 active:opacity-40"
            hitSlop={28}
            onPress={() => {
              Alert.alert(
                "Visibility Settings",
                "What would you like to change?",
                [
                  {
                    text: areaVisible ? "Show Distance Only" : "Show Area",
                    onPress: () => setAreaVisible(!areaVisible),
                  },
                  {
                    text: markersVisible ? "Hide Markers" : "Show Markers",
                    onPress: () => setMarkersVisible(!markersVisible),
                  },
                  { text: "Cancel", style: "cancel" },
                ]
              );
            }}
          >
            <Feather name="eye" size={24} color="#3A7032" />
          </Pressable>
        )}
      </View>
    </React.Fragment>
  );
};

export default MeasurementDisplay;

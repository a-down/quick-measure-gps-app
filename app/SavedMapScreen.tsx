import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useFocusEffect, Stack } from "expo-router";
import { MeasurementDisplay, Map } from "../components";
import { getAreaOfPolygon, getPathLength, getCenterOfBounds } from "geolib";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useStorage } from "../hooks";

const SavedMap = () => {
  const router = useRouter();

  const [mapData, setMapData] = useState(null);
  const [polygonCenter, setPolygonCenter] = useState(null);
  const [areaVisible, setAreaVisible] = useState(true);
  const [markersVisible, setMarkersVisible] = useState(true);

  const { map } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      if (typeof map !== "string") return;

      setMapData(JSON.parse(map));
      setPolygonCenter(getCenterOfBounds(JSON.parse(map).polygonCoordinates));
      updateReviewStatus();
    }, [])
  );

  const updateReviewStatus = async () => {
    const reviewStatus = await useStorage("get", "reviewStatus");
    await useStorage("set", "reviewStatus", {
      ...reviewStatus,
      significantEvents: reviewStatus.significantEvents + 1,
      requiredActions: { ...reviewStatus.requiredActions, viewedSaved: true },
    });
  };

  return (
    <React.Fragment>
      <Stack.Screen
        options={{
          title: mapData ? mapData.mapName : "",
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: "#6DAB64",
          headerTitleStyle: {
            color: "#1D3F13",
          },
          headerRight: () => (
            <Feather
              name="help-circle"
              size={24}
              color="#1D3F13"
              onPress={() => router.push("/HelpScreen")}
            />
          ),
        }}
      />

      <View className="flex-1 items-center justify-center">
        {mapData && (
          <React.Fragment>
            <Map
              region={polygonCenter}
              polygonCoordinates={mapData.polygonCoordinates}
              mapType={mapData.mapType}
              areaVisible={areaVisible}
              markersVisible={markersVisible}
            />

            <MeasurementDisplay
              polygonArea={getAreaOfPolygon(mapData.polygonCoordinates)}
              polygonDistance={getPathLength(mapData.polygonCoordinates)}
              preferredMeasurements={mapData.measurements}
              areaVisible={areaVisible}
              setAreaVisible={setAreaVisible}
              markersVisible={markersVisible}
              setMarkersVisible={setMarkersVisible}
            />
          </React.Fragment>
        )}
      </View>
    </React.Fragment>
  );
};

export default SavedMap;

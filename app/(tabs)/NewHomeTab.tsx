import { Fragment, useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { medium } from "../../hooks/useJostFont";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { Coordinate, MapTypes, Preferences } from "../../types";
import { Map } from "../../components";

export default function NewHomeTab() {
  const bottomSheetRef = useRef(null);

  return (
    <SafeAreaView className="flex-1 items-center bg-green-9">
      <View className="flex-1 h-full w-full px-4 py-6" style={{ gap: 24 }}>
        <View className="flex-2 h-full w-full border-2 border-green-2 rounded-lg">
          <Map
            region={{
              latitude: 37.784839,
              longitude: -122.410462,
            }}
            polygonCoordinates={[]}
            mapType="satellite"
            areaVisible={true}
            deleteMode={false}
            markersToDelete={[]}
            setMarkersToDelete={() => {}}
            markersVisible={true}
          />
        </View>

        <View className="flex-2 h-full w-full items-center" style={{ gap: 8 }}>
          <Pressable
            className="p-4 rounded-full w-full shadow-sm flex-row items-center justify-center bg-green-6 active:bg-green-4"
            style={{ gap: 8 }}
          >
            {/* <Feather name="download" size={24} color={"#E7F8E6"} /> */}
            <Text
              style={[
                medium,
                {
                  // color: mapType === "standard" ? "#1D3F13" : "#E7F8E6",
                  color: "#E7F8E6",
                  fontSize: 20,
                },
              ]}
            >
              Measure
            </Text>
          </Pressable>
          <Feather name="chevron-down" size={32} color="#E7F8E6" />
        </View>
      </View>
    </SafeAreaView>
  );
}

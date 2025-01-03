import React, { useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { regular } from "../hooks/useJostFont";

interface DeleteOptionsBottomSheetProps {
  children: React.ReactNode;
  // TODO: FIX
  deleteSheetRef: any;
  deleteMode: boolean;
  setDeleteMode: (value: boolean) => void;
  setPolygonCoordinates: (
    coordinates: { latitude: number; longitude: number }[]
  ) => void;
  previousCoordinates: { latitude: number; longitude: number }[];
  setPreviousCoordinates: (
    coordinates: { latitude: number; longitude: number }[]
  ) => void;
  setMarkersToDelete: (
    markers: { latitude: number; longitude: number }[]
  ) => void;
}

function DeleteOptionsBottomSheet({
  children,
  deleteSheetRef,
  deleteMode,
  setDeleteMode,
  setPolygonCoordinates,
  previousCoordinates,
  setPreviousCoordinates,
  setMarkersToDelete,
}: DeleteOptionsBottomSheetProps) {
  const snapPoints = useMemo(() => [200], []);
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setDeleteMode(false);
      setPreviousCoordinates([]);
      setMarkersToDelete([]);
    }
  }, []);

  return (
    <BottomSheet
      style={{ flex: 1 }}
      backgroundStyle={{ backgroundColor: "#7f1d1d" }}
      handleIndicatorStyle={{ backgroundColor: "#fee2e2" }}
      ref={deleteSheetRef}
      index={deleteMode ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
    >
      <BottomSheetView
        className="flex-1 px-6 justify-start relative"
        style={{ gap: 24 }}
      >
        <Text
          className=" text-[#fee2e2] text-center mb-2 "
          style={[regular, { fontSize: 16 }]}
        >
          (swipe down to dismiss)
        </Text>

        {previousCoordinates.length > 0 && (
          <Pressable
            className="absolute left-4 py-2 px-3 bg-[#fee2e2] text-[#7f1d1d] rounded-full flex-row items-center active:opacity-80"
            style={{ gap: 4 }}
            onPress={() => {
              setPolygonCoordinates([previousCoordinates[0]]);
              if (previousCoordinates.length > 1) {
                setPreviousCoordinates(previousCoordinates.slice(1));
              } else {
                setPreviousCoordinates([]);
              }
            }}
          >
            <Feather name="rotate-ccw" size={16} color="#7f1d1d" />
            <Text style={[regular, { fontSize: 16 }]}>Undo</Text>
          </Pressable>
        )}

        {children}
      </BottomSheetView>
    </BottomSheet>
  );
}

export default DeleteOptionsBottomSheet;

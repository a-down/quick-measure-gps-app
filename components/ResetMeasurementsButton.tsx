import { Text, Pressable, Alert, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { medium } from "../hooks/useJostFont";

interface ResetMeasurementsButtonProps {
  resetMeasurements: () => void;
  polygonCoordinatesLength: number;
}

export const ResetMeasurementsButton = (
  props: ResetMeasurementsButtonProps
) => {
  const { resetMeasurements, polygonCoordinatesLength } = props;

  const resetMeasurementsAlert = () => {
    Alert.alert(
      "Reset Measurements",
      "Are you sure you want to delete ALL markers?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: () => resetMeasurements(),
        },
      ]
    );
  };

  return (
    <View className="flex-grow pb-16">
      <Pressable
        className={`flex-row justify-center rounded-full items-center active:opacity-40 ${
          polygonCoordinatesLength > 0 ? "" : "opacity-50"
        }`}
        style={{ gap: 8 }}
        onPress={polygonCoordinatesLength > 0 ? resetMeasurementsAlert : null}
      >
        <Feather name="x-circle" size={24} color={"#fee2e2"} />
        <Text style={[medium, { color: "#fee2e2", fontSize: 20 }]}>
          Delete All Markers
        </Text>
      </Pressable>
    </View>
  );
};

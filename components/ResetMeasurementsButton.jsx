import { Text, Pressable, Alert, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { medium } from '../hooks/useJostFont';

const ResetMeasurementsButton = ({ resetMeasurements, mapType, markersToDelete, polygonCoordinatesLength }) => {
  const resetMeasurementsAlert = () => {
    Alert.alert(
      "Reset Measurements",
      "Are you sure you want to delete ALL markers?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete All", 
          style: "destructive",
          onPress: () => resetMeasurements() 
        }
      ]
    );
  }

  return (
    <View className="flex-grow">
      <Pressable className={`flex-row justify-center rounded-full items-center ${polygonCoordinatesLength > 0 ? '' : 'opacity-50'}`} style={{gap: 8}} onPress={polygonCoordinatesLength > 0 ? resetMeasurementsAlert : null}>
        <Feather 
          name="x-circle" 
          size={24} 
          color={"#fee2e2"}/>
        <Text 
          style={[medium, {color: "#fee2e2", fontSize: 20}]}>
            Delete All Markers
        </Text>
      </Pressable>
    </View>
  )
}

export default ResetMeasurementsButton
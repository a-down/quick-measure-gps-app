import { Text, Pressable, Alert, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const DeleteMarkersButton = ({ polygonCoordinates, setPolygonCoordinates, markersToDelete, setMarkersToDelete, mapType, resetMeasurements }) => {

  const deleteMarkers = () => {
    const newPolygonCoordinates = polygonCoordinates.filter(coordinate => !markersToDelete.includes(coordinate))

    if (newPolygonCoordinates.length > 0) {
      setPolygonCoordinates(newPolygonCoordinates)
      setMarkersToDelete([])
    } else {
      resetMeasurements()
    }
  }

  const deleteMarkersAlert = () => {
    Alert.alert(
      "Delete Markers",
      "Are you sure you want to delete the selected markers?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", 
          style: "destructive",
          onPress: () => deleteMarkers()
        }
      ]
    );
  }

  return (
    <View>
      <Pressable className="flex-row justify-center rounded-full items-center" style={{gap: 8}} onPress={deleteMarkersAlert}>
        <Feather 
          name="trash" 
          size={24} 
          color={"#fee2e2"}/>
        <Text 
          className="text-lg font-medium" 
          style={{color: "#fee2e2"}}>
            Delete Selected Markers
        </Text>
      </Pressable>
    </View>
  )
}

export default DeleteMarkersButton
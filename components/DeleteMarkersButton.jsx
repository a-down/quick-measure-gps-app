import { Text, Pressable, View, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const DeleteMarkersButton = ({ polygonCoordinates, setPolygonCoordinates, markersToDelete, setMarkersToDelete, mapType, resetMeasurements, setPreviousCoordinates, previousCoordinates }) => {

  const deleteMarkers = () => {
    const newPolygonCoordinates = polygonCoordinates.filter(coordinate => !markersToDelete.includes(coordinate))

    if (newPolygonCoordinates.length > 0) {
      setPreviousCoordinates([polygonCoordinates, ...previousCoordinates])
      setPolygonCoordinates(newPolygonCoordinates)
      setMarkersToDelete([])
    } else {
      Alert.alert(
        "Delete Markers",
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
      )
    }
  }

  return (
    <View>
      <Pressable className={`flex-row justify-center rounded-full items-center ${markersToDelete.length > 0 ? '' : 'opacity-50'}`} style={{gap: 8}} onPress={markersToDelete.length > 0 ? deleteMarkers : null}>
        <Feather 
          name="trash" 
          size={24} 
          color={"#fee2e2"}/>
        <Text 
          className="text-lg font-medium" 
          style={{color: "#fee2e2"}}>
            {markersToDelete.length > 1 ? 'Delete Selected Markers' : 'Delete Selected Marker'}
        </Text>
      </Pressable>
    </View>
  )
}

export default DeleteMarkersButton
import { Text, Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const DeleteMarkersButton = ({ polygonCoordinates, setPolygonCoordinates, markersToDelete, setMarkersToDelete, mapType, resetMeasurements, setPreviousCoordinates, previousCoordinates }) => {

  const deleteMarkers = () => {
    const newPolygonCoordinates = polygonCoordinates.filter(coordinate => !markersToDelete.includes(coordinate))

    if (newPolygonCoordinates.length > 0) {
      setPreviousCoordinates([polygonCoordinates, ...previousCoordinates])
      setPolygonCoordinates(newPolygonCoordinates)
      setMarkersToDelete([])
    } else {
      resetMeasurements()
    }
  }

  return (
    <View>
      <Pressable className="flex-row justify-center rounded-full items-center" style={{gap: 8}} onPress={deleteMarkers}>
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
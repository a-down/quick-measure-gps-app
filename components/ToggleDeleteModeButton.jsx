import { Text, Pressable, Alert, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ToggleDeleteModeButton = ({ setDeleteMode, setMarkersToDelete, mapType, deleteMode }) => {

  return (
    <View className="flex-grow">
      <Pressable className="flex-row justify-center rounded-full items-center" style={{gap: 8}} onPress={() => {
        setDeleteMode(prev => !prev)
        if (deleteMode) setMarkersToDelete([])
      }}>
        <Feather 
          name={deleteMode ? "skip-back" : "trash"}
          size={24} 
          color={mapType === "standard" ? "#7f1d1d" : "#fee2e2"}/>
        <Text 
          className="text-lg" 
          style={{color: mapType === "standard" ? "#7f1d1d" : "#fee2e2"}}>
            {deleteMode ? 'Go Back' : 'Delete Markers'}
        </Text>
      </Pressable>
    </View>
  )
}

export default ToggleDeleteModeButton
import { Text, Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ToggleDeleteModeButton = ({ setDeleteMode, setMarkersToDelete, mapType, deleteMode }) => {

  return (
    <View className="flex-grow">
      <Pressable className="flex-row justify-center rounded-full items-center" style={{gap: 8}} onPress={() => {
        setDeleteMode(prev => !prev)
        if (deleteMode) setMarkersToDelete([])
      }}>
        <Feather 
          name={"trash"}
          size={24} 
          color={mapType !== "standard" ? "#fee2e2" : "#7f1d1d"}/>
        <Text 
          className="text-lg" 
          style={{color: mapType !== "standard" ? "#fee2e2" : "#7f1d1d"}}>
            Delete Options
        </Text>
      </Pressable>
    </View>
  )
}

export default ToggleDeleteModeButton
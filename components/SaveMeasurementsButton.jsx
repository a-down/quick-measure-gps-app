import { Pressable, Text } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { medium } from '../hooks/useJostFont';

const SaveMeasurementsButton = ({ mapType, saveSheetRef }) => {

  return (
    <Pressable 
      className="flex-grow flex-row justify-center rounded-full items-center active:opacity-40" 
      style={{gap: 8}} 
      onPress={() => saveSheetRef.current.snapToIndex(0)}>

      <Feather name="download" size={24} color={mapType === "standard" ? "#1D3F13" : "#E7F8E6"}/>
      <Text style={[medium, {color: mapType === "standard" ? "#1D3F13" : "#E7F8E6", fontSize: 20}]}>Save</Text>
      
    </Pressable>
  )
}

export default SaveMeasurementsButton
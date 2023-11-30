import { Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { semibold } from '../hooks/useJostFont';

const StopMeasuringButton = ({ updateLocation }) => {

  return (
    <Pressable 
      className="w-full p-4 rounded-full shadow-lg flex-row items-center justify-center" 
      style={{backgroundColor: '#6DAB64', gap: 8}}
      onPress={updateLocation}>

      <Feather name="plus-circle" size={24} color="#fff"/>

      <Text className="text-center text-white" style={[semibold, {fontSize: 22}]}>
        Add Marker
      </Text>
    </Pressable>
  )
}

export default StopMeasuringButton;
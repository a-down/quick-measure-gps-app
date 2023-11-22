import { Text, Pressable, Alert } from 'react-native';

const StopMeasuringButton = ({ updateLocation }) => {

  return (
    <Pressable 
      className=" p-4 rounded-full shadow-lg" 
      style={{backgroundColor: '#6DAB64'}}
      onPress={updateLocation}>
      <Text className="text-center text-xl text-white font-semibold">
        Add Marker
      </Text>
    </Pressable>
  )
}

export default StopMeasuringButton;
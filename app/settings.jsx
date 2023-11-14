import { View, Text, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';


export default function SavedMeasurements() {
  const router = useRouter();

  return (
    <View>
      <Text>Saved Measurements</Text>
      <Pressable onPress={() => {
        router.setParams({name: `Anderson's Field`})
        router.push({ pathname: "/saved-map"}, {params: {name: `Anderson's Field`}})
      }}>
        <Text>Go To Saved Maps</Text>
      </Pressable>
    </View>
  )
}
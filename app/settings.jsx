import { ScrollView, View, Text, Pressable, useWindowDimensions } from 'react-native';
import { useRouter, Link } from 'expo-router';


export default function SavedMeasurements() {
  const router = useRouter();

  return (
    <ScrollView className=" p-4 bg-white flex-1">
      <View>
        <Text className="text opacity-80">Measurement Preferences</Text>

        <Pressable className="flex-row justify-between w-full">
          <Text>Preferred Area Measurement</Text>
          <View className="h-4 w-4 bg-gray-200"></View>
        </Pressable>





      </View>

    </ScrollView>
  )
}
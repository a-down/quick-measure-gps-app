import { Text, View, Pressable, useWindowDimensions, Image, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import mapScreenshot from "../../assets/map-screenshot.png";
import homeBG from "../../assets/home-bg.svg";
import { regular, semibold, medium, bold } from '../../hooks/useJostFont';

export default function App() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const data = [
    {link: '/AutoMeasureScreen', image: mapScreenshot, title: 'Auto', description: 'Track your location with GPS'},
    {link: '/PinpointMeasureScreen', image: mapScreenshot, title: 'Manual', description: 'Manually log your location with GPS'},
    {link: '/TapMeasureScreen', image: mapScreenshot, title: 'Tap', description: 'Measure anywhere in the world by tapping'},
  ]

  return (
    <View className="bg-green-9 relative flex-1 items-center">
      <View className="bg-green-8 w-[1060px] aspect-square relative -top-[600px] rounded-full"></View>

      <ScrollView className="w-full h-full top-0 left-0 absolute p-8" contentContainerStyle={{ alignItems: 'center'}}>

        <View className="bg-green-3 w-[60px] h-[112px] mb-6"></View>

        <Text className="text-white text-center mb-4" style={[bold, {fontSize: 24, width: "60%"}]}>Easy Tools for a Quick Measure</Text>

        <View className="bg-gray-1 w-full rounded-lg shadow-2xl p-4 flex-row flex-wrap justify-around" style={{width: width-64, gap: 16 }}>
          {data.map((item, index) => (
            <Pressable onPress={() => router.push(item.link)} className="items-center w-[45%]" key={index}>
              <View className="bg-green-3 h-[100px] aspect-square rounded-full mb-2"></View>
              <Text className=" text-green-10" style={[semibold, {fontSize: 18}]}>{item.title}</Text>
              <Text className=" text-gray-7 text-center" style={[regular, {fontSize: 14}]}>{item.description}</Text>  
            </Pressable>
          ))}
        </View>

      </ScrollView>

    </View>
  );
}
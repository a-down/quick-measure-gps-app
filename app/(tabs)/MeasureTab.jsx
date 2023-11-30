import { Text, View, Pressable, useWindowDimensions, Image, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import mapScreenshot from "../../assets/map-screenshot.png";
import { regular, semibold, medium, bold } from '../../hooks/useJostFont';
import walkingIcon from '../../assets/walking-icon.png';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function App() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const data = [
    {link: '/AutoMeasureScreen', image: mapScreenshot, title: 'Auto', description: 'Track your location with GPS', icon: 'md-compass'},
    {link: '/PinpointMeasureScreen', image: mapScreenshot, title: 'Manual', description: 'Manually log your location with GPS', icon: 'md-pencil'},
    {link: '/TapMeasureScreen', image: mapScreenshot, title: 'Tap', description: 'Measure anywhere in the world by tapping', icon: 'gesture-tap'},
  ]

  return (
    <View className="bg-green-9 relative flex-1 items-center">
      <View className="bg-green-8 w-[1060px] aspect-square relative -top-[600px] rounded-full"></View>

      <ScrollView className="flex-1 top-0 left-0 absolute p-8" contentContainerStyle={{ alignItems: 'center'}}>
        <View className="items-center justify-start" style={{gap: 24}}>
          <Image source={walkingIcon} height={114.12} width={80}/>
          <Text className="text-white text-center mb-6" style={[bold, {fontSize: 24, maxWidth: 200}]}>Easy Tools for a Quick Measure</Text>
        </View>

        <View className="bg-gray-1 w-full rounded-lg shadow-2xl p-4 flex-row flex-wrap justify-around" style={{width: width-64, gap: 16 }}>
          {data.map((item, index) => (
            <Pressable onPress={() => router.push(item.link)} className="items-center justify-start" key={index} style={{maxWidth: 130}}>
              {/* <View className="bg-green-3 h-[100px] w-[100px] rounded-full mb-2 justify-center items-center"> */}
              {item.icon === 'gesture-tap' 
                ? <MaterialCommunityIcons name={item.icon} size={96} color="#8CC185" style={{textAlign: 'center'}}/>
                : <Ionicons name={item.icon} size={96} color="#8CC185" style={{textAlign: 'center'}}/>}

              {/* </View> */}
              <Text className=" text-green-10 text-center mt-2" style={[semibold, {fontSize: 18}]}>{item.title}</Text>
              <Text className=" text-gray-7 text-center" style={[regular, {fontSize: 14}]}>{item.description}</Text>  
            </Pressable>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}
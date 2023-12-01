import { Text, View, Pressable, useWindowDimensions, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import mapScreenshot from "../../assets/map-screenshot.png";
import { regular, semibold, medium, bold } from '../../hooks/useJostFont';
import walkingIcon from '../../assets/walking-icon.png';
import { MaterialCommunityIcons, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';

export default function App() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const pageLinks = [
    {link: '/AutoMeasureScreen', image: mapScreenshot, title: 'Auto', description: 'Measure automatically with GPS', icon: 'satellite-dish'},
    {link: '/PinpointMeasureScreen', image: mapScreenshot, title: 'Manual', description: 'Measure manually with GPS', icon: 'plus-circle'},
    {link: '/TapMeasureScreen', image: mapScreenshot, title: 'Tap', description: 'Measure anywhere in the world by tapping', icon: 'gesture-tap'},
  ]

  const Icon = (name) => {
    switch(name) {
      case 'satellite-dish':
        return <FontAwesome5 name={name} size={82} color='#8CC185' style={{textAlign: 'center', marginBottom: 4}}/>
      case 'gesture-tap':
        return <MaterialCommunityIcons name={name} size={82} color='#8CC185' style={{textAlign: 'center', marginBottom: 4}}/>
      case 'plus-circle':
        return <FontAwesome5 name={name} size={82} color='#8CC185' style={{textAlign: 'center', marginBottom: 4}}/>
    }
  }

  return (
    <View className="bg-green-9 relative flex-1 items-center">
      <View className="bg-green-8 w-[1060px] aspect-square relative bottom-[600px] rounded-full"></View>

      <ScrollView className="flex-1 top-0 left-0 absolute p-8" contentContainerStyle={{ alignItems: 'center'}}>
        <View className="items-center justify-start" style={{gap: 24}}>
          <Image source={walkingIcon} height={114.12} width={80}/>
          <Text className="text-white text-center mb-6" style={[bold, {fontSize: 24, maxWidth: 200}]}>Easy Tools for a Quick Measure</Text>
        </View>

        <View className="bg-gray-1 w-full rounded-lg shadow-2xl p-4 flex-row flex-wrap justify-around" style={{width: width-64, gap: 16}}>
          {pageLinks.map((item, index) => (
            <Pressable onPress={() => router.push(item.link)} className="items-center justify-end active:opacity-80" key={index} style={{width: 131}}>
              {Icon(item.icon)}
              <Text className=" text-green-10 text-center mt-2" style={[semibold, {fontSize: 18}]}>{item.title}</Text>
              <Text className=" text-gray-7 text-center" style={[regular, {fontSize: 14}]}>{item.description}</Text>  
            </Pressable>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}
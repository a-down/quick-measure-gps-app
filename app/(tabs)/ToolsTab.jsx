import { Text, View, Pressable, useWindowDimensions, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import mapScreenshot from "../../assets/map-screenshot.png";
import { regular, semibold } from '../../hooks/useJostFont'


export default function App() {
  const router = useRouter();

  const data = [
    {link: '/AutoMeasureScreen', image: mapScreenshot, title: 'Auto Measure', description: 'Track your location with GPS'},
    {link: '/PinpointMeasureScreen', image: mapScreenshot, title: 'Pinpoint Measure', description: 'Manually log your position with GPS'},
    {link: '/TapMeasureScreen', image: mapScreenshot, title: 'Tap to Measure', description: 'Add points manually by tapping the map'},
  ]

  const Card = ({item}) => (
    <View className="bg-gray-2 shadow-sm">
      <Pressable className="flex w-full bg-white relative aspect-video" onPress={() => router.push(item.link)}>
        <Image className="w-full " source={item.image}/>
        <View className="bg-white w-full p-2 absolute -bottom-0.5">
          <Text className=" font-semibold text-green-10" style={semibold}>{item.title}</Text>
          <Text className="text-base text-gray-7" style={regular}>{item.description}</Text>
        </View>
      </Pressable>
    </View>
  )

  // const ListHeader = () => (
  //   <View className="bg-green-4 w-full">
  //     <Text className=" text-lg m-4 text-white font-medium">Measurement Tools</Text>
  //   </View>
  // )

  return (
    <View className="bg-gray-1">
      <FlatList
        data={data}
        renderItem={({item}) => <Card item={item} />}
        keyExtractor={item => item.title}
        // ListHeaderComponent={() => <ListHeader />}
        ItemSeparatorComponent={() => <View className="h-4 bg-gray-1"></View>}
        />
    </View>
  );
}
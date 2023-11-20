import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, useWindowDimensions, ScrollView, Image, Button, FlatList } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { useEffect, useState} from 'react';
import * as Location from "expo-location";
import { getAreaOfPolygon, convertArea } from 'geolib';
import { useRouter, Link } from 'expo-router';
import mapScreenshot from "../../assets/map-screenshot.png";

export default function App() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const data = [
    {link: '/auto-measure', image: mapScreenshot, title: 'Auto Measure', description: 'Track your location with GPS'},
    {link: '/pinpoint-measure', image: mapScreenshot, title: 'Pinpoint Measure', description: 'Manually log points with GPS'},
    {link: '/tap-measure', image: mapScreenshot, title: 'Tap to Measure', description: 'Add points manually by tapping the map'},
  ]

  const Card = ({item}) => (
    <View className="bg-gray-2 shadow-sm">
      <Pressable className="flex w-full bg-white relative" onPress={() => router.push(item.link)}>
        <Image className="w-full aspect-video" source={item.image}/>
        <View className="bg-white w-full p-2 absolute bottom-0">
          <Text className="text-lg font-semibold text-green-10">{item.title}</Text>
          <Text className="text-base text-gray-7">{item.description}</Text>
        </View>
      </Pressable>
    </View>
  )

  const ListHeader = () => (
    <View className="bg-green-4 w-full">
      <Text className=" text-lg m-4 text-white font-medium">Measure</Text>
    </View>
  )

  return (
    <View className="bg-gray-2">
      <FlatList
        data={data}
        renderItem={({item}) => <Card item={item} />}
        keyExtractor={item => item.title}
        ListHeaderComponent={() => <ListHeader />}
        ItemSeparatorComponent={() => <View className="h-4 bg-gray-1"></View>}
        />
    </View>


    
//     <ScrollView className="h-full flex">
      // <View className="bg-white w-full">
      //   <Text className=" text-xl m-4">Tools</Text>
      // </View>


      

//       <Pressable className="flex w-full mb-4 bg-white shadow-sm relative" onPress={() => router.push('/auto-measure')}>
//         <Image className="w-full aspect-video" source={mapScreenshot}/>
//         <View className="bg-white w-full p-2 absolute bottom-0">
//           <Text className="text-lg font-semibold text-green-10">Auto Measure</Text>
//           <Text className="text-base text-gray-7">Track your location with GPS</Text>
//         </View>
//       </Pressable>

//       <Pressable className="flex w-full mb-4 bg-white shadow-sm relative" onPress={() => router.push('/pinpoint-measure')}>
//         <Image className="w-full aspect-video" source={mapScreenshot}/>
//         <View className="bg-white w-full p-2 absolute bottom-0">
//           <Text className="text-lg font-semibold text-green-10">Pinpoint Measure</Text>
//           <Text className="text-base text-gray-7">Manually log points with GPS</Text>
//         </View>
//       </Pressable>

//       <Pressable className="flex w-full mb-4 bg-white shadow-sm relative" onPress={() => router.push('/pinpoint-measure')}>
//         <Image className="w-full aspect-video" source={mapScreenshot}/>
//         <View className="bg-white w-full p-2 absolute bottom-0">
//           <Text className="text-lg font-semibold text-green-10">Tap to Measure</Text>
//           <Text className="text-base text-gray-7">Add points manually by tapping the map</Text>
//         </View>
//       </Pressable>

    

//       <View className="flex-row w-full" style={{gap: 16}}>
//         {/* <View className="p-2 flex-1 bg-white rounded-md items-center shadow-sm" style={{gap: 8}}>
//           <Text className="text-center text-lg font-semibold">Saved</Text>
//           <View className="h-12 w-12 bg-gray-400"></View>
//         </View>

//         <View className="p-2 flex-1 bg-white rounded-md items-center shadow-sm" style={{gap: 8}}>
//           <Text className="text-center text-lg font-semibold">Settings</Text>
//           <View className="h-12 w-12 bg-gray-400"></View>
//         </View> */}

//       <Pressable className="flex-1 w-full mb-4 bg-white shadow-sm" onPress={() => router.push('/saved-measurements')}>
//         <View className="aspect-video w-full bg-gray-300 rounded-t-md">

//         </View>
//         <View className="bg-white w-full p-2 rounded-b-md">
//           <Text className="text-lg font-semibold">Saved Measurements</Text>
//           <Text className="text-base">View your saved maps and measurements</Text>
//         </View>
//       </Pressable>
// {/* 
//       <Pressable className="flex-1 w-full mb-4 shadow-sm" onPress={() => router.push('/settings')}>
//         <View className="aspect-video w-full bg-gray-300 rounded-t-md">

//         </View>
//         <View className="bg-white w-full p-2 rounded-b-md">
//           <Text className="text-lg font-semibold">Settings</Text>
//         </View>
//       </Pressable> */}

//       </View>

//       {/* <Pressable className=" p-4 rounded-md mb-8 bg-[#92e1c0]" onPress={() => router.push('/auto-measure')}>
//         <Text>Go To Auto Measure</Text>
//       </Pressable>
//       <Pressable className=" p-4 rounded-md mb-8" onPress={() => router.push('/pinpoint-measure')}>
//         <Text>Go To Pinpoint Measure</Text>
//       </Pressable>
//       <Pressable className=" p-4 rounded-md mb-8" onPress={() => router.push('/saved-measurements')}>
//         <Text>Go To Saved Measurements</Text>
//       </Pressable> */}
//     </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
});
import { Text, View, Pressable, useWindowDimensions, Image, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { regular, semibold, bold, medium } from '../../hooks/useJostFont';
import walkingIcon from '../../assets/walking-icon.png';
import { MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useStorage } from '../../hooks';
import { useCallback, useState, useEffect } from 'react';
import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
import Purchases from 'react-native-purchases';


export default function App() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const [ savedMaps, setSavedMaps ] = useState(null)
  const [ removedAdsSubscription, setRemovedAdsSubscription ] = useState(false)

  useFocusEffect(
    useCallback(() => {
      getRecentlySaved()
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      getSubscriptions()
    }, [])
  );

  const getRecentlySaved = async () => {
    const value = await useStorage('get', 'savedMaps')
    if (value !== null) {
      const reversed = value.reverse()
      let numberOfMaps
      reversed.length < 3 ? numberOfMaps = reversed.length : numberOfMaps = 3
      setSavedMaps(reversed.slice(0, numberOfMaps))
    } else {
      setSavedMaps(null)
    }
  }

  const getSubscriptions = async () => {
    Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUE_CAT_PUBLIC_API_KEY})
    const customerInfo = await Purchases.getCustomerInfo();
    if (customerInfo.entitlements.active[process.env.EXPO_PUBLIC_REVENUE_CAT_AD_ENTITLEMENT] !== undefined) {
      setRemovedAdsSubscription(true)
    }
  }

  const pageLinks = [
    {link: '/AutoMeasureScreen', title: 'Auto', description: 'Measure automatically with GPS', icon: 'satellite-dish'},
    {link: '/ManualMeasureScreen', title: 'Manual', description: 'Measure manually with GPS', icon: 'plus-circle'},
    {link: '/TapMeasureScreen', title: 'Tap', description: 'Measure anywhere by tapping', icon: 'gesture-tap'},
  ]

  const Icon = (name) => {
    switch(name) {
      case 'satellite-dish':
        return <FontAwesome5 name={name} size={40} color='#6DAB64' style={{textAlign: 'center', marginBottom: 4}}/>
      case 'gesture-tap':
        return <MaterialCommunityIcons name={name} size={40} color='#6DAB64' style={{textAlign: 'center', marginBottom: 4}}/>
      case 'plus-circle':
        return <FontAwesome5 name={name} size={40} color='#6DAB64' style={{textAlign: 'center', marginBottom: 4}}/>
    }
  }

  return (
    <SafeAreaView className="bg-green-9 relative flex-1 items-center w-full h-full">
      <StatusBar style="light" />

      <ScrollView className="w-full h-full absolute" contentContainerStyle={{ alignItems: 'center'}} alwaysBounceVertical={false}>

        <View className="bg-green-8 w-[1060px] aspect-square absolute -top-[640px] rounded-full"></View>

        {/* ca-app-pub-2810780842614584/5093513184 */}
        {!removedAdsSubscription && (
          <BannerAd 
            unitId={TestIds.BANNER}
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
              keywords: ['outdoors', 'farming', 'sports', 'herbicide', 'corn', 'soybean', 'seed', 'truck', 'horse', 'tractor', 'hobby farm']
            }}/>
        )}

        <View className="items-center justify-start mb-4 mt-4" style={{gap: 24, paddingTop: removedAdsSubscription ? 24 : 0}}>
          <Image source={walkingIcon} style={{height: 115, width: 80, marginRight: 12}}/>
          <Text className="text-white text-center" style={[bold, {fontSize: 24, maxWidth: 200}]}>Easy Tools for a Quick Measure</Text>
        </View>

        <View className="w-full items-center rounded-lg" style={{width: width-32, marginTop: removedAdsSubscription ? 16 : 0}}>
          {pageLinks.map((item, index) => (
            <Pressable 
              className=" bg-gray-1 active:bg-gray-2 flex-row justify-between items-center p-4 w-full rounded-md"
              onPress={() => router.push(item.link)} 
              key={item.title + index} 
              style={{ marginBottom: 16, gap: 24}}>
              
              <View className="justify-center items-start mt-1">
                <Text className=" text-green-10 text-center" style={[semibold, {fontSize: 22, lineHeight: 24}]}>{item.title}</Text>
                <Text className=" text-gray-7 text-center text-wrap overflow-ellipsis" style={[regular, {fontSize: 15, lineHeight: 17}]}>{item.description}</Text>  
              </View>
              {Icon(item.icon)}
            </Pressable>
          ))}
          
          <View className="w-full mb-2" style={{marginTop: removedAdsSubscription ? 24 : 8}}>
            {savedMaps && (
              <>
                <Text className="text-white mb-4" style={[bold, {fontSize: 20}]}>Recently Saved</Text>
                
                {savedMaps.map((map, index) => (
                  <Pressable 
                    className="p-4 bg-green-8 rounded-md mb-2 flex-row justify-between items-center active:bg-green-7" 
                    onPress={() => router.push({ pathname: '/SavedMapScreen', params: { map: JSON.stringify(map) }})}
                    key={index}>
                    <View>
                      <Text className="text-green-1" style={[semibold, {fontSize: 18}]}>{map.mapName}</Text>
                      <Text className="text-gray-1" style={[regular, {fontSize: 12}]}>
                        {map.dateCreated.split("T")[0].split("-")[1]}/
                        {map.dateCreated.split("T")[0].split("-")[2]}/
                        {map.dateCreated.split("T")[0].split("-")[0]}
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={24} color="#E7F8E6"/>
                  </Pressable>
                ))}

                <Pressable 
                  className="w-full flex-row justify-center items-center mt-2 mb-4 active:opacity-80" 
                  style={{gap: 8}}
                  onPress={() => router.replace('/SavedTab')}>
                  <Text className="text-green-1" style={regular}>See all saved maps</Text>
                  <Feather name="chevron-right" size={16} color="#E7F8E6"/>
                </Pressable>
              </>
            )}
          </View>
        </View>

        {!removedAdsSubscription && (
          <>
            <Pressable onPress={() => router.push('/PurchaseScreen')} className="active:opacity-40">
              <Text className="text-green-5 underline" style={[regular]}>Want to Remove Ads?</Text>
            </Pressable>
            
            {/* ca-app-pub-2810780842614584/7212781191 */}
            <BannerAd 
              unitId={TestIds.BANNER}
              size={BannerAdSize.BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                keywords: ['outdoors', 'farming', 'sports', 'herbicide', 'corn', 'soybean', 'seed', 'truck', 'horse', 'tractor', 'hobby farm']
              }}/>
          </>
        )}
      </ScrollView>

    </SafeAreaView>
  );
}
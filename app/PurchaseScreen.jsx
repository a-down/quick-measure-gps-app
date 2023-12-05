import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, Pressable, Alert } from 'react-native'
import { regular, semibold, medium } from '../hooks/useJostFont'
import { useEffect, useState } from 'react'
import Purchases from 'react-native-purchases';
import { useRouter } from 'expo-router';

const HelpScreen = () => {
  const router = useRouter();
  const [ offerings, setOfferings ] = useState(null)
  const [ isPurchasing, setIsPurchasing ] = useState(false)
  // console.log(offerings.availablePackages[0])

  useEffect(() => {
    Purchases.configure({ apiKey: 'appl_pmyciWqwEhvyqdONNdqJmpItUzd' });

    const getOfferings = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null) {
          setOfferings(offerings.current)
        }
      } catch (e) {
        console.log(e);
      }
    }
    getOfferings()
  }, [])

  const purchasePackage = async (pack) => {
    setIsPurchasing(true)
    try {
      const { customerInfo } = await Purchases.purchasePackage(pack)
      console.log(customerInfo)
      if (customerInfo.entitlements.active['remove_ads'] !== undefined) {
        router.back()
      }

    } catch (e) {
      if (!e.userCancelled) {
        Alert.alert('Error purchasing package', e.message)
      }
    }
    setIsPurchasing(false)
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        {!offerings && (
          <ActivityIndicator size="small" color="#6DAB64" />
        )}
        {offerings !== null && (
          offerings.availablePackages.map((pack, index) => (
            <Pressable 
              key={index} 
              onPress={() => purchasePackage(pack)}
              className="flex-row w-full justify-between items-center p-4 bg-white rounded-md active:shadow-md">
              <View>
                <Text style={[semibold, { fontSize: 20}]}>{pack.product.title}</Text>
                <Text style={[regular, { fontSize: 16}]}>{pack.product.description}</Text>
              </View>
              <Pressable className="bg-green-5 p-3 rounded-md active:bg-green-4" onPress={() => purchasePackage(pack)}>
                <Text className="text-white" style={[medium, {fontSize: 16}]}>{pack.product.priceString}</Text>
              </Pressable>
            </Pressable>
          )
        ))}
      </ScrollView>

      {isPurchasing && (
        <View className="h-full w-full justify-center items-center absolute" style={{backgroundColor: 'rgba(256,256,256,0.6)'}}>
          <ActivityIndicator size="small" color="#6DAB64" />
        </View>
      )}

    </SafeAreaView>
  )
}

export default HelpScreen
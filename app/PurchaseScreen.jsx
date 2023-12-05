import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, Pressable } from 'react-native'
import { regular, semibold, medium } from '../hooks/useJostFont'
import { useEffect, useState } from 'react'
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

const HelpScreen = () => {
  const [ offerings, setOfferings ] = useState(null)
  // console.log(offerings.availablePackages[0])

  useEffect(() => {
    Purchases.configure({ apiKey: 'appl_pmyciWqwEhvyqdONNdqJmpItUzd', appUserID: null, observerMode: false, useAmazon: false });
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

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

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        {!offerings && (
          <ActivityIndicator size="small" color="#6DAB64" />
        )}
        {offerings !== null && (
          offerings.availablePackages.map((offer, index) => (
            <Pressable key={index} className="flex-row w-full justify-between items-center p-4 bg-white rounded-md">
              <View>
                <Text style={[semibold, { fontSize: 20}]}>{offer.product.title}</Text>
              </View>
              <Pressable>
                <Text>{offer.product.priceString}</Text>
              </Pressable>
            </Pressable>
          )
        ))}
      </ScrollView>

    </SafeAreaView>
  )
}

export default HelpScreen
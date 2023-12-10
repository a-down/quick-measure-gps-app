import { Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

export default () => {
  const [ reviewStatus, setReviewStatus ] = useState(null)

  useEffect(() => {
    onFetchUpdateAsync()
  }, [])

  const onFetchUpdateAsync = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      if (__DEV__) console.log(error)
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Redirect href="/MeasureTab" />
    </GestureHandlerRootView>
  )
}
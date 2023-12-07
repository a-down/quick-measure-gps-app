import { Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';
import { useEffect } from 'react';

export default () => {
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
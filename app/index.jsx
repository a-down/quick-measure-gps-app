import { Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import * as StoreReview from 'expo-store-review';
import { useStorage } from '../hooks/useStorage';
import { getBuildNumber } from 'react-native-device-info';

export default () => {
  const [ reviewStatus, setReviewStatus ] = useState(null)

  useEffect(() => {
    onFetchUpdateAsync()
    promptReview()
  }, [])

  const checkReviewCriteria = async () => {
    const reviewObj = await useStorage('get', 'reviewStatus')
    setReviewStatus(reviewObj)
    if (reviewStatus !== null) {

      const currentBuildNumber = await getBuildNumber()
      if ( reviewStatus.buildNumber !== currentBuildNumber) {
        const newStatus = { 
          ...reviewStatus, 
          buildNumber: currentBuildNumber, 
          hasReviewedBuild: false,
          requiredActions: {measured: false, saved: false, viewedSaved: false}
        }
        setReviewStatus(newStatus)
        await useStorage('set', 'reviewStatus', newStatus)
      }
      
      // if user has not reviewed current build, has completed the required actions in the current build, and has not been prompted to review in the last 30 days
      if (!reviewStatus.hasReviewedBuild && reviewStatus.requiredActions.measured && reviewStatus.requiredActions.saved && reviewStatus.requiredActions.viewedSaved && reviewStatus.prevReqDate < Date.now() - 2592000000) {
        const timeoutId = setTimeout(promptReview, 5000)
        // set timeoutId to state
        // if user leaves the page, use clearTimeout(timeoutId) to clear the timeout
      }

    } else {
      // set reviewStatus to the blank default
    }
  }


  const promptReview = async () => {
    const isAvailable = await StoreReview.isAvailableAsync()


  }

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
import { Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {  useFonts, Jost_400Regular, Jost_500Medium, Jost_600Semibold, Jost_700Bold } from '@expo-google-fonts/jost';

export default () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Redirect href="/MeasureTab" />
    </GestureHandlerRootView>
  )
}
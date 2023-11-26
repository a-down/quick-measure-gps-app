import { Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Redirect href="/ToolsTab" />
    </GestureHandlerRootView>
  )
}
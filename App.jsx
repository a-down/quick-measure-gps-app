import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import MapView, { Polygon } from 'react-native-maps';


export default function App() {
  return (
    <View style={styles.container}>
      <MapView 
        style={{flex: 1, width: '100%'}}
        initialRegion={{
          latitude: 44.010862,
          longitude: -92.411936,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}>
        <Polygon 
          strokeColor="red"
          strokeWidth={2}
          coordinates={[
            {
              latitude: 44.010862,
              longitude: -92.411936
            },
            {
              latitude: 44.011397,
              longitude: -92.405360
            },
            {
              latitude: 44.007199,
              longitude: -92.404200
            },
            {
              latitude: 44.008040,
              longitude: -92.410658
            }
          ]}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

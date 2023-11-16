import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';

const headerOptions = {
  
}

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="tools"
        options={{
          tabBarLabel: "Tools",
          title: "Quick Measure",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#6DAB64',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerRight: () => (
            <View style={{width: 24, height: 24, backgroundColor: "#fff", marginRight: 16}}></View>
          ),
        }}
      />
      <Tabs.Screen 
        name="saved"
        options={{
          tabBarLabel: "Saved",
          title: "Saved Measurements",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#6DAB64',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerRight: () => (
            <View style={{width: 24, height: 24, backgroundColor: "#fff", marginRight: 16}}></View>
          ),
        }}
      />
      <Tabs.Screen 
        name="settings"
        options={{
          tabBarLabel: "Settings",
          title: "Settings",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#6DAB64',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerRight: () => (
            <View style={{width: 24, height: 24, backgroundColor: "#fff", marginRight: 16}}></View>
          ),
        }}
      />
      
    </Tabs>
  )
}

export default Layout;
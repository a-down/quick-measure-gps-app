import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

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
          tabBarIcon: ({ color, size }) => (
            <Feather name="map-pin" size={size} color={color} />
          ),
          tabBarInactiveTintColor: "#9F9F9F",
          tabBarActiveTintColor: "#6DAB64",
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 13
          }
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
          tabBarIcon: ({ color, size }) => (
            <Feather name="folder" size={size} color={color} className="mt-4"/>
          ),
          tabBarInactiveTintColor: "#9F9F9F",
          tabBarActiveTintColor: "#6DAB64",
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 13
          }
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
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          tabBarInactiveTintColor: "#9F9F9F",
          tabBarActiveTintColor: "#6DAB64",
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 13
          }
        }}
      />
      
    </Tabs>
  )
}

export default Layout;
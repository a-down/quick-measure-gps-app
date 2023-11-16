import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index"
        options={{
          tabBarLabel: "Tools"
        }}
      />
      
    </Tabs>
  )
}

export default Layout;
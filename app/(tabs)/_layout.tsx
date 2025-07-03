import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Animated, StyleSheet } from 'react-native'

export default function _layout () {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#fc8403',
          elevation: 0,
          borderTopWidth: 0,
          paddingTop: 10,
          height: 100
        },
        tabBarIcon: ({ focused }) => {
          let iconName = ''

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Errand':
              iconName = focused ? 'globe' : 'globe-outline'
              break
            case 'Status':
              iconName = focused ? 'planet' : 'airplane-outline'
              break
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline'
              break
            case 'HistoryScreen':
              iconName = focused ? 'book' : 'book-outline'
              break
          }

          return (
            <Animated.View style={focused ? styles.focusedIcon : null}>
              <Ionicons
                name={iconName as any}
                size={20}
                style={{ marginBottom: -3 }}
                color={focused ? '#000' : '#fff'}
              />
            </Animated.View>
          )
        }
      })}
    >
      <Tabs.Screen name='Home' />
      <Tabs.Screen name='Errand' />
      <Tabs.Screen name='HistoryScreen' />
      <Tabs.Screen name='Status' />
      <Tabs.Screen name='Profile' />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  focusedIcon: {
    transform: [{ scale: 1.2 }]
  }
})

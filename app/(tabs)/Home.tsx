import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Image,
  Platform,
  // ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const [search, setSearch] = useState('')

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f6f2' }}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://i.postimg.cc/wvZrFxDG/Whats-App-Image-2025-05-22-at-16-06-27-0a4576f9.jpg'
            }}
            style={styles.avatar}
            resizeMode='cover'
          />
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.welcomeText}>WELCOME</Text>
            <Text style={styles.username}>Omekagu Joseph.</Text>
          </View>
          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => router.push('/(stacks)/NotificationScreen')}
          >
            <Ionicons name='notifications-outline' size={26} color='#232323' />
          </TouchableOpacity>
        </View>

        {/* Search Box */}
        <View style={styles.searchContainer}>
          <Ionicons
            name='search'
            size={18}
            color='#b1b1b1'
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder='Search'
            placeholderTextColor='#b1b1b1'
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            autoCapitalize='none'
          />
          <TouchableOpacity
            style={styles.searchFilterBtn}
            onPress={() => {
              router.push('/(stacks)/PropertySearchScreen')
            }}
          >
            <Ionicons name='options-outline' size={20} color='#b1b1b1' />
          </TouchableOpacity>
        </View>

        {/* NEWLY ADDED */}
        {/* Services Section */}
        <Text
          style={{
            paddingHorizontal: 16,
            marginTop: 20,
            marginBottom: 8,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#232323'
          }}
        >
          Our Services
        </Text>
        <ScrollView>
          <View style={styles.servicesContainer}>
            {[
              {
                label: 'Grocery Shopping',
                image:
                  'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg'
              },
              {
                label: `Package Pickup
              &
              Drop off`,
                image:
                  'https://images.pexels.com/photos/7844015/pexels-photo-7844015.jpeg'
              },
              {
                label: 'Welfare Check-Ins',
                image:
                  'https://images.pexels.com/photos/7659565/pexels-photo-7659565.jpeg'
              },
              {
                label: 'School Run',
                image:
                  'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg'
              },
              {
                label: 'Appointments (Elderly)',
                image:
                  'https://images.pexels.com/photos/7551686/pexels-photo-7551686.jpeg'
              },
              {
                label: 'Event Supplies Pickup',
                image:
                  'https://images.pexels.com/photos/6647113/pexels-photo-6647113.jpeg'
              },
              {
                label: 'Laundry Service',
                image:
                  'https://images.pexels.com/photos/8774520/pexels-photo-8774520.jpeg'
              }
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.serviceCard}>
                <View key={index} style={styles.touch}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.serviceImage}
                    resizeMode='cover'
                  />
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>{item.label}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 8 : 0,
    marginBottom: 18,
    paddingHorizontal: 16
  },

  serviceImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },
  overlayText: {
    color: '#fff',
    fontSize: 17,
    letterSpacing: 1.1,
    fontWeight: '900',
    textAlign: 'center'
  },
  servicesContainer: {
    marginBottom: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  serviceCard: {
    width: '50%',
    padding: 5
  },
  touch: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  serviceLabel: {
    fontSize: 14,
    color: '#232323',
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap'
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#e9e4df'
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#b1b1b1',
    letterSpacing: 0.6
  },
  username: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#232323',
    marginTop: 2
  },
  notifBtn: {
    backgroundColor: '#f3eee9',
    borderRadius: 50,
    padding: 10,
    marginLeft: 'auto'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#edeae4',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 13,
    paddingVertical: 9,
    shadowColor: '#cdc6bc',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#232323',
    paddingVertical: 0,
    backgroundColor: 'transparent'
  },
  searchFilterBtn: {
    marginLeft: 8,
    backgroundColor: '#ece4d8',
    padding: 6,
    borderRadius: 14
  }
})

export default Home

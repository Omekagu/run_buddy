import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AnimatedWelcomeModal from '../components/AnimatedWelcomeModal'
import PropertyBasedOnLocationCard from '../components/PropertyBasedOnLocationCard'
import RoomCard from '../components/RoomCard'

export const PropertyBasedOnLocationCardList = [
  {
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    date: '2 secs ago',
    status: 'Elite',
    isFavorite: true,
    baths: 2,
    beds: 2,
    sqft: 1000,
    price: '3,200',
    address: '42 Wattle Street, Sydney, NSW 2000'
  },
  {
    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
    date: 'Friday 21/6',
    status: 'Elite',
    isFavorite: false,
    baths: 3,
    beds: 4,
    sqft: 1800,
    price: '5,100',
    address: '10 Ocean Drive, Gold Coast, QLD 4217'
  },
  {
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
    date: 'Saturday 22/6',
    status: 'Gold',
    isFavorite: true,
    baths: 3,
    beds: 5,
    sqft: 2100,
    price: '6,400',
    address: '21 Harbour Rd, Hamilton, QLD 4007'
  },
  {
    image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
    date: 'Sunday 23/6',
    status: 'Diamond',
    isFavorite: false,
    baths: 2,
    beds: 3,
    sqft: 1350,
    price: '2,800',
    address: '3 Wave Cres, Noosa Heads, QLD 4567'
  },
  {
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
    date: 'Monday 24/6',
    status: 'Gold',
    isFavorite: false,
    baths: 4,
    beds: 6,
    sqft: 2900,
    price: '9,200',
    address: '7 Palm Beach Ave, Palm Beach, QLD 4221'
  },
  {
    image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    date: 'Tuesday 25/6',
    status: 'Elite',
    isFavorite: true,
    baths: 2,
    beds: 3,
    sqft: 1220,
    price: '3,700',
    address: '8 Seaview St, Manly, NSW 2095'
  },
  {
    image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
    date: 'Wednesday 26/6',
    status: 'Diamond',
    isFavorite: false,
    baths: 1,
    beds: 2,
    sqft: 900,
    price: '1,900',
    address: '23 Skyline Way, Perth, WA 6000'
  },
  {
    image: 'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg',
    date: 'Thursday 27/6',
    status: 'Gold',
    isFavorite: true,
    baths: 3,
    beds: 5,
    sqft: 2000,
    price: '7,800',
    address: '15 Riverwalk, Brisbane, QLD 4000'
  },
  {
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
    date: 'Friday 28/6',
    status: 'Elite',
    isFavorite: false,
    baths: 2,
    beds: 3,
    sqft: 1200,
    price: '2,500',
    address: '31 Green St, Melbourne, VIC 3000'
  },
  {
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    date: 'Saturday 29/6',
    status: 'Diamond',
    isFavorite: true,
    baths: 2,
    beds: 2,
    sqft: 1050,
    price: '2,200,',
    address: '45 Beachside Ave, Bondi, NSW 2026'
  },
  {
    image: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg',
    date: 'Sunday 30/6',
    status: 'Gold',
    isFavorite: false,
    baths: 2,
    beds: 2,
    sqft: 1100,
    price: '2,800,',
    address: '12 Coral Rd, Byron Bay, NSW 2481'
  },
  {
    image: 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
    date: 'Monday 1/7',
    status: 'Elite',
    isFavorite: false,
    baths: 3,
    beds: 4,
    sqft: 1700,
    price: '4,900,',
    address: '19 Cascade St, Adelaide, SA 5000'
  },
  {
    image: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg',
    date: 'Tuesday 2/7',
    status: 'Diamond',
    isFavorite: true,
    baths: 2,
    beds: 3,
    sqft: 1300,
    price: '2,900,',
    address: '28 City Road, Canberra, ACT 2601'
  },
  {
    image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg',
    date: 'Wednesday 3/7',
    status: 'Elite',
    isFavorite: false,
    baths: 2,
    beds: 3,
    sqft: 1200,
    price: '2,600,',
    address: '11 Main St, Darwin, NT 0800'
  },
  {
    image: 'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg',
    date: 'Thursday 4/7',
    status: 'Diamond',
    isFavorite: true,
    baths: 4,
    beds: 5,
    sqft: 2500,
    price: '8,700,',
    address: '33 Harbour Rd, Fremantle, WA 6160'
  },
  {
    image: 'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg',
    date: 'Friday 5/7',
    status: 'Gold',
    isFavorite: false,
    baths: 3,
    beds: 4,
    sqft: 1800,
    price: '5,600,',
    address: '22 Pacific Blvd, Sunshine Coast, QLD 4567'
  },
  {
    image: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg',
    date: 'Saturday 6/7',
    status: 'Elite',
    isFavorite: true,
    baths: 2,
    beds: 2,
    sqft: 1200,
    price: '3,000',
    address: '55 Cityview Ave, Hobart, TAS 7000'
  },
  {
    image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg',
    date: 'Sunday 7/7',
    status: 'Diamond',
    isFavorite: false,
    baths: 3,
    beds: 3,
    sqft: 1400,
    price: '3,300',
    address: '9 Riverside Dr, Geelong, VIC 3220'
  },
  {
    image: 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg',
    date: 'Monday 8/7',
    status: 'Gold',
    isFavorite: true,
    baths: 2,
    beds: 4,
    sqft: 1550,
    price: '4,100',
    address: '16 Bay St, Newcastle, NSW 2300'
  },
  {
    image: 'https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg',
    date: 'Tuesday 9/7',
    status: 'Elite',
    isFavorite: false,
    baths: 2,
    beds: 2,
    sqft: 1100,
    price: '2,900',
    address: '77 Sunset Blvd, Broome, WA 6725'
  }
]

export const roomList = [
  {
    image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    name: 'Dhanmondi',
    location: 'Lagos, NG',
    price: '150',
    rating: '4.9'
  },
  {
    image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
    name: 'Gulshan',
    location: 'Enugu, NG',
    price: '200',
    rating: '4.8'
  },
  {
    image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
    name: 'Banani',
    location: 'Abuja, NG',
    price: '180',
    rating: '4.7'
  },
  {
    image: 'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg',
    name: 'Uttara',
    location: 'Nasarawa, NG',
    price: '130',
    rating: '4.6'
  },
  {
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    name: 'Mirpur',
    location: 'Gobe, NG',
    price: '120',
    rating: '4.4'
  },
  {
    image: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg',
    name: 'Mohakhali',
    location: 'Oyo, NG',
    price: '140',
    rating: '4.5'
  },
  {
    image: 'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg',
    name: 'Baridhara',
    location: 'Kano, NG',
    price: '220',
    rating: '4.8'
  },
  {
    image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg',
    name: 'Bashundhara',
    location: 'Niger, NG',
    price: '170',
    rating: '4.7'
  },
  {
    image: 'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg',
    name: 'Motijheel',
    location: 'Kogi, NG',
    price: '160',
    rating: '4.5'
  },
  {
    image: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg',
    name: 'Shyamoli',
    location: 'Kubwa, NG',
    price: '110',
    rating: '4.3'
  }
]

const Home = () => {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    if (showModal === false) return
    // Modal will auto-close after animation, see component
  }, [showModal])

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f6f2' }}>
        <AnimatedWelcomeModal
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
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
        <ScrollView contentContainerStyle={{ marginBottom: 60 }}>
          {/* NEWLY ADDED */}
          <Text
            style={{
              paddingHorizontal: 16,
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 12,
              color: '#232323',
              marginTop: 16
            }}
          >
            Popular Houses
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ padding: 16 }}
          >
            {roomList.map((room, idx) => (
              <RoomCard key={idx} {...room} />
            ))}
          </ScrollView>
          {/* BASED ON YOUR LOCATION */}
          <Text
            style={{
              paddingHorizontal: 16,
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 12,
              color: '#232323'
            }}
          >
            BASED ON YOUR LOCATION
          </Text>
          <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
            {PropertyBasedOnLocationCardList.map((property, idx) => (
              <PropertyBasedOnLocationCard key={idx} {...property} />
            ))}
          </ScrollView>
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

import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

export const PROPERTY_DATA = [
  {
    id: 1,
    title: 'Elegushin Villa',
    price: 450000000,
    latitude: 6.4318,
    longitude: 3.4841,
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    address: 'Elegushi Beach, Lekki, Lagos',
    desc: 'A beautiful modern villa near Elegushi Beach in Lekki, Lagos.',
    owner: {
      name: 'Adekunle Gold',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  },
  {
    id: 2,
    title: 'Lagos Parkview Mansion',
    price: 598000000,
    latitude: 6.4365,
    longitude: 3.4351,
    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
    address: 'Parkview Estate, Ikoyi, Lagos',
    desc: 'Luxury mansion with 4 bedrooms and a pool in Parkview Estate, Ikoyi.',
    owner: {
      name: 'Chioma Eze',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  },
  {
    id: 3,
    title: 'Banana Island Smart Home',
    price: 1200000000,
    latitude: 6.4474,
    longitude: 3.4282,
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
    address: 'Banana Island, Ikoyi, Lagos',
    desc: 'Smart home with modern amenities in exclusive Banana Island.',
    owner: {
      name: 'Ifeanyi Okafor',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  },
  {
    id: 4,
    title: 'Victoria Garden Duplex',
    price: 360000000,
    latitude: 6.4456,
    longitude: 3.5415,
    image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
    address: 'Victoria Garden City, Lekki, Lagos',
    desc: 'Spacious duplex in Victoria Garden City with serene surroundings.',
    owner: {
      name: 'Bola Shittu',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    }
  },
  {
    id: 5,
    title: 'Ikate Luxury Apartment',
    price: 180000000,
    latitude: 6.4392,
    longitude: 3.5042,
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
    address: 'Ikate, Lekki, Lagos',
    desc: 'Modern luxury apartment located in Ikate, Lekki.',
    owner: {
      name: 'Kunle Adebayo',
      avatar: 'https://randomuser.me/api/portraits/men/87.jpg'
    }
  },
  {
    id: 6,
    title: 'Abuja Maitama Residence',
    price: 950000000,
    latitude: 9.0938,
    longitude: 7.4976,
    image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    address: 'Maitama, Abuja',
    desc: 'Elegant residence in the premium Maitama district of Abuja.',
    owner: {
      name: 'Fatima Musa',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    }
  },
  {
    id: 7,
    title: 'Abuja Gwarinpa Family Home',
    price: 320000000,
    latitude: 9.1246,
    longitude: 7.4006,
    image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
    address: 'Gwarinpa, Abuja',
    desc: 'Spacious family home in safe and accessible Gwarinpa, Abuja.',
    owner: {
      name: 'John Okon',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg'
    }
  },
  {
    id: 8,
    title: 'Lekki Phase 1 Penthouse',
    price: 700000000,
    latitude: 6.444,
    longitude: 3.4746,
    image: 'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg',
    address: 'Lekki Phase 1, Lagos',
    desc: 'Penthouse with city views and high-end finishes in Lekki Phase 1.',
    owner: {
      name: 'Tolu Olatunji',
      avatar: 'https://randomuser.me/api/portraits/women/93.jpg'
    }
  },
  {
    id: 9,
    title: 'Port Harcourt Waterfront',
    price: 380000000,
    latitude: 4.8095,
    longitude: 7.0145,
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
    address: 'Old GRA, Port Harcourt',
    desc: 'Waterfront property in Old GRA, Port Harcourt.',
    owner: {
      name: 'Emeka Nwosu',
      avatar: 'https://randomuser.me/api/portraits/men/81.jpg'
    }
  },
  {
    id: 10,
    title: 'Kano Royal Villa',
    price: 220000000,
    latitude: 12.0022,
    longitude: 8.5919,
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    address: 'Nassarawa, Kano',
    desc: 'Royal villa in Nassarawa area of Kano City.',
    owner: {
      name: 'Aisha Bello',
      avatar: 'https://randomuser.me/api/portraits/women/31.jpg'
    }
  }
]

const { width, height } = Dimensions.get('window')

export default function PropertyMapScreen () {
  const navigation = useNavigation()
  const [liked, setLiked] = useState(false)

  const [selectedProperty, setSelectedProperty] = useState(PROPERTY_DATA[0])
  const mapRef = useRef(null)

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name='keyboard-backspace' size={24} color='black' />
        </TouchableOpacity>
        <View style={styles.searchInput}>
          <TextInput
            placeholder='Search properties...'
            placeholderTextColor='#888'
            style={{ flex: 1, fontSize: 16 }}
          />
        </View>
        <TouchableOpacity style={styles.mapNotifBtn}>
          <MaterialIcons name='location-searching' size={24} color='black' />
        </TouchableOpacity>
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: selectedProperty.latitude,
          longitude: selectedProperty.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2
        }}
        showsUserLocation
      >
        {PROPERTY_DATA.map(property => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude
            }}
            onPress={() => setSelectedProperty(property)}
          >
            <View
              style={
                selectedProperty?.id === property.id
                  ? styles.activeMarker
                  : styles.marker
              }
            >
              <Image
                source={{ uri: property.image }}
                style={styles.markerImg}
              />
              <Text
                style={
                  selectedProperty?.id === property.id
                    ? styles.priceTextActive
                    : styles.priceText
                }
              >
                ₦{property.price.toLocaleString()}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Property Card Overlay */}
      {selectedProperty && (
        <View style={styles.cardOverlay}>
          <View style={styles.card}>
            <Image
              source={{ uri: selectedProperty.image }}
              style={styles.cardImg}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.ownerRow}>
                <Image
                  source={{ uri: selectedProperty.owner.avatar }}
                  style={styles.ownerAvatar}
                />
                <Text style={styles.ownerName}>
                  {selectedProperty.owner.name}
                </Text>
              </View>
              <Text style={styles.cardTitle}>{selectedProperty.title}</Text>
              <Text style={styles.cardAddress}>{selectedProperty.address}</Text>

              <Text style={styles.cardDesc} numberOfLines={2}>
                {selectedProperty.desc}
              </Text>
              <TouchableOpacity
                style={styles.detailBtn}
                onPress={() => router.push('/(stacks)/PropertyDetailScreen')}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  Get more details
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.heartBtn}
              onPress={() => setLiked(l => !l)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.heart, { color: liked ? '#F44F5A' : '#000' }]}
              >
                ♥
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    top: 45,
    left: 0,
    width: width,
    zIndex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  backBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 2
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 14,
    fontSize: 16,
    marginRight: 12,
    elevation: 1
  },
  mapNotifBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2
  },
  map: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0
  },
  marker: {
    alignItems: 'center'
  },
  activeMarker: {
    alignItems: 'center'
  },
  markerImg: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 0,
    backgroundColor: '#eee'
  },
  priceText: {
    marginTop: 2,
    color: '#222',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 9,
    elevation: 2
  },
  priceTextActive: {
    marginTop: 2,
    color: '#fff',
    backgroundColor: '#fc8403',
    fontWeight: 'bold',
    fontSize: 13,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 9,
    elevation: 2
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    zIndex: 10,
    paddingHorizontal: 0,
    paddingBottom: 16,
    alignItems: 'center'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 24,
    width: width * 0.93,
    minHeight: 144,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 4 },
    elevation: 7,
    marginBottom: 10
  },
  cardImg: {
    width: 86,
    height: 120,
    borderRadius: 14,
    backgroundColor: '#e5e5e5'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#232323',
    marginBottom: 2
  },
  cardAddress: {
    color: '#c2c2c2',
    fontSize: 13,
    marginBottom: 2
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 4
  },
  ownerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8
  },
  ownerName: {
    fontWeight: '600',
    color: '#232323',
    fontSize: 14
  },
  cardDesc: {
    color: '#636363',
    fontSize: 13,
    marginBottom: 8
  },
  detailBtn: {
    backgroundColor: '#fc8403',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  heart: {
    fontSize: 30
  },
  heartBtn: {
    marginLeft: 8,
    alignSelf: 'flex-start'
  }
})

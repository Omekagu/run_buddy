import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type RoomCardProps = {
  image: string
  name: string
  location: string
  price: string
  rating: string
}

const RoomCard: React.FC<RoomCardProps> = ({
  image,
  name,
  location,
  price,
  rating
}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push('/(stacks)/PropertyMapScreen')}
    >
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.img} />
        {/* Star & rating */}
        <View style={styles.ratingBox}>
          <Ionicons name='star' color='#FFC529' size={15} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        {/* Info area */}
        <View style={styles.infoBox}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.row}>
            <Ionicons
              name='location-sharp'
              color='#fff'
              size={13}
              style={{ marginRight: 3 }}
            />
            <Text style={styles.locText}>{location}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 205,
    height: 270,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginRight: 18,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    position: 'relative'
  },
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 18
  },
  ratingBox: {
    position: 'absolute',
    top: 7,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 2
  },
  ratingText: {
    marginLeft: 3,
    fontWeight: 'bold',
    color: '#636363',
    fontSize: 13
  },
  infoBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 12,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.32)'
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 2
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locText: {
    color: '#fff',
    fontSize: 13,
    marginRight: 10
  },
  price: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 'auto'
  }
})

export default RoomCard

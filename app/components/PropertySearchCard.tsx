import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type PropertySearchCardProps = {
  image: string
  title: string
  address: string
  beds: number
  baths: number
  garages: number
  price: string
  rating: string
}

const PropertySearchCard: React.FC<PropertySearchCardProps> = ({
  image,
  title,
  address,
  beds,
  baths,
  garages,
  price,
  rating
}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push('/(stacks)/PropertyMapScreen')}
    >
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.img} />
        <View style={styles.infoBox}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
          {/* Icons Row */}
          <View style={styles.iconRow}>
            <View style={styles.iconItem}>
              <Ionicons name='bed-outline' size={18} color='#888' />
              <Text style={styles.iconText}>{beds}</Text>
            </View>
            <View style={styles.iconItem}>
              <MaterialIcons name='garage' size={18} color='#888' />
              <Text style={styles.iconText}>{garages}</Text>
            </View>
            <View style={styles.iconItem}>
              <Ionicons name='water-outline' size={18} color='#888' />
              <Text style={styles.iconText}>{baths}</Text>
            </View>
          </View>
          {/* Price and Rating */}
          <View style={styles.rowBottom}>
            <Text style={styles.price}>from ${price}/month</Text>
            <View style={styles.ratingBox}>
              <Ionicons name='star' color='#FFC529' size={17} />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    marginRight: 11,
    width: '100%',
    height: 120,
    overflow: 'hidden'
  },
  img: {
    width: 100,
    height: 90,
    borderRadius: 12,
    marginRight: 13,

    backgroundColor: '#e5e5e5'
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 2,
    maxWidth: 170
  },
  address: {
    color: '#c2c2c2',
    fontSize: 12,
    marginBottom: 6,
    maxWidth: 170
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  iconItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16
  },
  iconText: {
    marginLeft: 4,
    color: '#888',
    fontSize: 14,
    fontWeight: '600'
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },
  price: {
    fontWeight: 'bold',
    color: '#232323',
    fontSize: 14,
    marginRight: 12
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 7,
    paddingVertical: 2
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#636363',
    fontSize: 14
  }
})

export default PropertySearchCard

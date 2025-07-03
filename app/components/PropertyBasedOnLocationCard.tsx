import { Feather, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export type PropertyBasedOnLocationCardProps = {
  image: string
  date: string
  status: string
  isFavorite: boolean
  baths: number
  beds: number
  sqft: number
  price: string
  address: string
  onPressStatus?: () => void
  onPressFavorite?: () => void
}

const PropertyBasedOnLocationCard: React.FC<
  PropertyBasedOnLocationCardProps
> = ({
  image,
  date,
  status,
  isFavorite,
  baths,
  beds,
  sqft,
  price,
  address,
  onPressFavorite
}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push('/(stacks)/PropertyMapScreen')}
    >
      <View style={styles.card}>
        <View style={styles.imgBox}>
          <Image source={{ uri: image }} style={styles.img} />
          <View style={styles.statusOverlay}>
            <Text style={styles.statusLabel}>
              {date} - {status}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.favBtn}
            onPress={onPressFavorite}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={26}
              color='#F44F5A'
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconInfo}>
            <Feather name='droplet' size={18} color='#5b5b5b' />
            <Text style={styles.iconText}>{baths} baths</Text>
          </View>
          <View style={styles.iconInfo}>
            <Feather name='align-center' size={18} color='#5b5b5b' />
            <Text style={styles.iconText}>{beds} bedrooms</Text>
          </View>
          <View style={styles.iconInfo}>
            <Feather name='maximize-2' size={18} color='#5b5b5b' />
            <Text style={styles.iconText}>{sqft.toLocaleString()} sqft</Text>
          </View>
        </View>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.address}>{address}</Text>
        <TouchableOpacity
          style={styles.statusBtn}
          onPress={() => router.push('/(stacks)/PropertyMapScreen')}
        >
          <Text style={styles.statusBtnText}>Inspect Property</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 22,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
    marginHorizontal: 8,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  imgBox: {
    width: '100%',
    height: 160,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative'
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 18
  },
  statusOverlay: {
    position: 'absolute',
    top: 13,
    left: 16,
    backgroundColor: 'rgba(36,36,36,0.75)',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 4,
    zIndex: 2
  },
  statusLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.2
  },
  favBtn: {
    position: 'absolute',
    top: 11,
    right: 16,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 6,
    elevation: 2
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
    justifyContent: 'flex-start'
  },
  iconInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f2',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 12
  },
  iconText: {
    fontSize: 13,
    color: '#5b5b5b',
    marginLeft: 5,
    fontWeight: '600'
  },
  price: {
    fontWeight: '900',
    color: '#242424',
    fontSize: 19,
    marginTop: 4,
    marginBottom: 2
  },
  address: {
    color: '#686868',
    fontSize: 14,
    marginBottom: 13,
    fontWeight: '700'
  },
  statusBtn: {
    marginTop: 2,
    backgroundColor: '#fc8403',
    borderRadius: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 17,
    paddingVertical: 10
  },
  statusBtnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 15
  }
})

export default PropertyBasedOnLocationCard

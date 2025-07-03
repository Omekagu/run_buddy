import {
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons'
import { Video } from 'expo-av'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Modalize } from 'react-native-modalize'

const { width } = Dimensions.get('window')
const PREVIEW_HEIGHT = 380

const media = [
  {
    type: 'image',
    uri: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
  },
  {
    type: 'image',
    uri: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'
  },
  {
    type: 'video',
    uri: 'https://videos.pexels.com/video-files/4307346/4307346-hd_1920_1080_30fps.mp4'
  },
  {
    type: 'video',
    uri: 'https://videos.pexels.com/video-files/3769966/3769966-hd_1920_1080_25fps.mp4'
  },
  {
    type: 'video',
    uri: 'https://videos.pexels.com/video-files/3770033/3770033-hd_1920_1080_25fps.mp4'
  },
  {
    type: 'image',
    uri: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg'
  },
  {
    type: 'video',
    uri: 'https://videos.pexels.com/video-files/7348145/7348145-uhd_2560_1440_25fps.mp4'
  }
]

const PropertyDetailScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const flatListRef = useRef<FlatList>(null)
  const bottomSheetRef = useRef(null)

  const onOpenBottomSheet = () => {
    bottomSheetRef.current?.open()
  }

  const paymentRoutes = {
    'Bank Transfer': 'BankTransferScreen',
    'Pay with Your Card': 'BankCardScreen',
    'Pay With Cryptocurrency': 'CryptocurrencyScreen',
    'Use Hunters Wallet': 'HunterswalletScreen'
  }

  const openMediaModal = (index: number) => {
    setCurrentIndex(index)
    setModalVisible(true)
  }

  const renderMedia = ({
    item,
    index
  }: {
    item: typeof media[0]
    index: number
  }) => {
    const commonStyle = { ...styles.mediaPreview, height: PREVIEW_HEIGHT }
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => openMediaModal(index)}
      >
        {item.type === 'image' ? (
          <Image style={commonStyle} source={{ uri: item.uri }} />
        ) : (
          <View style={commonStyle}>
            <Video
              source={{ uri: item.uri }}
              style={[commonStyle, { borderRadius: 16 }]}
              resizeMode='cover'
              shouldPlay
              isLooping
            />
            <View style={styles.playIconOverlay}>
              <Feather name='play-circle' size={40} color='#fff' />
            </View>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Buttons */}
      <View style={styles.topActions}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <FontAwesome name='angle-left' size={36} color='#222' />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name='share-2' size={20} color='#333' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name='person-outline' size={22} color='#333' />
          </TouchableOpacity>
        </View>
      </View>

      {/* Media Preview Carousel */}
      <FlatList
        ref={flatListRef}
        data={media}
        keyExtractor={(_, idx) => idx.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / (width * 0.92)
          )
          setCurrentIndex(index)
        }}
        renderItem={renderMedia}
        contentContainerStyle={{
          alignItems: 'center',
          paddingTop: 60,
          marginTop: 150,
          paddingBottom: 100,
          paddingHorizontal: width * 0.04
        }}
        getItemLayout={(_, index) => ({
          length: width * 0.92,
          offset: width * 0.92 * index,
          index
        })}
        snapToInterval={width * 0.92}
        decelerationRate='fast'
      />

      {/* Dots */}
      <View style={styles.dotsWrap}>
        {media.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              currentIndex === idx && { backgroundColor: '#fc8403', width: 15 }
            ]}
          />
        ))}
      </View>

      {/* Modal Preview */}
      <Modal visible={modalVisible} transparent animationType='fade'>
        <View style={styles.modalBg}>
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name='close-circle' size={34} color='#fff' />
          </TouchableOpacity>
          {media[currentIndex].type === 'image' ? (
            <Image
              style={styles.modalMedia}
              source={{ uri: media[currentIndex].uri }}
            />
          ) : (
            <Video
              source={{ uri: media[currentIndex].uri }}
              style={styles.modalMedia}
              useNativeControls
              resizeMode='contain'
              shouldPlay
              isLooping
            />
          )}
        </View>
      </Modal>

      {/* Scroll Content */}
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 120 }}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Elegwushin White Mansion</Text>
          <View style={styles.row}>
            <FontAwesome name='star' color='#FFD600' size={18} />
            <FontAwesome name='star' color='#FFD600' size={18} />
            <FontAwesome name='star' color='#FFD600' size={18} />
            <FontAwesome name='star' color='#FFD600' size={18} />
            <FontAwesome name='star' color='#FFD600' size={18} />
            <Text style={styles.rating}>5.0</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(stacks)/ReviewScreen')}
            style={styles.row}
          >
            <Fontisto name='comments' size={18} color='black' />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 5,
                fontWeight: '400',
                textDecorationStyle: 'solid',
                textDecorationLine: 'underline'
              }}
            >
              30 Reviews
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionLabel}>Address</Text>
          <Text style={styles.address}>
            2426 Nutters Born Lane{'\n'}Kelley, IA 50134{'\n'}Elegwushin, Lagos
            Nigeria
          </Text>

          <Text style={styles.sectionLabel}>Facilities</Text>
          <View style={styles.facilitiesRow}>
            {['wifi', 'event-seat', 'tv', 'computer'].map((icon, i) => (
              <View key={i} style={styles.facilityIconBox}>
                <MaterialIcons name={icon as any} size={20} color='#fff' />
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua... Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua... Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua... Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua... Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua... Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua... Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua...
          </Text>
        </View>
      </ScrollView>

      {/* Contact Owner */}
      <View style={styles.ownerActions}>
        <TouchableOpacity style={styles.ownerBtn}>
          <Feather name='phone' size={18} color='#fff' />
          <Text style={styles.ownerBtnText}>Contact Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ownerBtn}>
          <MaterialIcons name='email' size={18} color='#fff' />
          <Text style={styles.ownerBtnText}>Email Owner</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Rent Now */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Start from</Text>
          <Text style={styles.price}>$4,500</Text>
        </View>
        <TouchableOpacity style={styles.rentBtn} onPress={onOpenBottomSheet}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            Rent Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <Modalize ref={bottomSheetRef} adjustToContentHeight>
        <View style={styles.sheetContainer}>
          <Text style={styles.sheetTitle}>Choose Payment Method</Text>
          {Object.keys(paymentRoutes).map(method => (
            <TouchableOpacity
              key={method}
              style={styles.paymentOption}
              onPress={() => router.push(paymentRoutes[method])} // step 3
            >
              <Text style={styles.paymentText}>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modalize>
    </SafeAreaView>
  )
}

export default PropertyDetailScreen

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#faf6fb'
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '92%',
    position: 'absolute',
    top: 18,
    zIndex: 10,
    left: '4%',
    right: '4%'
  },
  iconBtn: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 100,
    elevation: 2,
    marginHorizontal: 2
  },
  image: {
    width: width * 0.92,
    height: PREVIEW_HEIGHT,
    borderRadius: 18,
    resizeMode: 'cover',
    marginRight: 8
  },
  playIconOverlay: {
    position: 'absolute',
    left: '45%',
    top: '40%',
    zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderRadius: 22
  },
  dotsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
    width: '100%',
    marginVertical: 10
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    backgroundColor: '#d9d9d9'
  },
  card: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginTop: 6,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 6 }
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#232323',
    letterSpacing: 0.5,
    transform: [{ translateY: -2 }],
    textTransform: 'capitalize',
    lineHeight: 22,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  rating: {
    marginLeft: 7,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#232323'
  },
  sectionLabel: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#232323',
    fontSize: 12
  },
  address: {
    color: '#555',
    fontSize: 13,
    marginTop: 2,
    fontWeight: '300'
  },
  facilitiesRow: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 4,
    gap: 10
  },
  facilityIconBox: {
    backgroundColor: '#fc8403',
    padding: 10,
    borderRadius: 10,
    marginRight: 5
  },
  description: {
    marginTop: 2,
    color: '#777',
    fontSize: 17,
    fontWeight: '300',
    lineHeight: 24,
    letterSpacing: 0.5,
    marginBottom: 14
  },
  ownerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 74,
    left: 0,
    right: 0,
    paddingHorizontal: 28,
    zIndex: 30
  },
  ownerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fc8403',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginHorizontal: 4
  },
  ownerBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    elevation: 25,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 }
  },
  priceLabel: {
    color: '#888',
    fontSize: 13
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#232323'
  },
  rentBtn: {
    backgroundColor: '#fc8403',
    paddingHorizontal: 30,
    paddingVertical: 13,
    borderRadius: 14
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(10,10,10,0.96)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalMedia: {
    width: width * 0.95,
    height: width * 1.05,

    resizeMode: 'contain',
    borderRadius: 20
  },
  mediaPreview: {
    width: width * 0.92,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 30,
    overflow: 'hidden',
    backgroundColor: '#fff'
    // marginTop: 10
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 100
  },
  sheetContainer: {
    padding: 20
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  paymentOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  paymentText: {
    fontSize: 16
  }
})

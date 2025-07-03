import { router } from 'expo-router'
import React, { useRef } from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const { width } = Dimensions.get('window')

type Slide = {
  key: string
  title: string
  description: string
  image: any
  buttonText: string
}

const slides: Slide[] = [
  {
    key: '1',
    title: 'Explore Anytime,\nAnywhere',
    description:
      'Find out all the details and a clear idea about the home by using this app.',
    image: {
      uri: 'https://t4.ftcdn.net/jpg/05/49/00/33/240_F_549003329_XqKhvKp1c3cK5x4XuLnNCzQMAZ0bwHTW.jpg'
    }, // Replace with your asset or uri
    buttonText: 'Explore now'
  },
  {
    key: '2',
    title: 'Find your Dream Home',
    description:
      'Explore a wide range of homes for sale and rent that match your needs.',
    image: {
      uri: 'https://t4.ftcdn.net/jpg/12/41/74/25/240_F_1241742596_S8WA0AgZWQPLL325KGEX3PyYCKQwGLie.jpg'
    },
    buttonText: 'Explore now'
  }
]

export default function OnboardingScreen ({ navigation }: { navigation: any }) {
  const scrollX = useRef(new Animated.Value(0)).current
  const flatListRef = useRef<FlatList<any>>(null)

  const renderItem = ({ item, index }: { item: Slide; index: number }) => (
    <View style={styles.slide}>
      {/* If you use remote images, use <Image source={{uri: ...}} /> */}
      <Image source={item.image} style={styles.image} resizeMode='contain' />
      <View style={{ marginVertical: 28 }}>
        <Text style={styles.title}>
          {item.title.split(' ').map((word, idx) =>
            word === 'Anytime,' || word === 'Anywhere' || word === 'Dream' ? (
              <Text key={idx} style={styles.highlight}>
                {word + ' '}
              </Text>
            ) : (
              <Text key={idx}>{word + ' '}</Text>
            )
          )}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => {
          if (index === slides.length - 1) {
            router.push('/registration/RegistrationOptionScreen')
          } else {
            flatListRef.current?.scrollToIndex({ index: index + 1 })
          }
        }}
      >
        <Text style={styles.buttonText}>{item.buttonText}</Text>
        <View style={styles.arrowCircle}>
          <Text style={styles.arrow}>{'→'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <View style={styles.pagination}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: 'clamp'
          })
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp'
          })
          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity
                }
              ]}
            />
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fafb',
    justifyContent: 'center'
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
    marginTop: 32,
    marginBottom: 12
  },
  title: {
    fontSize: 28,
    color: '#222B45',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 12
  },
  highlight: {
    color: '#fc8403',
    fontWeight: '700'
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 16,
    lineHeight: 22
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fc8403',
    borderRadius: 28,
    paddingVertical: 13,
    paddingHorizontal: 28,
    marginTop: 20,
    elevation: 1,
    shadowColor: '#fc8403',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.13,
    shadowRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 12
  },
  arrowCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fc8403',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 7
  },
  arrow: {
    color: '#fc8403',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 1,
    marginTop: -1
  },
  pagination: {
    position: 'absolute',
    bottom: 44,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fc8403',
    marginHorizontal: 5
  }
})

import { router } from 'expo-router'
import React, { useRef } from 'react'
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const { width, height } = Dimensions.get('window')

const images = [
  {
    uri: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg',
    title: 'Grocery Shopping',
    description:
      'Find out all the details and a clear idea about the home by using this app.'
  },
  {
    uri: 'https://images.pexels.com/photos/9461752/pexels-photo-9461752.jpeg',
    title: 'Package Pickup',
    description:
      'Explore a wide range of homes for sale and rent that match your needs.'
  },
  {
    uri: 'https://images.pexels.com/photos/9461753/pexels-photo-9461753.jpeg',
    title: 'School Run',
    description:
      'Easily manage your daily school runs and more through our app.'
  }
]

export default function FullImageSwipeScreen () {
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  borderRadius: 10,
                  backgroundColor: '#52c2f2',
                  padding: 10
                }}
                onPress={() =>
                  router.push('/registration/RegistrationOptionScreen')
                }
              >
                <Text style={styles.description}> Skip ➤ </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.pagination}>
        {images.map((_, i) => {
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
              style={[styles.dot, { width: dotWidth, opacity }]}
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
    backgroundColor: '#000',
    marginVertical: -35
  },
  imageContainer: {
    width,
    height,
    justifyContent: 'flex-end'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    resizeMode: 'cover'
  },
  overlay: {
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    width: '50%',
    marginBottom: 100
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    fontWeight: 700,
    color: '#eee'
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 5
  }
})

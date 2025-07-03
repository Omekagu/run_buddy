import { router } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const { width, height } = Dimensions.get('window')

const HOUSE_IMAGE = {
  uri: 'https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg'
}

export default function index ({ navigation }: { navigation: any }) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle='light-content' backgroundColor='#232222' />
      <ImageBackground
        source={HOUSE_IMAGE}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => router.push('/registration/OnboardingScreen')}
            activeOpacity={0.7}
          >
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom overlay */}
        <View style={styles.bottomOverlay}>
          <Text style={styles.title}>HOUSE {'\n'}HUNTER</Text>
          <Text style={styles.subtitle}>
            Let us help you find your dream home.
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#232222'
  },
  background: {
    width: width,
    height: height,
    justifyContent: 'space-between'
  },
  backgroundImage: {
    borderRadius: 36,
    resizeMode: 'cover'
  },
  topBar: {
    alignSelf: 'flex-end',
    marginTop: 50,
    marginHorizontal: 20
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  progressDot: {
    width: 22,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0DFDE33',
    marginRight: 6
  },
  progressDotActive: {
    backgroundColor: '#fff',
    width: 30
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000033'
  },
  arrowIcon: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{ rotate: '0deg' }]
  },
  bottomOverlay: {
    width: width,
    paddingHorizontal: 30,
    paddingBottom: 54,
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  star: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: -4
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1.2,
    lineHeight: 36,
    marginBottom: 13
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    opacity: 0.95,
    fontWeight: '400',
    lineHeight: 21
  }
})

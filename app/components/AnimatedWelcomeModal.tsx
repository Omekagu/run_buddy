import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  View
} from 'react-native'

const { width, height } = Dimensions.get('window')

const RUNNER_GIF =
  'https://i.pinimg.com/originals/9f/e2/d3/9fe2d3b3f4769da0b39540a0ccbd992f.gif'

type AnimatedWelcomeModalProps = {
  visible: boolean
  onClose: () => void
}

const AnimatedWelcomeModal: React.FC<AnimatedWelcomeModalProps> = ({
  visible,
  onClose
}) => {
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(40)).current

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 9,
          useNativeDriver: true
        })
      ]).start()

      // Auto close after 20s
      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start(onClose)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [visible, opacity, translateY, onClose])

  return (
    <Modal
      visible={visible}
      transparent
      animationType='none'
      onRequestClose={onClose}
    >
      <View style={styles.fullScreenOverlay}>
        <Animated.View
          style={[styles.popup, { opacity, transform: [{ translateY }] }]}
        >
          <Image
            source={{ uri: RUNNER_GIF }}
            style={styles.runner}
            resizeMode='contain'
          />
          <Text style={styles.hello}>Hello Hunter</Text>
          <Text style={styles.caption}>
            Hope you hunt down your dream house!
          </Text>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
    backgroundColor: 'rgba(40,40,40,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 26,
    paddingVertical: 34,
    paddingHorizontal: 34,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    width: width * 0.8,
    maxWidth: 420
  },
  runner: {
    width: 92,
    height: 62,
    marginBottom: 14
  },
  hello: {
    fontSize: 22,
    fontWeight: '800',
    color: '#232323',
    marginBottom: 6,
    letterSpacing: 0.2
  },
  caption: {
    fontSize: 10,
    color: '#000',
    fontWeight: '900',
    textAlign: 'center'
  }
})

export default AnimatedWelcomeModal

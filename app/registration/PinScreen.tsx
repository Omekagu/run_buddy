import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const PinScreen = () => {
  const [pin, setPin] = useState<string>('')

  const handlePress = (value: string) => {
    if (pin.length < 4) {
      setPin(pin + value)
    }

    if (pin.length === 3) {
      // Call API or verify logic here
      Alert.alert('PIN Entered', pin + value)
    }
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png'
        }}
        style={styles.logo}
      />

      <Text style={styles.enterText}>Enter your PIN code</Text>

      {/* Dot Indicators */}
      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3].map((_, index) => (
          <View
            key={index}
            style={[styles.dot, pin.length > index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Number Pad */}
      <View style={styles.padContainer}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '←'].map(
          (item, index) => {
            if (item === '')
              return <View key={index} style={styles.keypadBtn} />
            return (
              <TouchableOpacity
                key={index}
                style={styles.keypadBtn}
                onPress={() =>
                  item === '←' ? handleBackspace() : handlePress(item)
                }
              >
                <Text style={styles.keypadText}>
                  {item === '←' ? '⌫' : item}
                </Text>
              </TouchableOpacity>
            )
          }
        )}
      </View>

      {/* Forgot code */}
      <TouchableOpacity onPress={() => router.replace('/(tabs)/Home')}>
        <Text style={styles.forgotText}>Forgot your code?</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PinScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 180
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20
  },
  infoText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    width: '80%',
    marginBottom: 10
  },
  enterText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 20
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 8
  },
  activeDot: {
    backgroundColor: '#fc8403'
  },
  padContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'center',
    marginTop: 50
  },
  keypadBtn: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.5%',
    borderRadius: 100,
    backgroundColor: '#f2f2f2'
  },
  keypadText: {
    fontSize: 26,
    color: '#000'
  },
  forgotText: {
    color: '#fc8403',
    fontSize: 14,
    marginBottom: 10
  }
})

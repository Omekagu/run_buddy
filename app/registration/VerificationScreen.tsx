import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

const VerificationScreen = () => {
  const inputRefs = useRef<Array<TextInput | null>>([])
  const [code, setCode] = useState(Array(6).fill(''))

  const handleChange = (text: string, index: number) => {
    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResendCode = () => {
    router.push('/registration/PinScreen')
    console.log('Resend code triggered')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png'
          }}
          style={styles.logo}
        />

        <Text style={styles.title}>Verification code</Text>
        <Text style={styles.subtitle}>
          Enter the two-factor authentication code from (Gmail)
        </Text>

        <View style={styles.inputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType='number-pad'
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              ref={ref => (inputRefs.current[index] = ref)}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={handleResendCode}>
        <Text style={styles.resendText}>Send code again</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default VerificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50
  },
  backArrow: {
    fontSize: 26,
    color: '#333'
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 30
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 30
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#aaa',
    width: 40,
    height: 50,
    fontSize: 22,
    textAlign: 'center',
    color: '#000'
  },
  resendText: {
    color: '#fc8403',
    fontSize: 14
  }
})

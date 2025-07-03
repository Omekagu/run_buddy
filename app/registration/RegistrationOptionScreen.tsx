import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

const { width } = Dimensions.get('window')

const RegistrationOptionScreen = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/1262304/pexels-photo-1262304.jpeg?auto=compress&cs=tinysrgb&w=600'
      }}
      style={styles.container}
    >
      <StatusBar barStyle='dark-content' backgroundColor='#fff' />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Sign in to House Hunters</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Enter your full name'
              placeholderTextColor='#333333'
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Enter your password'
              placeholderTextColor='#333'
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(prev => !prev)}
            >
              <Ionicons
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={20}
                color='#666'
              />
            </TouchableOpacity>
          </View>

          {/* Remember Me & Forgot Password */}
          <View style={styles.rememberRow}>
            <TouchableOpacity style={styles.forgotPress}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.push('/(tabs)/Home')}
          >
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.orContinue}>or continue with</Text>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name='facebook' size={20} color='#1877F2' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name='google' size={20} color='#EA4335' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name='apple' size={20} color='#000' />
            </TouchableOpacity>
          </View>

          {/* Sign Up */}
          <Text style={styles.footerText}>
            Don’t have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => router.push('/registration/RegistrationFlow')}
            >
              Sign up
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default RegistrationOptionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  flex: {
    flex: 1
  },
  scrollContainer: {
    paddingHorizontal: width * 0.07,
    paddingTop: 150,
    paddingBottom: 30,
    flexGrow: 1
  },
  title: {
    textAlign: 'center',
    color: '#666',
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: 16,
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6
  },
  eyeIcon: {
    position: 'absolute',
    top: 14,
    right: 14
  },

  inputContainer: {
    // borderWidth: 0.5,
    borderRadius: 12,
    marginBottom: 20,
    height: 55
  },
  input: {
    padding: 16.5,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f5f5f5'
  },
  icon: {
    marginLeft: 10
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  rememberText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#000'
  },
  forgotPress: {
    marginLeft: 'auto'
  },
  forgotText: {
    color: '#fc8403',
    fontSize: 13
  },
  signInButton: {
    backgroundColor: '#fc8403',
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 30
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  orContinue: {
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    marginBottom: 20
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
  },
  socialButton: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 10,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '900',
    color: '#fff'
  },
  signUpText: {
    color: '#fc8403',
    fontWeight: '600'
  }
})

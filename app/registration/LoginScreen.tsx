import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

const LoginScreen = () => {
  const [isChecked, setChecked] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/1262304/pexels-photo-1262304.jpeg?auto=compress&cs=tinysrgb&w=600' // Use your preferred background
      }}
      resizeMode='cover'
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />

        {/* Header Image */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/education-7065687-5756963.png'
            }}
            style={styles.headerImage}
            resizeMode='contain'
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back </Text>
          <Text style={styles.subtitle}>
            Login to your account to start your journey
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your email address'
              keyboardType='email-address'
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.input}
                placeholder='Enter your password'
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color='#666'
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <Text style={styles.link}>Forgot password ? </Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => router.push('/registration/VerificationScreen')}
          >
            <Text style={styles.signupText}>Sign In</Text>
          </TouchableOpacity>

          {/* No Account Yet  */}
          <Text style={styles.footerText}>
            No Account Yet ?{' '}
            <Text
              style={styles.link}
              onPress={() => router.push('/registration/RegistrationFlow')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

export default LoginScreen
const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginTop: 60
  },
  headerImage: {
    width: 180,
    height: 180
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    // borderTopLeftRadius: 25,
    borderRadius: 25,
    padding: 25,
    marginTop: -20,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 }
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5
  },
  subtitle: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 15
  },
  label: {
    fontWeight: '500',
    marginBottom: 5,
    color: '#444'
  },
  input: {
    alignItems: 'center',
    // height: 70,
    backgroundColor: '#eeee',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#333'
  },
  passwordWrapper: {
    position: 'relative'
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 14
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  checkboxText: {
    marginLeft: 10,
    color: '#444',
    flexShrink: 1
  },
  link: {
    color: '#2a9aa8',
    fontWeight: '600'
  },
  signupBtn: {
    backgroundColor: '#2a9aa8',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  footerText: {
    textAlign: 'center',
    color: '#555'
  }
})

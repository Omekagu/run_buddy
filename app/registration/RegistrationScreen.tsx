import { Ionicons } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
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

// --- Country Data (You can expand this as needed) ---
const countries = [
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'USA', code: '+1', flag: '🇺🇸' },
  { name: 'UK', code: '+44', flag: '🇬🇧' }
]

const RegistrationScreen = ({
  onNext,
  onBack
}: {
  onNext: () => void
  onBack: () => void
}) => {
  const [isChecked, setChecked] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState<'Landlord' | 'Tenant' | ''>('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState(countries[0])
  const [countryPickerVisible, setCountryPickerVisible] = useState(false)

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/1262304/pexels-photo-1262304.jpeg?auto=compress&cs=tinysrgb&w=600'
      }}
      style={styles.background}
      resizeMode='cover'
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
        >
          <StatusBar
            translucent
            backgroundColor='transparent'
            barStyle='light-content'
          />

          {/* Header image */}
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
            <Text style={styles.subtitle}>Create your account</Text>
            {/* Account Type Selection */}
            <View style={styles.accountTypeRow}>
              <TouchableOpacity
                style={[
                  styles.accountTypeButton,
                  accountType === 'Landlord' && styles.accountTypeSelected
                ]}
                onPress={() => setAccountType('Landlord')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name='home'
                  size={22}
                  color={accountType === 'Landlord' ? '#fff' : '#000'}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={[
                    styles.accountTypeText,
                    accountType === 'Landlord' && styles.accountTypeTextSelected
                  ]}
                >
                  Landlord
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.accountTypeButton,
                  accountType === 'Tenant' && styles.accountTypeSelected
                ]}
                onPress={() => setAccountType('Tenant')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name='person'
                  size={22}
                  color={accountType === 'Tenant' ? '#fff' : '#fc8403'}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={[
                    styles.accountTypeText,
                    accountType === 'Tenant' && styles.accountTypeTextSelected
                  ]}
                >
                  Tenant
                </Text>
              </TouchableOpacity>
            </View>
            {/* Fullname */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Enter First Name'
                placeholderTextColor='#999'
                value={fullname}
                onChangeText={setFullname}
              />
            </View>
            {/* Fullname */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Enter Middle Name'
                placeholderTextColor='#999'
                value={fullname}
                onChangeText={setFullname}
              />
            </View>
            {/* Fullname */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Enter Surname'
                placeholderTextColor='#999'
                value={fullname}
                onChangeText={setFullname}
              />
            </View>
            {/* Email */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Enter your email address'
                placeholderTextColor='#999'
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
              />
            </View>
            {/* Phone - with Country Prefix */}
            <View style={styles.inputContainer}>
              <View style={styles.phoneRow}>
                <TouchableOpacity
                  onPress={() => setCountryPickerVisible(true)}
                  style={styles.countryPrefix}
                  activeOpacity={0.7}
                >
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                  <Text style={styles.countryCode}>{country.code}</Text>
                  <Ionicons name='chevron-down' color='#fc8403' size={18} />
                </TouchableOpacity>
                <TextInput
                  style={[styles.input, { flex: 1, marginLeft: 10 }]}
                  placeholder='Phone number'
                  placeholderTextColor='#999'
                  keyboardType='phone-pad'
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                />
              </View>
            </View>
            {/* Password */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder='Enter your password'
                  placeholderTextColor='#999'
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
            </View>
            {/* Checkbox */}
            <View style={styles.checkboxRow}>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#fc8403' : undefined}
              />
              <Text style={styles.checkboxText}>
                I agree to the{' '}
                <Text style={styles.link}>Terms & Conditions</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>
            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signupBtn}
              onPress={() => password && onNext()}
            >
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
            {/* Already have account */}
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text
                style={styles.link}
                onPress={() =>
                  router.push('/registration/RegistrationOptionScreen')
                }
              >
                Sign in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Picker Modal */}
      <Modal
        visible={countryPickerVisible}
        animationType='slide'
        transparent
        onRequestClose={() => setCountryPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select your country</Text>
            <FlatList
              data={countries}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setCountry(item)
                    setCountryPickerVisible(false)
                  }}
                >
                  <Text style={{ fontSize: 22 }}>{item.flag}</Text>
                  <Text
                    style={{
                      marginLeft: 12,
                      fontWeight: '600',
                      fontSize: 16,
                      flex: 1
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '700',
                      fontSize: 15
                    }}
                  >
                    {item.code}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: '#eee' }} />
              )}
            />
            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setCountryPickerVisible(false)}
            >
              <Text style={{ color: '#000', fontWeight: '700', fontSize: 15 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  )
}

export default RegistrationScreen

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    paddingBottom: 30
  },
  header: {
    alignItems: 'center',
    marginTop: -30,
    marginBottom: 10
  },
  headerImage: {
    width: 160,
    height: 160
  },
  formContainer: {
    marginHorizontal: width * 0.05,
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: 16,
    marginBottom: 20
  },
  accountTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 15
  },
  accountTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#fc8403',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 22,
    flex: 1,
    marginRight: 0
  },
  accountTypeSelected: {
    backgroundColor: '#fc8403',
    borderColor: '#fc8403'
  },
  accountTypeText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16
  },
  accountTypeTextSelected: {
    color: '#fff',
    fontWeight: '800'
  },
  inputContainer: {
    marginBottom: 16
  },
  input: {
    backgroundColor: '#eee',
    padding: 16.5,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
    flex: 1
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  countryPrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1.4,
    borderColor: '#000'
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 7
  },
  countryCode: {
    color: '#000',
    fontWeight: '700',
    marginRight: 4,
    fontSize: 15
  },
  passwordWrapper: {
    position: 'relative'
  },
  eyeIcon: {
    position: 'absolute',
    top: 14,
    right: 14
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  checkboxText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: '900',
    flexShrink: 1
  },
  link: {
    color: '#fc8403',
    fontWeight: '600'
  },
  signupBtn: {
    backgroundColor: '#fc8403',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 18
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  footerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: '900'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: width * 0.82,
    maxHeight: '75%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 13,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 14,
    elevation: 8
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
    letterSpacing: 0.2
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 4
  },
  closeModalBtn: {
    alignSelf: 'center',
    marginTop: 12,
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderRadius: 8,

    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fc8403'
  }
})

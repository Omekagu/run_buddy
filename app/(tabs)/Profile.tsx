import {
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialIcons,
  Octicons
} from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import {
  Clipboard,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const settingsOptions = [
  {
    icon: <Ionicons name='person' size={22} color='#5A6FF0' />,
    label: 'Personal Details',
    onPress: () => {
      router.push('/(stacks)/ProfileDetails')
    }
  },
  {
    icon: <Ionicons name='create' size={24} color='black' />,
    label: 'Create Property',
    onPress: () => {
      router.push('/(stacks)/CreatePropertyScreen')
    }
  },
  {
    icon: <MaterialIcons name='payment' size={24} color='black' />,
    label: 'Manage Payment',
    onPress: () => {
      router.push('/(stacks)/ManagePaymentScreen')
    }
  },
  {
    icon: <MaterialIcons name='privacy-tip' size={24} color='black' />,
    label: 'Privacy & Security',
    onPress: () => {
      router.push('/(stacks)/PrivacyScreen')
    }
  },
  {
    icon: <Ionicons name='notifications-outline' size={22} color='#A15CFC' />,
    label: 'Notification',
    onPress: () => {
      router.push('/(stacks)/NotificationScreen')
    }
  },
  {
    icon: <Octicons name='law' size={22} color='#FFD600' />,
    label: 'Legal Document',
    onPress: () => {
      router.push('/(stacks)/LegalScreen')
    }
  },
  {
    icon: <Fontisto name='hipchat' size={24} color='black' />,
    label: 'Chat with Us',
    onPress: () => {
      router.push('/(stacks)/SupportScreen')
    }
  },
  {
    icon: <FontAwesome5 name='themeco' size={22} color='#0BDF9A' />,
    label: 'Theme',
    onPress: () => {
      router.push('/(stacks)/ThemeScreen')
    }
  },
  {
    icon: <MaterialIcons name='insert-emoticon' size={22} color='#F05A89' />,
    label: 'Custom app icon',
    onPress: () => {
      router.push('/(stacks)/CustomAppIconScreen')
    }
  }
]

export default function Profile () {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 10,
          margin: 16,
          marginBottom: 10
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{
                uri: 'https://i.postimg.cc/wvZrFxDG/Whats-App-Image-2025-05-22-at-16-06-27-0a4576f9.jpg'
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 10,
                borderWidth: 2,
                borderColor: '#000'
              }}
            />
            <Text
              style={{
                color: '#000',
                fontWeight: '600',
                fontSize: 18,
                letterSpacing: 0.5
              }}
            >
              Yzkvng
            </Text>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 18,
              paddingHorizontal: 18,
              paddingVertical: 6,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Ionicons
              name='star-outline'
              size={16}
              color='#000'
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: '#000', fontWeight: '500' }}>Upgrade</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: 20
          }}
        >
          <View>
            <Text style={{ color: '#222', fontWeight: '500', fontSize: 16 }}>
              Omekagu Chukwuebuka
            </Text>
            <Text style={{ color: '#B1B7CA', fontSize: 13, marginTop: 2 }}>
              ID:YAZ1231
            </Text>
          </View>
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#000' }}>
            $558.00
          </Text>
        </View>
        {/* Referral Link Section */}
        <View
          style={{
            backgroundColor: '#F5F6FB',
            borderRadius: 10,
            padding: 10,
            marginTop: 18,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              color: '#143881',
              fontWeight: '500',
              fontSize: 15,
              flex: 1
            }}
            numberOfLines={1}
          >
            https://refer.yourapp.com/invite/YAZ1231
          </Text>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString('https://refer.yourapp.com/invite/YAZ1231')
              // You can show a toast/snackbar here
            }}
            style={{
              marginLeft: 10,
              padding: 4
            }}
          >
            <Ionicons name='copy' size={18} color='#143881' />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          {settingsOptions.slice(0, 3).map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.itemRow}
              onPress={item.onPress}
            >
              <View style={styles.iconBox}>{item.icon}</View>
              <Text style={styles.label}>{item.label}</Text>
              <Ionicons name='chevron-forward' size={22} color='#C6C6C6' />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.section}>
          {settingsOptions.slice(3, 8).map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.itemRow}
              onPress={item.onPress}
            >
              <View style={styles.iconBox}>{item.icon}</View>
              <Text style={styles.label}>{item.label}</Text>
              <Ionicons name='chevron-forward' size={22} color='#C6C6C6' />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.section}>
          <TouchableOpacity style={styles.itemRow} onPress={() => {}}>
            <View style={styles.iconBox}>
              <Ionicons name='log-out-outline' size={22} color='#5A6FF0' />
            </View>
            <Text style={styles.label}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.itemRow, styles.dangerRow]}
            onPress={() => {}}
          >
            <View style={styles.iconBox}>
              <Ionicons name='close' size={22} color='#F05A89' />
            </View>
            <Text style={[styles.label, styles.dangerText]}>Close Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fc8403'
  },

  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 100
  },
  section: {
    height: 'auto',
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 16
  },
  itemRow: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#E3E3E3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#F5F6FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#363853',
    fontWeight: '500'
  },
  dangerRow: {
    backgroundColor: '#fff',
    borderColor: '#F05A89'
  },
  dangerText: {
    color: '#F05A89',
    fontWeight: '600'
  }
})

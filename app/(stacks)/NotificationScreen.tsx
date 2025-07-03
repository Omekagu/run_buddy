import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
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

// Dummy data for messages
const MESSAGE_DATA = [
  {
    id: '1',
    type: 'message',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Putri Cantika Lestari',
    verified: true,
    time: '12:30 pm',
    message: 'Hello Syaiful, the price is per night, okay?',
    unread: 1
  },
  {
    id: '2',
    type: 'message',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Putri Cantika Lestari',
    verified: true,
    time: '10:20 pm',
    message: 'Yes of course! 🔥',
    unread: 1
  },
  {
    id: '3',
    type: 'message',
    avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
    name: 'Sri Permatasari ~ Top Host',
    verified: true,
    time: '07:00 pm',
    message: 'Thank you for the tips, I will try it 😊',
    unread: 0
  },
  {
    id: '4',
    type: 'message',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    name: 'Pratama Adi',
    verified: false,
    time: 'Yesterday',
    message: "I'm happy to hear that, thank you!!",
    unread: 0
  },
  {
    id: '5',
    type: 'message',
    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    name: 'Nabila Dwi Putri',
    verified: true,
    time: 'Yesterday',
    message: "Don't forget about the house rules ok..",
    unread: 2
  },
  {
    id: '6',
    type: 'message',
    avatar:
      'https://i.postimg.cc/wvZrFxDG/Whats-App-Image-2025-05-22-at-16-06-27-0a4576f9.jpg',
    name: 'Bagus Prasetyo',
    verified: false,
    time: '14 Feb 2025',
    message: 'please how do i know that there c...',
    unread: 0
  },
  {
    id: '7',
    type: 'message',
    avatar:
      'https://i.postimg.cc/wvZrFxDG/Whats-App-Image-2025-05-22-at-16-06-27-0a4576f9.jpg',
    name: 'Benjamin Okeke',
    verified: false,
    time: '19 mar 2025',
    message: 'who can i tell about this...',
    unread: 0
  },
  {
    id: '8',
    type: 'message',
    avatar:
      'https://i.postimg.cc/wvZrFxDG/Whats-App-Image-2025-05-22-at-16-06-27-0a4576f9.jpg',
    name: 'Omejah Syaiful',
    verified: false,
    time: '12 jan 2025',
    message: 'Tell me me more about the house y...',
    unread: 0
  },
  {
    id: '9',
    type: 'message',
    avatar:
      'https://i.postimg.cc/wvZrFxDG/Whats-App-Image-2025-05-22-at-16-06-27-0a4576f9.jpg',
    name: 'Hannah Nwosu',
    verified: false,
    time: '10 jun 2025',
    message: 'oh thats beauty but  i t...',
    unread: 0
  },
  {
    id: '10',
    type: 'message',
    avatar:
      'https://i.postimg.cc/wvZrFxDG/Whats-App-Image-2025-05-22-at-16-06-27-0a4576f9.jpg',
    name: 'Angus santa Claus',
    verified: false,
    time: '14 dec 2025',
    message: 'hmm how about we go th...',
    unread: 0
  },
  {
    id: '11',
    type: 'message',
    avatar:
      'https://i.postimg.cc/wvZrFxDG/Whats-App-Image-2025-05-22-at-16-06-27-0a4576f9.jpg',
    name: 'Yzkvng Ebuka',
    verified: false,
    time: '1 Feb 2025',
    message: 'Not yet,but i would love t...',
    unread: 0
  }
]

// Dummy data for notifications
const NOTIFICATION_DATA = [
  {
    id: '100',
    type: 'notification',
    icon: 'bell',
    title: 'Booking Confirmed',
    subtitle: 'Your stay at Banana Island Smart Home is confirmed.',
    time: 'Today',
    unread: 1
  },
  {
    id: '101',
    type: 'notification',
    icon: 'star',
    title: 'New Review Received',
    subtitle: 'You received a 5-star review from Chioma Eze.',
    time: 'Yesterday',
    unread: 0
  },
  {
    id: '102',
    type: 'notification',
    icon: 'calendar',
    title: 'Upcoming Stay',
    subtitle: 'Your stay at Ikate Luxury Apartment starts in 2 days.',
    time: '2 days ago',
    unread: 1
  },
  {
    id: '103',
    type: 'notification',
    icon: 'info',
    title: 'Policy Update',
    subtitle: 'Our house rules have been updated.',
    time: 'Last week',
    unread: 0
  }
]

export default function NotificationScreen () {
  const [activeTab, setActiveTab] = useState<'notifications' | 'messages'>(
    'notifications'
  )

  // Choose content based on tab
  const data = activeTab === 'notifications' ? NOTIFICATION_DATA : MESSAGE_DATA

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => {
            router.back()
          }}
        >
          <MaterialIcons name='keyboard-backspace' size={24} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <SimpleLineIcons name='options-vertical' size={24} color='black' />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            activeTab === 'notifications' && styles.tabBtnActive
          ]}
          onPress={() => setActiveTab('notifications')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'notifications' && styles.tabTextActive
            ]}
          >
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            activeTab === 'messages' && styles.tabBtnActive
          ]}
          onPress={() => setActiveTab('messages')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'messages' && styles.tabTextActive
            ]}
          >
            Messages
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 30 }}
        renderItem={({ item }) =>
          activeTab === 'notifications' ? (
            <TouchableOpacity style={styles.itemNotif}>
              <View style={styles.notifIconWrap}>
                <MaterialIcons
                  name={
                    item.icon === 'bell'
                      ? 'notifications'
                      : item.icon === 'star'
                      ? 'star'
                      : item.icon === 'calendar'
                      ? 'event'
                      : 'info'
                  }
                  size={28}
                  color={item.unread ? '#fc8403' : '#bbb'}
                  style={{ marginRight: 4 }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                <Text style={styles.notifSubtitle} numberOfLines={2}>
                  {item.subtitle}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end', minWidth: 60 }}>
                <Text style={styles.time}>{item.time}</Text>
                {item.unread > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.item}
              onPress={() => router.push('/(stacks)/ChatScreen')}
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.verified && (
                    <Image
                      source={{
                        uri: 'https://img.icons8.com/color/48/000000/verified-badge.png'
                      }}
                      style={styles.verified}
                    />
                  )}
                </View>
                <Text style={styles.message} numberOfLines={1}>
                  {item.type === 'message'
                    ? item.name.split(' ')[0] + ': '
                    : ''}
                  {item.message}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end', minWidth: 60 }}>
                <Text style={styles.time}>{item.time}</Text>
                {item.unread > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 54,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }
  },
  headerBtn: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 8,
    marginBottom: 6
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#F7F7F7',
    marginHorizontal: 6
  },
  tabBtnActive: {
    backgroundColor: '#fff',
    shadowColor: '#fc8403',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5
  },
  tabText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 15
  },
  tabTextActive: {
    color: '#fc8403',
    fontWeight: 'bold'
  },
  // Message item
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    minHeight: 72
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 2,
    backgroundColor: '#eee'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#232323',
    marginRight: 4
  },
  verified: {
    width: 16,
    height: 16,
    marginLeft: 2
  },
  message: {
    color: '#555',
    fontSize: 13,
    marginTop: 1,
    maxWidth: width * 0.56
  },
  // Notification item
  itemNotif: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    minHeight: 72
  },
  notifIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notifTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#232323'
  },
  notifSubtitle: {
    color: '#555',
    fontSize: 13,
    marginTop: 1,
    maxWidth: width * 0.56
  },
  time: {
    fontSize: 12,
    color: '#BEBEBE',
    marginBottom: 5,
    textAlign: 'right'
  },
  badge: {
    backgroundColor: '#F44F5A',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 5
  },
  separator: {
    height: 1,
    width: '82%',
    backgroundColor: '#F2F2F2',
    alignSelf: 'flex-end'
  }
})

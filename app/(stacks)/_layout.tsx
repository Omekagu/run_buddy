// app/_layout.tsx
import { Stack } from 'expo-router'

export default function Layout () {
  return (
    <Stack>
      <Stack.Screen
        name='PropertySearchScreen'
        options={{ title: 'Property Search', headerShown: false }}
      />
      <Stack.Screen
        name='PropertyMapScreen'
        options={{ title: 'Property Map', headerShown: false }}
      />
      <Stack.Screen
        name='PropertyDetailScreen'
        options={{ title: 'Property Detail', headerShown: false }}
      />
      <Stack.Screen
        name='ReviewScreen'
        options={{ title: 'Review', headerShown: false }}
      />
      <Stack.Screen
        name='WriteReviewScreen'
        options={{ title: 'Write a Review', headerShown: false }}
      />
      <Stack.Screen
        name='ProfileScreen'
        options={{ title: 'ProfileScreen', headerShown: true }}
      />
      <Stack.Screen
        name='CreatePropertyScreen'
        options={{ title: 'CreatePropertyScreen', headerShown: false }}
      />
      <Stack.Screen
        name='ManagePaymentScreen'
        options={{ title: 'ManagePaymentScreen', headerShown: false }}
      />
      <Stack.Screen
        name='SettingsScreen'
        options={{ title: 'SettingsScreen', headerShown: true }}
      />
      <Stack.Screen
        name='NotificationScreen'
        options={{ title: 'NotificationScreen', headerShown: false }}
      />
      <Stack.Screen
        name='ChatScreen'
        options={{
          title: 'ChatScreen',
          headerShown: true,
          headerTintColor: '#000'
        }}
      />
      <Stack.Screen
        name='NotificationDetailScreen'
        options={{ title: 'NotificationDetailScreen', headerShown: false }}
      />
      <Stack.Screen
        name='BankCardScreen'
        options={{ title: 'BankCardScreen', headerShown: false }}
      />
      <Stack.Screen
        name='BankTransferScreen'
        options={{ title: 'BankTransferScreen', headerShown: false }}
      />
      <Stack.Screen
        name='HunterswalletScreen'
        options={{ title: 'HunterswalletScreen', headerShown: false }}
      />
      <Stack.Screen
        name='CryptocurrencyScreen'
        options={{ title: 'CryptocurrencyScreen', headerShown: false }}
      />
      <Stack.Screen
        name='ProfileDetails'
        options={{ title: 'ProfileDetails', headerShown: false }}
      />
      <Stack.Screen
        name='PrivacyScreen'
        options={{ title: 'PrivacyScreen', headerShown: false }}
      />
      <Stack.Screen
        name='LegalScreen'
        options={{ title: 'LegalScreen', headerShown: false }}
      />
      <Stack.Screen
        name='SupportScreen'
        options={{ title: 'SupportScreen', headerShown: false }}
      />
      <Stack.Screen
        name='ThemeScreen'
        options={{ title: 'ThemeScreen', headerShown: false }}
      />
    </Stack>
  )
}

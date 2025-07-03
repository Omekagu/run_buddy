import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Navigation stack */}
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen
          name='registration/OnboardingScreen'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='registration/RegistrationFlow'
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='registration/RegistrationOptionScreen'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='registration/LoginScreen'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='registration/VerificationScreen'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='registration/ForgotPasswordScreen'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='registration/PinScreen'
          options={{ headerShown: false }}
        />
        <Stack.Screen name='(stacks)' options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  )
}

import React, { useState } from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

export default function ChatScreen () {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSend = () => {
    if (!message.trim()) return
    setMessages(prev => [...prev, { id: Date.now().toString(), text: message }])
    setMessage('')
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.headerText}>omekagu joseph</Text>
        </View> */}

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesContainer}
          renderItem={({ item }) => (
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={80}
        >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Type a message...'
              value={message}
              onChangeText={setMessage}
              style={styles.textInput}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 16,
    backgroundColor: '#fc8403',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  messagesContainer: {
    flexGrow: 1,
    padding: 16
  },
  messageBubble: {
    backgroundColor: '#e1f5fe',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%'
  },
  messageText: { fontSize: 16, color: '#000' },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10
  },
  sendButton: {
    backgroundColor: '#fc8403',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20
  },
  sendButtonText: { color: '#fff', fontWeight: 'bold' }
})

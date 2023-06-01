import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { COLORS } from '@constants/theme'
export default function Background({ children,backgroundImage }) {
    return (
      <ImageBackground
        // source={require('../assets/background_dot.png')}
  
        style={styles.background}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      backgroundColor: COLORS.lightWhite,
      
      
    },
    container: {
      flex: 1,
      padding: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
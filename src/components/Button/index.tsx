import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import colors from '../../styles/colors'

export default function Button() {
  return (
    <TouchableOpacity
      activeOpacity={0.7} 
      style={styles.button}
    >
      <Text style={styles.buttonText}> {">"} </Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },

  buttonText: {
    color: '#fff',
    fontSize: 24
  },
})
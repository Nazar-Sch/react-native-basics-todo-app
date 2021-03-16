import React from 'react'
import { StyleSheet, View } from "react-native"
import { THEME } from '../../theme'

export const AppCard = ({ children, style }) => (
  <View style={ {...styles.default, ...style} }>
    { children }
  </View>
)

const styles = StyleSheet.create({
  default: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 8,

  }
})

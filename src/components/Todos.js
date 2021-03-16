import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"

import { THEME } from "../theme"
import { AppText } from "./ui/AppText"

export const Todos = ({ item, remove, onOpen }) => (
  <TouchableOpacity
    activeOpacity={0.4}
    onPress={() => onOpen(item.id)}
    onLongPress={() => remove(item.id)}
  >
    <AppText style={styles.todosItems}>{item.title}</AppText>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  todosItems: {
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    padding: 10,
  },
})

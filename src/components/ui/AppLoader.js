import React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { THEME } from "../../theme"
import { AppText } from "./AppText"

export const AppLoader = ({ textLoader }) => (
  <View style={styles.wrapper}>
    <ActivityIndicator color={THEME.MAIN_COLOR} size="large" />
    <AppText>{textLoader}</AppText>
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

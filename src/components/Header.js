import React from "react"
import { StyleSheet, View, Platform } from "react-native"

import { THEME } from "../theme"
import { AppTextBold } from "./ui/AppTextBold"

export const Header = ({ title }) => (
  <View
    style={{
      ...styles.headerWrapper,
      ...Platform.select({
        ios: styles.navbarIos,
        android: styles.navbarAndroid,
      }),
    }}
  >
    <AppTextBold style={styles.headerText}>{title}</AppTextBold>
  </View>
)

const styles = StyleSheet.create({
  headerWrapper: {
    padding: 15,
    paddingTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  headerText: {
    fontSize: 20,
    color: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
  },
})

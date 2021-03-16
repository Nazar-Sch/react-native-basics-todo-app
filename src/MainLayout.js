import React, { useContext } from "react"
import { StyleSheet, View } from "react-native"

import { Header } from "./components/Header"
import { ScreenContext } from "./context/screens/screenContext"
import { MainScreen } from "./screens/MainScreen"
import { TodoScreen } from "./screens/TodoScreen"

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext)

  return (
    <>
      <Header title="Todo App!" />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    alignItems: "center",
  },
})

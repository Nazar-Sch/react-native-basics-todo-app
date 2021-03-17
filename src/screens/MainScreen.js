import React, { useState, useEffect, useContext, useCallback } from "react"
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native"

import { Form } from "../components/Form"
import { Todos } from "../components/Todos"
import { ScreenContext } from "../context/screens/screenContext"
import { TodoContext } from "../context/todo/todoContext"
import { THEME } from "../theme"
import { AppLoader } from "../components/ui/AppLoader"
import { AppText } from "../components/ui/AppText"
import { AppButton } from "../components/ui/AppButton"

const window = Dimensions.get("window")

export const MainScreen = () => {
  const [dimensions, setDimensions] = useState({ window })
  const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  )
  const { changeScreen } = useContext(ScreenContext)

  const onChangeWindow = ({ window }) => {
    setDimensions({ window })
  }

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    Dimensions.addEventListener("change", onChangeWindow)
    return () => {
      Dimensions.removeEventListener("change", onChangeWindow)
    }
  })

  if (loading) {
    return <AppLoader textLoader="Loading..." />
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Reload</AppButton>
      </View>
    )
  }

  const width = dimensions.window.width - THEME.PADDING_HORIZONTAL

  let content = (
    <View style={{ width }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <Todos item={item} remove={removeTodo} onOpen={changeScreen} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )

  if (!todos.length) {
    content = (
      <View style={styles.imgWrapper}>
        <Image
          style={styles.imgItem}
          source={require("../../assets/react-native.png")}
        />
      </View>
    )
  }

  return (
    <View>
      <Form title="Add" onSubmit={addTodo} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrapper: {
    height: 300,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imgItem: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 22,
    color: THEME.DANGER_COLOR,
    marginBottom: 15,
  },
})

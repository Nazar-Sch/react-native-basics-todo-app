import React, { useState, useContext } from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"

import { THEME } from "../theme"
import { AppCard } from "../components/ui/AppCard"
import { EditModal } from "../components/EditModal"
import { AppTextBold } from "../components/ui/AppTextBold"
import { AppButton } from "../components/ui/AppButton"
import { TodoContext } from "../context/todo/todoContext"
import { ScreenContext } from "../context/screens/screenContext"

export const TodoScreen = () => {
  const { todos, updateTodo, removeTodo } = useContext(TodoContext)
  const { todoId, changeScreen } = useContext(ScreenContext)
  const [modal, setModal] = useState(false)

  const todo = todos.find((t) => t.id === todoId)

  const saveHandler = async (title) => {
    await updateTodo(todo.id, title)
    setModal(false)
  }

  return (
    <View>
      <EditModal
        visible={modal}
        setModal={setModal}
        value={todo.title}
        saveChangedTitle={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.titleText}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome5 name="edit" size={16} color="white" />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton
            onPress={() => changeScreen(null)}
            color={THEME.GREY_COLOR}
          >
            <AntDesign name="back" size={16} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <FontAwesome name="remove" size={16} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const windowWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
    // width: windowWidth / 3,
    // width: windowWidth > 400 ? 150 : 100,
  },
  titleText: {
    fontSize: 20,
  },
  card: {
    marginBottom: 15,
    padding: 25,
  },
})

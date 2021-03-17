import React, { useState } from "react"
import { StyleSheet, TextInput, View, Alert } from "react-native"
import { AntDesign } from "@expo/vector-icons"

export const Form = ({ onSubmit }) => {
  const [value, setValue] = useState("")

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue("")
    } else {
      Alert.alert(
        `Todo's title should not be empty string! Do you understand?!`
      )
    }
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        placeholder="Type your Todo"
        value={value}
        autoCorrect={false}
      />
      <AntDesign.Button
        name="plus"
        size={24}
        color="white"
        onPress={pressHandler}
      >
        Add
      </AntDesign.Button>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderStyle: "solid",
    borderBottomColor: "green",
    borderBottomWidth: 1,
    padding: 5,
    width: "75%",
  },
})

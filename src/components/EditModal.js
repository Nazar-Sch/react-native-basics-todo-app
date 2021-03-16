import React, { useState } from "react"
import { StyleSheet, TextInput, View, Button, Modal, Alert } from "react-native"

import { THEME } from "../theme"
import { AppButton } from "./ui/AppButton"

export const EditModal = ({ visible, setModal, value, saveChangedTitle }) => {
  const [title, setTitle] = useState(value)

  const handleChangeTitle = () => {
    const typedLength = title.trim().length
    if (typedLength < 3) {
      Alert.alert(
        "Error!",
        `Title symbols should be more then 3. Now ${typedLength} symbols!`
      )
    } else {
      saveChangedTitle(title)
      setModal(false)
    }
  }

  const cancelHandler = () => {
    setTitle(value)
    setModal(false)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          placeholder="Type title"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={50}
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.buttons}>
          <AppButton color={THEME.DANGER_COLOR} onPress={cancelHandler}>
            Cancel
          </AppButton>
          <AppButton onPress={handleChangeTitle}>Save</AppButton>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    margin: 10,
  },
  input: {
    borderColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
    fontSize: 20,
    padding: 5,
  },
})

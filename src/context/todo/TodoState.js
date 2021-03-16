import React, { useReducer, useContext } from "react"
import { Alert } from "react-native"
import { Api } from "../../api"

import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADING,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADING,
  UPDATE_TODO,
} from "../constants"
import { ScreenContext } from "../screens/screenContext"
import { TodoContext } from "./todoContext"
import { todoReducer } from "./todoReducer"

const TODOS_URL =
  "https://react-native-todo-app-11c93-default-rtdb.firebaseio.com/todos"

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const showLoading = () => dispatch({ type: SHOW_LOADING, loading: true })

  const hideLoading = () => dispatch({ type: HIDE_LOADING, loading: false })

  const showError = (errorText) =>
    dispatch({ type: SHOW_ERROR, error: errorText })

  const clearError = () => dispatch({ type: CLEAR_ERROR, error: null })

  const addTodo = async (title) => {
    const data = await Api.post(`${TODOS_URL}.json`, { title })
    dispatch({ type: ADD_TODO, title, id: data.name })
  }

  const fetchTodos = async () => {
    showLoading()
    clearError()
    try {
      const data = await Api.get(`${TODOS_URL}.json`)
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
    } catch (e) {
      showError("Something went wrong! :(")
      console.log(e)
    } finally {
      hideLoading()
    }
  }

  const updateTodo = async (id, title) => {
    try {
      await Api.patch(`${TODOS_URL}/${id}.json`, { title })
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (e) {
      showError("Something went wrong! :(")
      console.log(e)
    } finally {
      hideLoading()
    }
  }

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id)
    Alert.alert(
      "Remove Todo Item",
      `Are You sure remove todo item ${todo.title}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Remove",
          style: "desctructive",
          onPress: async () => {
            changeScreen(null)
            await Api.delete(`${TODOS_URL}/${id}.json`)
            dispatch({ type: REMOVE_TODO, id })
          },
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,

        addTodo,
        updateTodo,
        removeTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

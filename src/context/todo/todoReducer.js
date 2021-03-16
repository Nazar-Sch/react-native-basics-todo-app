import {
  ADD_TODO,
  SHOW_ERROR,
  HIDE_LOADING,
  REMOVE_TODO,
  SHOW_LOADING,
  UPDATE_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
} from "../constants"

const handlers = {
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [...state.todos, { title, id }],
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }),
  [UPDATE_TODO]: (state, { title, id }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title
      }
      return todo
    }),
  }),
  [SHOW_LOADING]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADING]: (state) => ({ ...state, loading: false }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),
  DEFAULT: (state) => state,
}

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

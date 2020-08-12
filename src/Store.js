import React, { createContext } from 'react'

export const Store = createContext()

const initialState = {
  user: null,
  linkedUsers: [],
  entries: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }

    case 'SET_ENTRIES':
      return { ...state, entries: action.payload }

    case 'SET_LINKED_USERS':
      return { ...state, linkedUsers: action.payload }

    default:
      return { ...state }
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}

import React, { createContext } from "react"

export const Store = createContext()

const initialState = {
  user: null,
  therapist: null,
  // entries: [],
  setEntries: null,
  datetime: null,
  allUsers: []
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }

    case "SET_ENTRIES":
      return { ...state, entries: action.payload }

    // case "GET_ENTRIES":
    //   return { ...state, entries: action.payload }

    // case "SET_ENTRIES":
    //   return { ...state, setEntries: action.payload }

    case "SET_THERAPIST":
      return { ...state, therapist: action.payload }

    case "SET_DATETIME":
      return { ...state, datetime: action.payload }

    case "SET_ALL_USERS":
      return { ...state, allUsers: action.payload }

    default:
      return { ...state }
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}

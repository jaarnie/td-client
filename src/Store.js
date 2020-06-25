import React from "react"

export const Store = React.createContext()

const initialState = {
  user: null,
  therapist: null,
  dailies: [],
  setDailies: null,
  datetime: null,
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }

    case "GET_DAILIES":
      return { ...state, dailies: action.payload }

    case "SET_DAILIES":
      return { ...state, setDailies: action.payload }

    case "SET_THERAPIST":
      return { ...state, therapist: action.payload }

    case "SET_DATETIME":
      return { ...state, datetime: action.payload }

    default:
      return { ...state }
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}

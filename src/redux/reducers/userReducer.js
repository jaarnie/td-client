import { SET_USER, SET_LINKED_USERS } from '../types'

const initialState = {
  credentials: null,
  linkedUsers: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, credentials: action.payload }

    case SET_LINKED_USERS:
      return { ...state, linkedUsers: action.payload }
    default:
      return { ...state }
  }
}

export default userReducer
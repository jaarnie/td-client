import { SET_ENTRIES } from '../types'

const initialState = {
  entries: [],
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENTRIES:
      return { ...state, entries: action.payload }

    default:
      return { ...state }
  }
}

export default dataReducer

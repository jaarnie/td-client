import { server } from '../../api/api'

import { SET_USER, SET_ENTRIES, SET_LINKED_USERS } from '../types'

export const setUserDetailsToState = () => {
  return async (dispatch) => {
    const response = await server.get('/profile')
    try {
      if (response.status === 200) {
        dispatch({
          type: SET_USER,
          payload: response.data,
        })
        dispatch({
          type: SET_ENTRIES,
          payload: response.entries,
        })
        dispatch({
          type: SET_LINKED_USERS,
          payload: response.data.therapists || response.data.clients,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

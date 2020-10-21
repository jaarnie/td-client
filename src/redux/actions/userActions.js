// import { server } from '../../api/api'
import { api, auth } from '../../config/index'
import { getAccessToken, setAccessToken } from '../../utils/session'

import {
  SET_USER,
  SET_ENTRIES,
  SET_LINKED_USERS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
} from '../types'

export const loginUser = (userData, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_UI })
      const response = await auth.post('/login', userData)
      if (response.status === 200) {
        setAuthHeader(response.data.auth_token)
        setAccessToken(response)
        dispatch(getUserData())
        dispatch({ type: CLEAR_ERRORS })
        return history.push('/')
      }
    } catch (error) {
      console.log(error)
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: error.response.data,
      // })
    }
  }
}

export const getUserData = () => {
  return async (dispatch) => {
    const response = await api.get('/profile')
    dispatch({ type: LOADING_UI })
    try {
      if (response.status === 200) {
        const { id, first_name, last_name, email } = response.data

        const userObj = {
          id,
          first_name,
          last_name,
          email,
        }

        dispatch({
          type: SET_USER,
          payload: userObj,
        })
        dispatch({
          type: SET_ENTRIES,
          payload: response.data.entries,
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

export const setAuthHeader = (auth_token) => {
  const authToken = `Bearer ${auth_token}`
  api.defaults.headers.common['Authorization'] = authToken
}

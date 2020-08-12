export const setUserDetailsToState = (response, dispatch) => {
  dispatch({
    type: 'SET_USER',
    payload: response.data,
  })
  dispatch({
    type: 'SET_ENTRIES',
    payload: response.data.entries
  })
  dispatch({
    type: 'SET_LINKED_USERS',
    payload: response.data.therapists || response.data.clients
  })
}



export const setAccessToken = (response) => {
  return localStorage.setItem('auth_token', response.data.auth_token)
}

export const getAccessToken = () => {
  return localStorage.getItem('auth_token')
}

export const removeAccessToken = () => {
  localStorage.removeItem('auth_token')
}

export const destroySession = () => {
  removeAccessToken()
}

export const parseAccessToken = (token) => {
  if (!token) {
    return
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

export default {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  destroySession,
  parseAccessToken
}

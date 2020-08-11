import { getAccessToken } from '../utils/session'
const serverApiVersion = 'v1'


const roots = {
  server: `http://localhost:7000/api/${serverApiVersion}`,
  authLogin: 'http://localhost:7000/auth',
  serverHeaders: {
    'Content-Type': 'application/json',
  },
  serverHeaderToken: {
    'Authorization': 'Bearer ' +  getAccessToken()
  }
}

export const serverRoot = roots.server
export const serverHeaders = roots.serverHeaders
export const serverHeaderToken = roots.serverHeaderToken
export const authLogin = roots.authLogin


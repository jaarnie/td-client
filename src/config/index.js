import axios from 'axios'

// import { getAccessToken } from '../utils/session'

const serverApiVersion = 'v1'

// // use interceptors
// // https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

// const roots = {
//   server: `http://localhost:7000/api/${serverApiVersion}`,
//   authLogin: 'http://localhost:7000/auth',
//   serverHeaders: {
//     'Content-Type': 'application/json',
//   },
//   serverHeaderToken: {
//     'Authorization': 'Bearer ' +  getAccessToken()
//     // Authorization: 'Bearer ' + getAccessToken()
//   }
// }

// export const serverRoot = roots.server
// export const serverHeaders = roots.serverHeaders
// export const serverHeaderToken = roots.serverHeaderToken
// export const authLogin = roots.authLogin

export const api = axios.create({
  baseURL: `http://localhost:7000/api/${serverApiVersion}`,
})

export const auth = axios.create({
  baseURL: 'http://localhost:7000/auth',
})

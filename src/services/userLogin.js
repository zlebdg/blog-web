import { extend } from 'umi-request'
import basicErrorHandler from './errorHandler'

const request = extend({
  maxCache: 10,
  errorHandler: (error) => {
    console.log(error)
  },
  credentials: 'include',
})

export async function userLogin(username, password) {
  return request('/login', {
    method: 'post',
    requestType: 'form',
    data: {
      username: username,
      password: password,
      'remember-me': 'true',
    },
    errorHandler: basicErrorHandler,
  })
}

export async function currentUser() {
  return request('/auth/currentUser', {
    errorHandler: basicErrorHandler,
  })
}

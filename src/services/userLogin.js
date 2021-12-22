import request from '@/utils/request'
import basicErrorHandler from './errorHandler'

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

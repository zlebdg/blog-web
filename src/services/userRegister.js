import request from '@/utils/request'
import basicErrorHandler from './errorHandler'

export async function register(username, email, captcha) {
  return request('/auth/register', {
    method: 'post',
    requestType: 'form',
    data: {
      username: username,
      email: email,
      captcha: captcha,
    },
    params: {},
    errorHandler: basicErrorHandler,
  })
}

export async function registerVerify(verifyCode, password) {
  return request('/auth/register/verify', {
    method: 'post',
    requestType: 'form',
    data: {
      verifyCode: verifyCode,
      password: password,
    },
    params: {},
    errorHandler: basicErrorHandler,
  })
}

export async function resendEmail(username, email) {
  return request('/auth/register/resendEmail', {
    method: 'post',
    requestType: 'form',
    data: {
      username: username,
      email: email,
    },
    params: {},
    errorHandler: basicErrorHandler,
  })
}

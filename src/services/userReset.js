import request from '@/utils/request'
import basicErrorHandler from './errorHandler'

export async function reset(username, email, captcha) {
  return request('/auth/reset', {
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

export async function resetVerify(verifyCode, password) {
  return request('/auth/reset/verify', {
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

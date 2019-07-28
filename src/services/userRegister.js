import request from '@/utils/request'
import { formatMessage } from 'umi-plugin-react/locale'
import { message } from 'antd'
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

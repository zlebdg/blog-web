import request from '@/utils/request'
import { formatMessage } from 'umi-plugin-react/locale'
import { message } from 'antd'
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

import request from '@/utils/request'
import { formatMessage } from 'umi-plugin-react/locale'
import { message } from 'antd'

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
    errorHandler: (error) => { // 出错处理
      const { response, data } = error
      console.log(response)
      console.log(data)
      if (data && data.message) {
        try {
          message.error(formatMessage({ id: data.message }))
        } catch (e) { // 缺少i18n则降级成直接显示server返回的message
          message.error()
        }
      }
    },
  })
}

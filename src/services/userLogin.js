import request from '@/utils/request'
import { formatMessage } from 'umi-plugin-react/locale'
import { message } from 'antd'

export async function userLogin(username, password) {
  return request('/test/login', {
    method: 'post',
    data: {
      username: username,
      password: password,
    },
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

export default async function userLogin2(username, password) {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  return fetch('/test/login', {
    method: 'post',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
    credentials: 'include',
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.log(error)
      message.error(error)
    })
}

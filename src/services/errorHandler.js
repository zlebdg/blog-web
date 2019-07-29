import { formatMessage } from 'umi-plugin-react/locale'
import { message } from 'antd'

const basicErrorHandler = (error) => { // 出错处理
  const { response, data } = error
  console.log(response)
  console.log(data)
  if (data && data.message) {
    try {
      message.error(formatMessage({ id: data.message }))
    } catch (e) { // 缺少i18n则降级成直接显示server返回的message
      message.error(data.message)
    }
  } else if (data) {
    try {
      message.error(formatMessage({ id: data }))
    } catch (e) { // 缺少i18n则降级成直接显示server返回的message
      message.error(data)
    }
  } else if (response && response.statusText) {
    try {
      message.error(formatMessage({ id: response.statusText }))
    } catch (e) { // 缺少i18n则降级成直接显示server返回的message
      message.error(response.statusText)
    }
  } else {
    message.error(formatMessage({ id: 'default.error' }))
  }
}

export default basicErrorHandler

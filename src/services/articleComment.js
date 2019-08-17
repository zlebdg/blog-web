import { extend } from 'umi-request'
import basicErrorHandler from './errorHandler'
import md5 from 'blueimp-md5/js/md5'

const request = extend({
  maxCache: 10,
  errorHandler: (error) => {
    console.log(error)
  },
  credentials: 'include',
})

export async function post(title, text) {
  const parseType = 'draft-0.0.1' // 解析方式版本
  const hash = md5(title + text) // 用于防止重复提交
  return request('/article', {
    method: 'post',
    requestType: 'form',
    data: {
      id: null,
      parseType: parseType,
      title: title,
      text: text,
      hash: hash,
    },
    errorHandler: basicErrorHandler,
  })
}

export async function list(id) {
  return request(`/test/articleComment/list?id=${ id }`, {
    headers: {
      accept: 'application/json',
    },
    errorHandler: basicErrorHandler,
  })
}

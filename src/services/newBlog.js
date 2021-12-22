import request from '@/utils/request'
import basicErrorHandler from './errorHandler'
import md5 from 'blueimp-md5/js/md5'

export async function postArticle(title, text, preview) {
  const parseType = '0.0.2' // 解析方式版本
  const hash = md5(title + text) // 用于防止重复提交
  return request('/article', {
    method: 'post',
    requestType: 'form',
    data: {
      id: null,
      parseType,
      title,
      text,
      preview,
      hash,
    },
    errorHandler: basicErrorHandler,
  })
}

export async function queryArticle(id) {
  return request(`/public/article?id=${ id }`, {
    headers: {
      accept: 'application/json',
    },
    errorHandler: basicErrorHandler,
  })
}

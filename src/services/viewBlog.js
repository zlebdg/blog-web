import { extend } from 'umi-request'
import basicErrorHandler from './errorHandler'

const request = extend({
  maxCache: 10,
  credentials: 'include',
})

export async function articleQuery(params) {
  return request('/public/article', {
    params,
    errorHandler: basicErrorHandler,
  })
}

export async function comment(data) {
  return request('/public/articleComment', {
    method: 'post',
    requestType: 'form',
    data,
    errorHandler: basicErrorHandler,
  })
}

export async function readPlus(params) {
  return request('/public/articleInfo/readPlus', {
    method: 'post',
    params,
    errorHandler: basicErrorHandler,
  })
}

export async function like(params) {
  return request('/public/articleInfo/like', {
    method: 'post',
    params,
    errorHandler: basicErrorHandler,
  })
}

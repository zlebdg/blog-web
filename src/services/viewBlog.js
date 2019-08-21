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

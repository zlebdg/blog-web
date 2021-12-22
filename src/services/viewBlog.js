import request from '@/utils/request'
import basicErrorHandler from './errorHandler'

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

export async function userArticleInfo(params) {
  return request('/public/articleInfo/userArticleInfo', {
    params,
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

export async function unlike(params) {
  return request('/public/articleInfo/unlike', {
    method: 'post',
    params,
    errorHandler: basicErrorHandler,
  })
}

export async function dislike(params) {
  return request('/public/articleInfo/dislike', {
    method: 'post',
    params,
    errorHandler: basicErrorHandler,
  })
}

export async function undislike(params) {
  return request('/public/articleInfo/undislike', {
    method: 'post',
    params,
    errorHandler: basicErrorHandler,
  })
}

export async function star(params) {
  return request('/public/articleInfo/star', {
    method: 'post',
    params,
    errorHandler: basicErrorHandler,
  })
}

export async function unstar(params) {
  return request('/public/articleInfo/unstar', {
    method: 'post',
    params,
    errorHandler: basicErrorHandler,
  })
}

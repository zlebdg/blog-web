import request from '@/utils/request'

export async function currentUser() {
  // return request('/auth/currentUser')
  // 登录状态存储在 sessionStorage
  return JSON.parse(sessionStorage.getItem('currentUser'))
}

export async function logout() {
  return request('/auth/logout')
}

export async function uriLogout(uri, accessToken, refreshToken) {
  return request(`${ uri }?accessToken=${ accessToken }&refreshToken=${ refreshToken }`)
}

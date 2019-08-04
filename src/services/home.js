export async function currentUser() {
  // return request('/auth/currentUser')
  // 登录状态存储在 sessionStorage
  return JSON.parse(sessionStorage.getItem('currentUser'))
}

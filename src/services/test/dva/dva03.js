import request from '@/utils/request'

export async function query() {
  return request('/test/dva/query')
}

export async function post() {
  return request('/api/users')
}

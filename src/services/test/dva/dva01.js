import request from '@/utils/request'

export async function query() {
  return request('/api/users')
}

export async function post() {
  return request('/api/users')
}

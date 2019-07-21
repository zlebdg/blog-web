import request from '@/utils/request'

export async function userLogin() {
  return request('/api/userLogin')
}

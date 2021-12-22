import request from '@/utils/request'

export async function access(queryString) {
  return request(`/login${ queryString }`)
}

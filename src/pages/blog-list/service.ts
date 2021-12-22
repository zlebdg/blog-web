import request from '@/utils/request'

export async function blogListQuery(params: { userId: string, page: number, size: number }) {
  return request('/public/article/query', {
    params,
  })
}

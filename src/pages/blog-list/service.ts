import request from 'umi-request'

export async function blogListQuery(params: { userId: string, page: number, size: number }) {
  return request('/public/article/query', {
    params,
  })
}

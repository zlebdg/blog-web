import request from '@/utils/request'

export async function userLogin() {
  return request('/api/userLogin')
}

export default async function userLogin2(username, password) {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  return fetch('http://dev.local:16000/api/login', {
    method: 'post',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  })
}

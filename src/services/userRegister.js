import { message } from 'antd'

export default async function register(username, email, captcha) {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('email', email)
  formData.append('captcha', captcha)
  return fetch('/auth/register', {
    method: 'post',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
    credentials: 'include',
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.log(error)
      message.error(error)
    })
}

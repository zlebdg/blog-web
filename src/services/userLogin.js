import request from '@/utils/request';
import { message } from 'antd';

export async function userLogin() {
  return request('/api/userLogin');
}

export default async function userLogin2(username, password) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  return fetch('/test/login', {
    method: 'post',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
    credentials: 'include',
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
      message.error(error);
    });
}

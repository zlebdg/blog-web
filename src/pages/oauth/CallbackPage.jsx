import React, { PureComponent } from 'react'
import { currentUser } from '../../services/userLogin'
import { reloadAuthorized } from '../../utils/Authorized'
import router from 'umi/router'

export default class CallbackPage extends PureComponent {
  componentDidMount() {
    if (null == sessionStorage.getItem('oauthCallback')) {
      currentUser()
        .then(resp => {
          if (null != resp && 200 == resp.code) {
            const user = JSON.parse(resp.data)
            if (user.authenticated && user.username !== 'anonymousUser') {
              sessionStorage.setItem('currentUser', resp.data)

              // 设置umi菜单权限
              sessionStorage.setItem('antd-pro-authority', JSON.stringify(user.authorities))
              reloadAuthorized() // 重新读取授权信息
              router.push('/welcome')
              sessionStorage.setItem('oauthCallback', 1)
            }
          }
        })
        .catch(error => {
        })
    }
    router.push('/')
  }

  render() {
    return (
      <></>
    )
  }
}

import React, { PureComponent } from 'react'
import { access } from '../../services/oauth'
import { currentUser } from '../../services/userLogin'
import { reloadAuthorized } from '../../utils/Authorized'
import router from 'umi/router'

// 登录后路由到 发博客 界面
const afterLoginRouter = ''

export default class CallbackPage extends PureComponent {
  componentDidMount() {
    if (null == sessionStorage.getItem('oauthCallback')) {
      access(this.props.location.search)
        .then(() => {

          // 查询当前用户
          currentUser()
            .then(resp => {
              console.log(resp)
              if (resp && 200 === resp.code) {
                const user = resp.data
                if (user.authenticated && user.username !== 'anonymousUser') {
                  sessionStorage.setItem('currentUser', JSON.stringify(user))

                  if (null != sessionStorage.getItem('hrefSavedBeforeLogin')) {
                    window.location = sessionStorage.getItem('hrefSavedBeforeLogin')
                    sessionStorage.removeItem('hrefSavedBeforeLogin')
                  } else {
                    router.push(`/${ user.username }@${ user.appId }/newBlog`)
                  }
                  reloadAuthorized() // 重新读取授权信息
                }
              }
            })
        })
    }
  }

  render() {
    return (
      <></>
    )
  }
}

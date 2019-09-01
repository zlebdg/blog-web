import { Avatar, Icon, Menu, message } from 'antd'
import { FormattedMessage } from 'umi-plugin-react/locale'
import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'
import { logout, uriLogout } from '../../services/home'
import { generateImgSrc as idcon } from '../Img/DefaultAvatar'

class AvatarDropdown extends React.Component {
  componentDidUpdate() {
    const { currentUser = {}, menu } = this.props
    // 未登录
    if (currentUser && !currentUser.authenticated) {
      // router.push('/user/login')
    } else {
      sessionStorage.setItem('autoLogin', 1)
    }
  }

  onMenuClick = event => {
    const { key } = event
    if (key === 'logout') {
      logout()
        .then(resp => {
          if (resp && 200 === resp.code && resp.data) {
            const { dispatch } = this.props
            if (dispatch) {
              dispatch({
                type: 'user/saveCurrentUser',
                payload: {},
              })
            }
            const data = typeof resp === 'string' ? JSON.parse(resp.data) : resp.data
            if (data.logoutUri) {
              message.warn('logged out')
              const logoutUri = data.logoutUri
              const accessToken = data.accessToken ? data.accessToken : ''
              const refreshToken = data.refreshToken ? data.refreshToken : ''
              uriLogout(logoutUri, accessToken, refreshToken)
                .then(r => {
                  if (r && 200 === r.code) {
                  }
                })
            }
          }
        })
      return
    }
    router.push(`/account/${ key }`)
  }

  goLogin = () => {
    sessionStorage.setItem('hrefSavedBeforeLogin', window.location.href)
    window.location = '/login'
  }

  render() {
    const { currentUser, menu } = this.props
    const menuHeaderDropdown2 = (
      <Menu className={ styles.menu } selectedKeys={ [] } onClick={ this.onMenuClick }>
        <Menu.Item key="logout">
          <Icon type="logout"/>
          <FormattedMessage id="menu.account.logout" defaultMessage="logout"/>
        </Menu.Item>
      </Menu>
    )

    if (true) {
      return currentUser && currentUser.authenticated ? (
        <HeaderDropdown overlay={ menuHeaderDropdown2 }>
          <span className={ `${ styles.action } ${ styles.account }` }>
            <Avatar size="small" className={ styles.avatar }
                    src={ currentUser.avatar ? currentUser.avatar : idcon(currentUser.username) }
                    alt="avatar"/>
            <span className={ styles.name }>{ currentUser.nickname }</span>
          </span>
        </HeaderDropdown>
      ) : (
        <span className={ `${ styles.action } ${ styles.account }` } onClick={ this.goLogin }>
          <Avatar size="small" className={ styles.avatar }>Login</Avatar>
          <span>登录</span>
        </span>
      )
    }
  }
}

export default connect(({ user, login }) => ({
  currentUser: user.currentUser,
  status: login.status,
}))(AvatarDropdown)

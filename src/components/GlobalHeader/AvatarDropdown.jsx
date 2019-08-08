import { Avatar, Icon, Menu } from 'antd'
import { FormattedMessage } from 'umi-plugin-react/locale'
import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'
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
      const { dispatch } = this.props
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        })
      }
      return
    }
    router.push(`/account/${key}`)
  }

  render() {
    const { currentUser, menu } = this.props

    const menuHeaderDropdown2 = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout"/>
          <FormattedMessage id="menu.account.logout" defaultMessage="logout"/>
        </Menu.Item>
      </Menu>
    )

    if (true) {
      return currentUser && currentUser.authenticated ? (
        <HeaderDropdown overlay={menuHeaderDropdown2}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar}
                    src={currentUser.avatar ? currentUser.avatar : idcon(currentUser.username)}
                    alt="avatar"/>
            <span className={styles.name}>{currentUser.nickname}</span>
          </span>
        </HeaderDropdown>
      ) : (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar}>Login</Avatar>
          <span className={styles.name}>登录</span>
        </span>
      )
    }
  }
}

export default connect(({ user, login }) => ({
  currentUser: user.currentUser,
  status: login.status,
}))(AvatarDropdown)

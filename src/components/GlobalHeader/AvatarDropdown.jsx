import { Avatar, Icon, Menu, Spin } from 'antd'
import { FormattedMessage } from 'umi-plugin-react/locale'
import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'
import { generateImgSrc as idcon } from '../Img/DefaultAvatar'

class AvatarDropdown extends React.Component {
  componentDidUpdate() {
    const {currentUser = {}, menu} = this.props
    // 未登录
    if (currentUser && !currentUser.authenticated) {
      router.push('/user/login')
    } else {
      sessionStorage.setItem('autoLogin', 1)
    }
  }

  onMenuClick = event => {
    const {key} = event
    if (key === 'logout') {
      const {dispatch} = this.props
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
    const {currentUser, menu} = this.props

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
                    src={currentUser.avatar ? currentUser.avatar : idcon(currentUser.username)} alt="avatar"/>
            <span className={styles.name}>{currentUser.nickname}</span>
          </span>
        </HeaderDropdown>
      ) : (
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      )
    }

    if (!menu) {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar}
                  src={currentUser.avatar ? currentUser.avatar : idcon(currentUser.username)}
                  alt="avatar"/>
          <span className={styles.name}>{currentUser.nickname}</span>
        </span>
      )
    }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="center">
          <Icon type="user"/>
          <FormattedMessage id="menu.account.center" defaultMessage="account center"/>
        </Menu.Item>
        <Menu.Item key="settings">
          <Icon type="setting"/>
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings"/>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout">
          <Icon type="logout"/>
          <FormattedMessage id="menu.account.logout" defaultMessage="logout"/>
        </Menu.Item>
      </Menu>
    )
    return currentUser && currentUser.authenticated ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar"/>
          <span className={styles.name}>{currentUser.nickname}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    )
  }
}

export default connect(({user, login}) => ({
  currentUser: user.currentUser,
  status: login.status,
}))(AvatarDropdown)

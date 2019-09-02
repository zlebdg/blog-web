import { Avatar, Dropdown, Icon, Menu, message } from 'antd'
import React from 'react'
import { connect } from 'dva'
import { FormattedMessage } from 'umi/locale'
import router from 'umi/router'
import SelectLang from '../SelectLang'
import styles from './index.less'
import { generateImgSrc as idcon } from '../Img/DefaultAvatar'
import { logout, uriLogout } from '../../services/home'

@connect(({ settings, user }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  user,
}))
export default class Index extends React.PureComponent {
  state = {}

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
      setTimeout(() => {
        this.setState({
          display: null,
        })
      }, 200)
      return
    }
    router.push(`/account/${ key }`)
  }

  goLogin = () => {
    sessionStorage.setItem('hrefSavedBeforeLogin', window.location.href)
    window.location = '/login'
  }

  render() {
    const { theme, layout, user } = this.props
    let className = styles.right
    if (theme === 'dark' && layout === 'topmenu') {
      className = `${ styles.right }  ${ styles.dark }`
    }

    return (
      <div className={ className }>
        {
          (!user || !user.currentUser || !user.currentUser.authenticated) && (
            <span className={ `${ styles.action } ${ styles.account }` } onClick={ this.goLogin }>
              <Avatar size="small" className={ styles.avatar }>匿</Avatar>
              <span>
                <FormattedMessage id={ 'menu.login' }/>
              </span>
            </span>
          )
        }
        {
          (user && user.currentUser && user.currentUser.authenticated) && (
            <span>
              <div className={ `${ styles.action }` } onClick={ () => {
                router.push(`/${ user.currentUser.userId }/newBlog`)
              } }>
                <Icon type="edit"/>
                <span className={ styles.name }>
                  <FormattedMessage id={ 'component.globalHeader.newBlog' }/>
                </span>
              </div>
              <Dropdown overlay={
                <Menu className={ styles.menu } onClick={ (e) => {
                  this.onMenuClick(e)
                } } style={ { zIndex: 2000 } }>
                  <Menu.Item key="logout">
                    <Icon type="logout"/>
                    <FormattedMessage id="menu.account.logout"/>
                  </Menu.Item>
                </Menu> } onVisibleChange={ (visible) => {
                if (navigator && navigator.appVersion && navigator.appVersion.indexOf('iPhone') !== -1) {
                  if (visible) {
                    this.setState({
                      display: 'block',
                    })
                  } else {
                    setTimeout(() => {
                      this.setState({
                        display: null,
                      })
                    }, 200)
                  }
                }
              } }>
                <span className={ `${ styles.action } ${ styles.account }` }>
                  <Avatar size="small" className={ styles.avatar }
                          src={ user.currentUser.avatar || idcon(user.currentUser.username) }
                          alt={ user.currentUser.username }/>
                  <span className={ styles.name }>{ user.currentUser.nickname }</span>
                </span>
              </Dropdown>
              <div style={ {
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: 0.2,
                zIndex: 1999,
                display: this.state.display || 'none',
              } }>
              </div>
            </span>
          )
        }
        <SelectLang className={ styles.action }/>
      </div>
    )
  }
}

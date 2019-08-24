import React, { PureComponent } from 'react'
import Identicon from 'identicon.js/identicon'
import md5 from 'blueimp-md5/js/md5'
import { connect } from 'dva'
import { Avatar } from 'antd'
import styles from '../GlobalHeader/index.less'

export const generateImgSrc = (id) => {
  return `data:image/png;base64,${ new Identicon(md5(id), 64).toString() }`
}

@connect(({ user }) => ({ user }))
export default class Index extends PureComponent {
  render() {
    if (this.props.user
      && this.props.user.currentUser
      && this.props.user.currentUser.authenticated) {
      return (
        <img src={
          generateImgSrc(
            this.props.user.currentUser.avatar
              ? this.props.user.currentUser.avatar
              : this.props.user.currentUser.username)
        } alt="alt"/>
      )
    }

    return (
      <Avatar size="small" className={ styles.avatar } alt="avatar">
        未登录
      </Avatar>
    )
  }
}

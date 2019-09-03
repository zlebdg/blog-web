import React, { PureComponent }   from 'react'
import { Divider, Icon, message } from 'antd'
// import styles                   from './style.less'
import './style.less'
import { connect }                from 'dva'

const styles = {
  dontBreak: 'antd-pro-pages-view-blog-components-article-comment-info-style-dont-break ',
}

@connect(({ user }) => ({ user }))
class Index extends PureComponent<{ articleInfo: any }> {
  handleLike = () => {
    const { user } = this.props
    if (!user || !user.currentUser || !user.currentUser.authenticated) {
      message.warning('请先登录再点赞')
      return
    }
  }

  handleDislike = () => {
    const { user } = this.props
    if (!user || !user.currentUser || !user.currentUser.authenticated) {
      message.warning('请先登录再点反对')
      return
    }
  }

  handleStar = () => {
    const { user } = this.props
    if (!user || !user.currentUser || !user.currentUser.authenticated) {
      message.warning('请先登录再star')
      return
    }
  }

  handleComment = () => {
    this.props.input && this.props.input.focus()
  }

  render(): any {
    const { articleInfo } = this.props
    if (!articleInfo) {
      return (<></>)
    }

    return (
      <span style={ { margin: '0 15px' } }>
        <span className={ styles.dontBreak } onClick={ this.handleLike }>
          <Icon type="like-o"/> { articleInfo.like }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak } onClick={ this.handleDislike }>
          <Icon type="dislike-o"/> { articleInfo.dislike }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak } onClick={ this.handleStar }>
          <Icon type="star-o"/> { articleInfo.star }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak } onClick={ this.handleComment }>
          <Icon type="message"/> { articleInfo.comment }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak } style={ { cursor: 'text' } }>
          <Icon type="read"/> { articleInfo.read }
        </span>
      </span>
    )
  }
}

export default Index

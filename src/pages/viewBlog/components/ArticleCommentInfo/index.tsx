import React, { PureComponent }   from 'react'
import { Divider, Icon, message } from 'antd'
// import styles                   from './style.less'
import './style.less'
import { connect }                from 'dva'
import { like }                   from '@/services/viewBlog'

const styles = {
  dontBreak: 'antd-pro-pages-view-blog-components-article-comment-info-style-dont-break ',
}

@connect(({ user, loading }) => ({ user, loading }))
class Index extends PureComponent<{ articleInfo: any }> {
  state = {
    userId: null,
    liked: null,
    disliked: null,
    starred: null,
    id: 0,
    isDeleted: null,
    createAt: 0,
    updateAt: 0,
    version: 0,
    comment: 0,
    like: 0,
    dislike: 0,
    read: 0,
    star: 0,
    trans: 0,
  }

  componentDidUpdate(prevProps: Readonly<{ articleInfo: any }>, prevState: Readonly<{}>): void {
    // console.log(prevProps)
    // console.log(prevState)
  }

  componentDidMount(): void {
    const { user, articleInfo } = this.props
    if (null !== articleInfo.id) {
      this.props.dispatch({
        type: 'viewBlog/userArticleInfo',
        payload: {
          id: articleInfo.id,
        },
        callback: (data) => {
          this.setState(state => {
            return {
              ...state,
              liked: data.liked,
              disliked: data.disliked,
              starred: data.starred,
            }
          })
        },
      })
    }
  }

  handleLike = () => {
    const { user, loading, articleInfo } = this.props
    if (!user || !user.currentUser || !user.currentUser.authenticated) {
      message.warning('请先登录再点赞')
      return
    }
    if (loading.effects['viewBlog/like']) { // querying
      return
    }
    if (loading.effects['viewBlog/unlike']) { // querying
      return
    }
    this.props.dispatch({
      type: `viewBlog/${ this.state.liked ? 'unlike' : 'like' }`,
      payload: {
        id: articleInfo.id,
      },
      callback: (data) => {
        console.log(data)
        this.setState({
          ...data,
        })
      },
    })
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
    const { input } = this.props
    input && input.focus()
  }

  render(): any {
    const { articleInfo, loading, user } = this.props
    const login = user && user.currentUser && user.currentUser.authenticated
    this.state = {
      ...articleInfo,
      comment: this.state.comment || articleInfo.comment,
      like: this.state.like || articleInfo.like,
      dislike: this.state.dislike || articleInfo.dislike,
      read: this.state.read || articleInfo.read,
      star: this.state.star || articleInfo.star,
      trans: this.state.trans || articleInfo.trans,
      liked: this.state.liked,
      disliked: this.state.disliked,
      starred: this.state.starred,
    }
    if (!articleInfo) {
      return (<></>)
    }

    return (
      <span style={ { margin: '0 15px' } }>
        <span className={ styles.dontBreak } onClick={ this.handleLike }>
          <Icon theme={ login && this.state.liked ? 'twoTone' : 'outlined' }
                type={ loading.effects['viewBlog/like'] || loading.effects['viewBlog/unlike'] ? 'loading' : 'like-o' }
          /> { this.state.like }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak } onClick={ this.handleDislike }>
          <Icon theme={ this.state.disliked ? 'twoTone' : 'outlined' }
                type={ loading.effects['viewBlog/dislike'] || loading.effects['viewBlog/undislike'] ? 'loading' : 'dislike-o' }
          /> { articleInfo.dislike }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak } onClick={ this.handleStar }>
          <Icon theme={ this.state.starred ? 'twoTone' : 'outlined' }
                type={ loading.effects['viewBlog/star'] || loading.effects['viewBlog/unstar'] ? 'loading' : 'star-o' }
          /> { articleInfo.star }
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

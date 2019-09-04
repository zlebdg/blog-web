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
    id: null,
    isDeleted: null,
    createAt: null,
    updateAt: null,
    version: null,
    comment: null,
    like: null,
    dislike: null,
    read: null,
    star: null,
    trans: null,
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
        this.setState({
          ...data,
        })
      },
    })
  }

  handleDislike = () => {
    const { user, loading, articleInfo } = this.props
    if (!user || !user.currentUser || !user.currentUser.authenticated) {
      message.warning('请先登录再点反对')
      return
    }
    if (loading.effects['viewBlog/dislike']) { // querying
      return
    }
    if (loading.effects['viewBlog/undislike']) { // querying
      return
    }
    this.props.dispatch({
      type: `viewBlog/${ this.state.disliked ? 'undislike' : 'dislike' }`,
      payload: {
        id: articleInfo.id,
      },
      callback: (data) => {
        this.setState({
          ...data,
        })
      },
    })
  }

  handleStar = () => {
    const { user, loading, articleInfo } = this.props
    if (!user || !user.currentUser || !user.currentUser.authenticated) {
      message.warning('请先登录再给星')
      return
    }
    if (loading.effects['viewBlog/star']) { // querying
      return
    }
    if (loading.effects['viewBlog/unstar']) { // querying
      return
    }
    this.props.dispatch({
      type: `viewBlog/${ this.state.starred ? 'unstar' : 'star' }`,
      payload: {
        id: articleInfo.id,
      },
      callback: (data) => {
        this.setState({
          ...data,
        })
      },
    })
  }

  handleComment = () => {
    const { input } = this.props
    input && input.focus()
  }

  render(): any {
    const { articleInfo, loading, user } = this.props
    const login = user && user.currentUser && user.currentUser.authenticated
    this.state = {
      comment: null !== this.state.comment ? this.state.comment : articleInfo.comment,
      like: null !== this.state.like ? this.state.like : articleInfo.like,
      dislike: null !== this.state.dislike ? this.state.dislike : articleInfo.dislike,
      read: null !== this.state.read ? this.state.read : articleInfo.read,
      star: null !== this.state.star ? this.state.star : articleInfo.star,
      trans: null !== this.state.trans ? this.state.trans : articleInfo.trans,
      liked: this.state.liked,
      disliked: this.state.disliked,
      starred: this.state.starred,
    }
    const likeQuering = loading.effects['viewBlog/like'] || loading.effects['viewBlog/unlike']
    const dislikeQuering = loading.effects['viewBlog/dislike'] || loading.effects['viewBlog/undislike']
    const starQuering = loading.effects['viewBlog/star'] || loading.effects['viewBlog/unstar']
    if (!articleInfo) {
      return (<></>)
    }

    return (
      <span style={ { margin: '0 15px' } }>
        <span className={ styles.dontBreak } onClick={ this.handleLike }>
          <Icon theme={ !likeQuering && login && this.state.liked ? 'twoTone' : 'outlined' }
                type={ likeQuering ? 'loading' : 'like-o' }
          /> { this.state.like }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak } onClick={ this.handleDislike }>
          <Icon theme={ !dislikeQuering && login && this.state.disliked ? 'twoTone' : 'outlined' }
                type={ dislikeQuering ? 'loading' : 'dislike-o' }
          /> { this.state.dislike }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak } onClick={ this.handleStar }>
          <Icon theme={ !starQuering && login && this.state.starred ? 'twoTone' : 'outlined' }
                type={ starQuering ? 'loading' : 'star-o' }
          /> { this.state.star }
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

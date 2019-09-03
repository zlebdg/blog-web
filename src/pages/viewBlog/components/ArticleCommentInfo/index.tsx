import React, { PureComponent } from 'react'
import { Divider, Icon }        from 'antd'
// import styles                   from './style.less'
import './style.less'

const styles = {
  dontBreak: 'antd-pro-pages-view-blog-components-article-comment-info-style-dont-break ',
}

class Index extends PureComponent<{ articleInfo: any }> {
  handleClick = () => {
    console.log(123)
  }

  render(): any {
    const { articleInfo } = this.props
    console.log(this.props)
    if (!articleInfo) {
      return (<></>)
    }

    return (
      <span style={ { margin: '0 15px' } }>
        <span className={ styles.dontBreak } onClick={ this.handleClick }>
          <Icon type="like-o"/> { articleInfo.like }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak }>
          <Icon type="dislike-o"/> { articleInfo.dislike }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak }>
          <Icon type="star-o"/> { articleInfo.star }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak }>
          <Icon type="message"/> { articleInfo.comment }
        </span>
        <Divider type="vertical"/>
        <span className={ styles.dontBreak }>
          <Icon type="read"/> { articleInfo.read }
        </span>
      </span>
    )
  }
}

export default Index

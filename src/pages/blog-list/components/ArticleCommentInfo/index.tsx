import React, { PureComponent } from 'react'
import { BlogListItem }         from '@/pages/blog-list/data'
import { Icon }                 from 'antd'

class Index extends PureComponent<{ data: BlogListItem }> {
  render(): any {
    const { articleInfo } = this.props
    if (!articleInfo) {
      return (<></>)
    }

    return (
      <span style={ { margin: '0 10px' } }>
        <span style={ {
          margin: '0 0.5em',
          display: 'inline-block',
        } }>
          <Icon type="like-o"/> { articleInfo.like }
        </span> |
        <span style={ {
          margin: '0 0.5em',
          display: 'inline-block',
        } }>
          <Icon type="dislike-o"/> { articleInfo.dislike }
        </span> |
        <span style={ {
          margin: '0 0.5em',
          display: 'inline-block',
        } }>
          <Icon type="star-o"/> { articleInfo.star }
        </span> |
        <span style={ {
          margin: '0 0.5em',
          display: 'inline-block',
        } }>
          <Icon type="message"/> { articleInfo.comment }
        </span>|
        <span style={ {
          margin: '0 0.5em',
          display: 'inline-block',
        } }>
          <Icon type="read"/> { articleInfo.read }
        </span>
      </span>
    )
  }
}

export default Index

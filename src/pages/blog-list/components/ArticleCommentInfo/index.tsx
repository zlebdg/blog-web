import React, { PureComponent } from 'react'
import { Divider, Icon }        from 'antd'

class Index extends PureComponent<{ articleInfo: any }> {
  render(): any {
    const { articleInfo } = this.props
    if (!articleInfo) {
      return (<></>)
    }

    return (
      <span style={ { margin: '0 10px' } }>
        <span style={ { display: 'inline-block' } }>
          <Icon type="like-o"/> { articleInfo.like }
        </span>
        <Divider type="vertical"/>
        <span style={ { display: 'inline-block' } }>
          <Icon type="dislike-o"/> { articleInfo.dislike }
        </span>
        <Divider type="vertical"/>
        <span style={ { display: 'inline-block' } }>
          <Icon type="star-o"/> { articleInfo.star }
        </span>
        <Divider type="vertical"/>
        <span style={ { display: 'inline-block' } }>
          <Icon type="message"/> { articleInfo.comment }
        </span>
        <Divider type="vertical"/>
        <span style={ { display: 'inline-block' } }>
          <Icon type="read"/> { articleInfo.read }
        </span>
      </span>
    )
  }
}

export default Index

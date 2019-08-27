import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react'
import { Avatar, Comment, List } from 'antd'
import { generateImgSrc } from '../../components/Img/DefaultAvatar'

export default class ArticleComment extends React.PureComponent {
  render() {
    if (!this.props.comments
      || !this.props.comments.content
      || this.props.comments.content.length <= 0) {
      return (<></>)
    }

    return (
      <div>
        <List
          bordered
          pagination={ this.props.pagination }
          dataSource={ this.props.comments.content }
          renderItem={ comment => (
            <List.Item>
              <Comment
                style={ { width: '100%' } }
                author={ comment.authorNickname || comment.authorUsername }
                avatar={
                  <Avatar
                    src={
                      comment.authorAvatar
                        ? comment.authorAvatar
                        : comment.authorUsername !== '不愿透露姓名的网友'
                        ? generateImgSrc(comment.authorUsername)
                        : '' } alt="alt">
                    { comment.authorUsername === '不愿透露姓名的网友' && '匿' }
                  </Avatar>
                }
                content={ comment.text }
              >
                { comment.replies && <ArticleComment comments={ comment.replies }/> }
              </Comment>
            </List.Item>
          ) }
        />
      </div>
    )
  }
}

import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react'
import { Avatar, Comment, List } from 'antd'
import { generateImgSrc as idcon } from '../../components/Img/DefaultAvatar'

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
                author={ comment.authorUsername }
                avatar={
                  <Avatar
                    src={ comment.avatar
                      ? comment.avatar : idcon(comment.authorUsername) }
                    alt="alt"
                  />
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

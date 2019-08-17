import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react'
import { Avatar, Comment, List } from 'antd'

export default class ArticleComment extends React.PureComponent {
  render() {
    if (!this.props.commentList || this.props.commentList.length <= 0) {
      return (<></>)
    }

    return (
      <div>
        <List
          bordered
          dataSource={ this.props.commentList }
          renderItem={ comment => (
            <List.Item>
              <Comment
                style={ { width: '100%' } }
                author={ comment.author }
                avatar={
                  <Avatar
                    src={ comment.avatar }
                    alt="alt"
                  />
                }
                content={ comment.content }
              >
                { <ArticleComment commentList={ comment.replyList }/> }
              </Comment>
            </List.Item>
          ) }
        />
      </div>
    )
  }
}

import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react'
import { Avatar, Comment, List } from 'antd'

export default class ArticleComment extends React.PureComponent {
  render() {
    if (!this.props.comments || !this.props.comments.list || this.props.comments.list.length <= 0) {
      return (<></>)
    }

    return (
      <div>
        <List
          bordered
          pagination={ this.props.pagination }
          dataSource={ this.props.comments.list }
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
                content={ comment.text }
              >
                { <ArticleComment comments={ comment.replys }/> }
              </Comment>
            </List.Item>
          ) }
        />
      </div>
    )
  }
}

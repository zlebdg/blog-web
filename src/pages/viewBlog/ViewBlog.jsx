import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import { Col, message, Row } from 'antd'
import { queryArticle } from '../../services/newBlog'

// 代码高亮插件
BraftEditor.use(CodeHighlighter())

// 本页可解析的文章 parseType 标记
const parseType = 'draft-0.0.1'

class ViewBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogId: this.props.match.params.blogId,
      editorState: BraftEditor.createEditorState(null),
    }
  }

  componentDidMount() {
    // 清除高度, 默认是500px
    if (document.querySelector('.bf-content')) {
      document.querySelector('.bf-content').classList = ''
    }

    queryArticle(this.state.blogId)
      .then(resp => {
        console.log(resp)
        if (resp && resp.data) {
          const article = resp.data
          if (article.parseType && parseType === article.parseType) {
            this.setState({
              editorState: BraftEditor.createEditorState(`<h1 style="text-align:center;"><span style="font-size:32px">${ article.title }</span></h1>${ article.text }`),
            })
          } else {
            message.error(`不能够渲染的文章类型 ${ article.parseType }`)
          }
        }
      })
  }

  // 路由切换/手动改uri, 需要重新加载文章
  componentWillReceiveProps(nextProps, nextContext) {
    const blogIdNew = nextProps.match.params.blogId
    if (blogIdNew !== this.props.match.params.blogId) {
      queryArticle(blogIdNew)
        .then(resp => {
          console.log(resp)
          if (resp && resp.data) {
            const article = resp.data
            if (article.parseType && parseType === article.parseType) {
              this.setState({
                editorState: BraftEditor.createEditorState(`<h1 style="text-align:center;"><span style="font-size:32px">${ article.title }</span></h1>${ article.text }`),
              })
            } else {
              message.error(`不能够渲染的文章类型 ${ article.parseType }`)
            }
          }
        })
    }
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render() {
    const { editorState } = this.state
    return (
      <Row justify="space-around" type="flex">
        <Col xxl={ 16 } xl={ 18 } lg={ 18 } span={ 24 }>
          <div style={ {
            backgroundColor: 'white',
            padding: '8px',
          } }>
            <BraftEditor
              value={ editorState }
              controls={ [] }
              readOnly="true"
            />
          </div>
        </Col>
      </Row>
    )
  }
}

export default ViewBlog
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react'
import router from 'umi/router'
import { Base64 } from 'js-base64'
import BraftEditor from 'braft-editor'
import { Input, message } from 'antd'
import { postArticle } from '../../services/newBlog'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'

BraftEditor.use(CodeHighlighter())

class NewBlog extends React.Component {
  state = {
    title: null,
    editorState: BraftEditor.createEditorState(null),
  }

  onTab = (e) => {
    e.preventDefault()
  }

  titleInput = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  onChange = (editorState) => {
    // console.log(editorState.toText())
    // console.log(editorState.toRAW())
    // console.log(editorState.toHTML())
    this.setState({ editorState })
  }

  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close()
    }
    window.previewWindow = window.open()
    window.previewWindow.document.write(this.buildPreviewHtml())
    window.previewWindow.document.close()
  }

  buildPreviewHtml = () => {
    return (`
      <!Doctype html>
      <html>
        <head>
          <title>预览</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">
              ${ this.state.editorState.toHTML() }
          </div>
        </body>
      </html>
    `)
  }

  publish = () => {
    const title = this.state.title
    const text = this.state.editorState.toHTML()
    // 文章预览内容, 微博长度呗
    const preview = this.state.editorState.toText()
      .substring(0, 144)
    // console.log(title)
    // console.log(text)
    // console.log(preview)

    if (null === title || '' === title) {
      message.error('请输入标题')
      return
    }
    if (null === text || '' === text || '<p></p>' === text) {
      message.error('请输入内容')
      return
    }
    // base64
    const encodeText = Base64.encode(this.state.editorState.toHTML())
    // 补充一下base64, 否则某些符号不能保存到数据库
    postArticle(title, encodeText, preview)
      .then(resp => {
        if (resp && 200 === resp.code && resp.data) {
          message.success('发布成功')
          router.push(`/${ this.props.match.params.username }/viewBlog/blogId/${ resp.data }`)
        }
      })
  }

  render() {
    const { editorState } = this.state
    return (
      <div style={ {
        backgroundColor: 'white',
        padding: '8px',
      } }>
        <Input.Search
          onInput={ this.titleInput }
          placeholder="请输入文章标题.."
          enterButton="发布文章"
          size="large"
          onSearch={ this.publish }
        />
        <BraftEditor
          id="editor-id"
          value={ editorState }
          placeholder="输入内容.."
          onChange={ this.onChange }
          onSave={ this.onSave }
          onTab={ this.onTab }
          excludeControls={ [
            'line-height', 'letter-spacing', 'list-ul', 'list-ol', 'text-indent', 'clear',
          ] }
          extendControls={ [
            'separator',
            {
              key: 'preview',
              type: 'button',
              text: '预览文章',
              onClick: this.preview,
            },
          ] }
        />
      </div>
    )
  }
}

export default NewBlog

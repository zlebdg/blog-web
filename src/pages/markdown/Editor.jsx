import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

class Editor extends React.Component {
  onChange = (value) => {
    // console.log(value.toHTML())
    // console.log(value.toRAW(true))
    console.log(value.toText())
  }

  onTab = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="my-component">
        <BraftEditor
          onChange={ this.onChange }
          placeholder="输入内容.."
          onTab={ this.onTab }
          controls={ [
            'undo', 'redo', 'separator',
            'font-size', 'text-color', 'superscript', 'subscript', 'strike-through',
            'link', 'blockquote', 'hr', 'emoji', 'media', 'separator',
            'clear',
          ] }
        />
      </div>
    )
  }
}

export default Editor

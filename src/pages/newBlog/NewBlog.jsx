import React from 'react'
import { Col, Row } from 'antd'
import * as showdown from 'showdown'
import 'github-markdown-css'
import ReactMarkdown from 'react-markdown/with-html'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const content = `
\`\`\`java
function aa() {}
\`\`\`

<div>

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| 1 | ✔ |
| 1 | ✔ |
| 1 | ✔ |
| 1 | ✔ |
| 1 | ✔ |
| 1 | ✔ |
| 1 | ✔ |
| 1 | ✔ |
| 1 | x |
| 1 | x |
| 1 | x |
| 1 | x |

</div>

hello
<hr/>

<h3>h3</h3>
`

const converter = new showdown.Converter()

converter.setOption('omitExtraWLInCodeBlocks', false)
converter.setOption('tables', true)
converter.setOption('tasklists', true)
converter.setOption('emoji', true)
converter.setOption('underline', true)
converter.setFlavor('github')


class NewBlog extends React.Component {
  render() {
    return (
      <div>
        路由参数: { this.props.match.params.username }
        <Row justify="space-around" type="flex">
          <Col md={ 12 } sm={ 24 }>
            <BraftEditor/>
          </Col>
          <Col md={ 12 } sm={ 24 }>
            <ReactMarkdown
              className="markdown-body"
              source={ converter.makeHtml(content) }
              escapeHtml={ false }
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default NewBlog

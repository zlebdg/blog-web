import React from 'react'
import './editor.css'

// 默认不解析html
// const ReactMarkdown = require('react-markdown')
// 这样可解析html
const ReactMarkdown = require('react-markdown/with-html')
const htmlParser = require('react-markdown/plugins/html-parser')

const content = `
# This is a header And this is a paragraph
# This is a header And this is a paragraph

\`\`\`js
var a;
function aa() {}
\`\`\`

\`\`\`
var a;
function aa() {}
\`\`\`


| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

<hr />
hello
<h3>h3</h3>
`
class AppReactMarkdown extends React.Component {
  render() {
    return (
    <ReactMarkdown
      className="result"
      source={ content }
      escapeHtml={ false }
    />
  )
  }
}

export default AppReactMarkdown

import React from 'react'
import * as showdown from 'showdown'
import 'github-markdown-css'

const ReactMarkdown = require('react-markdown/with-html')

const content = `
# This is a header And this is a paragraph
# This is a header And this is a paragraph

\`\`\`js
var a;
function aa() {}
\`\`\`

\`\`\`java
var a;
function aa() {}
\`\`\`

<div>

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

</div>

- [x] This task is done
- [ ] This is still pending
 
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

const html = converter.makeHtml(content)

class Editor5 extends React.Component {
  render() {
    return (
      <ReactMarkdown
        className="markdown-body"
        source={ converter.makeHtml(content) }
        escapeHtml={ false }
      />
    )
  }
}

export default Editor5

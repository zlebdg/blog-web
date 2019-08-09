import React from 'react'
import ReactMarkdown from 'react-markdown'

// import {Editor, EditorState} from 'draft-js';

const content = `
# This is a header And this is a paragraph
# This is a header And this is a paragraph
\`\`\`js
var a;
function aa() {}
\`\`\`
`

class Editor extends React.Component {
  render() {
    return (
      <ReactMarkdown source={content} className="result"
                     escapeHtml={false}
      />
    )
  }
}

export default Editor

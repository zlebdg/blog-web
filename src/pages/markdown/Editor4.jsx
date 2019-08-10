import React from 'react'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import * as Showdown from 'showdown'

// change this
// const selectedTab = 'write'
const selectedTab = 'preview'

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

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

hello
<h3>h3</h3>
`

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

class Editor4 extends React.Component {
  handleValueChange = (value) => {
    this.setState({ value })
  }

  handleTabChange = (tab) => {
    this.setState({ tab })
  }

  render() {
    return (
      <ReactMde
        value={ content }
        onChange={ this.handleValueChange }
        selectedTab={ selectedTab }
        onTabChange={ this.handleTabChange }
        generateMarkdownPreview={ markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    )
  }
}

export default Editor4

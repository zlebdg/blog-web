import React, { PureComponent } from 'react'

const TEMPLATE_IMG = '<span class="braft-emoticon-wrap"><img src="https://github.githubassets.com/images/icons/emoji/unicode/#.png?v8" alt="alt"/></span>'
const TEMPLATE_URI = 'https://github.githubassets.com/images/icons/emoji/unicode/#.png?v8'

export function createImg(html: string): string {
  if (navigator && navigator.appVersion) {
    if (navigator.appVersion.indexOf('Windows NT 6.1') !== -1) {
      let r = ''
      for (let i = 0; i < html.length; i += 1) {
        const code = html.codePointAt(i)
        if (code > 0xffff) {
          r += `<span class="braft-emoticon-wrap"><img src="https://github.githubassets.com/images/icons/emoji/unicode/${ code.toString(16) }.png?v8" alt="alt"/> </span>`
          i += 1
        } else {
          r += html.charAt(i)
        }
      }
      return r
    }
  }
  return html
}

class Index extends PureComponent<{ codePoint: string | number }> {
  render(): any {
    return (
      <img style={ { width: '16px' } }
           src={ TEMPLATE_URI.replace('#', typeof this.props.codePoint === 'number' ? this.props.codePoint.toString(16) : this.props.codePoint) }
           alt="alt"/>
    )
  }
}

export default Index

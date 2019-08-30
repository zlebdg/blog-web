import React, { PureComponent } from 'react'

const TEMPLATE_URI = 'https://github.githubassets.com/images/icons/emoji/unicode/#.png?v8'

export function createImg(codePoint: string | number): string {
  const src = TEMPLATE_URI.replace('#', typeof codePoint === 'number'
    ? codePoint.toString(16) : codePoint)
  return `<img src=${ src } alt="alt"/>`
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

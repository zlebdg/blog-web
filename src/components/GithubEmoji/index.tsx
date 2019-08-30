import React, { PureComponent } from 'react'

const TEMPLATE_URI = 'https://github.githubassets.com/images/icons/emoji/unicode/#.png?v8'

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

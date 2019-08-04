import React, { PureComponent } from 'react'
import Identicon from 'identicon.js/identicon'
import md5 from 'blueimp-md5/js/md5'

export const generateImgSrc = (id) => {
  return `data:image/png;base64,${new Identicon(md5(id), 64).toString()}`
}

export default class DefaultAvatar extends PureComponent {
  render() {
    return (
      <img src={generateImgSrc(this.props.id)} alt="alt"/>
    )
  }
}

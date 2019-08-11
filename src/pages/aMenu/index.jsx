import React from 'react'
import Identicon from 'identicon.js/identicon'
import md5 from 'blueimp-md5/js/md5'
import { FormattedMessage } from 'umi/locale'
import { Button } from 'antd'

const avatar0 = 'data:image/png;base64,' + new Identicon(md5(10), 64).toString()
const avatar1 = 'data:image/png;base64,' + new Identicon(md5(11), 64).toString()
const avatar2 = 'data:image/png;base64,' + new Identicon(md5(12), 64).toString()
const avatar3 = 'data:image/png;base64,' + new Identicon(md5(13), 64).toString()
const avatar4 = 'data:image/png;base64,' + new Identicon(md5(14), 64).toString()
const avatar5 = 'data:image/png;base64,' + new Identicon(md5(15), 64).toString()

export default () => (
  <div
    style={ {
      textAlign: 'center',
    } }
  >
    <h3>
      { <FormattedMessage id={ 'menu.welcome' }></FormattedMessage> }
    </h3>
    <img style={ { width: '64px' } } src={ avatar0 } alt="alt"/>
    <img style={ { width: '64px' } } src={ avatar1 } alt="alt"/>
    <img style={ { width: '64px' } } src={ avatar2 } alt="alt"/>
    <img style={ { width: '64px' } } src={ avatar3 } alt="alt"/>
    <img style={ { width: '64px' } } src={ avatar4 } alt="alt"/>
    <img style={ { width: '64px' } } src={ avatar5 } alt="alt"/>
    <div>
      <Button type="primary" href="/login">登录 - /login</Button>
    </div>
  </div>
)

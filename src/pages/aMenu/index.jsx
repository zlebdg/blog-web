import React from 'react'
import Identicon from 'identicon.js/identicon'
import md5 from 'blueimp-md5/js/md5'
import { FormattedMessage } from 'umi/locale'
import { Button } from 'antd'

/**
 * 菜单, 菜单的权限 都是umi根据路由实现自动化配置的
 * 菜单名 i18n 如何配置可以参考本次提交, 提交信息/commit message "aMemu, 第一个umi菜单"
 * @returns {*}
 */

console.log(md5('0'))

const avatar0 = 'data:image/png;base64,' + new Identicon(md5(10), 64).toString()
const avatar1 = 'data:image/png;base64,' + new Identicon(md5(11), 64).toString()
const avatar2 = 'data:image/png;base64,' + new Identicon(md5(12), 64).toString()
const avatar3 = 'data:image/png;base64,' + new Identicon(md5(13), 64).toString()
const avatar4 = 'data:image/png;base64,' + new Identicon(md5(14), 64).toString()
const avatar5 = 'data:image/png;base64,' + new Identicon(md5(15), 64).toString()

export default () => (
  <div
    style={{
      textAlign: 'center',
    }}
  >
    <h3>
      {<FormattedMessage id={'menu.welcome'}></FormattedMessage>}
    </h3>
    <img style={{ width: '64px' }} src={avatar0} alt="alt"/>
    <img style={{ width: '64px' }} src={avatar1} alt="alt"/>
    <img style={{ width: '64px' }} src={avatar2} alt="alt"/>
    <img style={{ width: '64px' }} src={avatar3} alt="alt"/>
    <img style={{ width: '64px' }} src={avatar4} alt="alt"/>
    <img style={{ width: '64px' }} src={avatar5} alt="alt"/>
    <div>
      <Button type="primary" href="/login">登录</Button>
    </div>
  </div>
)

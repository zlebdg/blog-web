import React from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import Identicon from 'identicon.js/identicon'
import md5 from 'blueimp-md5/js/md5'

/**
 * 菜单, 菜单的权限 都是umi根据路由实现自动化配置的
 * 菜单名 i18n 如何配置可以参考本次提交, 提交信息/commit message "aMemu, 第一个umi菜单"
 * @returns {*}
 */

console.log(md5('0'))

const avatar0 = 'data:image/png;base64,' + new Identicon(md5(0), 64).toString()
const avatar1 = 'data:image/png;base64,' + new Identicon(md5(1), 64).toString()
const avatar2 = 'data:image/png;base64,' + new Identicon(md5(2), 64).toString()
const avatar3 = 'data:image/png;base64,' + new Identicon(md5(3), 64).toString()
const avatar4 = 'data:image/png;base64,' + new Identicon(md5(4), 64).toString()
const avatar5 = 'data:image/png;base64,' + new Identicon(md5(5), 64).toString()

export default () => (
  <PageHeaderWrapper>
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <h3>
        这是第一个菜单的测试页面
      </h3>
      <img style={{ width: '64px' }} src={avatar0} alt="alt"/>
      <img style={{ width: '64px' }} src={avatar1} alt="alt"/>
      <img style={{ width: '64px' }} src={avatar2} alt="alt"/>
      <img style={{ width: '64px' }} src={avatar3} alt="alt"/>
      <img style={{ width: '64px' }} src={avatar4} alt="alt"/>
      <img style={{ width: '64px' }} src={avatar5} alt="alt"/>
    </div>
  </PageHeaderWrapper>
)

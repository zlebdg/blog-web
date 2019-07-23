import React from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'

/**
 * 菜单, 菜单的权限 都是umi根据路由实现自动化配置的
 * 菜单名 i18n 如何配置可以参考本次提交, 提交信息/commit message "aMemu, 第一个umi菜单"
 * @returns {*}
 */

export default () => (
  <PageHeaderWrapper>
    <p
      style={{
        textAlign: 'center',
      }}
    >
      这是第一个菜单的测试页面
    </p>
  </PageHeaderWrapper>
);

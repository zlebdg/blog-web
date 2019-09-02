import React, { PureComponent } from 'react'
import { Dropdown }             from 'antd'

export default class Index extends PureComponent {
  render() {
    return (
      <div style={ { textAlign: 'center' } }>
        <Dropdown overlay={ <>
          123
        </> }>
          Dropdown测试
        </Dropdown>
      </div>
    )
  }
}

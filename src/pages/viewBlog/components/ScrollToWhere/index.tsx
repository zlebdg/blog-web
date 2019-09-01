import React, { PureComponent } from 'react'
import { BackTop }              from 'antd'

class Index extends PureComponent {
  componentDidMount(): void {
    window.scrollTo({ top: 0 })
  }

  render(): any {
    return (<BackTop/>)
  }
}

export default Index

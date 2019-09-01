import React, { PureComponent } from 'react'
import { BackTop }              from 'antd'
import { connect }              from 'dva'

const SCROLL_PREFIX = 'SCROLL_PREFIX'

@connect(({ loading, routing }) => ({ loading, routing }))
// @connect((state) => (state))
class Index extends PureComponent {

  componentDidMount(): void {
    const key = `${ SCROLL_PREFIX }${ this.props.routing.location.pathname }`
    const scrollTo = sessionStorage.getItem(key)
    if (scrollTo !== null && (scrollTo * 1) > 100) { // 上次滚动位置大于100时才触发
      window.scrollTo({ top: scrollTo })
    } else {
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('scroll', this.scrollListener)
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.scrollListener)
  }

  scrollListener = () => {
    const key = `${ SCROLL_PREFIX }${ this.props.routing.location.pathname }`
    const scrollTo = document.documentElement.scrollTop
    sessionStorage.setItem(key, scrollTo)
  }

  render(): any {
    return (<BackTop/>)
  }
}

export default Index

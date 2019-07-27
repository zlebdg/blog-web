import React, { Component } from 'react'
import { Tooltip } from 'antd'
import styles from './AppCaptcha.less'

export default class AppCaptcha extends Component {
  state = {
    src: this.props.src,
    tips: this.props.tips,
    alt: this.props.alt,
  }

  // 监听父组件状态变化
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.state.src.indexOf(nextProps.src) < 0) {
      this.setState({
        src: nextProps.src,
      })
    }
  }

  render() {
    const onClick2 = () => {
      this.setState({
        src: `${this.props.src}?${(Math.random())}`,
      })
    }

    return (
      <Tooltip title={this.state.tips} onClick={onClick2} style={{ pull: 'right' }}>
        <img src={this.state.src} alt={this.state.alt}
             className={styles.registerCaptcha}/>
      </Tooltip>
    )
  }
}

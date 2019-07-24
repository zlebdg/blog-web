import React, { Component } from 'react'
import { Tooltip } from 'antd'
import styles from './RegisterCaptcha.less'

export default class RegisterCaptcha extends Component {
  state = {
    src: this.props.src,
    tips: this.props.tips,
    alt: this.props.alt,
  }

  render() {
    const onClick2 = () => {
      this.setState({
        src: `${this.props.src}?${(Math.random())}`,
      })
    }

    return (
      <Tooltip title={this.state.tips} onClick={onClick2} style={{pull: 'right'}}>
        <img src={this.state.src} alt={this.state.alt}
             className={styles.registerCaptcha}/>
      </Tooltip>
    )
  }
}

import React, { PureComponent } from 'react'
import { access } from '../../services/oauth'
import router from 'umi/router'
import { Spin } from 'antd'

export default class CallbackPage extends PureComponent {
  componentDidMount() {
    access(this.props.location.search)
      .then(() => {
        if (null !== sessionStorage.getItem('hrefSavedBeforeLogin')) {
          window.location = sessionStorage.getItem('hrefSavedBeforeLogin')
          sessionStorage.removeItem('hrefSavedBeforeLogin')
          return
        }
        router.push('/')
      })
  }

  render() {
    return (
      <div style={ { textAlign: 'center' } }><Spin/></div>
    )
  }
}

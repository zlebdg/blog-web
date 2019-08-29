import React, { PureComponent } from 'react'
import { access } from '../../services/oauth'
import router from 'umi/router'

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
      <div style={ { textAlign: 'center' } }>loading..</div>
    )
  }
}

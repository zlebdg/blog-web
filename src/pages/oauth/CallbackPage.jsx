import React, { PureComponent } from 'react'

const currentUser = () => {
  fetch('/auth/currentUser', {
    credentials: 'include',
  })
    .then(resp2 => {
      return resp2.text()
    })
    .then(resp2 => {
      console.log(resp2)
      window.alert(resp2)
    })
}

export default class CallbackPage extends PureComponent {
  componentDidMount() {
    if (null == sessionStorage.getItem('oauthCallback')) {
      fetch(`/login${this.props.location.search}`, {
        credentials: 'include',
      })
        .then(resp => {
          return resp.text()
        })
        .then(resp => {
          console.log(resp)

          currentUser()
        })
        .catch(error => {
          console.log(error)

          currentUser()
        })
    }
  }

  render() {
    return (
      <></>
    )
  }
}

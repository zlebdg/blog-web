import React from 'react'

class Index extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        路由参数: {this.props.match.params.username}
      </div>
    )
  }
}

export default Index

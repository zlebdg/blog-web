import React from 'react'
import { Col, Row } from 'antd'

class Index extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Row justify="space-around" type="flex">
          <Col lg={18} sm={24}>
            路由参数: {this.props.match.params.username}
            {children}
          </Col>
        </Row>
      </div>
    )
  }
}

export default Index

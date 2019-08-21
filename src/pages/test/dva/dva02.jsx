import React, { Component } from 'react'
import { Button, Col, Row } from 'antd'
import { connect } from 'dva'

class Index extends Component {
  render() {
    const { aa } = this.props
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        dva02 测试
        <Row>
          <Col>
            <Button type="primary">按钮0</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => {
  return state.dva02
})(Index)

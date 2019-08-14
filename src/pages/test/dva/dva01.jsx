import React, { Component } from 'react'
import { Button, Col, Row } from 'antd'
import { connect } from 'dva'

@connect(
  (state) => {
    console.log(state)
    return state.dva01
  },
)
export default class Index extends Component {
  render() {
    const { aa } = this.props
    console.log(this.props)
    console.log(aa)
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        dva01 测试
        <Row>
          <Col>
            <Button type="primary">按钮0</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

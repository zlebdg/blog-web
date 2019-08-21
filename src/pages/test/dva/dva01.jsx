import React, { Component } from 'react'
import { Button, Col, Row } from 'antd'
import { connect } from 'dva'

@connect(
  (state) => {
    return state.dva01
  },
)
export default class Index extends Component {
  handleClick = () => {
    this.props.dispatch({ type: 'dva01/_query' })
    this.props.dispatch({ type: 'dva01/post_' })
    this.props.dispatch({ type: 'dva01/query' })
  }

  render() {
    const { aa } = this.props
    return (
      <div
        style={ {
          textAlign: 'center',
        } }
      >
        dva01 测试
        <Row>
          aa: { this.props.aa }
          <hr/>
          count: { this.props.count }
          <hr/>
          <Col>
            <Button type="primary"
                    onClick={ this.handleClick }>按钮0</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

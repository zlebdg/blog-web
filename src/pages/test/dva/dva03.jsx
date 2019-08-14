import React, { Component } from 'react'
import { Button, Col, Row } from 'antd'
import { connect } from 'dva'

@connect(({ dva03, loading }) =>
  ({
    ...dva03,
    loading,
  }),
)
export default class Index extends Component {
  handleClick = () => {
    this.props.dispatch({ type: 'dva03/_query' })
  }

  render() {
    const { aa } = this.props
    console.log(this.props)
    return (
      <div
        style={ {
          textAlign: 'center',
        } }
      >
        dva03 测试
        <Row>
          aa: { this.props.aa }
          <hr/>
          count: { this.props.count }
          <hr/>
          <Col>
            <Button type="primary" loading={ this.props.loading.effects['dva03/_query'] }
                    onClick={ this.handleClick }>按钮0</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

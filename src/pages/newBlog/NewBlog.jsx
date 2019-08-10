import React from 'react'
import { Col, Row } from 'antd'

class NewBlog extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Row justify="space-around" type="flex">
          <Col>
            路由参数: { this.props.match.params.username }
            { children }
          </Col>
        </Row>
      </div>
    )
  }
}

export default NewBlog

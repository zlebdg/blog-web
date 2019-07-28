import React, { PureComponent } from 'react'
import { Button, Form, Result } from 'antd'
import { formatMessage, FormattedMessage } from 'umi/locale'

@Form.create()
class Index extends PureComponent {
  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Result
        status="warning"
        title={formatMessage({ id: 'user.reset.wait.title' })}
        subTitle={formatMessage({ id: 'user.reset.wait.subTitle' })}
        extra={[
          <Button key={'ok'} type='primary'>
            <FormattedMessage id="user.reset.wait.ok"></FormattedMessage>
          </Button>,
        ]}
      />
    )
  }
}

export default Index

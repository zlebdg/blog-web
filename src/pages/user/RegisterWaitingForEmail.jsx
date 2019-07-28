import React, { PureComponent } from 'react'
import { Button, Form, message, Result } from 'antd'
import { resendEmail } from '../../services/userRegister'
import Link from 'umi/link'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'

const resend = () => {
  const username = sessionStorage.getItem('register.username')
  const email = sessionStorage.getItem('register.email')

  if (null === username || null === email) {
    message.error('非法的请求')
    console.log('需要在注册请求时将username, email写入sessionStorage')
    return
  }

  resendEmail(username, email)
    .then(resp => {
      console.log(resp)

      if (null != resp && 200 === resp.code) {
        message.success('邮件已经发送')
      }
    })
}

@Form.create()
class Index extends PureComponent {
  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Result
        status="warning"
        title={formatMessage({ id: 'user.register.wait.title' })}
        subTitle={formatMessage({ id: 'user.register.wait.subTitle' })}
        extra={[
          <Button key={'login'}>
            <Link to="/user/login">
              <FormattedMessage id="user.register.wait.signIn"></FormattedMessage>&gt;&gt;
            </Link>
          </Button>,
          <Button key={'resend'} type='primary' onClick={resend}>
            <FormattedMessage id="user.register.wait.resend"></FormattedMessage>
          </Button>,
        ]}
      />
    )
  }
}

export default Index

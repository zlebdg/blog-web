import React, { PureComponent } from 'react'
import { Button, Form, message, Result } from 'antd'
import { resendEmail } from '../../services/userRegister'
import Link from 'umi/link'

const resend = () => {
  const username = sessionStorage.getItem('register.username')
  const email = sessionStorage.getItem('register.email')

  if (null === username || null === email) {
    message.error('非法的请求')
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
        title="请查收新邮件完成注册"
        subTitle="验证邮件已发送, 但有可能被归类到垃圾邮件或被拒收, 需要你添加@xjplus.xyz为域名白名单"
        extra={[
          <Button>
            <Link to="/user/login">
              去登录&gt;&gt;
            </Link>
          </Button>,
          <Button type='primary' onClick={resend}> 重发邮件 </Button>,
        ]}
      />
    )
  }
}

export default Index

import React, { PureComponent } from 'react'
import { Button, Col, Form, Icon, Input, Row, Steps } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import styles from './login.less'

@Form.create()
class Index extends PureComponent {
  handleOk = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
        if (!err) {
          // call 一致性校验
          this.props.form.validateFields(['passwordRepeat'], { force: true })

          // 校验通过
          console.log('Received values of form: ', values)
        }
      },
    )
  }

  // 一致性校验
  compareTwoPassword = (rule, value, callback) => {
    const password = this.props.form.getFieldValue('password')
    const passwordRepeat = this.props.form.getFieldValue('passwordRepeat')
    if (password !== passwordRepeat) {
      callback('两次密码不一致')
    } else {
      callback()
    }
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Row justify="space-around" type="flex">
        <Col xs={16} sm={12} md={8} lg={6} xl={4}>
          <h3>设置登录密码</h3>
          <Form>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'user.register.verify.password.errorMessage' }),
                  },
                ],
              })(
                <Input.Password
                  name="password"
                  type="password"
                  autoComplete="false"
                  allowClear
                  suffix={<Icon type="eye-invisible" style={{ opacity: 0.5 }}/>}
                  onPressEnter={this.handleOk}
                  placeholder={formatMessage({ id: 'user.register.verify.password' })}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('passwordRepeat', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'user.register.verify.password.repeat.errorMessage' }),
                  },
                  {
                    validator: this.compareTwoPassword,
                  },
                ],
              })(
                <Input.Password
                  name="passwordRepeat"
                  type="password"
                  autoComplete="false"
                  allowClear
                  suffix={<Icon type="eye-invisible" style={{ opacity: 0.5 }}/>}
                  onPressEnter={this.handleOk}
                  placeholder={formatMessage({ id: 'user.register.verify.password.repeat' })}
                />,
              )}
            </Form.Item>
            <Row>
              <Button type="primary" className={styles.button} onClick={this.handleOk}>
                {<FormattedMessage id={'user.login.signIn'}></FormattedMessage>}
              </Button>
            </Row>
          </Form>

          <div style={{ margin: '1em 0' }}>
            <Steps size="small" current={2} direction="vertical">
              <Steps.Step title="填写信息"/>
              <Steps.Step title="邮箱验证"/>
              <Steps.Step title="设置密码"/>
              <Steps.Step title="注册完成"/>
            </Steps>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Index

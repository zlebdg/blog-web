import { Button, Checkbox, Form, Icon, Input } from 'antd'
import { FormattedMessage } from 'umi-plugin-react/locale'
import React, { Component } from 'react'
import Link from 'umi/link'
import styles from './style.less'
import loginStyles from './login.less'

class PAGE_NAME_UPPER_CAMEL_CASE extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render(): any {
    const {getFieldDecorator} = this.props.form

    return (
      <div className={styles.main}><Form onSubmit={this.handleSubmit} className={loginStyles.loginForm}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className={loginStyles.loginFormForgot} href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className={loginStyles.loginFormButton}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
        <div className={styles.other}>
          <FormattedMessage id="BLOCK_NAME.login.sign-in-with"/>
          <Icon type="alipay-circle" className={styles.icon} theme="outlined"/>
          <Icon type="github" className={styles.icon} theme="outlined"/>
          <Link className={styles.register} to="/user/register">
            <FormattedMessage id="BLOCK_NAME.login.signup"/>
          </Link>
        </div>
      </div>
    )
  }
}

// 不是直接export当前组件
const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(PAGE_NAME_UPPER_CAMEL_CASE)

export default WrappedNormalLoginForm


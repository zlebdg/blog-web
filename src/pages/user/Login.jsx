import React, { PureComponent } from 'react'
import { Button, Col, Form, Icon, Input, message, Row } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import styles from './login.less'
import { currentUser, userLogin } from '../../services/userLogin'
import Link from 'umi/link'
import router from 'umi/router'
import { reloadAuthorized } from '../../utils/Authorized.js'


@Form.create()
class Login extends PureComponent {
  componentDidMount() {
    if (null == sessionStorage.getItem('autoLogin')) {
      currentUser()
        .then(resp => {
          console.log(resp)
          if (null != resp && 200 == resp.code) {
            const user = JSON.parse(resp.data)
            if (user.authenticated && user.username !== 'anonymousUser') {
              sessionStorage.setItem('currentUser', resp.data)
              setTimeout(function () {
                message.success(formatMessage({ id: 'Auto Login Success' }))
                sessionStorage.setItem('autoLogin', 1)

                // 设置umi菜单权限
                console.log(JSON.stringify(user.authorities))
                sessionStorage.setItem('antd-pro-authority', JSON.stringify(user.authorities))
                reloadAuthorized() // 重新读取授权信息
                router.push('/welcome')
              }, 200)
            }
          }
        })
        .catch(error => {
          message.error(formatMessage({ id: 'Bad credentials' }))
        })
    }
  }

  handleOk = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)

        // spring security 后台实现只会返回重定向响应头, 这里暂时兼容一下
        // 后台已修改, 针对 Accept: application/json 的 form表单登录请求返回json
        userLogin(values.username, values.password)
          .then(resp => {
            // console.log(resp)
            if (null != resp && 200 == resp.code) {
              const user = JSON.parse(resp.data)
              if (user.authenticated && user.username !== 'anonymousUser') {
                sessionStorage.setItem('currentUser', resp.data)
                message.success(formatMessage({ id: 'Login Success' }))

                // 设置umi菜单权限
                sessionStorage.setItem('antd-pro-authority', JSON.stringify(user.authorities))
                reloadAuthorized() // 重新读取授权信息
                router.push('/welcome')
              }
            }
          })
      }
    })
  }

  oauth = (app) => {
   window.location = `/oauth/login/${app}`
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Row justify="space-around" type="flex" className={styles.main}>
        <Col xs={16} sm={12} md={8} lg={6} xl={4}>
          <Form>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'user.login.usernameOrEmail.errorMessage' }),
                  },
                ],
              })(
                <Input
                  name="username"
                  suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                  onPressEnter={this.handleOk}
                  placeholder={formatMessage({ id: 'user.login.usernameOrEmail' })}
                />,
              )}

              {/*邮箱后缀补全*/}
              {/*<AutoComplete*/}
              {/*  dataSource={this.state.emailSuffix}*/}
              {/*  onChange={this.handleChange}*/}
              {/*  placeholder={formatMessage({id: 'user.login.username'})}*/}
              {/*/>*/}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'user.login.password.errorMessage' }),
                  },
                ],
              })(
                <Input.Password
                  type="password"
                  autoComplete="false"
                  allowClear
                  suffix={<Icon type="eye-invisible" style={{ opacity: 0.5 }}/>}
                  onPressEnter={this.handleOk}
                  placeholder={formatMessage({ id: 'user.login.password' })}
                />,
              )}
            </Form.Item>
            <Row>
              <Button type="primary" className={styles.button} onClick={this.handleOk}>
                {<FormattedMessage id={'user.login.signIn'}></FormattedMessage>}
              </Button>

              {/*/!*文字左对齐*!/*/}
              {/*<Row justify="space-between">*/}
              {/*  <Col span={12}>*/}
              {/*    <Text>*/}
              {/*      {<FormattedMessage id={'user.login.Username'}></FormattedMessage>}: guest*/}
              {/*    </Text>*/}
              {/*  </Col>*/}
              {/*  <Col span={12}>*/}
              {/*    <Text justify="end">*/}
              {/*      {<FormattedMessage id={'user.login.Password'}></FormattedMessage>}: guest*/}
              {/*    </Text>*/}
              {/*  </Col>*/}
              {/*</Row>*/}

            </Row>
            <Row>
              <Col span={12} style={{
                textAlign: 'left',
              }}>
                <Link to="/user/reset">
                  <Button type="link" style={{ padding: '0' }}>
                    <FormattedMessage id={'user.register.forgetPassword'}/>
                  </Button>
                </Link>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Link to="/user/register">
                  <Button type="link" style={{ padding: '0' }}>
                    {/*&lt;&lt;<FormattedMessage id={'user.register.toLogin'}/>*/}
                    <FormattedMessage id={'user.login.toRegister'}/>&gt;&gt;
                  </Button>
                </Link>
              </Col>
            </Row>
            {/*文字两端对齐*/}
            <Row justify="space-between" type="flex">
                  <span>
                    {<FormattedMessage id={'user.login.username.forTest'}></FormattedMessage>}: test
                  </span>
              <span>
                    {<FormattedMessage id={'user.login.Password'}></FormattedMessage>}: 123456
                  </span>
            </Row>
            <div className={styles.other}>
              <FormattedMessage id="user.login.oauth"/>
              <Icon key="oauth.github" type="github" className={styles.icon} theme="outlined"
                    onClick={this.oauth.bind(this, 'github')}/>
              <Icon key="oauth.alipay" type="alipay-circle" className={styles.icon} theme="outlined"
                    onClick={this.oauth.bind(this, 'alipay')}/>
            </div>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default Login

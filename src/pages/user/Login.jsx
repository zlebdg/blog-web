import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Icon, Input, message, Row } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import styles from './login.less'
import { connect } from 'dva'
import { userLogin } from '../../services/userLogin'
import Link from 'umi/link'
import router from 'umi/router'

const namespace = 'userLogin'

@Form.create()
@connect(
  state => {
    return {
      username: state[namespace].username,
      message: state[namespace].message,
    }
  },
  dispatch => {
    return {
      userLogin: () => {
        message.info('userLogin request')
        dispatch({
          type: namespace + '/userLogin',
        })
      },
    }
  },
)
class Login extends PureComponent {
  // state = {
  //   emailSuffix: [],
  // }

  // handleChange = (value) => {
  //   this.setState({
  //     emailSuffix:
  //       !value || value.indexOf('@') >= 0
  //         ? []
  //         : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`, `${value}@live.cn`],
  //   })
  // }

  handleOk = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)

          // 原生fetch
          // fetch('/api/currentUser').then(r => {
          //   return r.text()
          // }).then(text => {
          //   message.success(text)
          // })

          // 路由切换
          // router.push('/')

          // umi request
          // this.props.userLogin()

          // 封装的请求
          userLogin(values.username, values.password)
            .then(resp => {
                // {"code":200,"message":"OK","data":{"authorities":[{"authority":"ROLE_test"}],"details":null,"authenticated":true,"principal":{"password":null,"username":"test","authorities":[{"authority":"ROLE_test"}],"accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true,"enabled":true},"credentials":null,"name":"test"}}
                console.log(resp)
                if (null != resp && 200 === resp.code) {
                  sessionStorage.setItem('CURRENT_USER', JSON.stringify(resp.data))
                  message.success('登录成功')
                  router.push('/')
                }
              },
            )
        }
      },
    )
  }

  render() {
    const { loading, form, dispatch } = this.props
    const { getFieldDecorator } = form

    return (
      <Row justify="space-around" type="flex">
        <Col xs={16} sm={12} md={8} lg={6} xl={4}>
          <Form>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'user.login.username.errorMessage' }),
                  },
                ],
              })(
                <Input
                  name="username"
                  suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                  onPressEnter={this.handleOk}
                  placeholder={formatMessage({ id: 'user.login.username' })}
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
          </Form>
        </Col>
      </Row>
    )
  }
}

Login.propTypes = {
  props: PropTypes.any,
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login

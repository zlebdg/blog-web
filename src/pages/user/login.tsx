import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Icon, Input, message, Row } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import styles from './login.less'
import { router } from 'umi'

@Form.create()
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

  handleOk = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        message.success('ok')

        // 路由切换
        router.push('/')
      }
    })
  }

  render() {
    const {loading, form, dispatch} = this.props
    const {getFieldDecorator} = form

    return (
      <Row justify="center" type="flex">
        <Col xs={24} sm={24} md={8} lg={6}>
          <Fragment>
            <Form>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({id: 'user.login.username.errorMessage'}),
                    },
                  ],
                })(
                  <Input
                    name="username"
                    suffix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    onPressEnter={this.handleOk}
                    placeholder={formatMessage({id: 'user.login.username'})}
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
                      message: formatMessage({id: 'user.login.password.errorMessage'}),
                    },
                  ],
                })(
                  <Input.Password
                    type="password"
                    autoComplete="false"
                    allowClear
                    suffix={<Icon type="eye-invisible" style={{opacity: 0.5}}/>}
                    onPressEnter={this.handleOk}
                    placeholder={formatMessage({id: 'user.login.password'})}
                  />,
                )}
              </Form.Item>
              <Row>
                <Button
                  type="primary"
                  className={styles.button}
                  onClick={this.handleOk}
                >
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

                {/*文字两端对齐*/}
                <Row justify="space-between" type="flex">
                  <span>
                    {<FormattedMessage id={'user.login.Username'}></FormattedMessage>}: guest
                  </span>
                  <span>
                    {<FormattedMessage id={'user.login.Password'}></FormattedMessage>}: guest
                  </span>
                </Row>
              </Row>
            </Form>
          </Fragment>
        </Col>
      </Row>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login

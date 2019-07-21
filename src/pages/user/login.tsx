import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Icon, Input, message, Row } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import styles from './login.less'


@Form.create()
class Login extends PureComponent {
  handleOk = (e) => {
    e.preventDefault()
    message.success('ok')
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
                <Input
                  name="username"
                  suffix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  onPressEnter={this.handleOk}
                  placeholder={formatMessage({id: 'user.login.username'})}
                />
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ],
                })(
                  <Input
                    type="password"
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

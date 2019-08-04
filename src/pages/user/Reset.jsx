import React, { PureComponent } from 'react'
import { Button, Col, Form, Icon, Input, Row } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import styles from './styles.less'
import AppCaptcha from '../../components/Img/AppCaptcha'
import { reset } from '../../services/userReset'
import Link from 'umi/link'
import router from 'umi/router'

@Form.create()
class Index extends PureComponent {
  state = {
    captcha: '/captcha',
  }

  handleOk = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const username = values.usernameOrEmail.indexOf('@') >= 0 ? null : values.usernameOrEmail
        const email = values.usernameOrEmail.indexOf('@') >= 0 ? values.usernameOrEmail : null
        reset(username, email, values.captcha)
          .then(resp => {
            console.log(resp)
            if (null != resp && 200 === resp.code) {
              router.push('/blank/user/reset/waitingForEmail')
            } else {
              this.setState({
                captcha: `/captcha?${(Math.random())}`,
              })
            }
          })
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Row justify="space-around" type="flex" className={styles.main}>
        <Col xs={16} sm={12} md={8} lg={6} xl={4}>
          <Form>
            <Form.Item>
              {getFieldDecorator('usernameOrEmail', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'user.reset.usernameOrEmail.errorMessage' }),
                  },
                ],
              })(
                <Input
                  name="usernameOrEmail"
                  suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                  onPressEnter={this.handleOk}
                  placeholder={formatMessage({ id: 'user.reset.usernameOrEmail' })}
                />,
              )}

            </Form.Item>
            <Row type="flex" justify="space-between">
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('captcha', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'user.register.captcha.errorMessage' }),
                      },
                    ],
                  })(
                    <Input
                      name="captcha"
                      suffix={<Icon type="safety-certificate"
                                    style={{ color: 'rgba(0,0,0,.25)' }}/>}
                      placeholder={formatMessage({ id: 'user.register.captcha' })}
                      autoComplete="off"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={10} span={8}>
                <AppCaptcha src={this.state.captcha}
                            alt={formatMessage({ id: 'user.register.captcha.alt' })}
                            tips={formatMessage({ id: 'user.register.captcha.tips' })}/>
              </Col>
            </Row>
            <Row>
              <Button type="primary" className={styles.button} onClick={this.handleOk}>
                {<FormattedMessage id={'user.reset.ok'}></FormattedMessage>}
              </Button>
            </Row>
            <Row>
              <Col span={12} style={{
                textAlign: 'left',
              }}>
                <Link to="/user/register">
                  <Button type="link" style={{ padding: '0' }}>
                    <FormattedMessage id={'user.reset.toRegister'}/>
                  </Button>
                </Link>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Link to="/user/login">
                  <Button type="link" style={{ padding: '0' }}>
                    <FormattedMessage id={'user.reset.toLogin'}/>&gt;&gt;
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default Index

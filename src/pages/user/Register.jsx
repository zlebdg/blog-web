import React, { PureComponent } from 'react'
import { AutoComplete, Button, Col, Form, Icon, Input, Row } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import styles from './styles.less'
import AppCaptcha from '../../components/Img/AppCaptcha'
import { register } from '../../services/userRegister'
import Link from 'umi/link'
import router from 'umi/router'

const namespace = 'userRegister'

@Form.create()
class Index extends PureComponent {
  state = {
    emailSuffix: [],
    captcha: '/captcha',
  }

  handleEmail = (value) => {
    this.setState({
      emailSuffix:
        !value || value.indexOf('@') >= 0
          ? []
          : [`${value}@qq.com`, `${value}@163.com`, `${value}@gmail.com`, `${value}@live.cn`],
    })
  }

  handleOk = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)

        //
        sessionStorage.setItem('register.username', values.username)
        sessionStorage.setItem('register.email', values.email)

        //
        register(values.username, values.email, values.captcha)
          .then(resp => {
            console.log(resp)
            if (null != resp && 200 === resp.code) {
              router.push('/blank/user/register/waitingForEmail')
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
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'user.register.username.errorMessage' }),
                  },
                ],
              })(
                <Input
                  name="username"
                  suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                  onPressEnter={this.handleOk}
                  placeholder={formatMessage({ id: 'user.register.username' })}
                />,
              )}

            </Form.Item>
            {/*邮箱后缀补全*/}
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'user.register.email.errorMessage' }),
                  },
                ],
              })(
                <AutoComplete
                  name="email"
                  dataSource={this.state.emailSuffix}
                  onChange={this.handleEmail}
                  placeholder={formatMessage({ id: 'user.register.email' })}>
                  <Input suffix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
                </AutoComplete>,
              )}
            </Form.Item>
            <Form.Item>
              <Row type="flex" justify="space-between">
                <Col span={12}>
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
                </Col>
                <Col xs={10} span={8}>
                  <AppCaptcha src={this.state.captcha}
                              alt={formatMessage({ id: 'user.register.captcha.alt' })}
                              tips={formatMessage({ id: 'user.register.captcha.tips' })}/>
                </Col>
              </Row>
            </Form.Item>
            <Row>
              <Button type="primary" className={styles.button} onClick={this.handleOk}>
                {<FormattedMessage id={'user.Register'}></FormattedMessage>}
              </Button>
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
                <Link to="/user/login">
                  <Button type="link" style={{ padding: '0' }}>
                    {/*&lt;&lt;<FormattedMessage id={'user.register.toLogin'}/>*/}
                    <FormattedMessage id={'user.register.toLogin'}/>&gt;&gt;
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

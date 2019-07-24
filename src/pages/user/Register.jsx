import React, { PureComponent } from 'react'
import { AutoComplete, Button, Col, Form, Icon, Input, message, Row } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import styles from './login.less'
import RegisterCaptcha from '../../components/Img/RegisterCaptcha'
import register from '../../services/userRegister'

const namespace = 'userRegister'

@Form.create()
class Index extends PureComponent {
  state = {
    emailSuffix: [],
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
        register(values.username, values.email, values.captcha)
          .then(resp => {
            console.log(resp)
            if (resp && 200 === resp.code) {
              message.success(formatMessage({id: '注册成功! 请检查你的邮箱并完成验证'}))
            } else {
              // todo, i18n
              // message.error(formatMessage({id: resp.message}))
              message.error(resp.message)
            }
          })
      }
    })
  }

  render() {
    const {form} = this.props
    const {getFieldDecorator} = form

    return (
      <Row justify="space-around" type="flex">
        <Col xs={16} sm={12} md={8} lg={6} xl={4}>
          <Form>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'user.register.username.errorMessage'}),
                  },
                ],
              })(
                <Input
                  name="username"
                  suffix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  onPressEnter={this.handleOk}
                  placeholder={formatMessage({id: 'user.register.username'})}
                />,
              )}

            </Form.Item>
            {/*邮箱后缀补全*/}
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'user.register.email.errorMessage'}),
                  },
                ],
              })(
                <AutoComplete
                  name="email"
                  dataSource={this.state.emailSuffix}
                  onChange={this.handleEmail}
                  placeholder={formatMessage({id: 'user.register.email'})}>
                  <Input suffix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                </AutoComplete>,
              )}
            </Form.Item>
            <Row type="flex" justify="space-between">
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('captcha', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({id: 'user.register.captcha.errorMessage'}),
                      },
                    ],
                  })(
                    <Input
                      name="captcha"
                      suffix={<Icon type="safety-certificate" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      placeholder={formatMessage({id: 'user.register.captcha'})}
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={10} span={8}>
                <RegisterCaptcha src="http://192.168.124.95:20010/captcha"
                                 alt={formatMessage({id: 'user.register.captcha.alt'})}
                                 tips={formatMessage({id: 'user.register.captcha.tips'})}/>
              </Col>
            </Row>
            <Row>
              <Button type="primary" className={styles.button} onClick={this.handleOk}>
                {<FormattedMessage id={'user.Register'}></FormattedMessage>}
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default Index

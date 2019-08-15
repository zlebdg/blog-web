import React, { Component } from 'react'
import { Button, Col, Row } from 'antd'
import { connect } from 'dva'

@connect(
  (state) => {
    console.log(state)
    return {
      state: {
        settings: state.settings,
        menu: state.settings,
      },
    }
  },
)
export default class Index extends Component {
  handleClick = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        layout: 'sidemenu',
      },
    })
  }

  sidemenu = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        layout: 'sidemenu',
      },
    })
  }

  topmenu = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        layout: 'topmenu',
      },
    })
  }

  Fixed = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        contentWidth: 'Fixed',
      },
    })
  }

  Fluid = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        contentWidth: 'Fluid',
      },
    })
  }

  light = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        navTheme: 'light',
      },
    })
  }

  薄暮 = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        primaryColor: '#F5222D',
      },
    })
  }

  火山 = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        primaryColor: '#FA541C',
      },
    })
  }

  日暮 = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        primaryColor: '#FAAD14',
      },
    })
  }

  明青 = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        primaryColor: '#13C2C2',
      },
    })
  }

  极光绿 = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        primaryColor: '#52C41A',
      },
    })
  }

  拂晓蓝 = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        primaryColor: '#722ED1',
      },
    })
  }

  极客蓝 = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        primaryColor: '#2F54EB',
      },
    })
  }

  酱紫 = () => {
    this.props.dispatch({
      type: 'settings/changeSetting',
      payload: {
        primaryColor: '#722ED1',
      },
    })
  }

  render() {
    const { aa } = this.props
    console.log(this.props)
    return (
      <div>
        切换主题 测试
        <Row>
          <Col>
            <hr/>
            <Button onClick={this.sidemenu}>sidemenu</Button>
            <Button onClick={this.topmenu}>topmenu</Button>
            <hr/>
            <Button onClick={this.Fixed}>Fixed</Button>
            <Button onClick={this.Fluid}>Fluid</Button>
            <hr/>
            <Button onClick={this.light}>light</Button>
            <Button onClick={this.dark}>dark</Button>
            <hr/>

            <Button style={{ backgroundColor: 'rgb(245, 34, 45)' }} onClick={this.薄暮}></Button>
            <Button style={{ backgroundColor: 'rgb(250, 84, 28)' }} onClick={this.火山}></Button>
            <Button style={{ backgroundColor: 'rgb(250, 173, 20)' }} onClick={this.日暮}></Button>
            <Button style={{ backgroundColor: 'rgb(19, 194, 194)' }} onClick={this.明青}></Button>
            <Button style={{ backgroundColor: 'rgb(82, 196, 18)' }} onClick={this.极光绿}></Button>
            <Button style={{ backgroundColor: 'rgb(24, 144, 255)' }} onClick={this.拂晓蓝}></Button>
            <Button style={{ backgroundColor: 'rgb(47, 84, 235)' }} onClick={this.极客蓝}></Button>
            <Button style={{ backgroundColor: 'rgb(114, 46, 209)' }} onClick={this.酱紫}></Button>
            <hr/>
          </Col>
        </Row>
      </div>
    )
  }
}

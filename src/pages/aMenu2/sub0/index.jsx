import React from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { BackTop, Breadcrumb, Button, Dropdown, Icon, Menu, Pagination, Steps, Table } from 'antd'

// 使用已有项目的url创建iconfont图标
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

const handleMenuClick = (e) => {
  console.log('click', e)
}

const popMenu = (<Menu>
  <Menu.Item>
    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
      1st menu item
    </a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
      2nd menu item
    </a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
      3rd menu item
    </a>
  </Menu.Item>
</Menu>)

const itemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>
  }
  if (type === 'next') {
    return <a>Next</a>
  }
  return originalElement
}

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]

export default () => (
  <PageHeaderWrapper title={false}>
    <p
      style={{
        textAlign: 'center',
      }}
    >
      aMenu2 ^-^ sub0 ^-^ 没有标题
    </p>
    <div>图标:</div>
    <div className="icons-list">
      <Icon type="step-backward"/>
      <Icon type="home"/>
      <Icon type="setting" theme="filled"/>
      <Icon type="smile" theme="outlined"/>
      <Icon type="sync" spin/>
      <Icon type="smile" rotate={180}/>
      <Icon type="loading"/>
      <IconFont type="icon-tuichu"/>
      <IconFont type="icon-facebook"/>
      <IconFont type="icon-twitter"/>
    </div>
    <div>按钮:</div>
    <div>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
      <Button type="link">Link</Button>
    </div>
    <Button type="primary" block>
      Primary
    </Button>
    <Button block>Default</Button>
    <Button type="dashed" block>
      Dashed
    </Button>
    <Button type="danger" block>
      Danger
    </Button>
    <Button type="link" block>
      Link
    </Button>
    <div>按钮组:</div>
    <Button.Group>
      <Button>左</Button>
      <Button>中</Button>
      <Button>右</Button>
    </Button.Group>
    <div>
      <Button type="primary">primary</Button>
      <Button>secondary</Button>
      <Dropdown overlay={<Menu onClick={handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>}>
        <Button>
          Actions <Icon type="down"/>
        </Button>
      </Dropdown>
    </div>
    <div>弹出菜单:</div>
    <div>
      <Dropdown overlay={popMenu} placement="bottomLeft">
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown overlay={popMenu} placement="bottomCenter">
        <Button>bottomCenter</Button>
      </Dropdown>
      <Dropdown overlay={popMenu} placement="bottomRight">
        <Button>bottomRight</Button>
      </Dropdown>
      <br/>
      <Dropdown overlay={popMenu} placement="topLeft">
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown overlay={popMenu} placement="topCenter">
        <Button>topCenter</Button>
      </Dropdown>
      <Dropdown overlay={popMenu} placement="topRight">
        <Button>topRight</Button>
      </Dropdown>
    </div>
    <div>分页:</div>
    <Pagination defaultCurrent={1} total={50}/>
    <Pagination defaultCurrent={11} total={150}/>
    <Pagination total={500} itemRender={itemRender}/>
    <div>面包屑:</div>
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a>Application Center</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a>Application List</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
    <div>表格:</div>
    <div>
      <Table dataSource={dataSource} columns={columns}/>
    </div>
    <div>步骤条:</div>
    <Steps current={1}>
      <Steps.Step title="Finished" description="This is a description."/>
      <Steps.Step title="In Progress" description="This is a description."/>
      <Steps.Step title="Waiting" description="This is a description."/>
    </Steps>
    <Steps direction="vertical" size="small" current={1}>
      <Steps.Step title="Finished" description="This is a description."/>
      <Steps.Step title="In Progress" description="This is a description."/>
      <Steps.Step title="Waiting" description="This is a description."/>
    </Steps>
    <BackTop/>
  </PageHeaderWrapper>
);

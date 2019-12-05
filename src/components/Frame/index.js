import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

import './frame.less'
import logo from './uugai.com_1575269312218.png'
const { Header, Content, Sider } = Layout

// 使用withRouter来获取路由信息
@withRouter
class Frame extends Component {
  // 使用箭头函数时无需手动用bind改变this指向
  onMenuClick = ({ key }) => {
    // 使用push方法来进行跳转
    this.props.history.push(key)
  }

  render() {
    const selectedKeysArr = this.props.location.pathname.split('/')
    // 小技巧 截取数组时可以用length 不用slice也可以
    selectedKeysArr.length = 3
    console.log(selectedKeysArr)
    return (
      <Layout style={{minHeight: '100%'}}>
      <Header className="header ad-header">
        <div className="ad-logo">
          <img src={logo} alt="admin"></img>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            // 当前选中的菜单项 key 数组
            selectedKeys={selectedKeysArr.join('/')}
            onClick={this.onMenuClick}
            style={{ height: '100%', borderRight: 0 }}
          >
            {
              this.props.menus.map(item => {
                return (
                  <Menu.Item key={item.pathname}>
                    <Icon type={item.icon}/>
                    {item.title}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: '#fff',
              margin: 0
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>      
    )
  }
}

export default Frame

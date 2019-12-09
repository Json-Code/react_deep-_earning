/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Avatar, Badge } from 'antd'

import { connect } from 'react-redux'
import { getNotifications } from '../../actions/noticfications'
import { logout } from '../../actions/user'

import './frame.less'
import logo from './uugai.com_1575269312218.png'
const { Header, Content, Sider } = Layout

const mapState = state => {
  return {
    notificationsCount: state.noticfications.list.filter(item => item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}
@connect(mapState, { getNotifications, logout })
// 使用withRouter来获取路由信息
@withRouter
class Frame extends Component {
  componentDidMount() {
    this.props.getNotifications()
  }
  // 使用箭头函数时无需手动用bind改变this指向
  onMenuClick = ({ key }) => {
    // 使用push方法来进行跳转
    this.props.history.push(key)
  }

  // 下拉菜单跳转
  onDropdownMenuClick = ({ key }) => {
    if (key === '/login') {
      this.props.logout()
    } else {
      this.props.history.push(key)
    }
  }
  // 生成下拉菜单
  renderDropdown = () => (
    <Menu onClick={this.onDropdownMenuClick}>
      <Menu.Item key='/admin/notifications'>
        <Badge dot={Boolean(this.props.notificationsCount)}>
          <a>
            通知中心
          </a>
        </Badge>
      </Menu.Item>
      <Menu.Item key='/admin/settings'>
        <a>
          个人设置
        </a>
      </Menu.Item>
      <Menu.Item key='/login'>
        <a>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  )

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
        {
          // 右上角下拉菜单
        }
        <div>
          <Dropdown overlay={this.renderDropdown} trigger={['click']}>
            <div style={{display: 'flex',alignItems: 'center'}}>
              <a className="ant-dropdown-link" href="#">
                <Avatar src={this.props.avatar} />
                <span>欢迎你！{this.props.displayName}</span>
                <Badge count={ this.props.notificationsCount } offset={[-10, -10]}>
                  <Icon type="down" />
                </Badge>
              </a>
            </div>
          </Dropdown>        
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

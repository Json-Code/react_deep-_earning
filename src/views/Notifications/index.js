import React, { Component } from 'react'
import { Card, Button, List, Avatar, Badge, Spin } from 'antd'

// 引入connect方便组件可以拿到Provider传入的store
import { connect } from 'react-redux'
// 引入对应的action
import { markNotificationAsReadById, markAllNotificationAsRead } from '../../actions/noticfications'

// 通过props获取store中的list
const mapState = state => {
  const {
    list,
    isLoading
  } = state.noticfications
  return {
    list,
    isLoading
  }
}

@connect(mapState, { markNotificationAsReadById, markAllNotificationAsRead })
class Noticfications extends Component {
  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Spin spinning={this.props.isLoading}>
          <Card 
            title="通知中心" 
            bordered={false}
            extra={
            <Button
              disabled={this.props.list.every(item => item.hasRead !== true)}
              onClick={this.props.markAllNotificationAsRead.bind(this)}>
              全部标记为以读
            </Button>}
          >
            <List
                itemLayout="horizontal"
                dataSource={this.props.list}
                renderItem={item => (
                  <List.Item
                    extra={
                      item.hasRead 
                      ? 
                      null 
                      : 
                      <Button
                        onClick={this.props.markNotificationAsReadById.bind(this, item.id)}>
                        标记为以读
                      </Button>
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      title={<a><Badge dot={!item.hasRead}>{item.title}</Badge></a>}
                      description={item.desc}
                    />
                  </List.Item>
                )}
              />
          </Card>
        </Spin>
      </div>
    )
  }
}
export default Noticfications

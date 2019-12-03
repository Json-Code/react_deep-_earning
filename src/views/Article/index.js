import React, { Component } from 'react'
import { Card, Button, Table, Tag } from 'antd';
import moment from 'moment'

import { getArticles } from '../../requests'

const ButtonGroup = Button.Group

// 定义一个标题map
const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}
export default class List extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10
    }
  }

  // 分页
  onPageChange = (page, pageSize) => {
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    }, () => {
      this.getData()
    })
  }
  onShowSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limited: size
    }, () => {
      this.getData()
    })    
  }

  // 对应标题map
  createColumns = (columnKeys) => {
    const columns = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          keys: item,
          render: (text, record) => {
            // 这里是根据一个数字的大小做一个条件渲染
            // 同理，可以做职位级别不同的颜色
            // 总经理： ‘001’， 经理： ‘002’
            // const titleMap = {
            //   '001': 'red',
            //   '002': 'green'
            // }
            // return <Tag color={titleMap[titleKey]}></Tag>
            return (
              <Tag color={record.amount > 200 ? 'red' : 'green'}>{record.amount}</Tag>
            )
          }
        }
      }
      if (item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          keys: item,
          render: (text, record) => {
            const { createAt } = record
            // 使用moment包格式化时间戳
            return moment(createAt).format('YYYY年MM月DD日 HH:MM:SS')
          }
        }        
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        keys: item
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: () => {
        return (
          <ButtonGroup>
            <Button size='small' type="primary">编辑</Button>
            <Button size='small' type="danger">删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }
  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited)
      .then(resp => {
        // 获取每一行的key
        const columnKeys = Object.keys(resp.list[0])
        const columns = this.createColumns(columnKeys)
        this.setState({
          total: resp.total,
          dataSource: resp.list,
          columns,
        })
      })
      .catch(err => {
        // 处理错误,虽然有错误处理
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }
  componentDidMount() {
    this.getData()
  }
  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card 
          title="文章列表" 
          bordered={false} 
          extra={<Button>导出excel</Button>}
        >
          <Table
            //这里需要绑定record和官方文档上不同
            rowKey={(text, record) => record}
            dataSource={this.state.dataSource} 
            columns={this.state.columns}
            loading={this.state.isLoading}
            pagination={{
              current: this.state.offset / this.state.limited + 1,
              total: this.state.total,
              hideOnSinglePage: true,
              showQuickJumper: true,
              showSizeChanger: true,
              onChange: this.onPageChange,
              onShowSizeChange: this.onShowSizeChange,
              pageSizeOptions: ['10', '15', '20', '30']
            }}
          />
        </Card>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Card, Button, Table, Tag, Modal, Typography, message, Tooltip, Radio} from 'antd';
import moment from 'moment'
import XLSX from 'xlsx'

import { getArticles, deleteArticle } from '../../requests'

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
      limited: 10,
      deleteArticleTitle: '',
      isShowArticleModal: false,
      deleteArticleConfirmLoading: false,
      currentDeleteArticleID: null
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

  // 生成Excel
  toExcel = () => {
    // 在实际项目中，这个功能是前端发送一个ajax请求到后端，然后返回一个文件的下载地址

    // 组合数据 一个二维数组 第一维是表头 第二维是数据
    const data = [Object.keys(this.state.dataSource[0])]
    for (let i = 0; i < this.state.dataSource.length; i++) {
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 HH:mm:ss')
      ])
    }
		/* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(this.state.data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited + 1}-${moment().format('YYYYMMDDHHMMSS')}.xlsx`)    
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
              <Tooltip title="浏览量">
                <Tag color={record.amount > 200 ? 'red' : 'green'}>{record.amount}</Tag>
              </Tooltip>
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
      render: (record) => {
        return (
          <ButtonGroup>
            <Button size='small' type="primary" onClick={this.toEdit.bind(this, record)}>编辑</Button>
            <Button size='small' type="danger" onClick={this.showDeleteArticleModal.bind(this, record)}>删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }

  toEdit = (record) => {
    this.props.history.push({
      pathname: `/admin/article/edit/${record.id}`,
      state: {
        title: record.title
      }
    })
  }

  toCreate = () => {
    this.props.history.push({
      pathname: '/admin/article/edit',
    })    
  }
  // 删除文章
  showDeleteArticleModal (record) {
    //  方法一：使用函数的方式调用，定制化没那么强
    // Modal.confirm({
    //   title: '删除确认',
    //   content: <Typography>确认要删除 <span style={{color: '#f00'}}>{record.title}</span>?</Typography>,
    //   okText: '别墨迹！赶紧删掉！',
    //   cancelText: '我点错了！',
    //   onOk() {
    //     deleteArticle(record.id)
    //       .then(resp => {
    //         console.log(resp)
    //       })
    //   }
    // })

    // 方法二：
    this.setState({
      isShowArticleModal: true,
      deleteArticleTitle: record.title,
      currentDeleteArticleID: record.id
    })
  }
  deleteArticle = () => {
    this.setState({
      deleteArticleConfirmLoading: true
    })
    deleteArticle(this.state.currentDeleteArticleID)
      .then(resp => {
        message.success(resp.msg)
        // 这里沟通的时候有坑，究竟是留在当前页还是到第一页
        // 第一页
        this.setState({
          offset: 0
        }, () => {
          this.getData()
        })
      })
      .finally(() => {
        this.setState({
          deleteArticleConfirmLoading: false,
          isShowArticleModal: false
        })
      })
  }

  // Modal方法
  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticleTitle: '',
      deleteArticleConfirmLoading: false
    })
  }

  // 获取数据
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
          extra={<Radio.Group><Radio.Button onClick={this.toExcel}>导出excel</Radio.Button><Radio.Button onClick={this.toCreate}>新建文章</Radio.Button></Radio.Group>}
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
        <Modal
          title='此操作不可逆，请谨慎'
          visible={this.state.isShowArticleModal}
          onCancel={this.hideDeleteModal}
          confirmLoading={this.state.deleteArticleConfirmLoading}
          onOk={this.deleteArticle}>
            <Typography>确认要删除 <span style={{color: '#f00'}}>{this.state.deleteArticleTitle}</span>?</Typography>
        </Modal>
      </div>
    )
  }
}

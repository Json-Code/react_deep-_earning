import React, { Component, createRef } from 'react'
import { Card, Button, Form, Icon, Input, DatePicker, Spin, message } from 'antd';
import E from 'wangeditor'

import moment from 'moment'

import { getArticleById, saveArticle } from '../../requests/index'

import './edit.less'

@Form.create()
class Edit extends Component {
  constructor () {
    super()
    // 创建ref属性
    this.editorRef = createRef()
    this.state = {
      // spin的loding状态
      isLoading: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // 打印错误信息
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 因为ant的DatePicker传的是一个moment 因此需要重新转成时间戳
        // moment转时间：moment(time).valueOf(); // 1535419062126
        const data = Object.assign({}, values, {
          createAt: values.createAt.valueOf()
        })
        this.setState({
          isLoading: true
        })
        // 发送修改信息请求 此处新建和修改通用一个接口
        saveArticle(this.props.match.params.id, data)
          .then(resp => {
            // 可以在这里处理更多想要处理的逻辑
            message.success(resp.msg)
            // 如果需求是要跳转
            this.props.history.push('/admin/article')
          })
          // 给spin设置为false
          .finally(() => {
            this.setState({
              isLoading: false
            })
          })          
      }
    })
  }

  // 初始化富文本编辑器
  initEditor() {
    // 把E绑定到对应的Ref节点上
    this.editor = new E(this.editorRef.current)
    // editor内容改变时触发
    this.editor.customConfig.onchange = (html) => {
      // html 即变化之后的内容
      // 使用第三方库的时候 需要手动调用setFieldsValue来修改Form中的内容
      this.props.form.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }

  componentDidMount() {
    this.initEditor()
    // 判断是编辑还是新建
    if (this.props.match.params.id) {
      this.setState({
        isLoading: true
      })
      // React 获取 url 参数 —— this.props.match
      getArticleById(this.props.match.params.id)
        .then(resp => {
          // 函数具有不定参数，而在数组解构语法中有一个相似的概念——不定元素。在数组中，可以通过...语法将数组中的其余元素赋值给一个特定的变量
          const { id, ...data } = resp
          data.createAt = moment(data.createAt)
          this.props.form.setFieldsValue(data)
          // 给edit设置原始内容
          this.editor.txt.html(data.content)
        })
        // 给spin设置为false
        .finally(() => {
          this.setState({
            isLoading: false
          })
        })
    }
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card 
          title="编辑文章" 
          bordered={false} 
          extra={<Button onClick={this.props.history.goBack}>取消</Button>}
        >
          <Spin spinning={this.state.isLoading}>
            <Form 
              onSubmit={this.handleSubmit}>
              <Form.Item label="标题">
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your title!',
                    }, {
                      min: 4,
                      message: 'title must greater than 4'
                    }
                  ],
                })(
                <Input 
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)'}}
                  placeholder="Title"/>}
                />)}
              </Form.Item>
              <Form.Item label="作者">
                {getFieldDecorator('author', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your author!',
                    }
                  ],
                })(
                <Input 
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)'}}
                  placeholder="author"/>}
                />)}
              </Form.Item>
              <Form.Item label="阅读量">
                {getFieldDecorator('amount', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your amount!',
                    }
                  ],
                })(
                <Input 
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)'}}
                  placeholder="0"/>}
                />)}
              </Form.Item>
              <Form.Item label="创建时间">
                {getFieldDecorator('createAt', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your createAt!',
                    }
                  ],
                })(
                <DatePicker showTime placeholder="Select Time"/>)}
              </Form.Item>
              <Form.Item label="内容">
                {getFieldDecorator('content', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your content!',
                    }
                  ],
                })(
                // 绑定Ref
                <div className="qf-editor" ref={this.editorRef}></div>)}
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存修改
                  </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    )
  }
}
export default Edit

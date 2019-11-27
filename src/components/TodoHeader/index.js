import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoHeader extends Component {
  // 类组件直接在里面写
  static propTypes = {
    desc: PropTypes.string.isRequired,
    children: PropTypes.isRequired    
  }
  static defaultProps = {
    desc: '我是默认值'
  }
  // 定义state的方式 state是类组件专有的
  // state = {
  //   title: '待办事项列表'
  // }

  constructor() {
    // 在调用this之前必须调用super()
    super()
    this.state = {
      title: '待办事项列表'
    }
  }
  render() {
    return (
      <div>
        <h1>{this.props.children}</h1>
        <h3>{this.props.desc}</h3>
        <p>{this.props.x + this.props.y}</p>
        <p>{this.state.title}</p>
      </div>
    )
  }
}

// 函数组件需要这样写
// TodoHeader.propTypes = {
//   desc: PropTypes.string.isRequired,
//   children: PropTypes.isRequired
// }

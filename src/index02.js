import React, { Component } from 'react'

// 组件中的样式
export default class index01 extends Component {
  render() {
    const style={color: '#F00'}
    return (
      <div>
        <h1>元素中的样式</h1>
        <ol>
          <li style={style}>使用style内联创建</li>
        </ol>
      </div>
    )
  }
}

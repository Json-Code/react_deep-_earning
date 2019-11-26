import React, { Component } from 'react'

// 这里是使用类的方式创建的组件 这是jsx语法 但不是合法的js代码
// class App extends Component {
//   render () {
//     return (
//       <div className="app" id="appRoot">
//         <h1 className="title">jsx原理</h1>
//       </div>
//     )
//   }
// }

// 所以react在真正的渲染的时候会把上面的代码编译为下面这个样子来运行，下面的代码就是合法的js
export default class Index01 extends Component {
  render () {
    return (
      // React.createElemen是一个方法，用于创建参数，可以有很多的参数，但前两个是固定的：
      // 第一个可以理解为标签名
      // 第二个可以理解为标签的属性
      // 剩下的，你就继续写更多的子元素吧
      // React.createElemen(type, [props], [...children])
      React.createElement(
        'div',
        {
          className: 'app',
          id: 'appRoot'
        },
        React.createElement(
          'h1',
          {
            className: 'title'
          },
          'jsx原理'
        )
      )
    )
  }
}

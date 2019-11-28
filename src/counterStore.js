import React, { Component, createContext } from 'react'

// createContext这个方法的结果是一个对象，里面有Provider和Consumer
// Provider用于提供状态
// Consumer用于接收状态
const {
  Provider,
  Consumer: CounterConsumer // 解构处理重新赋值CounterConsumer
} = createContext()

// 封装一个基本的Provider,因为直接使用Provider,不方便管理状态
class CounterProvider extends Component {
  constructor () {
    super()
    // 这里的状态就是共享的，任何CounterProvider的后代组件都可以通过CounterConsumer来接受这个值
    this.state = {
      count: 100
    }
  }

  // 这里的方法也会通过Provider共享下去
  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  decrementCount = () => {
    this.setState({
      count: this.state.count - 1
    })
  }
  render () {
    return (
      // 使用Provider这个组件，它必须要有一个value值，这个value值里可以传递任何的数据。一般还是传递一个对象比较合理
      <Provider value={{
        count: this.state.count,
        onIncrementCount: this.incrementCount,
        onDecrementCount: this.decrementCount
      }}>
        {this.props.children}
      </Provider>
    )
  }
}

export {
  CounterProvider,
  CounterConsumer
}

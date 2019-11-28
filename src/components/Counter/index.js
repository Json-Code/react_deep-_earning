import React, { Component } from 'react'
import { CounterConsumer } from '../../counterStore'

export default class Counter extends Component {
  render () {
    return (
      // 使用CounterConsumer来接受count
      // 注意！ 注意！ 注意！ Consumer的children必须是一个方法 这个参数就是Provider的value
      <CounterConsumer>
        {
          (({ count }) => {
            return <span>{count}</span>
          })
        }
      </CounterConsumer>
    )
  }
}

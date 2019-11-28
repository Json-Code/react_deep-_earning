import React, { Component } from 'react'
import CountBtn from './components/CounterBtn'
import Counter from './components/Counter'

export default class App extends Component {
  render () {
    return (
      <>
        <CountBtn types="decrement">-</CountBtn>
        <Counter></Counter>
        <CountBtn types="increment">+</CountBtn>
      </>
    )
  }
}

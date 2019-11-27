import React, { Component } from 'react'

export default class Like extends Component {
  state = {
    isLiked: false
  }

  handleLikedClick = () => {
    // 使用这种方式修改数据在react里是不允许的 能修改数据 但界面不会重新渲染
    // this.state.isLiked = !this.state.isLiked
    // 要修改数据，就使用setState方法，setState方法可以有两个参数
    // 第一个参数又有两种情况 第一种情况是一个对象
    // this.setState({
    //   isLiked: !this.state.isLiked
    // })
    // 第二种情况是一个方法
    this.setState((prevState) => {
      console.log(prevState)
      console.log('setState内部的this.state.isLiked', this.state.isLiked)
      return {
        isLiked: !prevState.isLiked
      }
    }, () => {
      // 由于setState是异步的，如果想获取到最新的state,应该在这个回调里来获取
      console.log(this.state.isLiked)
    })
    console.log('setState外部的this.state.isLiked', this.state.isLiked)
  }

  render() {
    return (
      <div>
        <span onClick={this.handleLikedClick}>
          {this.state.isLiked ? '❤':'💔'}
        </span>
      </div>
    )
  }
}

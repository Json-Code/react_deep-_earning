import React, { Component } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

import './static/css/index02.css'

console.log(styled)

// 注： 未知的错误 不能使用模板字符串来写样式taggedTemplateLiteral
const Title = styled.h1({
  color: '#F00',
})

// 组件中的样式
export default class index01 extends Component {
  render() {
    const style={color: '#F00'}
    return (
      <div>
        <Title>元素中的样式</Title>
        <ol>
          <li style={style}>使用style内联创建</li>
          <li className="has-text-red">使用class创建</li>
          <li className={classNames('a', {'b': true, 'c': false})}>要动态添S加不同的className就可以使用第三方的包叫classNames 比如这个li上面就只有a, 没有c</li>
          <li>styled-components的使用</li>
        </ol>
      </div>
    )
  }
}

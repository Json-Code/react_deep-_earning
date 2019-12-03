import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'
import App from './App'

import './index.less'
// 不需要登录就能打开的页面mianRouter
import { mainRoutes } from './routes'

render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route path="/admin" render={(routerProps) => {
          // TODO:权限，需要登录才能访问/admin
          return <App {...routerProps}></App>
        }}></Route>

        {
          // 循环插入Route 
          mainRoutes.map(route => {
            return <Route key={route.pathname} path={route.pathname} component={route.component}></Route>
          })
        }

        {
          // 重定向
        }
        <Redirect to='/admin' from='/' exact></Redirect>
        <Redirect to='/404'></Redirect>
      </Switch>
    </Router>
  </ConfigProvider>,
  document.querySelector('#root')
)
import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from './App'

// 不需要登录就能打开的页面mianRouter
import { mainRouter } from './routes'

import './index.less'

render(
  <Router>
    <Switch>
      <Route path="/admin" render={(routerProps) => {
        // TODO:权限，需要登录才能访问/admin
        return <App {...routerProps}></App>
      }}></Route>

      {
        // 循环插入Route 
        mainRouter.map(route => {
          return <Route key={route.pathname} path={route.pathname} component={route.component}></Route>
        })
      }

      {
        // 重定向
      }
      <Redirect to='/admin' from='/' exact></Redirect>
      <Redirect to='/404'></Redirect>
    </Switch>
  </Router>,
  document.querySelector('#root')
)
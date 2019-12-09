import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { adminRoutes } from './routes'
import { Frame } from './components'

const menus = adminRoutes.filter(route => route.isNav === true)

const mapState = state => ({
  isLogin: state.user.isLogin,
  role: state.user.role
})
@connect(mapState)
class App extends Component {
  render() {
    return (
      this.props.isLogin
      ?
      <Frame menus={menus}>
        <Switch>
          {
            adminRoutes.map(route => {
              return (
                <Route 
                  key={route.pathname} 
                  path={route.pathname} 
                  exact={route.exact}
                  render={(routerProps) => {
                    console.log(route)
                    // 检测该路由是否包含这个权限的用户访问
                    const hasPermission = route.roles.includes(this.props.role)
                    console.log(hasPermission)
                    return (
                    hasPermission
                    ?
                    <route.component {...routerProps}/>
                    :
                    <Redirect to="/admin/noauth"/>
                    )
                  }}
                />
              )
            })
          }
          <Redirect to={adminRoutes[0].pathname} from='/admin' exact/>
          <Redirect to='/404'/>
        </Switch>
      </Frame>
      :
      <Redirect to="/login"></Redirect>
    )
  }
}

export default App

// 下面注释的这个文件就是一个简易的react-loadable的原理
//import loadable from './loadable'
import loadable from 'react-loadable'
import { Loading } from '../components'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'
// import ArticleList from './Article'
// import ArticleEdit from './Article/Edit'

// 懒加载loadable
const Dashboard = loadable({
  // 懒加载的模块
  loader: () => import('./Dashboard'),
  // loading组件
  loading: Loading
})
const Login = loadable({
  loader: () => import('./Login'),
  loading: Loading
})
const NotFound = loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const Settings = loadable({
  loader: () => import('./Settings'),
  loading: Loading
})
const ArticleList = loadable({
  loader: () => import('./Article'),
  loading: Loading
})
const ArticleEdit = loadable({
  loader: () => import('./Article/Edit'),
  loading: Loading
})

export {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit
}
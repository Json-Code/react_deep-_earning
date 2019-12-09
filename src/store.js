import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// 引入reducer配置文件
import rootReducer from './reducers'

// 创建store
export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)
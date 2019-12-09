import { combineReducers } from 'redux'

import noticfications from './noticfications'
import user from './user'

// 使用combineReducers来合并各个模块的reducer
export default combineReducers({
  noticfications,
  user
})
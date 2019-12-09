// 引入对应的actionTypes
import actionTypes from '../actions/actionTypes'
// 创建初始状态
const initState = {
  isLoading: false,
  list: [{
    id: 1,
    title: '111a design language for background',
    desc: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    hasRead: false
  }, {
    id: 2,
    title: '222a design language for background',
    desc: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    hasRead: false
  }, {
    id: 3,
    title: '333a design language for background',
    desc: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    hasRead: true
  },]
}

// 导出reducer
export default (state = initState, action) => {
  switch(action.type) {
    // 获取到AJAX后对数据进行处理
    case actionTypes.RECIVED_NOTIFICATIONS:
      return {
        ...state,
        list: action.payload.list
      }
    case actionTypes.START_NOFICATION_LOADING:
      console.log(state)
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FINISH_NOFICATION_LOADING:
      console.log(state)
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
      // 把对应ID的hasRead改为true
      const newList = state.list.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      // 解构返回一个新的Object
      return {
        ...state,
        list: newList
      };
    case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:
      // 解构返回一个新的Object
      return {
        ...state,
        list: state.list.map(item => {
          item.hasRead = true
          return item
        })
      }
    default:
      return state
  }
}
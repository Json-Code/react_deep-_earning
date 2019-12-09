import actionTypes from './actionTypes'
import { getNotifications as getNotificationsLists } from '../requests'

const startMarkAsRead = () => {
  return {
    type: actionTypes.START_NOFICATION_LOADING
  }
}
const finishMarkAsRead = () => {
  return {
    type: actionTypes.FINISH_NOFICATION_LOADING
  }
}

// 这是一个异步action
export const markNotificationAsReadById = (id) => {
  return dispatch => {
    dispatch(startMarkAsRead())
    // 这里是模拟的一个服务端请求
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
        // 通过payload传入对应的参数
        payload: {
          id
        }
      })
      dispatch(finishMarkAsRead())
    }, 2000)
  }
}

export const markAllNotificationAsRead = () => {
  return dispatch => {
    dispatch(startMarkAsRead())
    // 这里是模拟的一个服务端请求
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_ALL_NOTIFICATION_AS_READ
      })
      dispatch(finishMarkAsRead())
    }, 2000)
  }
}

// 发送ajax请求 获取通知消息列表
export const getNotifications = () => {
  return dispatch => {
    dispatch(startMarkAsRead())
    getNotificationsLists()
      .then(resp => {
        dispatch({
          type: actionTypes.RECIVED_NOTIFICATIONS,
          payload: {
            list: resp.list
          }
        })
        dispatch(finishMarkAsRead())
      })
  }
}
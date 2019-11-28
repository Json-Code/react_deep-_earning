import axios from 'axios'

import apis from './apis'

const ajax = axios.create({
  baseURL: apis.baseURL
})

// 这里还会去做一些全局的拦截器处理
export const getTods = () => {
  return ajax.get(apis.todos)
}
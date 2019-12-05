import axios from 'axios'
import { message } from 'antd'
const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/238551' : ''
})

service.interceptors.request.use((config) => {
  config.data = Object.assign({}, config.data, {
    // authToken: window.localStorage.getItem('authToken')
    authToken: 'itistokenplaceholder'
  })
  return config
})

service.interceptors.response.use((resp) => {
  if (resp.data.code === 200) {
    return resp.data.data
  } else {
    // 全局处理错误

    message.error(resp.data.errMsg)
  }
})

// 获取文章列表
export const getArticles = (offset = 0, limited = 10) => {
  return service.post('/api/v1/articlelist', {
    offset,
    limited
  })
}

// 通过ID删除文章
export const deleteArticle = (id) => {
  return service.post(`/api/v1/articleDelete/${id}`)
}

// 通过ID获取文章
export const getArticleById = (id) => {
  return service.post(`/api/v1/article/${id}`)
}

// 保存文章
export const saveArticle = (id, data) => {
  return service.post(`/api/v1/articleEdit/${id}`, data)
}

// 新建文章 暂时不用
// export const newArticle = (data) => {
//   return service.post(`/api/v1/article`, data)
// }
import axios from 'axios'

const instance = axios.create({
  baseURL: '/info'
})
instance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token')
  }
  return config
})

instance.interceptors.response.use(res => {
  console.log(res)
  if (res.data.err === 0) {
    return res.data
  } else {
    return Promise.reject(res.data.msg)
  }
})
export default instance

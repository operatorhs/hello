import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// eslint-disable-next-line no-console
// http://demo.tdgjs.com/
// create an axios instance
// eslint-disable-next-line no-console
const service = axios.create({
  baseURL:  store.state.app.BASE_URL, // url = base url + request url
  auth: { username: 'zkhy', password: 'zkhy2018' },
  timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service

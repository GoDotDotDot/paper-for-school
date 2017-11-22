import axios from 'axios'
import Promise from 'es6-promise'
import qs from 'qs'

Promise.polyfill()
// axios.defaults.withCredentials = true
const request = (method, url, data, config = {}) => {
  let options = Object.assign({}, config, {
    url,
    method,
    data
        // baseURL: window.AppConf.apiHost
  })
  options.headers = options.header || {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return new Promise((resolve, reject) => {
    axios.request(options)
                .then(res => {
                  let data = res.data // response data
                  if (!data) {
                    return resolve(data)
                  }
                  if (data.HasError) {
                    reject(res)
                  }
                  resolve(data)
                }).catch(res => {
                  reject(res)
                })
  })
}

const md_ajax = {
  get (url, config) {
    return request('get', url, null, config)
  },
  delete (url, config) {
    return request('delete', url, null, config)
  },
  head (url, config) {
    return request('head', url, null, config)
  },
  post (url, data, config) {
    const _config = {
      header: {
        'Content-Type': 'application/json'
      },
      ...config
    }
    return request('post', url, JSON.stringify(data), _config)
  },
  put (url, data, config) {
    const _config = {header: {
      'Content-Type': 'application/json'
    },
      ...config}
    return request('put', url, JSON.stringify(data), _config)
  },
  patch (url, data, config) {
    return request('path', url, data, config)
  },
  setCommonHeader (key, value) {
    window.axios.defaults.headers.common[key] = value
  }
}
export default md_ajax

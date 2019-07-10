import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      let queryStr = ''
      Object.keys(data).forEach(key => {
        const value = data[key]
        queryStr += key + '=' + value + '&'
      })
      if (queryStr) {
        queryStr = queryStr.substring(0, queryStr.length - 1)
        queryStr = '?' + queryStr
      }
      promise = axios.get(url + queryStr)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      // eslint-disable-next-line no-console
      console.log(response)
      resolve(response.data)
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err)
      reject(err)
    })


  })
}

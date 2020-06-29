import { RECEIVE_NEWSBYID } from './mutation-types'

import { reqNewsById } from '../api'

export default {
  async getNewsById({ commit }, { id, cb }) {
    // 调用接口请求函数从后台获取数据
    const result = await reqNewsById(id)
    // console.log(id);
    if (result.code === 0) {
      const newsData = result.data
      // const newsData = result.data.news
      // console.log(newsData);
      commit(RECEIVE_NEWSBYID, { newsData })
      cb && cb()
    }

  }

}

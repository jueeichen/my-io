import {RECEIVE_NEWSBYID} from './mutation-types'

import {reqNewsById} from '../api'

export default {
  async getNewsById({commit}, {name,pass,auth,cb}) {
    // 调用接口请求函数从后台获取数据
    const result = await reqNewsById(name,pass,auth)
    // .then(()=>{
    //  alert("1235643");
    // })
    // eslint-disable-next-line no-console
    console.log(result);
    // if (result.code === 0) {
    //   const newsData = result.data
    //   // const newsData = result.data.news
    //   // console.log(newsData);
    //   commit(RECEIVE_NEWSBYID, {newsData})
    //   cb && cb()
  //  }

  }

}

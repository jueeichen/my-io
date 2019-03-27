import {
  RECEIVE_NEWSBYID,
  RECEIVE_USERMESSAGE,
  RECEIVE_ADDUSERMESSAGE,
  RECEIVE_SHOWUSERMESSAGE,
  RECEIVE_DELETEUSERMESSAGE,
  RECEIVE_UPDATEUSERMESSAGE
} from './mutation-types'

import {
  reqNewsById,
  reqUserMessageById,
  reqAddUserMessage,
  reqShowUserMessage,
  reqDeleteUserMessage,
  reqUpdateUserMessage
} from '../api'

export default {
  async getNewsById({commit}, {id, cb}) {
    // 调用接口请求函数从后台获取数据
    const result = await reqNewsById(id)
    // console.log(id);
    if (result.code === 0) {
      const newsData = result.data
      // const newsData = result.data.news
      // console.log(newsData);
      commit(RECEIVE_NEWSBYID, {newsData})
      cb && cb()
    }

  },
  async getUserMessageById({commit}, {id, cb}) {
    // 调用接口请求函数从后台获取数据
    const result = await reqUserMessageById(id)
    // console.log(id);
    if (result.code === 0) {
      const UserMessageData = result
      commit(RECEIVE_USERMESSAGE, {UserMessageData})
      cb && cb()
    }

  },
  async getAddUserMessage({commit}, {addFormData, cb}) {
    // 调用接口请求函数从后台获取数据
    const result = await reqAddUserMessage(addFormData)
    if (result.code === 0) {
      const addState = result
      // console.log(addState);
      commit(RECEIVE_ADDUSERMESSAGE, {addState})
      cb && cb()
    } else {
      console.log(result.msg);
    }

  },
  async getShowUserMessage({commit}, {cb}) {
    // 调用接口请求函数从后台获取数据
    const result = await reqShowUserMessage()
    if (result.code === 0) {
      const allUserMessageData = result.data.userAll
      // console.log(addState);
      commit(RECEIVE_SHOWUSERMESSAGE, {allUserMessageData})
      cb && cb()
    } else {
      console.log(result.msg);
    }

  },
  //删除
  async deleteUserMessage({commit}, {data, cb}) {
    // 调用接口请求函数从后台获取数据
    console.log(data);
    const result = await reqDeleteUserMessage({name: data})
    if (result.code === 0) {
      const msg = result.msg
      cb && cb(msg)
    } else {
      cb && cb(result.msg)
    }

  },
  //编辑
  async updateUserMessage({commit}, {data, cb}) {
    // 调用接口请求函数从后台获取数据
    const result = await reqUpdateUserMessage(data)
    if (result.code === 0) {
      const msg = result.msg
      console.log(msg);
      cb && cb(msg)
    } else {
      console.log(result.msg);
      cb && cb(result.msg)
    }

  },

}




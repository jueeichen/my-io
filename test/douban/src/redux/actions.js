import {
  RECEIVE_HOMES, RECEIVE_TOPIC, RECEIVE_ITEM, RECEIVE_LOGIN, RECEIVE_LOGIN_STATE,
  INCREASE, DECREASE, RESET,RECEIVE_WEBSOCK
} from './action-types.js'

import {reqHomes, reqTopics, reqItem, reqLogin} from '../api'

// 错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveHomes = (data) => ({type: RECEIVE_HOMES, data: data})
const receiveTopics = (data) => ({type: RECEIVE_TOPIC, data: data})
const receiveItems = (data) => ({type: RECEIVE_ITEM, data: data})
const receiveLogins = (data) => ({type: RECEIVE_LOGIN, data: data})
const receiveLoginState = (data) => ({type: RECEIVE_LOGIN_STATE, data: data})
const receiveWebsock = (msg) => ({type: RECEIVE_WEBSOCK, data: msg})

export const getHomes = (cb) => {
  return async dispatch => {
    const response = await reqHomes()
    const result = response.data;
    if (result.code === 0) {// 成功
      const homeData = result;
      dispatch(receiveHomes(homeData));
      cb && cb()
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

// 发送消息的异步action
export const sendWebSocketMsg = (content, cb) => {
  return async dispatch => {
    let ws = new WebSocket("ws://121.40.165.18:8800");
    ws.onopen = () => {
      ws.send(content); // send a message
    };
    ws.onmessage = e => {
      // a message was received
      const result = e.data;
      console.log(result);
      if (result) {// 成功
        const wsMsg = result;

        dispatch(receiveWebsock(wsMsg));
        cb && cb()
      }
    };
  }
}


export const getLogin = (cb) => {
  return async dispatch => {
    const response = await reqLogin()
    const result = response;
    console.log(result);
    if (result.code === 0) {// 成功
      const loginData = result;
      dispatch(receiveLogins(loginData));
      cb && cb()
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}


export function getTopics(cb) {
  return dispatch => {
    reqTopics().then(
      res => {
        const topicData = res.data;
        dispatch(receiveTopics(topicData));
        cb && cb()
      }
    )
  }
}

export function getItems(cb) {
  return dispatch => {
    reqItem().then(
      res => {
        const itemData = res.data;
        dispatch(receiveItems(itemData));
        cb && cb()
      }
    )
  }
}


export function getLoginState(loginState) {
  return dispatch => {
    dispatch(receiveLoginState(loginState));
  }
}


export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});
export const reset1 = () => ({type: RESET});



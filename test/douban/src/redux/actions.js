import {
  RECEIVE_HOMES, RECEIVE_TOPIC, RECEIVE_ITEM, RECEIVE_LOGIN, RECEIVE_LOGIN_STATE,
  INCREASE, DECREASE, RESET
} from './action-types.js'

import {reqHomes, reqTopics, reqItem, reqLogin} from '../api'


const receiveHomes = (data) => ({type: RECEIVE_HOMES, data: data})
const receiveTopics = (data) => ({type: RECEIVE_TOPIC, data: data})
const receiveItems = (data) => ({type: RECEIVE_ITEM, data: data})
const receiveLogins = (data) => ({type: RECEIVE_LOGIN, data: data})
const receiveLoginState = (data) => ({type: RECEIVE_LOGIN_STATE, data: data})

export function getHomes (cb) {
  return  dispatch => {
    reqHomes().then(
      res => {
        const homeData = res.data;
        dispatch(receiveHomes(homeData));
        cb&&cb()
      }
    )
  }
}
export function getTopics (cb) {
  return  dispatch => {
    reqTopics().then(
      res => {
        const topicData = res.data;
        dispatch(receiveTopics(topicData));
        cb&&cb()
      }
    )
  }
}
export function getItems (cb) {
  return  dispatch => {
    reqItem().then(
      res => {
        const itemData = res.data;
        dispatch(receiveItems(itemData));
        cb&&cb()
      }
    )
  }
}
export function getLogins (cb) {
  return  dispatch => {
    reqLogin().then(
      res => {
        const loginData = res.data;
        dispatch(receiveLogins(loginData));
        cb&&cb()
      }
    )
  }
}
export function getLoginState (loginState) {
  return  dispatch => {
        dispatch(receiveLoginState(loginState));
  }
}


export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const reset1 = () => ({ type: RESET });



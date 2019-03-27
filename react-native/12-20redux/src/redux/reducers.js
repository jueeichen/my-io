import {combineReducers} from 'redux';
import {
  RECEIVE_HOMES, RECEIVE_TOPIC, RECEIVE_ITEM, RECEIVE_LOGIN, RECEIVE_LOGIN_STATE,
  INCREASE, DECREASE, RESET, RECEIVE_WEBSOCK
} from './action-types.js'

import {defaultState} from "./state"

const initState = {};

function homeData(state = initState, action) {
  switch (action.type) {
    case RECEIVE_HOMES:
      return action.data
    default:
      return state
  }
}

function wsMsg(state = initState, action) {
  switch (action.type) {
    case RECEIVE_WEBSOCK:
      console.log(action.data);
      return action.data
    default:
      return state
  }
}

function topicData(state = initState, action) {
  switch (action.type) {
    case RECEIVE_TOPIC:
      return action.data
    default:
      return state
  }
}

function itemData(state = initState, action) {
  switch (action.type) {
    case RECEIVE_ITEM:
      return action.data
    default:
      return state
  }
}

function loginData(state = initState, action) {
  switch (action.type) {
    case RECEIVE_LOGIN:
      return action.data
    default:
      return state
  }
}

const initloginState = { //登录状态;
  nowState: false,
  username: ''
}

function loginState(state = initloginState, action) {
  switch (action.type) {
    case RECEIVE_LOGIN_STATE:
      var {nowState, username} = action.data
      return {nowState, username}
    default:
      return state
  }
}

// 计数器:原始默认state
// const defaultState = {
//   count: 5,
//   factor: 1
// }

function counter(state = defaultState, action) {
  switch (action.type) {
    case INCREASE:
      return {...state, count: state.count + state.factor};
    case DECREASE:
      return {...state, count: state.count - state.factor};
    case RESET:
      return {...state, count: 0};
    default:
      return state;
  }
}

// export default reducer;
//暴露出去
export default combineReducers({
  homeData, topicData, itemData, loginData, loginState, counter, wsMsg
})
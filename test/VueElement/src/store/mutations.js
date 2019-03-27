import {
  RECEIVE_NEWSBYID, RECEIVE_USERMESSAGE, RECEIVE_ADDUSERMESSAGE,RECEIVE_SHOWUSERMESSAGE
} from './mutation-types'

export default {
  [RECEIVE_NEWSBYID](state, {newsData}) {
    state.newsData = newsData
  },
  [RECEIVE_USERMESSAGE](state, {UserMessageData}) {
    state.UserMessageData = UserMessageData
  },
  [RECEIVE_ADDUSERMESSAGE](state, {addState}) {
    state.addState = addState
  },
  [RECEIVE_SHOWUSERMESSAGE](state, {allUserMessageData}) {
    state.allUserMessageData = allUserMessageData
  }
}

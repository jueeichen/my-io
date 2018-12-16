import {
 RECEIVE_NEWSBYID
} from './mutation-types'

export default {
  [RECEIVE_NEWSBYID](state, {newsData}) {
    state.newsData = newsData
  }
}

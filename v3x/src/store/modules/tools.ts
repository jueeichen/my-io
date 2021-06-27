const state = {
  numbers: [1, 2, 3],
  token: '123',
}

const mutations = {
  ADD_NUMBER(state, payload) {
    state.numbers.push(payload)
  }
}

const actions = {
  addNumber(context, number) {
    console.log('ADD_NUMBER——A')
    context.commit('ADD_NUMBER', number)
  },
  /**
* @method 用来转化时间戳是时间变成YMDhms自己自由组合的字符串格式
* @param {number} time 时间戳
* @param {string} str Y M  D h m s自由组合的字符串随意组合
*/
  timestampToStr(context, obj) {
    return new Promise((resolve) => {
      let str: any = obj.str
      let time: any = obj.time
      var date = new Date(time)
      str = str.replace('Y', date.getFullYear())
      str = str.replace('M', (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1))
      str = str.replace('D', (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()))
      str = str.replace('h', (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()))
      str = str.replace('m', (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()))
      str = str.replace('s', (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()))
      resolve(str)
    })

  },
}

const getters = {
  getNumbers(state) {
    return state.numbers
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
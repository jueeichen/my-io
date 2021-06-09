import { createStore } from 'vuex'
import modulesA from './modules/modulesA'
import modulesB from './modules/modulesB'
import global from './modules/global'
import product from './modules/product'


const moduleA = {
  state: {
    numbers: [1, 2, 3],

  },
  mutations: {
    ADD_NUMBER(state, payload) {
      state.numbers.push(payload)
    }
  },
  actions: {
    addNumber(context, number) {
      console.log("model_A")
      context.commit('ADD_NUMBER', number)
    }
  },
  getters: {
    getNumbers(state) {
      return state.numbers
    }
  }
}

const moduleB = {
  state: {
    numbers: [1, 2, 3],

  },
  mutations: {
    ADD_NUMBER(state, payload) {
      state.numbers.push(payload)
    }
  },
  actions: {
    addNumber(context, number) {
      console.log("model_B")
      context.commit('ADD_NUMBER', number)
    }
  },
  getters: {
    getNumbers_B(state) {
      return state.numbers
    }
  }
}
const store = createStore({
  modules: {
    global:global,
    moduleA: moduleA,
    moduleB: moduleB,
    modulesA: modulesA,
    modulesB: modulesB,
    product:product
  }
})

export default store

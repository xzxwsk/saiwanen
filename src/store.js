import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    LOADING: false,
    LoadWord: ''
  },
  mutations: {
    showLoading (state, prompt) {
      state.LOADING = true
      if (prompt) {
        state.LoadWord = prompt
      } else {
        state.LoadWord = 'loading...'
      }
    },
    hideLoading (state) {
      state.LOADING = false
    }
  }
})

export default store

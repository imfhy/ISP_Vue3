import { createStore } from 'vuex'

export default createStore({
  state: {
    username: "fhy",
    token: ""
  },
  getters: {
    formatInfo (state) {
      return state.userInfo.user_name
    }
  },
  mutations: {
    saveToken(state, token) {
      state.token = token
      localStorage.setItem("token", token)
    },
    clearToken(state) {
      state.token = "";
      localStorage.removeItem('token')
    }
  },
  actions: {

  },
  modules: {

  }
})

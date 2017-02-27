import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  callingAPI: false,
  searching: '',
  serverURI: 'https://api.online-bani.ru',
  user: null,
  token: null,
  photo: '',
  name: '',
  userInfo: {
    messages: [{1: 'test', 2: 'test'}],
    notifications: [{1: 'test', 2: 'test'}],
    tasks: [{1: 'test', 2: 'test'}]
  }
}

const mutations = {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}

export default new Vuex.Store({
  state,
  mutations
})

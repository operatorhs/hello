import { getToken, getUserInfo, setToken, setUserInfo } from '@/utils/auth'
const state = {
  BASE_URL: process.env.NODE_ENV === 'production' ? 'https://demo2.tdgjs.com/cdaMember' : 'https://demo2.tdgjs.com/cdaMember',
  DANCERS_TITLE: '中国舞蹈家协会、中国文联舞蹈艺术中心',
  userInfo:  getUserInfo(),
  token: getToken()
}

const mutations = {
  SET_USER_INFO: (state, user) => {
    state.userInfo = user
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  setUserInfo({ commit }, user) {
    commit('SET_USER_INFO', user)
    setUserInfo(user)
  },
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
    setToken(token)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

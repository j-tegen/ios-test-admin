import api from '../../api/auth'
import router from '../../router'

const state = {
  token: window.localStorage.getItem('token'),
  userId: window.localStorage.getItem('userId'),
  loading: false,
  error: '',
}

const getters = {
  isLoggedIn: state => !!state.token,
  activeUserId: state => state.userId,
}

const mutations = {
  beginLogin: (state) => {
    state.loading = true
  },
  loginSuccess: (state, token, userId) => {
    state = {
      loading: false,
      error: '',
      token,
      userId,
      ...state,
    }
  },
  loginFailed: (state, error) => {
    state = {
      loading: false,
      error,
      token: null,
      userId: null,
      ...state,
    }
  }
}
/* eslint-disable */

const actions = {
  login: async ({ commit }, params) => {
    const { email, password } = params
    commit('beginLogin')
    try {
      const { data } = await api.login(email, password)

      if (data.status === 'success') {
        const { auth_token, _id: id } = data.data
        commit('loginSuccess', auth_token, id)
        window.localStorage.setItem('token', auth_token)
        window.localStorage.setItem('userId', id)
        router.push('/')
      } else {
        commit('loginFailed', response.message)
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userId')
      }
    } catch(e) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userId')
    }
  },
  logout: ({ commit }) => {
    commit('setToken', null)
    commit('setUserId', null)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
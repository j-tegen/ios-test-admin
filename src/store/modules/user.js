import moment from 'moment'
import api from '../../api/user'
/* eslint-disable */

const state = {
  loading: false,
  error: '',
  users: [],
  user: {
    reclamations: [],
    supplier_user_infos: [],
  },
}

const getters = {
  allUsers: state => {
    return state.users
  },
  activeUser: state => {
    return state.user
  },
  isLoading: state => state.loading,
  hasError: state => !!state.error
}

const mutations = {
  beginCall: (state) => {
    state.loading = true
    state.error = ''
  },
  failedCall: (state, error) => {
    state.loading = false
    state.error = error
  },
  fetchUsersSuccess: (state, users) => {
    state.users = users
    state.error = ''
    state.loading = false
  },
  fetchUserSuccess: (state, user) => {
    state.user = user
    state.error = ''
    state.loading = false
  },
}

const actions = {
  fetchUsers: async ({ state, rootState, commit }) => {
    if (state.users.length > 0) {
      return;
    }
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.fetchAll(token)

      if (data.status === 'success') {
        const users = data.data
        commit('fetchUsersSuccess', users)
      } else {
        commit('failedCall', data.message)
      }
    } catch(e) {
      commit('failedCall', e)
    }
  },
  fetchUser: async ({ rootState, commit }, id) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth

      const userResponse = await api.fetch(token, id)
      if (userResponse.data.status !== 'success') {
        commit('failedCall', data.message)
        return
      }

      const reclamationsResponse = await api.fetchReclamations(token, id)
      if (reclamationsResponse.data.status !== 'success') {
        commit('failedCall', data.message)
        return
      }

      const supplierUserInfoResponse = await api.fetchSupplierUserInfo(token, id)
      if (supplierUserInfoResponse.data.status !== 'success') {
        commit('failedCall', data.message)
        return
      }


      let user = userResponse.data.data

      const reclamations = reclamationsResponse.data.data.map(r => (
        {
          ...r,
          delay: moment(r.actual_arrival).diff(r.expected_arrival, 'minutes'),
        }
      ))

      user = {
        ...user,
        reclamations,
        supplier_user_infos: supplierUserInfoResponse.data.data,
      }

      commit('fetchUserSuccess', user)

    } catch(e) {
      commit('failedCall', e)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
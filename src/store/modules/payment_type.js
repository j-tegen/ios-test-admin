import api from '../../api/payment_type'
/* eslint-disable */

const state = {
  loading: false,
  error: '',
  payment_types: [],
  payment_type: null,
}

const getters = {
  allPaymentTypes: state => {
    return state.payment_types.map(pt => ({
      ...pt,
      suppliers: pt.suppliers.length,
    }))
  },
  activePaymentType: state => {
    return state.payment_type
  },
  isLoading: state => state.loading
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
  fetchPaymentTypesSuccess: (state, payment_types) => {
    state.payment_types = payment_types
    state.loading = false
    state.error = ''
  },
  addPaymentTypeSuccess: (state, payment_type) => {
    state.error = ''
    state.loading = false
  },
  editPaymentTypeSuccess: (state, payment_type) => {
    state.error = ''
    state.payment_types = state.payment_types.map(s => s._id === payment_type._id ? payment_type : s)
    state.loading = false
  },
}

const actions = {
  fetchPaymentTypes: async ({ state, rootState, commit }, force) => {
    if (!force && state.payment_types.length > 0) {
      return;
    }
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.fetchAll(token)

      if (data.status === 'success') {
        const payment_types = data.data
        commit('fetchPaymentTypesSuccess', payment_types)
      } else {
        commit('failedCall', data.message)
      }
    } catch(e) {
      commit('failedCall', e)
    }
  },
  addPaymentType: async ({ rootState, commit, dispatch}, payment_type) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.add(token, payment_type)
      if ( data.status === 'success' ) {
        commit('addPaymentTypeSuccess')
        dispatch('fetchPaymentTypes', true)
      } else {
        commit('failedCall', data.message)
      }
    } catch(e) {
      commit('failedCall', e)
    }
  },
  editPaymentType: async ({ rootState, commit}, payment_type) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.editPaymentType(token, payment_type)
      if ( data.status === 'success' ) {
        commit('editPaymentTypeSuccess', data.data)
      } else {
        commit('failedCall', data.message)
      }
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
  actions
}
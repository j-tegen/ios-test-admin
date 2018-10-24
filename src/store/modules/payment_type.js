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
}

const actions = {
  fetchPaymentTypes: async ({ state, rootState, commit }) => {
    if (state.payment_types.length > 0) {
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
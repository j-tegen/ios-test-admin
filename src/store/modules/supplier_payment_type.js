import api from '../../api/supplier'
/* eslint-disable */

const state = {
  loading: false,
  error: '',
  payment_types: [],
  payment_type: null,
}

const getters = {
  allPaymentTypes: state => {
    return state.payment_types
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
  fetchPaymentTypes: async ({ rootState, commit }, supplier_id) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.fetchPaymentTypes(token, supplier_id)

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
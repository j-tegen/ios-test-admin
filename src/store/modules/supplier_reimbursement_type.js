import api from '../../api/supplier'
/* eslint-disable */

const state = {
  loading: false,
  error: '',
  reimbursement_types: [],
  reimbursement_type: null,
}

const getters = {
  allReimbursementTypes: state => {
    return state.reimbursement_types
  },
  activeReimbursementType: state => {
    return state.reimbursement_type
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
  fetchReimbursementTypesSuccess: (state, reimbursement_types) => {
    state.reimbursement_types = reimbursement_types
    state.loading = false
    state.error = ''
  },
}

const actions = {
  fetchReimbursementTypes: async ({ state, rootState, commit }, supplier_id) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.fetchReimbursementTypes(token, supplier_id)

      if (data.status === 'success') {
        const reimbursement_types = data.data
        commit('fetchReimbursementTypesSuccess', reimbursement_types)
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
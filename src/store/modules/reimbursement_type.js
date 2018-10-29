import api from '../../api/reimbursement_type'
/* eslint-disable */

const state = {
  loading: false,
  error: '',
  reimbursement_types: [],
  reimbursement_type: null,
}

const getters = {
  allReimbursementTypes: state => {
    return state.reimbursement_types.map(rt => ({
      ...rt,
      suppliers: rt.suppliers.length,
    }))
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
  addReimbursementTypeSuccess: (state, reimbursement_type) => {
    state.error = ''
    state.loading = false
  },
  editReimbursementTypeSuccess: (state, reimbursement_type) => {
    state.error = ''
    state.reimbursement_types = state.reimbursement_types.map(s => s._id === reimbursement_type._id ? reimbursement_type : s)
    state.loading = false
  },
}

const actions = {
  fetchReimbursementTypes: async ({ rootState, commit }) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.fetchAll(token)

      if (data.status === 'success') {
        const reimbursement_types = data.data
        commit('fetchReimbursementTypesSuccess', reimbursement_types)
      } else {
        commit('failedCall', data.message)
      }
    } catch(e) {
      commit('failedCall', e)
    }
  },
  addReimbursementType: async ({ rootState, commit, dispatch}, reimbursement_type) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.add(token, reimbursement_type)
      if ( data.status === 'success' ) {
        commit('addReimbursementTypeSuccess')
        dispatch('fetchReimbursementTypes', true)
      } else {
        commit('failedCall', data.message)
      }
    } catch(e) {
      commit('failedCall', e)
    }
  },
  editReimbursementType: async ({ rootState, commit}, reimbursement_type) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.editReimbursementType(token, reimbursement_type)
      if ( data.status === 'success' ) {
        commit('editReimbursementTypeSuccess', data.data)
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
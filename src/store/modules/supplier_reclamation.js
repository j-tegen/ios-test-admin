import api from '../../api/supplier'
import moment from 'moment'
/* eslint-disable */

const state = {
  loading: false,
  error: '',
  reclamations: [],
  reclamation: null,
}

const getters = {
  allReclamations: state => {
    return state.reclamations.map(r => ({
      delay: moment(r.actual_arrival).diff(r.expected_arrival, 'minutes'),
      ...r
    }))
  },
  activeReclamation: state => {
    return state.reclamation
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
  fetchReclamationsSuccess: (state, reclamations) => {
    state.reclamations = reclamations
    state.loading = false
    state.error = ''
  },
}

const actions = {
  fetchReclamations: async ({ state, rootState, commit }, supplier_id) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.fetchReclamations(token, supplier_id)

      if (data.status === 'success') {
        const reclamations = data.data
        commit('fetchReclamationsSuccess', reclamations)
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
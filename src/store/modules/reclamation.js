import api from '../../api/reclamation'
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
  isLoading: state => state.loading,
  hasError: state => !!state.error,
}

const mutations = {
  beginCall: (state) => {
    state.loading = true
    state.error = ''
  },
  failedCall: (state, error) => {
    state.error = error
    state.loading = false
  },
  fetchReclamationsSuccess: (state, reclamations) => {
    state.reclamations = reclamations
    state.error = ''
    state.loading = false
  },
}

const actions = {
  fetchReclamations: async ({ state, rootState, commit }) => {
    if (state.reclamations.length > 0) {
      return;
    }
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.fetchAll(token)

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
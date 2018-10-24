import api from '../../api/supplier'
import payment_type from './supplier_payment_type'
import reimbursement_type from './supplier_reimbursement_type'
import reclamation from './supplier_reclamation'
/* eslint-disable */

const state = {
  loading: false,
  error: '',
  suppliers: [],
  supplier: {
    key: '',
    name: '',
    _id: null,
  },
}

const getters = {
  allSuppliers: state => {
    const suppliers = state.suppliers.map(supplier => {
      return {
        ...supplier,
        reclamations: supplier.reclamations._items.length,
        payment_types: supplier.payment_types._items.length,
        reimbursement_types: supplier.reimbursement_types._items.length,
      }
    })
    return suppliers
  },
  activeSupplier: state => {
    return state.supplier
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
  fetchSuppliersSuccess: (state, suppliers) => {
    state.suppliers = suppliers
    state.error = ''
    state.loading = false
  },
  fetchSupplierSuccess: (state, supplier) => {
    state.supplier = supplier
    state.error = ''
    state.loading = false
  },
  addSupplierSuccess: (state) => {
    state.error = ''
    state.loading = false
  },
  editSupplierSuccess: (state, supplier) => {
    state.error = ''
    state.suppliers = state.suppliers.map(s => s._id === supplier._id ? supplier : s)
    state.loading = false
  },
}

const actions = {
  fetchSuppliers: async ({ state, rootState, commit }, force = false) => {
    if (state.suppliers.length > 0 && !force) {
      return;
    }
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.fetchAll(token)

      if (data.status === 'success') {
        const suppliers = data.data
        commit('fetchSuppliersSuccess', suppliers)
      } else {
        commit('failedCall', data.message)
      }
    } catch(e) {
      commit('failedCall', e)
    }
  },
  fetchSupplier: async ({ rootState, commit }, id) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.fetch(token, id)

      if (data.status === 'success') {
        const supplier = data.data
        commit('fetchSupplierSuccess', supplier)
      } else {
        commit('failedCall', data.message)
      }
    } catch(e) {
      commit('failedCall', e)
    }
  },
  addSupplier: async ({ rootState, commit, dispatch}, supplier) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.addSupplier(token, supplier)
      if ( data.status === 'success' ) {
        commit('addSupplierSuccess')
        dispatch('fetchSuppliers')
      } else {
        commit('failedCall', data.message)
      }
    } catch(e) {
      commit('failedCall', e)
    }
  },
  editSupplier: async ({ rootState, commit, dispatch}, supplier) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { data } = await api.editSupplier(token, supplier)
      if ( data.status === 'success' ) {
        commit('editSupplierSuccess', data.data)
      } else {
        commit('failedCall', data.message)
      }
    } catch(e) {
      commit('failedCall', e)
    }
  },
  connectPaymentType: async({ rootState, commit}, params) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth

      const { supplierId, paymentTypeId } = params
      const { data } = await api.connectPaymentType(token, supplierId, paymentTypeId)
      if ( data.status === 'success' ) {
        commit('fetchSupplierSuccess', data.data)
      } else {
        commit('failedCall', data.message)
      }
    } catch(e) {
      commit('failedCall', e)
    }
  },
  connectReimbursementType: async({ rootState, commit}, params) => {
    commit('beginCall')
    try {
      const { token } = rootState.auth
      const { supplierId, reimbursementTypeId } = params
      const { data } = await api.connectReimbursementType(token, supplierId, reimbursementTypeId)
      if ( data.status === 'success' ) {
        commit('fetchSupplierSuccess', data.data)
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
  actions,
  modules: {
    payment_type,
    reimbursement_type,
    reclamation,
  }
}
import Vuex from 'vuex'
import Vue from 'vue'
import auth from './modules/auth'
import supplier from './modules/supplier'
import user from './modules/user'
import reclamation from './modules/reclamation'
import payment_type from './modules/payment_type'
import reimbursement_type from './modules/reimbursement_type'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    supplier,
    user,
    reclamation,
    payment_type,
    reimbursement_type,
  },
})

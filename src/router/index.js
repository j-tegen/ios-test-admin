import VueRouter from 'vue-router'
import Vue from 'vue'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import Suppliers from '../components/Suppliers'
import SupplierDetails from '../components/SupplierDetails'
import Reclamations from '../components/Reclamations'
import Users from '../components/Users'
import PaymentTypes from '../components/PaymentTypes.vue'
import ReimbursementTypes from '../components/ReimbursementTypes.vue'
import store from '../store'
/* eslint-disable */
Vue.use(VueRouter)

const publicRoutes = [
    '/login',
]

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
        path: '/',
        component: Dashboard,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/suppliers',
        component: Suppliers,
    },
    {
        path: '/suppliers/:id',
        component: SupplierDetails,
    },
    {
        path: '/reclamations',
        component: Reclamations,
    },
    {
        path: '/users',
        component: Users,
    },
    {
        path: '/payment_types',
        component: PaymentTypes,
    },
    {
        path: '/reimbursement_types',
        component: ReimbursementTypes,
    }
  ]
})

router.beforeEach((to, from, next) => {
    if(!store.getters['auth/isLoggedIn'] && publicRoutes.indexOf(to.path) === -1) {
        next('/login')
    }else {
        next()
    }
})

export default router
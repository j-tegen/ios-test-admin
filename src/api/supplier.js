import axios from 'axios'
import { ROOT_URL } from './settings'
/* eslint-disable */
export default {
    fetchAll(token) {
        return axios.get(`${ROOT_URL}/supplier/`, { headers: { Token: `JWT ${token}`} })
    },
    fetch(token, id) {
        return axios.get(`${ROOT_URL}/supplier/${id}`, { headers: { Token: `JWT ${token}`} })
    },
    addSupplier(token, data) {
        return axios.post(`${ROOT_URL}/supplier/`, data, { headers: { Token: `JWT ${token}`} })
    },
    editSupplier(token, supplier) {
        return axios.put(`${ROOT_URL}/supplier/${supplier ._id}`,
            { name: supplier.name, key: supplier.key },
            {
                headers: { Token: `JWT ${token}`},
            }
        )
    },
    fetchPaymentTypes(token, id) {
        return axios.get(`${ROOT_URL}/supplier/${id}/payment_types`, { headers: { Token: `JWT ${token}`} })
    },
    fetchReimbursementTypes(token, id) {
        return axios.get(`${ROOT_URL}/supplier/${id}/reimbursement_types`, { headers: { Token: `JWT ${token}`} })
    },
    fetchReclamations(token, id) {
        return axios.get(`${ROOT_URL}/supplier/${id}/reclamations`, { headers: { Token: `JWT ${token}`} })
    },
    connectPaymentType(token, id, paymentTypeId) {
        return axios.put(`${ROOT_URL}/supplier/${id}/connect_payment_type`,
        { id: paymentTypeId },
        {
            headers: { Token: `JWT ${token}`},
        })
    },
    connectReimbursementType(token, id, reimbursementTypeId) {
        return axios.put(`${ROOT_URL}/supplier/${id}/connect_reimbursement_type`,
        { id: reimbursementTypeId },
        {
            headers: { Token: `JWT ${token}`},
        })
    }
}
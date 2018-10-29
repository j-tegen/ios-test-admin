import axios from 'axios'
import { ROOT_URL } from './settings'
/* eslint-disable */
export default {
    fetchAll(token) {
        return axios.get(`${ROOT_URL}/reimbursement_type/`, { headers: { Token: `JWT ${token}`} })
    },
    fetch(token, id) {
        return axios.get(`${ROOT_URL}/reimbursement_type/${id}`, { headers: { Token: `JWT ${token}`} })
    },
    add(token, data) {
        return axios.post(`${ROOT_URL}/reimbursement_type/`, data, { headers: { Token: `JWT ${token}`} })
    },
    edit(token, data) {
        return axios.put(`${ROOT_URL}/reimbursement_type/${data._id}`, data, { headers: { Token: `JWT ${token}`} })
    }
}
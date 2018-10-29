import axios from 'axios'
import { ROOT_URL } from './settings'
/* eslint-disable */
export default {
    fetchAll(token) {
        return axios.get(`${ROOT_URL}/user/`, { headers: { Token: `JWT ${token}`} })
    },
    fetch(token, id) {
        return axios.get(`${ROOT_URL}/user/${id}`, { headers: { Token: `JWT ${token}`} })
    },
    fetchReclamations(token, id) {
        return axios.get(`${ROOT_URL}/user/${id}/reclamation`, { headers: { Token: `JWT ${token}`} })
    },
    fetchSupplierUserInfo(token, id) {
        return axios.get(`${ROOT_URL}/user/${id}/supplier_user_info`, { headers: { Token: `JWT ${token}`} })
    }
}
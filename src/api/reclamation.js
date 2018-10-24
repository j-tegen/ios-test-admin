import axios from 'axios'
import { ROOT_URL } from './settings'

export default {
    fetchAll(token) {
        return axios.get(`${ROOT_URL}/reclamation/`, { headers: { Token: `JWT ${token}`} })
    },
    fetch(token, id) {
        return axios.get(`${ROOT_URL}/reclamation/${id}`, { headers: { Token: `JWT ${token}`} })
    },
}
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
}
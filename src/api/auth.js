import axios from 'axios'
import { ROOT_URL } from './settings'

export default {
    login(email, password) {
        return axios.post(`${ROOT_URL}/auth/login`, { email, password })
    },
    logout() {
        return axios.post(`${ROOT_URL}/auth/logout`)
    }

}
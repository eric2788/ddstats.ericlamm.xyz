import axios from 'axios'

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 120000,
})

export default api
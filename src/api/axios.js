import axios from 'axios'

const api = axios.create({
    baseURL: process.env.BASE_URL || 'http://192.168.0.127:8086',
    timeout: 30000,
})

export default api
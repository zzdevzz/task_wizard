import axios from 'axios'
import { API_URL } from './constants'

const api = axios.create({
    baseURL: API_URL
})

export default api

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token){
            config.headers.Authorization = token
        }
        return config
    },
    (error) => Promise.reject(error)
)
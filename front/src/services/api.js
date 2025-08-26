import axios from 'axios'

const api = axios.create({
    baseURL: 'https://crud-fullstack-v2.onrender.com' 
})

export default api;
import axios from 'axios'

const api = axios.create()
api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export default api
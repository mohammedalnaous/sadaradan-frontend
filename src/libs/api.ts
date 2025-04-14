import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://51.21.166.178:5200',
  withCredentials: true,
})

export default api

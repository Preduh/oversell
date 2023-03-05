import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://oversell-api.onrender.com'
})

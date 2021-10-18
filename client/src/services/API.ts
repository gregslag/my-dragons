import axios, { AxiosError } from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3333/api/v1'
})

API.interceptors.request.use(function (config) {
  const token = localStorage.getItem('@MyDragons:token')!
  if (config?.headers) {
    config.headers['x-access-token'] = token
  }
  return config
})

export const parseResponseError = (error: AxiosError<any>) => {
  return (
    error?.response?.data?.error || error?.message || 'Ops! Ocorreu um erro'
  )
}

export default API
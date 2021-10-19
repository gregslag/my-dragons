import axios, { AxiosError } from 'axios'

const API = axios.create({
  // baseURL: 'http://localhost:3333/api/v1'
  baseURL: 'https://my-dragons-api.herokuapp.com/api/v1'
})

API.interceptors.request.use(function (config) {
  const token = localStorage.getItem('@MyDragons:token')!
  if (config?.headers) {
    config.headers['x-access-token'] = token
  }
  return config
})

API.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const code = error.response.status
    if (code === 401) {
      localStorage.removeItem('@MyDragons:token')
      localStorage.removeItem('@MyDragons:user')
    }
    return Promise.reject(error)
  }
)

export const parseResponseError = (error: AxiosError<any>) => {
  return (
    error?.response?.data?.error || error?.message || 'Ops! Ocorreu um erro'
  )
}

export default API
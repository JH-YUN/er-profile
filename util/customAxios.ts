import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios'

interface AxiosRequestCustomConfig extends AxiosRequestConfig {
  currentRetryCount?: number
}
interface createOfficialApiAxiosOptions {
  retryCount?: number
  retryDelay?: number
}

// 공식 api를 활용하기 위한 axios
// 공식 api는 Next api를 거쳐서 사용(api key 보호)
export const createOfficialApiAxios = ({
  retryCount = 3,
  retryDelay = 1000,
}: createOfficialApiAxiosOptions = {}) => {
  const officialApiAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER}/api`,
    headers: {
      Accept: 'application/json',
    },
  })

  // axios 실패시 재요청
  officialApiAxios.interceptors.response.use(null, (err: AxiosError) => {
    let config = err.config as AxiosRequestCustomConfig
    config.currentRetryCount = config.currentRetryCount ?? 0
    if (config.currentRetryCount < retryCount) {
      config.currentRetryCount += 1
      // 요청량 초과시 재요청
      if (err.response?.status === 429) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              officialApiAxios.request(config as AxiosRequestCustomConfig)
            )
          }, retryDelay)
        })
      }
    }
    return Promise.reject(err)
  })

  return officialApiAxios
}

export const createErApiAxios = ({
  retryCount = 3,
  retryDelay = 1000,
}: createOfficialApiAxiosOptions = {}) => {
  const erApiAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ER_API_URL,
    headers: {
      Accept: 'application/json',
    },
  })

  // axios 실패시 재요청
  erApiAxios.interceptors.response.use(null, (err: AxiosError) => {
    let config = err.config as AxiosRequestCustomConfig
    config.currentRetryCount = config.currentRetryCount ?? 0
    if (config.currentRetryCount < retryCount) {
      config.currentRetryCount += 1
      // 요청량 초과시 재요청
      if (err.response?.status === 429) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(erApiAxios.request(config as AxiosRequestCustomConfig))
          }, retryDelay)
        })
      }
    }
    return Promise.reject(err)
  })

  return erApiAxios
}

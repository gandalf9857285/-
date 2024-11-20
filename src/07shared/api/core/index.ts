import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiResponseType, ServiceResponseType } from 'shared/api/types'

const DEV_MODE = import.meta.env.DEV

export const getBaseUrl = (): string => {
  return DEV_MODE ? '/api' : import.meta.env.VITE_BASE_URL
}

export const API_CONFIG: AxiosRequestConfig = {
  baseURL: getBaseUrl(),
  withCredentials: true,
}

export class AxiosService {
  protected axiosInstance!: AxiosInstance

  constructor(config: AxiosRequestConfig = API_CONFIG) {
    this.axiosInstance = axios.create(config)

    /** Request handler */
    this.axiosInstance.interceptors.request.use((request) => {
      return request
    })

    /** Response handler */
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return Promise.resolve(response)
      },
      async (error) => {
        switch (error?.response?.status) {
          case 401:
          case 403:
          case 404:
          case 422:
          case 500:

          default: {
            break
          }
        }

        return Promise.reject(error)
      }
    )
  }

  protected async axiosCall<T = unknown, E = unknown>(config: AxiosRequestConfig): ServiceResponseType<T, E> {
    try {
      const response = await this.axiosInstance.request<ApiResponseType<T>>(config)

      return [undefined, response]
    } catch (error) {
      return [error as AxiosError<ApiResponseType<E>>]
    }
  }

  protected async fakeAxiosCall<T = unknown, E = unknown>(mockData: T): ServiceResponseType<T, E> {
    try {
      const response = await apiMethod<T>(mockData)

      return [undefined, response]
    } catch (error) {
      return [error as AxiosError<ApiResponseType<E>>]
    }
  }
}

const apiMethod = <T = unknown>(
  mockData: T,
  errorRandomRate = 1,
  random = 10
): Promise<AxiosResponse<ApiResponseType<T>>> => {
  return new Promise((res, rej) => {
    const ResponseStatus = Math.floor(Math.random() * random) + 1

    setTimeout(() => {
      if (ResponseStatus > errorRandomRate) {
        const response = {
          data: {},
        } as AxiosResponse<ApiResponseType<T>>

        if (response) {
          response.status = 200

          response.data.result = mockData

          res(response)
        }
      } else {
        const error = {} as AxiosError<ApiResponseType>

        if (error) {
          error.status = 500

          error.response = {
            data: {
              data: { expiresAt: 23 },
              errors: [{ field: 'Ошибка раз' }, { field: 'Ошибка два' }],
              messages: ['Ошибка раз', 'Ошибка два'],
              success: false,
            },
          } as unknown as typeof error.response

          rej([error])
        }
      }
    }, 1500)
  })
}

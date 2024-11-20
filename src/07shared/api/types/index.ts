import { AxiosError, AxiosResponse } from 'axios'

export type ApiResponseErrorType = {
  description: string
  code: string
  message: string
}

export type ApiResponseType<T = unknown> = {
  result: T
  errors: ApiResponseErrorType[]
}

export type ServiceResponseType<T = unknown, E = unknown> = Promise<
  [undefined, AxiosResponse<ApiResponseType<T>>] | [AxiosError<ApiResponseType<E>>]
>

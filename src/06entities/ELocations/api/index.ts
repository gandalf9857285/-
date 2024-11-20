import axios, { AxiosRequestConfig } from 'axios'
import { LocationType, LocationApiResponseType } from 'entities/ELocations'

class LocationApi {
  private axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  })

  constructor(config?: AxiosRequestConfig) {
    if (config) {
      this.axiosInstance = axios.create({ ...config, baseURL: import.meta.env.VITE_BASE_URL })
    }
  }

  async getLocation(id: number): Promise<LocationType> {
    const response = await this.axiosInstance.get<LocationType>(`/location/${id}`)

    return response.data
  }

  async getAllLocations(page: number): Promise<LocationApiResponseType> {
    const response = await this.axiosInstance.get<LocationApiResponseType>('/location', {
      params: { page },
    })

    return response.data
  }
}

export const locationApi = new LocationApi()

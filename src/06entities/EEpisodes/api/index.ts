import axios, { AxiosRequestConfig } from 'axios'
import { EpisodeType, EpisodeApiResponseType } from 'entities/EEpisodes'

class EpisodeApi {
  private axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  })

  constructor(config?: AxiosRequestConfig) {
    if (config) {
      this.axiosInstance = axios.create({ ...config, baseURL: import.meta.env.VITE_BASE_URL })
    }
  }

  async getEpisode(id: number): Promise<EpisodeType> {
    const response = await this.axiosInstance.get<EpisodeType>(`/episode/${id}`)

    return response.data
  }

  async getAllEpisodes(page: number): Promise<EpisodeApiResponseType> {
    const response = await this.axiosInstance.get<EpisodeApiResponseType>('/episode', {
      params: { page },
    })

    return response.data
  }
}

export const episodeApi = new EpisodeApi()

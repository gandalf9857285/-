import axios, { AxiosRequestConfig } from 'axios'
import { CharacterApiResponseType, CharacterType } from 'entities/EСharacters'

class CharacterApi {
  private axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  })

  constructor(config?: AxiosRequestConfig) {
    if (config) {
      this.axiosInstance = axios.create({ ...config, baseURL: import.meta.env.VITE_BASE_URL })
    }
  }

  async getCharacter(id: number): Promise<CharacterType> {
    const response = await this.axiosInstance.get<CharacterType>(`/character/${id}`)

    return response.data
  }

  async getAllCharacters(page: number): Promise<CharacterApiResponseType> {
    const response = await this.axiosInstance.get<CharacterApiResponseType>('/character', {
      params: { page },
    })

    return response.data
  }

  async getAllCharactersByPage(page: number): Promise<CharacterType[]> {
    const response = await this.axiosInstance.get<{ results: CharacterType[]; info: any }>('/character', {
      params: { page },
    })

    return response.data.results
  }

  async searchCharacters(name: string): Promise<CharacterType[]> {
    const response = await this.axiosInstance.get<{ results: CharacterType[]; info: any }>('/character', {
      params: { name },
    })

    return response.data.results
  }
}

export const characterApi = new CharacterApi()

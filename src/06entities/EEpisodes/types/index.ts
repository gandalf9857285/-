export type EpisodeType = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export type EpisodeInfoType = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export type EpisodeApiResponseType = {
  info: EpisodeInfoType
  results: EpisodeType[]
}

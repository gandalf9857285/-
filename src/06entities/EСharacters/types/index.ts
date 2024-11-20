export type OriginType = {
  name: string
  url: string
}

export type LocationType = {
  name: string
  url: string
}

export type CharacterType = {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: OriginType
  location: LocationType
  image: string
  episode: string[]
  url: string
  created: string
}

export type CharacterInfoType = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export type CharacterApiResponseType = {
  results: CharacterType[]
  info: CharacterInfoType
}

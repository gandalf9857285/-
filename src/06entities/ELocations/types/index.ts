export type LocationType = {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export type LocationApiResponseType = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: LocationType[]
}

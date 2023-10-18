export type UpdateDeckResponseData = Deck & DeckAuthor

export type UpdateDeckArgs = Pick<Deck, 'name' | 'cover' | 'isPrivate' | 'id'>

export type CreateDeckArgs = Pick<Deck, 'name' | 'cover' | 'isPrivate'>

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate?: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
  author: DeckAuthor
}

export type DeckAuthor = {
  id: string
  name: string
}

export type DeckResponseData = {
  maxCardsCount: number
  pagination: Pagination
  items: Deck[]
}

type Field = 'name' | 'cardsCount' | 'updated' | 'created'

type Direction = 'asc' | 'desc'

export type GetDeckQueryParams = {
  name?: string
  authorId?: string
  orderBy?: `${Field}-${Direction}` | null
  currentPage?: number
  itemsPerPage?: number
  minCardsCount?: string
  maxCardsCount?: string
}

export type ResetPasswordArgs = {
  password: string
  token: string
}

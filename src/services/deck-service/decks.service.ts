import { baseApi } from '../api.ts'
import {
  CreateDeckArgs,
  Deck,
  DeckResponseData,
  GetDeckQueryParams,
  UpdateDeckArgs,
  UpdateDeckResponseData,
} from '@/services/deck-service'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DeckResponseData, GetDeckQueryParams | void>({
        query: params => {
          return {
            url: `v1/decks`,
            params: params ?? {},
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: body => ({
          url: `v1/decks`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<Deck, { id: string }>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<UpdateDeckResponseData, UpdateDeckArgs>({
        query: ({ id, ...body }) => ({
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} = DecksService

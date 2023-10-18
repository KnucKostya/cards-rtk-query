import { baseApi } from '@/services/api.ts'
import { CardResponse, GetRandomCardArgs } from '@/services/cardService'

export const cardApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRandomCard: builder.query<CardResponse, string>({
      query: deckId => `v1/decks/${deckId}/learn`,
      providesTags: ['RandomCard'],
    }),
    getRandomCardWith: builder.query<CardResponse, GetRandomCardArgs>({
      query: (arg: GetRandomCardArgs) =>
        `v1/decks/${arg.deckId}/learn${
          arg.previousCardId ? `?previousCardId=${arg.previousCardId}` : ''
        }`,
      providesTags: ['RandomCard'],
    }),
  }),
})

export const { useGetRandomCardWithQuery } = cardApi

import { baseApi } from '@/services/api.ts'
import { CardResponse, GetRandomCardArgs } from '@/services/cardService'
import {
  GetCardsQueryParams,
  GetCardsResponse,
  PatchResponse,
  PostCardPayload,
} from '@/features/cards/Types.ts'

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
    getCards: builder.query<GetCardsResponse, GetCardsQueryParams>({
      query: ({ id, ...rest }) => ({
        url: `v1/decks/${id}/cards`,
        params: rest,
      }),
      providesTags: ['Cards'],
      // body,
    }),
    postCard: builder.mutation<any, PostCardPayload>({
      query: ({ packId, ...rest }) => ({
        url: `v1/decks/${packId}/cards`,
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: ['Cards'],
    }),
    patchCard: builder.mutation<PatchResponse, PostCardPayload>({
      query: ({ packId, ...rest }) => ({
        url: `v1/cards/${packId}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<any, { cardId: string }>({
      query: ({ cardId, ...rest }) => ({
        url: `v1/cards/${cardId}`,
        method: 'DELETE',
        body: rest,
      }),
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const {
  useGetRandomCardWithQuery,
  useGetCardsQuery,
  usePostCardMutation,
  usePatchCardMutation,
  useDeleteCardMutation,
} = cardApi

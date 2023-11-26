import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { IAnime } from 'models/Anime.interface';
import { IAnimeDetails } from 'models/AnimeDetails.interface';
import { IPaginationData } from 'models/Pagination.interface';

export const API_URL = `https://api.jikan.moe/v4/anime`;

export const jikanApi = createApi({
  reducerPath: 'jikanApi',
  keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAnimeList: builder.query<
      { data: IAnime[]; pagination: IPaginationData },
      string | null
    >({
      query: (querystring: string | null) => `${API_URL}${querystring}`,
    }),
    getAnimeById: builder.query<{ data: IAnimeDetails }, number | string>({
      query: (id) => `${API_URL}/${id}`,
    }),
  }),
});

export const {
  useGetAnimeByIdQuery,
  useGetAnimeListQuery,
  util: { getRunningQueriesThunk },
} = jikanApi;

export const { getAnimeById, getAnimeList } = jikanApi.endpoints;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IAnime } from 'resources/Anime.interface';
import { IAnimeDetails } from 'resources/AnimeDetails.interface';
import { PaginationData } from 'resources/Pagination.interface';

export const API_URL = `https://api.jikan.moe/v4/anime`;

export const jikanApi = createApi({
  reducerPath: 'jikanApi',
  keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (builder) => ({
    fetchAnimeList: builder.query<
      { data: IAnime[]; pagination: PaginationData },
      string | null
    >({
      query: (querystring: string | null) => `${API_URL}${querystring}`,
    }),
    fetchAnimeById: builder.query<{ data: IAnimeDetails }, number | string>({
      query: (id) => `${API_URL}/${id}`,
    }),
  }),
});

export const useFetchAnimeList = jikanApi.endpoints.fetchAnimeList.useQuery;
export const useFetchAnimeById = jikanApi.endpoints.fetchAnimeById.useQuery;

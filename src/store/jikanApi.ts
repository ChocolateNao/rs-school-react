import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IAnime } from 'models/Anime.interface';
import { IAnimeDetails } from 'models/AnimeDetails.interface';
import { IPaginationData } from 'models/Pagination.interface';

export const API_URL = `https://api.jikan.moe/v4/anime`;

export const jikanApi = createApi({
  reducerPath: 'jikanApi',
  keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (builder) => ({
    fetchAnimeList: builder.query<
      { data: IAnime[]; pagination: IPaginationData },
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
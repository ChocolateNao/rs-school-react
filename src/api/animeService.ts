import { IAnimeDetails } from '../resources/AnimeDetails.interface';

const apiUrl = `https://api.jikan.moe/v4/anime`;

export const fetchAnimeById = async (id: string): Promise<IAnimeDetails> => {
  return fetch(`${apiUrl}/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Failed to fetch anime list');
    })
    .then((data) => {
      const animeList: IAnimeDetails = data.data;
      return animeList;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const fetchAnimeList = async (
  query: string | null,
  page?: string | null,
  limit?: string | null
) => {
  return fetch(
    `${apiUrl}${query ? `?q=${query.trim()}` : '?q='}${
      page ? `&page=${page}` : ''
    }${limit ? `&limit=${limit}` : ''}`
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Failed to fetch anime list');
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

import { IAnimeDetails } from '../resources/Anime.interface';

const fetchAnimeById = async (id: string): Promise<IAnimeDetails> => {
  const apiUrl = `https://api.jikan.moe/v4/anime/${id}`;

  return fetch(apiUrl)
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

export default fetchAnimeById;

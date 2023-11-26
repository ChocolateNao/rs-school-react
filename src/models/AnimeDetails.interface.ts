import { IAnime } from './Anime.interface';

export interface IAnimeDetails extends IAnime {
  status: string;
  year: number;
  rating: string;
  genres: [name: string];
  synopsis: string;
}

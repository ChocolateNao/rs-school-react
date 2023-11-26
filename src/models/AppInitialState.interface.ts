import { IAnime } from './Anime.interface';
import { IAnimeDetails } from './AnimeDetails.interface';
import { IPaginationData } from './Pagination.interface';

export interface IAppInititalState {
  animeList: IAnime[];
  animeDetails: IAnimeDetails;
  userInput: string;
  pagination: IPaginationData;
  baseUrl: string;
  isLoadingMainPage: boolean;
  isLoadingDetailsPage: boolean;
  isDummyError: boolean;
  isNotFoundError: boolean;
  isUnexpectedError: boolean;
  errorMessage: string | null;
}

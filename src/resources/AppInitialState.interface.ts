import { IAnime } from './Anime.interface';
import { IAnimeDetails } from './AnimeDetails.interface';
import { PaginationData } from './Pagination.interface';

export default interface IAppInititalState {
  animeList: IAnime[];
  animeDetails: IAnimeDetails;
  userInput: string;
  pagination: PaginationData;
  baseUrl: string;
  isLoadingMainPage: boolean;
  isLoadingDetailsPage: boolean;
  isDummyError: boolean;
  isNotFoundError: boolean;
  isUnexpectedError: boolean;
  errorMessage: string | null;
}

import { createSlice } from '@reduxjs/toolkit';

import { IAnime } from 'models/Anime.interface';
import { IAnimeDetails } from 'models/AnimeDetails.interface';
import { IAppInititalState } from 'models/AppInitialState.interface';

import { API_URL } from './jikanApi';

const initialState: IAppInititalState = {
  animeList: [] as IAnime[],
  animeDetails: {} as IAnimeDetails,
  userInput: (localStorage.getItem('userInput') as string) ?? '',
  pagination: {
    last_visible_page: 1,
    has_next_page: false,
    current_page: 1,
    items: {
      count: 1,
      total: 1,
      per_page: 25,
    },
  },
  baseUrl: API_URL,
  isLoadingMainPage: false,
  isLoadingDetailsPage: false,
  isDummyError: false,
  isNotFoundError: false,
  isUnexpectedError: false,
  errorMessage: null,
};

export const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setAnimeList(state, action) {
      state.animeList = action.payload;
    },
    setAnimeDetails(state, action) {
      state.animeDetails = action.payload;
    },
    setUserInput(state, action) {
      state.userInput = action.payload;
      localStorage.setItem('userInput', action.payload);
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
    setItemsPerPage(state, action) {
      state.pagination.items.per_page = action.payload;
    },
    setCurrentPage(state, action) {
      state.pagination.current_page = action.payload;
    },
    setPages(state, action) {
      state.pagination.last_visible_page = action.payload;
    },
    setBaseUrl(state, action) {
      state.baseUrl = action.payload;
    },
    setLoadingMainPage(state, action) {
      state.isLoadingMainPage = action.payload;
    },
    setLoadingDetailsPage(state, action) {
      state.isLoadingDetailsPage = action.payload;
    },
    setDummyError(state, action) {
      state.isDummyError = action.payload;
    },
    setNotFoundError(state, action) {
      state.isNotFoundError = action.payload;
    },
    setUnexpectedError(state, action) {
      state.isUnexpectedError = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export default Slice.reducer;
export const {
  setAnimeList,
  setAnimeDetails,
  setUserInput,
  setPagination,
  setItemsPerPage,
  setCurrentPage,
  setPages,
  setBaseUrl,
  setLoadingMainPage,
  setLoadingDetailsPage,
  setDummyError,
  setNotFoundError,
  setUnexpectedError,
  setErrorMessage,
} = Slice.actions;

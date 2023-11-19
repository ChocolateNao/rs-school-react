import { IAnime } from 'resources/Anime.interface';
import { IAnimeDetails } from 'resources/AnimeDetails.interface';

const mockAnimeCard: IAnime = {
  mal_id: 1,
  url: 'test-url',
  title: 'Cowboy Bepop',
  type: 'Movie',
  score: 9,
  airing: false,
  images: {
    jpg: {
      image_url: 'test-image-url-jpg',
      small_image_url: 'test-small-image-url-jpg',
      large_image_url: 'test-large-image-url-jpg',
    },
    webp: {
      image_url: 'test-image-url-webp',
      small_image_url: 'test-small-image-url-webp',
      large_image_url: 'test-large-image-url-webp',
    },
  },
};

const mockAnimeDetails: IAnimeDetails = {
  mal_id: 1,
  url: 'test-url',
  title: 'Cowboy Bepop',
  type: 'Movie',
  score: 9,
  airing: false,
  images: {
    jpg: {
      image_url: 'test-image-url-jpg',
      small_image_url: 'test-small-image-url-jpg',
      large_image_url: 'test-large-image-url-jpg',
    },
    webp: {
      image_url: 'test-image-url-webp',
      small_image_url: 'test-small-image-url-webp',
      large_image_url: 'test-large-image-url-webp',
    },
  },
  status: 'Airing',
  year: 2008,
  rating: '322',
  genres: ['Action'],
  synopsis: 'Once upon a time...',
};

const mockAnimeList: IAnime[] = [
  {
    mal_id: 1,
    url: 'test-url-1',
    title: 'Cowboy Bepop',
    type: 'Movie',
    score: 9,
    airing: false,
    images: {
      jpg: {
        image_url: 'test-image-url-jpg',
        small_image_url: 'test-small-image-url-jpg',
        large_image_url: 'test-large-image-url-jpg',
      },
      webp: {
        image_url: 'test-image-url-webp',
        small_image_url: 'test-small-image-url-webp',
        large_image_url: 'test-large-image-url-webp',
      },
    },
  },
  {
    mal_id: 2,
    url: 'test-url-2',
    title: 'Jujutsu Kaisen',
    type: 'TV',
    score: 10,
    airing: false,
    images: {
      jpg: {
        image_url: 'test-image-url-jpg',
        small_image_url: 'test-small-image-url-jpg',
        large_image_url: 'test-large-image-url-jpg',
      },
      webp: {
        image_url: 'test-image-url-webp',
        small_image_url: 'test-small-image-url-webp',
        large_image_url: 'test-large-image-url-webp',
      },
    },
  },
  {
    mal_id: 3,
    url: 'test-url-3',
    title: 'Boku no Pico',
    type: 'OVA',
    score: 5,
    airing: false,
    images: {
      jpg: {
        image_url: 'test-image-url-jpg',
        small_image_url: 'test-small-image-url-jpg',
        large_image_url: 'test-large-image-url-jpg',
      },
      webp: {
        image_url: 'test-image-url-webp',
        small_image_url: 'test-small-image-url-webp',
        large_image_url: 'test-large-image-url-webp',
      },
    },
  },
];

const fetchAnimeListMock = jest.fn().mockResolvedValue(mockAnimeList);

const fetchAnimeDetailsMock = jest.fn().mockResolvedValue(mockAnimeDetails);

export {
  fetchAnimeDetailsMock,
  fetchAnimeListMock,
  mockAnimeCard,
  mockAnimeDetails,
  mockAnimeList,
};

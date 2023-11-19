import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import {
  fetchAnimeDetailsMock,
  fetchAnimeListMock,
  mockAnimeCard,
} from '../../tests/mock/animeServiceMock';

import AnimeCard from './AnimeCard';

jest.mock('resources/Anime.interface', () => ({
  IAnime: jest.fn(),
}));

jest.mock('../../api/animeService.ts', () => ({
  fetchAnimeById: fetchAnimeDetailsMock,
  fetchAnimeList: fetchAnimeListMock,
}));

describe('AnimeCard Component', () => {
  it('renders the relevant card data', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <AnimeCard anime={mockAnimeCard} />
      </BrowserRouter>
    );

    expect(getByText('Cowboy Bepop')).toBeInTheDocument();
    expect(getByText('Type:')).toBeInTheDocument();
    expect(getByText('Movie')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText('Completed')).toBeInTheDocument();
    expect(getByText('Score:')).toBeInTheDocument();
    expect(getByText('9')).toBeInTheDocument();
    expect(getByAltText('Cowboy Bepop')).toBeInTheDocument();
  });

  it('renders link to correct URL', () => {
    const { container } = render(
      <BrowserRouter>
        <AnimeCard anime={mockAnimeCard} />
      </BrowserRouter>
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/1');
  });
});

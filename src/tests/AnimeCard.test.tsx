import { render } from '@testing-library/react';

import AnimeCard from 'components/AnimeCard';

import { mockAnimeCard } from './mock/animeServiceMock';

jest.mock('models/Anime.interface', () => ({
  IAnime: jest.fn(),
}));

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('AnimeCard Component', () => {
  it('renders the relevant card data', () => {
    const { getByText, getByAltText } = render(
      <AnimeCard anime={mockAnimeCard} />
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
    const { container } = render(<AnimeCard anime={mockAnimeCard} />);

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', 'anime/1');
  });
});

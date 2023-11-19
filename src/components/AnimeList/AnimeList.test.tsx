import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { IAnime } from 'resources/Anime.interface';
import SearchProvider from 'shared/context/SearchContext';

import { mockAnimeList } from '../../tests/mock/animeServiceMock';

import AnimeList from '.';

describe('AnimeList Component', () => {
  it('renders specified number of cards', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchProvider>
          <AnimeList data={mockAnimeList} />
        </SearchProvider>
      </MemoryRouter>
    );
    const cards = container.querySelectorAll('.cards .card');

    expect(cards).toHaveLength(mockAnimeList.length);
  });

  it('displays appropriate message if no cards are present', () => {
    const animeData: Array<IAnime> = [];

    const { getByText } = render(
      <MemoryRouter>
        <SearchProvider>
          <AnimeList data={animeData} />
        </SearchProvider>
      </MemoryRouter>
    );
    const messageElement = getByText(
      'Nothing was found that satisfies your desires, master'
    );

    expect(messageElement).toBeInTheDocument();
  });
});

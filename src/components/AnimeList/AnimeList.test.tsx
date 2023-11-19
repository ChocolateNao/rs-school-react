import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { IAnime } from 'resources/Anime.interface';
import store from 'shared/store';

import { mockAnimeList } from '../../tests/mock/animeServiceMock';

import AnimeList from '.';

describe('AnimeList Component', () => {
  it('renders specified number of cards', () => {
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <AnimeList data={mockAnimeList} />
        </Provider>
      </MemoryRouter>
    );
    const cards = container.querySelectorAll('.cards .card');

    expect(cards).toHaveLength(mockAnimeList.length);
  });

  it('displays appropriate message if no cards are present', () => {
    const animeData: Array<IAnime> = [];

    const { getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <AnimeList data={animeData} />
        </Provider>
      </MemoryRouter>
    );
    const messageElement = getByText(
      'Nothing was found that satisfies your desires, master'
    );

    expect(messageElement).toBeInTheDocument();
  });
});

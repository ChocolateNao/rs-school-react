import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from 'store/index';

import AnimeList from 'components/AnimeList';
import { IAnime } from 'models/Anime.interface';

import { mockAnimeList } from './mock/animeServiceMock';

describe('AnimeList Component', () => {
  it('renders specified number of cards', () => {
    const { container } = render(
      <Provider store={store}>
        <AnimeList data={mockAnimeList} />
      </Provider>
    );
    const cards = container.querySelectorAll('.cards .card');

    expect(cards).toHaveLength(mockAnimeList.length);
  });

  it('displays appropriate message if no cards are present', () => {
    const animeData: Array<IAnime> = [];

    const { getByText } = render(
      <Provider store={store}>
        <AnimeList data={animeData} />
      </Provider>
    );
    const messageElement = getByText(/Nothing was found/i);

    expect(messageElement).toBeInTheDocument();
  });
});

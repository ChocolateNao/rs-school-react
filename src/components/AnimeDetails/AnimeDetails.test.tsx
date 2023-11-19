import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import AnimeCard from 'components/AnimeCard';
import store from 'shared/store';

import { mockAnimeCard } from '../../tests/mock/animeServiceMock';

import AnimeDetails from '.';

jest.mock('api/animeService');

describe('AnimeDetails Component', () => {
  it('renders AnimeDetails component', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<AnimeCard anime={mockAnimeCard} />}>
              <Route path="/1" element={<AnimeDetails />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const loader = screen.getByText('Movie');
    expect(loader).toBeInTheDocument();
  });
});

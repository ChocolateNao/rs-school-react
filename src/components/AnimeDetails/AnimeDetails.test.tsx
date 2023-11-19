import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import AnimeCard from 'components/AnimeCard';
import SearchProvider from 'context/SearchContext';

import { mockAnimeCard } from '../../tests/mock/animeServiceMock';

import AnimeDetails from '.';

jest.mock('api/animeService');

describe('AnimeDetails Component', () => {
  it('renders AnimeDetails component', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<AnimeCard anime={mockAnimeCard} />}>
              <Route path="/1" element={<AnimeDetails />} />
            </Route>
          </Routes>
        </SearchProvider>
      </MemoryRouter>
    );

    const loader = screen.getByText('Movie');
    expect(loader).toBeInTheDocument();
  });
});

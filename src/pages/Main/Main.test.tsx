import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import SearchProvider from 'shared/context/SearchContext';

import { mockAnimeList } from '../../tests/mock/animeServiceMock';

import Main from '.';

const mockData = mockAnimeList;
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ data: mockData }),
  })
);

describe('Main Page', () => {
  it('renders Main page', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { getByText } = render(
      <MemoryRouter>
        <SearchProvider>
          <Main />
        </SearchProvider>
      </MemoryRouter>
    );

    const textElement = getByText('Anime search');

    expect(textElement).toBeInTheDocument();
  });
});

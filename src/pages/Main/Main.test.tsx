import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import store from 'shared/store';

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
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );

    const textElement = getByText('Anime search');

    expect(textElement).toBeInTheDocument();
  });
});

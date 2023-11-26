import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import AnimeDetails from 'components/AnimeDetails';

import { mockAnimeDetails } from './mock/animeServiceMock';
import mockStore from './mock/reduxStoreMock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('AnimeDetails Component', () => {
  it('renders AnimeDetails component', () => {
    render(
      <Provider store={mockStore}>
        <AnimeDetails animeDetails={mockAnimeDetails} />
      </Provider>
    );

    const loader = screen.getByText(/Movie/i);
    expect(loader).toBeInTheDocument();
  });
});

import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { mockAnimeList, mockPaginationData } from 'tests/mock/animeServiceMock';
import mockStore from 'tests/mock/reduxStoreMock';

import Layout from 'pages/layout';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const mockListWithPagination = {
  data: mockAnimeList,
  pagination: mockPaginationData,
};

function AppWrapper() {
  return (
    <Provider store={mockStore}>
      <Layout animeList={mockListWithPagination} />
    </Provider>
  );
}

describe('Layout Page', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  it('renders the page without crashing', async () => {
    const { getByText } = render(<AppWrapper />);

    const element = getByText(/Anime search/i);

    expect(element).toBeInTheDocument();
  });
});

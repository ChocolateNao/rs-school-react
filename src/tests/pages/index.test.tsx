import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { GetServerSidePropsContext, PreviewData } from 'next';
import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { mockAnimeList, mockPaginationData } from 'tests/mock/animeServiceMock';
import mockStore from 'tests/mock/reduxStoreMock';

import Home, { getServerSideProps, HomeProps } from 'pages/index';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const mockListWithPagination = {
  data: mockAnimeList,
  pagination: mockPaginationData,
};

describe('Home Page', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});

  it('renders the page without crashing', async () => {
    Router.events.emit('routeChangeStart');
    const { getByText } = render(
      <Provider store={mockStore}>
        <Home animeList={mockListWithPagination} />
      </Provider>
    );
    Router.events.emit('routeChangeComplete');

    const element = getByText(/Anime search/i);
    expect(element).toBeInTheDocument();
  });

  it('renders the page with the usage of getServerSideProps', async () => {
    const context = {
      params: { page: '1', per: '25', search: 'cowboy' } as ParsedUrlQuery,
    };
    Router.events.emit('routeChangeStart');
    const { props } = (await getServerSideProps(
      context as GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    )) as { props: HomeProps };
    const { container } = render(
      <Provider store={mockStore}>
        <Home animeList={props.animeList} />
      </Provider>
    );
    Router.events.emit('routeChangeComplete');

    expect(container).toContainHTML(
      '<h1 class="header__title">Anime search</h1>'
    );
  });
});

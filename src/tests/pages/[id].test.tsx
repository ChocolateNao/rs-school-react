import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
  mockAnimeDetails,
  mockAnimeList,
  mockPaginationData,
} from 'tests/mock/animeServiceMock';
import mockStore from 'tests/mock/reduxStoreMock';

import Details, { DetailsProps, getServerSideProps } from 'pages/anime/[id]';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const mockListWithPagination = {
  data: mockAnimeList,
  pagination: mockPaginationData,
};

const mockAnimeDetailsWithData = {
  data: mockAnimeDetails,
};

function AppWrapper() {
  return (
    <Provider store={mockStore}>
      <Details
        animeList={mockListWithPagination}
        animeDetails={mockAnimeDetailsWithData}
      />
    </Provider>
  );
}

describe('Details Page', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  it('renders the page without crashing', async () => {
    const { getByText } = render(<AppWrapper />);

    const element = getByText(/Synopsis/i);

    expect(element).toBeInTheDocument();
  });

  it('renders the page with the usage of getServerSideProps', async () => {
    const context = {
      params: {
        page: '1',
        per: '25',
        search: 'cowboy',
        id: '1',
      } as ParsedUrlQuery,
    };

    const { props } = (await getServerSideProps(
      context as GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    )) as { props: DetailsProps };
    const { container } = render(
      <Provider store={mockStore}>
        <Details
          animeList={props.animeList}
          animeDetails={props.animeDetails}
        />
      </Provider>
    );

    expect(container).toContainHTML(
      '<div aria-label="close-details" class="modal__overlay" role="textbox" tabindex="0" />'
    );
  });
});

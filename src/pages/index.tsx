import { wrapper } from 'store/index';
import { getAnimeList, jikanApi } from 'store/jikanApi';

import { IAnime } from 'models/Anime.interface';
import { IPaginationData } from 'models/Pagination.interface';

import Layout from './layout';

export interface HomeProps {
  animeList: { data: IAnime[]; pagination: IPaginationData };
}

export default function Home({ animeList }: HomeProps) {
  return <Layout animeList={animeList} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, per, search } = context.query || {};
    const querystring = `${search ? `?q=${String(search).trim()}` : '?q='}${
      page ? `&page=${page}` : ''
    }${per ? `&limit=${per}` : ''}`;
    const list = await store.dispatch(getAnimeList.initiate(querystring));

    await Promise.all(store.dispatch(jikanApi.util.getRunningQueriesThunk()));
    return {
      props: {
        animeList: list?.data,
      },
    };
  }
);

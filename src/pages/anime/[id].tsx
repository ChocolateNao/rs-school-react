import { wrapper } from 'store/index';
import { getAnimeById, getAnimeList, jikanApi } from 'store/jikanApi';

import AnimeDetails from 'components/AnimeDetails';
import { IAnime } from 'models/Anime.interface';
import { IAnimeDetails } from 'models/AnimeDetails.interface';
import { IPaginationData } from 'models/Pagination.interface';
import Layout from 'pages/layout';

export interface DetailsProps {
  animeList: { data: IAnime[]; pagination: IPaginationData };
  animeDetails: { data: IAnimeDetails };
}

export default function Details({ animeList, animeDetails }: DetailsProps) {
  return (
    <Layout animeList={animeList}>
      <AnimeDetails animeDetails={animeDetails?.data} />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, per, search, id } = context.query || {};

    const querystring = `${search ? `?q=${String(search).trim()}` : '?q='}${
      page ? `&page=${page}` : ''
    }${per ? `&limit=${per}` : ''}`;
    const details = await store.dispatch(getAnimeById.initiate(String(id)));
    const list = await store.dispatch(getAnimeList.initiate(querystring));

    await Promise.all(store.dispatch(jikanApi.util.getRunningQueriesThunk()));
    return {
      props: {
        animeList: list?.data || undefined,
        animeDetails: details?.data || undefined,
      },
    };
  }
);

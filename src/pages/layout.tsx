import { ReactNode } from 'react';
import Head from 'next/head';

import AnimeList from 'components/AnimeList';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import Search from 'components/Search';
import { IAnime } from 'models/Anime.interface';
import { IPaginationData } from 'models/Pagination.interface';

interface LayoutProps {
  animeList: { data: IAnime[]; pagination: IPaginationData };
  children?: ReactNode;
}
function Layout({ children, animeList }: LayoutProps) {
  const { data, pagination } = animeList;
  return (
    <>
      <Head>
        <title>MAL Search</title>
        <meta name="description" content="MyAnimeList search via jikan API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Header>
            <Search />
          </Header>
          <Pagination totalPages={pagination.last_visible_page} />
          <AnimeList data={data} />
        </div>
        {children}
      </main>
    </>
  );
}

Layout.defaultProps = {
  children: <div />,
};

export default Layout;
